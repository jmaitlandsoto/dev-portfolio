import { describe, it, expect } from "vitest";
import { createHistory } from "./history.js";

describe("createHistory", () => {
  it("keeps only the newest points up to capacity", () => {
    const history = createHistory(2);
    history.push(1, 10);
    history.push(2, 20);
    history.push(3, 30);
    expect(history.toArray()).toEqual([
      [2, 20],
      [3, 30],
    ]);
  });

  it("ignores null values", () => {
    const history = createHistory(5);
    history.push(1, null);
    expect(history.toArray()).toEqual([]);
  });
});
