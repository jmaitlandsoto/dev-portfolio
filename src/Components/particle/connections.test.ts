import { describe, it, expect } from "vitest";
import { findConnections } from "./connections";

describe("findConnections", () => {
  it("connects two points within the threshold", () => {
    const positions = new Float32Array([0, 0, 0, 1, 0, 0]);
    const result = findConnections(positions, 2, 1.5);
    expect(Array.from(result)).toEqual([0, 0, 0, 1, 0, 0]);
  });

  it("does not connect points beyond the threshold", () => {
    const positions = new Float32Array([0, 0, 0, 10, 0, 0]);
    const result = findConnections(positions, 2, 1.5);
    expect(result.length).toBe(0);
  });

  it("connects each close pair independently among three points", () => {
    const positions = new Float32Array([
      0, 0, 0,
      1, 0, 0,
      10, 10, 0,
    ]);
    const result = findConnections(positions, 3, 1.5);
    expect(Array.from(result)).toEqual([0, 0, 0, 1, 0, 0]);
  });

  it("measures proximity in the x/y plane only, ignoring depth", () => {
    const positions = new Float32Array([0, 0, 0, 0, 0, 5]);
    const result = findConnections(positions, 2, 1.5);
    expect(Array.from(result)).toEqual([0, 0, 0, 0, 0, 5]);
  });
});
