from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta
import time

from thinking_strings import build_terminal_replay

ANALYSIS_TIME = datetime(2026, 5, 19, 16, 0)


def _parse_expiry(food):
    expiry_date = str(food.get("expiryDate", "Today"))
    day_offset = 0 if expiry_date == "Today" else 1 if expiry_date == "Tomorrow" else 2
    expiry_time = str(food.get("expiryTime", "19:00"))
    hour, minute = [int(x) for x in expiry_time.split(":")]
    expiry_dt = ANALYSIS_TIME.replace(hour=hour, minute=minute) + timedelta(days=day_offset)
    return expiry_dt


def calculate_urgency(food):
    hours = round((_parse_expiry(food) - ANALYSIS_TIME).total_seconds() / 3600)
    if hours <= 2:
        return {"label": "Critical", "score": 92, "hoursUntilExpiry": hours, "explanation": f"Expires in {hours} hours, immediate pickup required."}
    if hours <= 6:
        return {"label": "High", "score": 78, "hoursUntilExpiry": hours, "explanation": f"Expires in {hours} hours, so direct pickup is needed."}
    if hours <= 24:
        return {"label": "Medium", "score": 58, "hoursUntilExpiry": hours, "explanation": f"Expires in {hours} hours, schedule pickup soon."}
    return {"label": "Low", "score": 34, "hoursUntilExpiry": hours, "explanation": f"Expires in {hours} hours, normal coordination is acceptable."}


def calculate_safety_risk(food):
    category = str(food.get("category", "")).lower()
    storage = str(food.get("storageType", "")).lower()
    packaging = str(food.get("packaging", "")).lower()
    allergens = str(food.get("allergens", "")).lower()
    hours = calculate_urgency(food)["hoursUntilExpiry"]
    score = 70
    conditions = []
    if "sealed" in packaging:
        score += 8
        conditions.append("Keep sealed")
    else:
        score -= 15
    if not storage:
        score -= 12
    is_cooked = "cooked" in category or "hot" in storage
    if is_cooked and hours <= 6:
        conditions.extend(["Deliver directly to kitchen", "Serve within 2 hours of delivery"])
    if allergens and allergens != "none declared":
        conditions.append("Recipient must display allergen notice.")
    if hours < 1:
        return {"label": "High", "score": 35, "handlingDecision": "Manual review required", "conditions": ["Manual food safety inspection required"], "explanation": "Less than 1 hour remains before expiry, manual review required."}
    decision = "Approved with conditions" if is_cooked else "Approved"
    return {"label": "Medium" if decision == "Approved with conditions" else "Low", "score": max(0, min(100, score)), "handlingDecision": decision, "conditions": conditions or ["Standard handling applies"], "explanation": "Cooked hot-counter food is usable, but the short expiry window needs strict handling." if is_cooked else "Food can be donated with normal handling."}


def calculate_ngo_match(food, ngo, urgency_result, safety_result):
    score = int(ngo.get("reliabilityScore", 50))
    reasons, concerns = [], []
    dist = float(ngo.get("distanceKm", 99))
    qty = int(food.get("quantity", 0))
    if dist <= 4:
        score += 8; reasons.append("Closest verified NGO")
    elif dist > 7:
        score -= 8; concerns.append("Longer distance")
    if int(ngo.get("mealCapacity", 0)) >= qty:
        score += 6; reasons.append("Has enough meal capacity")
    cooked = "cooked" in str(food.get("category", "")).lower() or "hot" in str(food.get("storageType", "")).lower()
    if cooked and ngo.get("hasHotKitchen"):
        score += 7; reasons.append("Has hot kitchen capacity")
    if cooked and not ngo.get("acceptsCookedFood", False):
        score -= 25; concerns.append("Cannot accept cooked food")
    if safety_result["label"] == "High":
        score -= 8
    if urgency_result["label"] in {"Critical", "High"} and dist > 5:
        score -= 8; concerns.append("Further away for urgent pickup")
    if ngo.get("note"):
        reasons.append(str(ngo["note"]))
    score = max(0, min(100, score))
    return {"id": ngo["id"], "name": ngo["name"], "matchScore": score, "fitLabel": "Excellent fit" if score >= 90 else "Good fit" if score >= 75 else "Moderate fit", "reasons": reasons[:4], "concerns": concerns}


def rank_ngos_for_donation(food, ngos):
    urgency = calculate_urgency(food)
    safety = calculate_safety_risk(food)
    ranked = [calculate_ngo_match(food, ngo, urgency, safety) for ngo in ngos]
    ranked.sort(key=lambda x: x["matchScore"], reverse=True)
    for idx, ngo in enumerate(ranked, 1):
        ngo["rank"] = idx
        ngo["recommended"] = idx == 1
    return ranked


def analyse_donation(food, ngos):
    # CPython’s GIL prevents CPU-heavy Python bytecode from running in true parallel threads, but threads still help with I/O-style waiting. This prototype uses threads to emulate separate AI agents waiting on separate tool calls. In plain terms, it waits faster, not thinks faster.
    def freshness(): time.sleep(0.22); return calculate_urgency(food)
    def safety(): time.sleep(0.28); return calculate_safety_risk(food)
    def matching(): time.sleep(0.35); return rank_ngos_for_donation(food, ngos)
    with ThreadPoolExecutor(max_workers=3) as pool:
        urgency = pool.submit(freshness).result()
        safety_result = pool.submit(safety).result()
        ranked = pool.submit(matching).result()
    top = ranked[0]
    return {
      "analysisId": "demo-analysis-001",
      "source": "python-backend",
      "analysisTime": "Today 16:00",
      "foodSummary": {"name": food.get("name"), "quantity": f"{food.get('quantity')} {food.get('unit','')}", "branch": food.get("branch"), "expiry": f"{food.get('expiryDate')} {food.get('expiryTime')}", "pickupWindow": food.get("pickupWindow")},
      "urgency": urgency,
      "safety": safety_result,
      "rankedNgos": ranked,
      "recommendedNgo": {"id": top["id"], "name": top["name"], "matchScore": top["matchScore"], "summary": f"{top['name']} is the best match because it is close, reliable and ready to serve cooked food tonight."},
      "decisionTrace": [
        {"agent": "Input Agent", "status": "complete", "message": "Food details received from the supermarket form.", "durationMs": 180},
        {"agent": "Freshness Agent", "status": "complete", "message": f"Expiry window calculated. Urgency is {urgency['label']}.", "durationMs": 420},
        {"agent": "Safety Agent", "status": "complete", "message": f"{safety_result['handlingDecision']} for this food item.", "durationMs": 360},
        {"agent": "Matching Agent", "status": "complete", "message": "NGOs ranked by distance, capacity, reliability and kitchen fit.", "durationMs": 510},
        {"agent": "Decision Engine", "status": "complete", "message": f"{top['name']} selected as the strongest match.", "durationMs": 120},
        {"agent": "Human Review", "status": "waiting", "message": "Recommendation requires human confirmation before delivery.", "durationMs": 0},
      ],
      "terminalReplay": build_terminal_replay(food.get("name", "Food item"), top["name"]),
      "humanConfirmationRequired": True,
    }
