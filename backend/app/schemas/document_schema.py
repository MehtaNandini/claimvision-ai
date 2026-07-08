from pydantic import BaseModel
from typing import Optional, Any, Dict

class DocumentResponse(BaseModel):
    id: int
    claim_id: int
    filename: str
    doc_type: str
    extracted_fields: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True
