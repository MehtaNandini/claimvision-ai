import os
from app.services.field_extractor import extract_fields_from_text
from app.core.config import settings

def test_extract_invoice_mock():
    settings.USE_MOCK_OCR = True
    res = extract_fields_from_text("some text", "INVOICE")
    assert res["invoice_number"] == "10023"
    assert res["total_amount"] == 1250.0

def test_extract_claim_mock():
    settings.USE_MOCK_OCR = True
    res = extract_fields_from_text("some text", "CLAIM_FORM")
    assert res["claimant_name"] == "John Doe"
