from pydantic import BaseModel
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String
from typing import List, Optional

Base = declarative_base()

class Claim(Base):
    __tablename__ = "claims"
    id = Column(Integer, primary_key=True)
    status = Column(String)

class ClaimResponse(BaseModel):
    id: int
    status: str
    images: Optional[List[str]] = []
    
    class Config:
        from_attributes = True

claim = Claim(id=1, status="ANALYZED")
claim.images = ["hello.jpg"]
print(ClaimResponse.model_validate(claim).model_dump())
