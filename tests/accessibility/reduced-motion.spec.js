import { describe, it, expect } from "vitest";
import { prefersReducedMotion } from "../../src/accessibility/reducedMotion";

describe("reduced motion helper", () => {
  it("returns a boolean", () => {
    expect(typeof prefersReducedMotion()).toBe("boolean");
  });
});
