import { describe, it, expect } from "vitest";
import {
  cpuUsagePct,
  parseCpuFreq,
  parseCpuTimes,
  parseFanRpm,
  parseLoadAvg,
  parseMemInfo,
  parseModel,
  parseTemp,
  parseUptime,
} from "./parsers.js";

describe("parseTemp", () => {
  it("converts millidegrees to °C with one decimal", () => {
    expect(parseTemp("48312\n")).toBe(48.3);
  });

  it("returns null for garbage", () => {
    expect(parseTemp("")).toBeNull();
  });
});

describe("parseLoadAvg", () => {
  it("returns the 1/5/15 minute averages", () => {
    expect(parseLoadAvg("0.12 0.08 0.05 1/234 5678\n")).toEqual([
      0.12, 0.08, 0.05,
    ]);
  });

  it("returns null for truncated input", () => {
    expect(parseLoadAvg("0.12")).toBeNull();
  });
});

describe("parseMemInfo", () => {
  const meminfo = [
    "MemTotal:        8245632 kB",
    "MemFree:         5000000 kB",
    "MemAvailable:    7000000 kB",
    "Buffers:           12345 kB",
  ].join("\n");

  it("computes used from MemTotal - MemAvailable in bytes", () => {
    expect(parseMemInfo(meminfo)).toEqual({
      usedBytes: (8245632 - 7000000) * 1024,
      totalBytes: 8245632 * 1024,
    });
  });

  it("returns null when MemAvailable is missing", () => {
    expect(parseMemInfo("MemTotal: 100 kB")).toBeNull();
  });
});

describe("parseUptime", () => {
  it("floors to whole seconds", () => {
    expect(parseUptime("12345.67 45678.90\n")).toBe(12345);
  });
});

describe("parseCpuTimes / cpuUsagePct", () => {
  const stat = (user, idle) =>
    [
      `cpu  ${user} 0 0 ${idle} 0 0 0 0 0 0`,
      "cpu0 1 0 0 1 0 0 0 0 0 0",
      "cpu1 1 0 0 1 0 0 0 0 0 0",
      "cpu2 1 0 0 1 0 0 0 0 0 0",
      "cpu3 1 0 0 1 0 0 0 0 0 0",
      "intr 12345",
    ].join("\n");

  it("parses idle, total and core count", () => {
    expect(parseCpuTimes(stat(100, 300))).toEqual({
      idle: 300,
      total: 400,
      cores: 4,
    });
  });

  it("computes busy % between two samples", () => {
    const prev = parseCpuTimes(stat(100, 300));
    const next = parseCpuTimes(stat(125, 375)); // +25 busy, +75 idle
    expect(cpuUsagePct(prev, next)).toBe(25);
  });

  it("returns null without a previous sample", () => {
    expect(cpuUsagePct(null, parseCpuTimes(stat(1, 1)))).toBeNull();
  });
});

describe("parseCpuFreq", () => {
  it("converts kHz to MHz", () => {
    expect(parseCpuFreq("2400000\n")).toBe(2400);
  });
});

describe("parseFanRpm", () => {
  it("parses RPM", () => {
    expect(parseFanRpm("2153\n")).toBe(2153);
  });
});

describe("parseModel", () => {
  it("strips the trailing NUL byte", () => {
    expect(parseModel("Raspberry Pi 5 Model B Rev 1.0\0")).toBe(
      "Raspberry Pi 5 Model B Rev 1.0",
    );
  });
});
