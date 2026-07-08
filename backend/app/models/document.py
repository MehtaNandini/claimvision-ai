from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"))
    filename = Column(String(255))
    doc_type = Column(String(50)) # 'INVOICE', 'CLAIM_FORM', 'IMAGE'
    file_path = Column(String(500))
    extracted_text = Column(Text, nullable=True)
    extracted_fields = Column(JSON, nullable=True)

    claim = relationship("Claim", back_populates="documents")
