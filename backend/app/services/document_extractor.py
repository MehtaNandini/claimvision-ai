import fitz  # PyMuPDF
from app.services.ocr_service import extract_text_from_image
from app.utils.text_cleaning import clean_extracted_text

def extract_text_from_pdf(pdf_path: str) -> str:
    text = ""
    try:
        doc = fitz.open(pdf_path)
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            page_text = page.get_text()
            
            # If no text found, it might be a scanned PDF, so we OCR it
            if not page_text.strip():
                pix = page.get_pixmap()
                img_path = f"{pdf_path}_page{page_num}.png"
                pix.save(img_path)
                page_text = extract_text_from_image(img_path)
                
            text += page_text + "\n"
    except Exception as e:
        print(f"PDF Extraction Error: {e}")
        
    return clean_extracted_text(text)

def extract_document_text(file_path: str, filename: str) -> str:
    if filename.lower().endswith('.pdf'):
        return extract_text_from_pdf(file_path)
    elif filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        text = extract_text_from_image(file_path)
        return clean_extracted_text(text)
    else:
        # Fallback for text files etc.
        try:
            with open(file_path, 'r') as f:
                return clean_extracted_text(f.read())
        except:
            return ""
