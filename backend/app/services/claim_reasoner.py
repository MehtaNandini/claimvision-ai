def generate_claim_summary(claim_data: dict, images_data: list, docs_data: list) -> str:
    """
    Combines all data points to generate a coherent summary of the claim.
    """
    # Mock implementation
    summary = f"Claim for {claim_data.get('vehicle_brand', 'Unknown')} {claim_data.get('vehicle_model', 'Unknown')}. "
    
    if images_data:
        summary += f"Visual inspection indicates {images_data[0]['severity'].lower()} severity damage to {', '.join(images_data[0]['damaged_parts'])}. "
        
    invoices = [d for d in docs_data if d.get('doc_type') == 'INVOICE']
    if invoices:
        fields = invoices[0].get('extracted_fields', {})
        amount = fields.get('total_amount', 'unknown amount')
        summary += f"Repair invoice submitted for {amount}."
        
    return summary
