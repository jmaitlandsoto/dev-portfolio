import { describe, it, expect, vi, afterEach } from "vitest";
import { prefersReducedMotion, isCoarsePointer } from "./capabilities";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("prefersReducedMotion", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when the media query matches", () => {
    mockMatchMedia(true);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("returns false when the media query does not match", () => {
    mockMatchMedia(false);
    expect(prefersReducedMotion()).toBe(false);
  });
});

describe("isCoarsePointer", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when hover is unavailable", () => {
    mockMatchMedia(true);
    expect(isCoarsePointer()).toBe(true);
  });

  it("returns false when hover is available", () => {
    mockMatchMedia(false);
    expect(isCoarsePointer()).toBe(false);
  });
});
