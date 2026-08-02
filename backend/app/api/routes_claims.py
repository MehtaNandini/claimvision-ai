from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.claim import Claim
from app.schemas.claim_schema import ClaimCreate, ClaimResponse

router = APIRouter()

@router.post("/", response_model=ClaimResponse)
def create_claim(claim_data: ClaimCreate, db: Session = Depends(get_db)):
    db_claim = Claim(**claim_data.model_dump())
    db.add(db_claim)
    db.commit()
    db.refresh(db_claim)
    db_claim.images = []
    return db_claim

@router.get("/", response_model=List[ClaimResponse])
def list_claims(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    claims = db.query(Claim).offset(skip).limit(limit).all()
    for claim in claims:
        images = []
        for doc in claim.documents:
            if doc.doc_type == "IMAGE":
                filename = doc.file_path.split("/")[-1]
                images.append(f"http://localhost:8000/uploads/{claim.id}/{filename}")
        claim.images = images
    return claims

@router.get("/{claim_id}", response_model=ClaimResponse)
def get_claim(claim_id: int, db: Session = Depends(get_db)):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
        
    images = []
    for doc in claim.documents:
        if doc.doc_type == "IMAGE":
            filename = doc.file_path.split("/")[-1]
            images.append(f"http://localhost:8000/uploads/{claim.id}/{filename}")
    claim.images = images
    
    return claim
