from sqlalchemy.orm import Session
from app.models.claim import Claim
from app.services.claim_reasoner import generate_claim_summary
from app.services.risk_engine import calculate_risk_score
from app.models.risk_report import RiskReport

def generate_report_for_claim(db: Session, claim_id: int):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        return None
        
    claim_data = {
        "description": claim.description,
        "vehicle_brand": claim.vehicle_brand,
        "vehicle_model": claim.vehicle_model,
        "vehicle_year": claim.vehicle_year,
    }
    
    images_data = []
    for img in claim.image_analyses:
        images_data.append({
            "damage_area": img.damage_area,
            "damage_category": img.damage_category,
            "severity": img.severity,
            "confidence_score": img.confidence_score,
            "damaged_parts": img.damaged_parts
        })
        
    docs_data = []
    for doc in claim.documents:
        docs_data.append({
            "doc_type": doc.doc_type,
            "extracted_fields": doc.extracted_fields
        })
        
    summary = generate_claim_summary(claim_data, images_data, docs_data)
    risk_assessment = calculate_risk_score(claim_data, images_data, docs_data)
    
    # Save risk report to DB
    if claim.risk_report:
        db.delete(claim.risk_report)
        db.commit()
        
    risk_report = RiskReport(
        claim_id=claim.id,
        risk_level=risk_assessment["risk_level"],
        risk_score=risk_assessment["risk_score"],
        risk_factors=risk_assessment["risk_factors"],
        explanation=risk_assessment["explanation"],
        claim_summary=summary,
        missing_information=risk_assessment["missing_information"],
        recommended_steps=risk_assessment["recommended_steps"]
    )
    db.add(risk_report)
    db.commit()
    db.refresh(risk_report)
    
    return risk_report
