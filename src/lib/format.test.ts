import { describe, it, expect } from "vitest";
import { formatBytes, formatUptime, timeAgo } from "./format";

describe("formatUptime", () => {
  it("formats under a day without the day part", () => {
    expect(formatUptime(3 * 3600 + 5 * 60 + 7)).toBe("3h 05m 07s");
  });

  it("includes days when over a day", () => {
    expect(formatUptime(12 * 86400 + 4 * 3600 + 53 * 60 + 7)).toBe(
      "12d 4h 53m 07s",
    );
  });

  it("clamps negatives to zero", () => {
    expect(formatUptime(-5)).toBe("0h 00m 00s");
  });
});

describe("formatBytes", () => {
  it("uses MB under a gigabyte", () => {
    expect(formatBytes(812 * 1024 ** 2)).toBe("812 MB");
  });

  it("uses GB with one decimal", () => {
    expect(formatBytes(7.94 * 1024 ** 3)).toBe("7.9 GB");
  });
});

describe("timeAgo", () => {
  const now = Date.parse("2026-09-28T12:00:00Z");

  it("says just now under a minute", () => {
    expect(timeAgo("2026-09-28T11:59:30Z", now)).toBe("just now");
  });

  it("uses minutes, hours and days", () => {
    expect(timeAgo("2026-09-28T11:55:00Z", now)).toBe("5m ago");
    expect(timeAgo("2026-09-28T09:00:00Z", now)).toBe("3h ago");
    expect(timeAgo("2026-09-26T12:00:00Z", now)).toBe("2d ago");
  });

  it("returns empty string for invalid dates", () => {
    expect(timeAgo("nope", now)).toBe("");
  });
});
