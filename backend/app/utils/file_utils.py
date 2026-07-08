import os
import shutil
import uuid
from pathlib import Path
from fastapi import UploadFile

UPLOAD_DIR = Path("/tmp/claimvision_uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

def save_upload_file(upload_file: UploadFile, claim_id: int) -> str:
    claim_dir = UPLOAD_DIR / str(claim_id)
    claim_dir.mkdir(parents=True, exist_ok=True)
    
    unique_filename = f"{uuid.uuid4()}_{upload_file.filename}"
    file_path = claim_dir / unique_filename
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
        
    return str(file_path)

def delete_claim_files(claim_id: int):
    claim_dir = UPLOAD_DIR / str(claim_id)
    if claim_dir.exists():
        shutil.rmtree(claim_dir)
