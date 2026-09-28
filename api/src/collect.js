import { readFile, readdir } from "node:fs/promises";
import {
  parseCpuFreq,
  parseCpuTimes,
  parseFanRpm,
  parseLoadAvg,
  parseMemInfo,
  parseModel,
  parseTemp,
  parseUptime,
} from "./parsers.js";

const PATHS = {
  temp: "/sys/class/thermal/thermal_zone0/temp",
  loadavg: "/proc/loadavg",
  meminfo: "/proc/meminfo",
  uptime: "/proc/uptime",
  stat: "/proc/stat",
  freq: "/sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq",
  fanHwmon: "/sys/devices/platform/cooling_fan/hwmon",
  // Docker masks /sys/firmware, so compose bind-mounts the model file here.
  model: process.env.BOARD_MODEL_PATH ?? "/host/model",
};

// Any missing/unreadable file (e.g. no fan, not a Pi) becomes null.
async function read(path, parse) {
  try {
    return parse(await readFile(path, "utf8"));
  } catch {
    return null;
  }
}

async function readFanRpm() {
  try {
    const [hwmon] = await readdir(PATHS.fanHwmon);
    if (!hwmon) return null;
    return read(`${PATHS.fanHwmon}/${hwmon}/fan1_input`, parseFanRpm);
  } catch {
    return null;
  }
}

export async function readBoardModel() {
  return read(PATHS.model, parseModel);
}

/** Reads one raw sample. CPU usage needs two samples, so the caller diffs cpuTimes. */
export async function collect() {
  const [tempC, loadAvg, memory, uptimeSec, cpuTimes, freqMhz, fanRpm] =
    await Promise.all([
      read(PATHS.temp, parseTemp),
      read(PATHS.loadavg, parseLoadAvg),
      read(PATHS.meminfo, parseMemInfo),
      read(PATHS.uptime, parseUptime),
      read(PATHS.stat, parseCpuTimes),
      read(PATHS.freq, parseCpuFreq),
      readFanRpm(),
    ]);
  return { tempC, loadAvg, memory, uptimeSec, cpuTimes, freqMhz, fanRpm };
}
