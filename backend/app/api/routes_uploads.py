from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.claim import Claim
from app.models.document import Document
from app.schemas.document_schema import DocumentResponse
from app.utils.file_utils import save_upload_file

router = APIRouter()

@router.post("/{claim_id}/upload-document", response_model=DocumentResponse)
def upload_document(
    claim_id: int, 
    doc_type: str, 
    file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
        
    file_path = save_upload_file(file, claim_id)
    
    db_doc = Document(
        claim_id=claim.id,
        filename=file.filename,
        doc_type=doc_type,
        file_path=file_path
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    
    return db_doc

@router.post("/{claim_id}/upload-image", response_model=DocumentResponse)
def upload_image(
    claim_id: int, 
    file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    return upload_document(claim_id, "IMAGE", file, db)
