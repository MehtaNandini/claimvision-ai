from app.core.config import settings

def analyze_damage_image(image_path: str) -> dict:
    """
    Analyzes the image for vehicle damage. 
    Returns a dictionary of findings.
    """
    if settings.USE_MOCK_VISION:
        return {
            "damage_area": "Front left bumper and headlight",
            "damage_category": "Collision",
            "severity": "Medium",
            "confidence_score": 0.88,
            "damaged_parts": ["bumper", "headlight", "fender"],
            "explanation": "Visible denting and scratching on the front left bumper extending to the headlight assembly."
        }
    
    # Real implementation would base64 encode the image and send to OpenAI Vision
    return {
        "damage_area": "Unknown",
        "damage_category": "Unknown",
        "severity": "Unknown",
        "confidence_score": 0.0,
        "damaged_parts": [],
        "explanation": "Vision API not implemented or key missing."
    }
