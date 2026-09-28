import { describe, it, expect } from "vitest";
import { sparklinePath } from "./sparklinePath";

describe("sparklinePath", () => {
  it("returns empty for fewer than two points", () => {
    expect(sparklinePath([], 100, 20)).toBe("");
    expect(sparklinePath([42], 100, 20)).toBe("");
  });

  it("maps min to the bottom and max to the top within padding", () => {
    expect(sparklinePath([40, 50], 100, 20, 2)).toBe("M0,18 L100,2");
  });

  it("spreads points evenly across the width", () => {
    expect(sparklinePath([1, 2, 3], 100, 20, 0)).toBe("M0,20 L50,10 L100,0");
  });

  it("draws a flat series through the middle", () => {
    expect(sparklinePath([5, 5], 100, 20)).toBe("M0,10 L100,10");
  });
});
