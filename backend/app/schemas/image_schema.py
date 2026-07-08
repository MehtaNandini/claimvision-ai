from pydantic import BaseModel
from typing import Optional, List

class ImageAnalysisResponse(BaseModel):
    id: int
    claim_id: int
    document_id: int
    damage_area: str
    damage_category: str
    severity: str
    confidence_score: float
    damaged_parts: List[str]
    explanation: str

    class Config:
        from_attributes = True
