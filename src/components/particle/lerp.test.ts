import { describe, it, expect } from "vitest";
import { lerp } from "./lerp";

describe("lerp", () => {
  it("returns current when factor is 0", () => {
    expect(lerp(0, 10, 0)).toBe(0);
  });

  it("returns target when factor is 1", () => {
    expect(lerp(0, 10, 1)).toBe(10);
  });

  it("returns the midpoint when factor is 0.5", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });

  it("moves toward target from a nonzero starting point", () => {
    expect(lerp(4, 8, 0.5)).toBe(6);
  });
});
