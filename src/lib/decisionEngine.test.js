import { describe, it, expect } from "vitest";
import { analyseDonationLocally } from "@/lib/decisionEngine";
import { demoFood, ngos } from "@/data";

describe("decisionEngine", () => {
  it("returns deterministic scores for fixed demo data", () => {
    const result = analyseDonationLocally(demoFood, ngos);

    expect(result.urgency.score).toBe(78);
    expect(result.safety.score).toBe(70);
    expect(result.rankedNgos[0].name).toBe("Hope Kitchen");
    expect(result.rankedNgos[0].matchScore).toBe(100);
    expect(result.impact.score).toBe(90);
  });

  it("includes explainable breakdowns", () => {
    const result = analyseDonationLocally(demoFood, ngos);

    expect(result.urgency.breakdown.some((entry) => entry.ruleId === "urgency-2-6h")).toBe(true);
    expect(result.safety.breakdown.some((entry) => entry.ruleId === "safety-packaging-sealed")).toBe(true);
    expect(result.topMatches[0].breakdown.some((entry) => entry.ruleId === "match-reliability")).toBe(true);
    expect(result.impact.breakdown.some((entry) => entry.ruleId.startsWith("impact-"))).toBe(true);
  });

  it("triggers hard fail when high-risk food has missing storage", () => {
    const riskyFood = {
      ...demoFood,
      category: "Cooked meals",
      storageType: "",
      packaging: "Open trays",
    };

    const result = analyseDonationLocally(riskyFood, ngos);

    expect(result.safety.hardFail).toBe(true);
    expect(result.safety.score).toBe(0);
    expect(result.safety.handlingDecision).toBe("Manual review required");
    expect(result.safety.breakdown.some((entry) => entry.ruleId === "safety-hard-fail-storage")).toBe(true);
    expect(result.rankedNgos[0].matchScore).toBeLessThanOrEqual(20);
  });
});
