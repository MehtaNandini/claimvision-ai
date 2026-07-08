from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(Text, nullable=True)
    vehicle_brand = Column(String(100), nullable=True)
    vehicle_model = Column(String(100), nullable=True)
    vehicle_year = Column(Integer, nullable=True)
    vehicle_mileage = Column(Integer, nullable=True)
    status = Column(String(50), default="CREATED")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    documents = relationship("Document", back_populates="claim", cascade="all, delete-orphan")
    image_analyses = relationship("ImageAnalysis", back_populates="claim", cascade="all, delete-orphan")
    risk_report = relationship("RiskReport", back_populates="claim", uselist=False, cascade="all, delete-orphan")
