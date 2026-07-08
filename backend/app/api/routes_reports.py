from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.claim import Claim
from app.models.document import Document
from app.models.image_analysis import ImageAnalysis
from app.schemas.report_schema import RiskReportResponse, FullReportResponse
from app.schemas.image_schema import ImageAnalysisResponse
from app.schemas.document_schema import DocumentResponse

from app.services.document_extractor import extract_document_text
from app.services.field_extractor import extract_fields_from_text
from app.services.image_analyzer import analyze_damage_image
from app.services.report_generator import generate_report_for_claim

router = APIRouter()

@router.post("/{claim_id}/analyze")
def analyze_claim(claim_id: int, db: Session = Depends(get_db)):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
        
    # Analyze documents
    docs = db.query(Document).filter(Document.claim_id == claim_id).all()
    for doc in docs:
        if doc.doc_type in ["INVOICE", "CLAIM_FORM"]:
            text = extract_document_text(doc.file_path, doc.filename)
            doc.extracted_text = text
            doc.extracted_fields = extract_fields_from_text(text, doc.doc_type)
        elif doc.doc_type == "IMAGE":
            # Avoid duplicate analysis
            existing = db.query(ImageAnalysis).filter(ImageAnalysis.document_id == doc.id).first()
            if not existing:
                analysis = analyze_damage_image(doc.file_path)
                db_analysis = ImageAnalysis(
                    claim_id=claim_id,
                    document_id=doc.id,
                    damage_area=analysis["damage_area"],
                    damage_category=analysis["damage_category"],
                    severity=analysis["severity"],
                    confidence_score=analysis["confidence_score"],
                    damaged_parts=analysis["damaged_parts"],
                    explanation=analysis["explanation"]
                )
                db.add(db_analysis)
                
    db.commit()
    
    # Generate final report
    report = generate_report_for_claim(db, claim_id)
    if not report:
        raise HTTPException(status_code=500, detail="Failed to generate report")
        
    # Update claim status
    claim.status = "ANALYZED"
    db.commit()
    
    return {"status": "Analysis complete"}

@router.get("/{claim_id}/report", response_model=RiskReportResponse)
def get_claim_report(claim_id: int, db: Session = Depends(get_db)):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim or not claim.risk_report:
        raise HTTPException(status_code=404, detail="Report not found")
        
    return claim.risk_report

@router.get("/{claim_id}/json", response_model=FullReportResponse)
def get_claim_full_json(claim_id: int, db: Session = Depends(get_db)):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim or not claim.risk_report:
        raise HTTPException(status_code=404, detail="Report not found")
        
    return {
        "claim_id": claim.id,
        "claim_details": {
            "description": claim.description,
            "vehicle": f"{claim.vehicle_year} {claim.vehicle_brand} {claim.vehicle_model}"
        },
        "image_analyses": claim.image_analyses,
        "extracted_documents": [
            {"filename": d.filename, "type": d.doc_type, "fields": d.extracted_fields} 
            for d in claim.documents if d.extracted_fields
        ],
        "risk_assessment": claim.risk_report
    }
