import { describe, it, expect } from "vitest";
import { ariaLabels } from "../../src/accessibility/ariaLabels";

describe("keyboard controls", () => {
  it("defines skip-link label", () => {
    expect(ariaLabels.skipToMain).toContain("Skip");
  });
});
