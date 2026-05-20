import unittest
from decision_worker import analyse_donation

FOOD = {
  "name": "Roast Chicken Portions", "category": "Cooked Food", "quantity": 24, "unit": "portions", "expiryDate": "Today", "expiryTime": "19:00", "storageType": "Hot Counter", "packaging": "Sealed trays", "allergens": "None declared", "pickupWindow": "16:30–17:30", "branch": "Checkers Pietermaritzburg"
}
NGOS = [
  {"id":"ngo_001","name":"Hope Kitchen","distanceKm":3.2,"mealCapacity":120,"hasRefrigeration":True,"hasHotKitchen":True,"acceptsCookedFood":True,"reliabilityScore":96,"note":"Open for supper service tonight"},
  {"id":"ngo_002","name":"Ubuntu Meals Project","distanceKm":5.4,"mealCapacity":180,"hasRefrigeration":True,"hasHotKitchen":False,"acceptsCookedFood":True,"reliabilityScore":88,"note":"Strong capacity but further away"},
]

class TestDecisionWorker(unittest.TestCase):
  def test_analysis_shape(self):
    r = analyse_donation(FOOD, NGOS)
    for key in ["urgency","safety","rankedNgos","recommendedNgo","decisionTrace","terminalReplay"]: self.assertIn(key, r)
    self.assertEqual(r["urgency"]["label"], "High")
    self.assertEqual(r["safety"]["handlingDecision"], "Approved with conditions")
    self.assertEqual(r["recommendedNgo"]["name"], "Hope Kitchen")
    self.assertTrue(all(r["rankedNgos"][i]["matchScore"] >= r["rankedNgos"][i+1]["matchScore"] for i in range(len(r["rankedNgos"])-1)))
    agents = [x["agent"] for x in r["decisionTrace"]]
    for a in ["Freshness Agent","Safety Agent","Matching Agent","Decision Engine","Human Review"]: self.assertIn(a, agents)
    self.assertTrue(any(x["kind"] in ["spinner","dot"] for x in r["terminalReplay"]))

if __name__ == '__main__':
  unittest.main()
