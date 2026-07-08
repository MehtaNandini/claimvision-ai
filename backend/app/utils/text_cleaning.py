import re

def clean_extracted_text(text: str) -> str:
    """
    Cleans OCR or PDF extracted text by removing excess whitespace, 
    fixing common OCR typos, and standardizing characters.
    """
    if not text:
        return ""
    
    # Remove multiple spaces and newlines
    text = re.sub(r'\s+', ' ', text)
    # Remove special non-ascii chars if needed
    text = re.sub(r'[^\x00-\x7F]+', ' ', text)
    
    return text.strip()
