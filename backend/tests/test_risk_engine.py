from app.services.risk_engine import calculate_risk_score

def test_risk_score_missing_desc():
    res = calculate_risk_score({}, [], [])
    assert "Missing accident description" in res["risk_factors"]
    assert res["risk_score"] >= 20

def test_risk_score_high_amount():
    images = [{"severity": "low"}]
    docs = [{"doc_type": "INVOICE", "extracted_fields": {"total_amount": 3500}}]
    res = calculate_risk_score({"description": "Test"}, images, docs)
    assert res["risk_level"] in ["Medium", "High"]
    assert any("unusually high" in factor for factor in res["risk_factors"])
