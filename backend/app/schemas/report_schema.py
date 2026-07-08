from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.schemas.image_schema import ImageAnalysisResponse

class RiskReportResponse(BaseModel):
    id: int
    claim_id: int
    risk_level: str
    risk_score: int
    risk_factors: List[str]
    explanation: str
    claim_summary: Optional[str] = None
    missing_information: Optional[List[str]] = None
    recommended_steps: Optional[List[str]] = None

    class Config:
        from_attributes = True

class FullReportResponse(BaseModel):
    claim_id: int
    claim_details: Dict[str, Any]
    image_analyses: List[ImageAnalysisResponse]
    extracted_documents: List[Dict[str, Any]]
    risk_assessment: RiskReportResponse
