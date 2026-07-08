import json
from app.core.config import settings

def extract_fields_from_text(text: str, doc_type: str) -> dict:
    """
    Uses LLM (or mock) to extract structured fields from text based on doc_type.
    """
    if settings.USE_MOCK_OCR:
        if doc_type == 'INVOICE':
            return {
                "invoice_number": "10023",
                "vendor_name": "AutoFix Inc.",
                "total_amount": 1250.00,
                "currency": "USD"
            }
        else:
            return {
                "claimant_name": "John Doe",
                "claim_number": "CLM-99812",
                "accident_date": "2023-10-15"
            }
    
    # In a real implementation, you would call OpenAI here with a prompt 
    # to extract JSON fields from the provided text.
    return {"status": "LLM extraction not implemented"}
