from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routes_claims, routes_uploads, routes_reports, routes_health
from app.core.database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ClaimVision AI - Multimodal Insurance Claim Analyzer",
    description="API for analyzing vehicle insurance claims using uploaded images, invoices, and claim documents.",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(routes_health.router, prefix="/health", tags=["health"])
app.include_router(routes_claims.router, prefix="/claims", tags=["claims"])
app.include_router(routes_uploads.router, prefix="/claims", tags=["uploads"])
app.include_router(routes_reports.router, prefix="/claims", tags=["reports"])
