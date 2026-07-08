from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

class RiskReport(Base):
    __tablename__ = "risk_reports"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"), unique=True)
    risk_level = Column(String(50))
    risk_score = Column(Integer)
    risk_factors = Column(JSON)
    explanation = Column(Text)
    claim_summary = Column(Text, nullable=True)
    missing_information = Column(JSON, nullable=True)
    recommended_steps = Column(JSON, nullable=True)
    
    claim = relationship("Claim", back_populates="risk_report")
