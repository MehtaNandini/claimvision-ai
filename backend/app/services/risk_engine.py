def calculate_risk_score(claim_data: dict, images_data: list, docs_data: list) -> dict:
    """
    Evaluates inconsistencies between reported damage, images, and invoices to assess risk.
    """
    score = 10
    factors = []
    missing_info = []
    recommended_steps = []
    
    # Check basic claim info
    if not claim_data.get("description"):
        score += 20
        factors.append("Missing accident description")
        missing_info.append("Accident description")
        
    # Check images
    if not images_data:
        score += 30
        factors.append("No vehicle damage images provided")
        missing_info.append("Damage images")
    else:
        # Check severity vs invoice
        severity = images_data[0].get("severity", "").lower()
        invoices = [d for d in docs_data if d.get("doc_type") == "INVOICE"]
        
        if severity == "low" and invoices:
            inv_fields = invoices[0].get("extracted_fields", {})
            amount = inv_fields.get("total_amount")
            try:
                if amount and float(amount) > 3000:
                    score += 40
                    factors.append(f"Invoice amount (${amount}) is unusually high for {severity} severity damage")
                    recommended_steps.append("Request human review of repair invoice")
            except ValueError:
                pass
                
    # Determine risk level
    if score >= 70:
        level = "High"
    elif score >= 40:
        level = "Medium"
    else:
        level = "Low"
        
    if not recommended_steps:
        recommended_steps.append("Proceed with standard claim processing")
        
    return {
        "risk_level": level,
        "risk_score": min(score, 100),
        "risk_factors": factors,
        "explanation": f"Calculated risk score is {min(score, 100)} out of 100 based on {len(factors)} identified factors.",
        "missing_information": missing_info,
        "recommended_steps": recommended_steps
    }
