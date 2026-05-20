import { ngos as demoNgos, demoFood } from "@/data";

const ANALYSIS_TIME_HOUR = 16;
const toNum = (v, d = 0) => Number.isFinite(Number(v)) ? Number(v) : d;
const clampScore = (value) => Math.max(0, Math.min(100, Math.round(value)));

const URGENCY_RULES = [
  { ruleId: "urgency-expired", maxHours: 0, label: "Already expired or at deadline", points: 98, urgencyLabel: "Critical", explanation: "Food is at or beyond the expiry deadline and needs immediate intervention." },
  { ruleId: "urgency-0-2h", maxHours: 2, label: "Expires in 0-2 hours", points: 92, urgencyLabel: "Critical", explanation: "Very short shelf-life window, so pickup must happen now." },
  { ruleId: "urgency-2-6h", maxHours: 6, label: "Expires in 2-6 hours", points: 78, urgencyLabel: "High", explanation: "Urgent pickup window to prevent waste." },
  { ruleId: "urgency-6-24h", maxHours: 24, label: "Expires in 6-24 hours", points: 58, urgencyLabel: "Medium", explanation: "Moderate urgency with same-day planning needed." },
  { ruleId: "urgency-24h-plus", maxHours: Infinity, label: "More than 24 hours remaining", points: 34, urgencyLabel: "Low", explanation: "Low urgency because there is enough time left." },
];

const SAFETY_RULES = {
  sealedPackagingBonus: { ruleId: "safety-packaging-sealed", label: "Sealed packaging", points: 8, explanation: "Sealed packaging lowers contamination risk during handoff." },
  unsealedPackagingPenalty: { ruleId: "safety-packaging-unsealed", label: "Unsealed or unclear packaging", points: -15, explanation: "Unsealed packaging raises handling risk." },
  storageKnown: { ruleId: "safety-storage-known", label: "Storage type declared", points: 4, explanation: "Known storage requirements improve safe handling reliability." },
  storageMissing: { ruleId: "safety-storage-missing", label: "Storage type missing", points: -12, explanation: "Missing storage information creates food safety uncertainty." },
  cookedHandling: { ruleId: "safety-cooked-handling", label: "Cooked/perishable handling controls", points: -5, explanation: "Cooked/perishable food needs stricter controls and faster handoff." },
  urgencyBoost: { ruleId: "safety-urgent-timing", label: "Extra timing pressure", points: -7, explanation: "High urgency increases spoilage risk if pickup slips." },
  hardFailStorage: { ruleId: "safety-hard-fail-storage", label: "Hard fail: high-risk food without required storage", points: -100, explanation: "High-risk cooked/perishable food missing storage requirement cannot be auto-approved." },
};

const MATCH_RULES = {
  reliability: { ruleId: "match-reliability", label: "NGO reliability baseline", explanation: "Reliability score is used as the base confidence signal." },
  closeDistance: { ruleId: "match-distance-close", label: "Distance <= 4 km", points: 8, explanation: "Close distance supports faster pickup." },
  farUrgentPenalty: { ruleId: "match-distance-urgent-penalty", label: "Distance > 5 km during urgency", points: -8, explanation: "Longer distance during urgent windows increases delivery risk." },
  capacityFit: { ruleId: "match-capacity-fit", label: "Capacity fits quantity", points: 6, explanation: "NGO can handle the full donation volume." },
  cookedKitchenSupport: { ruleId: "match-cooked-kitchen", label: "Hot kitchen capability", points: 7, explanation: "Hot kitchen support improves cooked-food readiness." },
  cookedNotAccepted: { ruleId: "match-cooked-not-accepted", label: "Does not accept cooked food", points: -25, explanation: "Cannot accept this donation type safely." },
};

const IMPACT_RULES = {
  mealCoverageHigh: { ruleId: "impact-meals-high", label: "Meals enabled: high coverage", points: 38, explanation: "Selected NGO can serve most or all of the donation quickly." },
  mealCoverageMedium: { ruleId: "impact-meals-medium", label: "Meals enabled: medium coverage", points: 26, explanation: "Selected NGO can serve a meaningful portion of the donation." },
  mealCoverageLow: { ruleId: "impact-meals-low", label: "Meals enabled: low coverage", points: 14, explanation: "Limited direct meal impact from this match." },
  fastHandoff: { ruleId: "impact-speed-fast", label: "Fast handoff path", points: 24, explanation: "Close and reliable partner increases handoff speed." },
  moderateHandoff: { ruleId: "impact-speed-moderate", label: "Moderate handoff path", points: 14, explanation: "Handoff speed is acceptable but not optimal." },
  slowHandoff: { ruleId: "impact-speed-slow", label: "Slow handoff path", points: 6, explanation: "Longer route or weaker readiness may slow pickup." },
  wasteProxyHigh: { ruleId: "impact-waste-high", label: "Waste/CO2 benefit proxy: high", points: 28, explanation: "Saving urgent food from waste implies high avoided waste and emissions." },
  wasteProxyMedium: { ruleId: "impact-waste-medium", label: "Waste/CO2 benefit proxy: medium", points: 18, explanation: "Moderate urgency still provides meaningful waste prevention." },
  wasteProxyLow: { ruleId: "impact-waste-low", label: "Waste/CO2 benefit proxy: low", points: 10, explanation: "Lower urgency means lower immediate waste avoidance impact." },
};

function hoursUntilExpiry(food) {
  const day = food.expiryDate === "Tomorrow" ? 24 : food.expiryDate === "2 days" ? 48 : 0;
  const [h] = String(food.expiryTime || "19:00").split(":").map(Number);
  return day + (h - ANALYSIS_TIME_HOUR);
}

function scoreUrgency(food) {
  const hours = hoursUntilExpiry(food);
  const selected = URGENCY_RULES.find((rule) => hours <= rule.maxHours) || URGENCY_RULES[URGENCY_RULES.length - 1];
  return {
    label: selected.urgencyLabel,
    score: clampScore(selected.points),
    hoursUntilExpiry: hours,
    explanation: `Expires in ${hours} hours, so direct pickup is needed.`,
    breakdown: [{ ruleId: selected.ruleId, label: selected.label, points: selected.points, explanation: selected.explanation }],
  };
}

function scoreSafety(food, urgency) {
  const cooked = /cooked|hot|perishable/i.test(`${food.category} ${food.storageType}`);
  const breakdown = [];
  const conditions = [];
  let total = 70;
  let hardFail = false;

  if (/sealed/i.test(food.packaging || "")) {
    total += SAFETY_RULES.sealedPackagingBonus.points;
    breakdown.push(SAFETY_RULES.sealedPackagingBonus);
    conditions.push("Keep sealed");
  } else {
    total += SAFETY_RULES.unsealedPackagingPenalty.points;
    breakdown.push(SAFETY_RULES.unsealedPackagingPenalty);
  }

  if (!food.storageType) {
    total += SAFETY_RULES.storageMissing.points;
    breakdown.push(SAFETY_RULES.storageMissing);
  } else {
    total += SAFETY_RULES.storageKnown.points;
    breakdown.push(SAFETY_RULES.storageKnown);
  }

  if (cooked) {
    total += SAFETY_RULES.cookedHandling.points;
    breakdown.push(SAFETY_RULES.cookedHandling);
    conditions.push("Deliver directly to kitchen", "Serve within 2 hours of delivery");
  }

  if (urgency.score >= 78) {
    total += SAFETY_RULES.urgencyBoost.points;
    breakdown.push(SAFETY_RULES.urgencyBoost);
  }

  if (food.allergens && food.allergens !== "None declared") {
    conditions.push("Recipient must display allergen notice.");
  }

  if (cooked && !food.storageType) {
    hardFail = true;
    total = 0;
    breakdown.push(SAFETY_RULES.hardFailStorage);
  }

  const score = clampScore(total);
  return {
    label: hardFail ? "High risk" : cooked ? "Medium" : "Low",
    score,
    hardFail,
    handlingDecision: hardFail ? "Manual review required" : urgency.hoursUntilExpiry < 1 ? "Manual review required" : cooked ? "Approved with conditions" : "Approved",
    conditions: hardFail
      ? ["Manual food safety inspection required before any dispatch"]
      : urgency.hoursUntilExpiry < 1
        ? ["Manual food safety inspection required"]
        : (conditions.length ? conditions : ["Standard handling applies"]),
    explanation: hardFail
      ? "High-risk food is missing required storage details, so automatic safety approval is blocked."
      : cooked
        ? "Cooked hot-counter food is usable, but the short expiry window needs strict handling."
        : "Food can be donated with normal handling.",
    breakdown,
  };
}

function scoreMatch(food, ngo, urgency, safety) {
  const cooked = /cooked|hot|perishable/i.test(`${food.category} ${food.storageType}`);
  const breakdown = [];
  const reasons = [];
  const concerns = [];
  let score = toNum(ngo.reliabilityScore, 50);

  breakdown.push({ ...MATCH_RULES.reliability, points: toNum(ngo.reliabilityScore, 50), explanation: `${MATCH_RULES.reliability.explanation} (${toNum(ngo.reliabilityScore, 50)} baseline points).` });

  if (ngo.distanceKm <= 4) {
    score += MATCH_RULES.closeDistance.points;
    breakdown.push(MATCH_RULES.closeDistance);
    reasons.push("Closest verified NGO");
  }

  if (toNum(ngo.mealCapacity) >= toNum(food.quantity)) {
    score += MATCH_RULES.capacityFit.points;
    breakdown.push(MATCH_RULES.capacityFit);
    reasons.push("Has enough meal capacity");
  }

  if (cooked && ngo.hasHotKitchen) {
    score += MATCH_RULES.cookedKitchenSupport.points;
    breakdown.push(MATCH_RULES.cookedKitchenSupport);
    reasons.push("Has hot kitchen capacity");
  }

  if (cooked && !ngo.acceptsCookedFood) {
    score += MATCH_RULES.cookedNotAccepted.points;
    breakdown.push(MATCH_RULES.cookedNotAccepted);
    concerns.push("Cannot accept cooked food");
  }

  if (urgency.label !== "Low" && ngo.distanceKm > 5) {
    score += MATCH_RULES.farUrgentPenalty.points;
    breakdown.push(MATCH_RULES.farUrgentPenalty);
    concerns.push("Further away for urgent pickup");
  }

  if (safety.hardFail) {
    score = Math.min(score, 20);
    concerns.push("Safety hard fail requires manual override before assignment");
  }

  if (ngo.note) reasons.push(ngo.note);

  const matchScore = clampScore(score);
  return {
    id: ngo.id,
    name: ngo.name,
    matchScore,
    fitLabel: matchScore >= 90 ? "Excellent fit" : matchScore >= 75 ? "Good fit" : "Moderate fit",
    reasons: reasons.slice(0, 4),
    concerns,
    breakdown,
  };
}

function scoreImpact(food, ngo, urgency, safety) {
  const breakdown = [];
  let total = 0;
  const qty = toNum(food.quantity);
  const cap = toNum(ngo.mealCapacity);

  const coverage = qty > 0 ? cap / qty : 0;
  if (coverage >= 1) {
    total += IMPACT_RULES.mealCoverageHigh.points;
    breakdown.push(IMPACT_RULES.mealCoverageHigh);
  } else if (coverage >= 0.6) {
    total += IMPACT_RULES.mealCoverageMedium.points;
    breakdown.push(IMPACT_RULES.mealCoverageMedium);
  } else {
    total += IMPACT_RULES.mealCoverageLow.points;
    breakdown.push(IMPACT_RULES.mealCoverageLow);
  }

  if (ngo.distanceKm <= 4 && toNum(ngo.reliabilityScore) >= 80) {
    total += IMPACT_RULES.fastHandoff.points;
    breakdown.push(IMPACT_RULES.fastHandoff);
  } else if (ngo.distanceKm <= 7) {
    total += IMPACT_RULES.moderateHandoff.points;
    breakdown.push(IMPACT_RULES.moderateHandoff);
  } else {
    total += IMPACT_RULES.slowHandoff.points;
    breakdown.push(IMPACT_RULES.slowHandoff);
  }

  if (urgency.score >= 78 || safety.hardFail) {
    total += IMPACT_RULES.wasteProxyHigh.points;
    breakdown.push(IMPACT_RULES.wasteProxyHigh);
  } else if (urgency.score >= 58) {
    total += IMPACT_RULES.wasteProxyMedium.points;
    breakdown.push(IMPACT_RULES.wasteProxyMedium);
  } else {
    total += IMPACT_RULES.wasteProxyLow.points;
    breakdown.push(IMPACT_RULES.wasteProxyLow);
  }

  const score = clampScore(total);
  const label = score >= 80 ? "High" : score >= 55 ? "Medium" : "Low";
  return {
    label,
    score,
    explanation: "Impact combines meal coverage, handoff speed, and waste/CO2 benefit proxy.",
    breakdown,
  };
}

export function analyseDonationLocally(foodInput = demoFood, ngosInput = demoNgos) {
  const food = { ...demoFood, ...foodInput };
  const ngos = ngosInput?.length ? ngosInput : demoNgos;
  const urgency = scoreUrgency(food);
  const safety = scoreSafety(food, urgency);

  const rankedNgos = ngos
    .map((ngo) => scoreMatch(food, ngo, urgency, safety))
    .sort((a, b) => b.matchScore - a.matchScore)
    .map((ngo, i) => ({ ...ngo, rank: i + 1, recommended: i === 0 }));

  const top = rankedNgos[0];
  const impact = scoreImpact(food, top, urgency, safety);

  return {
    analysisId: "demo-analysis-001",
    source: "local-js-fallback",
    analysisTime: "Today 16:00",
    foodSummary: { name: food.name, quantity: `${food.quantity} ${food.unit}`, branch: food.branch, expiry: `${food.expiryDate} ${food.expiryTime}`, pickupWindow: food.pickupWindow },
    urgency,
    safety,
    impact,
    topMatches: rankedNgos.slice(0, 3).map(({ id, name, matchScore, rank, recommended, fitLabel, reasons, concerns, breakdown }) => ({ id, name, matchScore, rank, recommended, fitLabel, reasons, concerns, breakdown })),
    rankedNgos,
    recommendedNgo: { id: top.id, name: top.name, matchScore: top.matchScore, summary: `${top.name} is the best match because it is close, reliable and ready to serve cooked food tonight.` },
    decisionTrace: ["Input Agent", "Freshness Agent", "Safety Agent", "Matching Agent", "Decision Engine", "Human Review"].map((agent, i) => ({ agent, status: agent === "Human Review" ? "waiting" : "complete", message: agent === "Human Review" ? "Recommendation requires human confirmation before delivery." : `${agent} complete.`, durationMs: i === 5 ? 0 : 200 + i * 50 })),
    terminalReplay: [
      { text: "Food Bridge local fallback decision worker starting...", delayMs: 120, kind: "line" },
      { text: "Freshness Agent analysing expiry window... |", delayMs: 100, kind: "spinner" },
      { text: "Safety Agent checking storage, packaging and allergen flags...", delayMs: 140, kind: "dot" },
      { text: `Decision Engine selected ${top.name}.`, delayMs: 120, kind: "line" },
      { text: "Human Review awaiting confirmation.", delayMs: 120, kind: "line" },
    ],
    humanConfirmationRequired: true,
  };
}

export { scoreUrgency, scoreSafety, scoreMatch, scoreImpact };
