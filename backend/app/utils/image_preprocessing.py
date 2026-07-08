from PIL import Image
import os

def preprocess_image(image_path: str) -> str:
    """
    Resizes image and converts to RGB if needed to optimize for Vision LLMs
    or OpenCV fallback. Returns path to processed image (can be same if no change).
    """
    try:
        with Image.open(image_path) as img:
            # Convert to RGB if necessary
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Resize if too large (e.g. max 1024x1024)
            img.thumbnail((1024, 1024))
            
            processed_path = image_path + "_processed.jpg"
            img.save(processed_path, format="JPEG", quality=85)
            return processed_path
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        return image_path
