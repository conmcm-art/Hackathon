import { describe, it, expect } from "vitest";
import accessibilityConfig from "../../src/accessibility/accessibility.config";

describe("accessibility baseline", () => {
  it("targets WCAG 2.2 AA", () => {
    expect(accessibilityConfig.wcagTarget).toBe("WCAG 2.2 AA");
  });
});
