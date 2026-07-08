from sqlalchemy import Column, Integer, String, Text, ForeignKey, Float, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

class ImageAnalysis(Base):
    __tablename__ = "image_analyses"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"))
    document_id = Column(Integer, ForeignKey("documents.id"))
    damage_area = Column(String(255))
    damage_category = Column(String(100))
    severity = Column(String(50))
    confidence_score = Column(Float)
    damaged_parts = Column(JSON)
    explanation = Column(Text)

    claim = relationship("Claim", back_populates="image_analyses")
    document = relationship("Document")
