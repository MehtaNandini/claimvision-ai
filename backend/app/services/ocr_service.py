import pytesseract
from PIL import Image
from app.core.config import settings

def extract_text_from_image(image_path: str) -> str:
    if settings.USE_MOCK_OCR:
        return "MOCK OCR TEXT: REPAIR SHOP NAME: AutoFix Inc. INVOICE #: 10023 AMOUNT: $1250.00"
    
    try:
        img = Image.open(image_path)
        text = pytesseract.image_to_string(img)
        return text
    except Exception as e:
        print(f"OCR Error: {e}")
        return ""
