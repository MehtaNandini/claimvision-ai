import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "ClaimVision AI"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./claimvision.db")
    OPENAI_API_KEY: str | None = os.getenv("OPENAI_API_KEY")
    USE_MOCK_VISION: bool = os.getenv("USE_MOCK_VISION", "true").lower() == "true"
    USE_MOCK_OCR: bool = os.getenv("USE_MOCK_OCR", "true").lower() == "true"
    
    class Config:
        env_file = ".env"

settings = Settings()
