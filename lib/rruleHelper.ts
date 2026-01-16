type RRule = Record<string, string>;

const DAY_NAMES: Record<string, string> = {
  MO: "Monday",
  TU: "Tuesday",
  WE: "Wednesday",
  TH: "Thursday",
  FR: "Friday",
  SA: "Saturday",
  SU: "Sunday",
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function ordinal(n: number): string {
  const abs = Math.abs(n);
  const suffix = abs % 100 >= 11 && abs % 100 <= 13 ? "th" : (["th", "st", "nd", "rd"][abs % 10] ?? "th");
  return `${n}${suffix}`;
}

function parseRRule(rrule: string): RRule {
  return rrule
    .split(";")
    .map((kv) => kv.trim())
    .filter(Boolean)
    .reduce<RRule>((acc, part) => {
      const [k, v] = part.split("=");
      if (k && v) acc[k.toUpperCase()] = v;
      return acc;
    }, {});
}

function listJoin(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function describeFreq(freq?: string, intervalStr?: string): string {
  const interval = Math.max(1, Number(intervalStr || "1"));
  const map: Record<string, [singular: string, plural: string]> = {
    DAILY: ["daily", `every ${interval} days`],
    WEEKLY: ["weekly", `every ${interval} weeks`],
    MONTHLY: ["monthly", `every ${interval} months`],
    YEARLY: ["yearly", `every ${interval} years`],
    HOURLY: ["hourly", `every ${interval} hours`],
    MINUTELY: ["minutely", `every ${interval} minutes`],
    SECONDLY: ["every second", `every ${interval} seconds`],
  };
  const entry = map[(freq || "").toUpperCase()];
  if (!entry) return "on a schedule";
  return interval === 1 ? entry[0] : entry[1];
}

function describeByDay(byday: string, includeOrdinals = true): string {
  // Supports tokens like MO, TU, 1MO, -1FR
  const tokens = byday.split(",").filter(Boolean);
  const parts = tokens.map((tok) => {
    const m = tok.match(/^(-?\d+)?(MO|TU|WE|TH|FR|SA|SU)$/i);
    if (!m) return tok;
    const [, nthStr, dayCodeRaw] = m;
    const dayCode = dayCodeRaw.toUpperCase();
    const dayName = DAY_NAMES[dayCode] ?? dayCode;
    if (!nthStr || !includeOrdinals) return `${dayName}s`;
    const nth = Number(nthStr);
    if (nth === -1) return `the last ${dayName}`;
    return `the ${ordinal(nth)} ${dayName}`;
  });
  return listJoin(parts);
}

function describeByMonthDay(bymonthday: string): string {
  const nums = bymonthday
    .split(",")
    .map((s) => Number(s))
    .filter((n) => !Number.isNaN(n));
  const parts = nums.map((n) => ordinal(n));
  return listJoin(parts);
}

function describeByMonth(bymonth: string): string {
  const nums = bymonth
    .split(",")
    .map((s) => Number(s))
    .filter((n) => n >= 1 && n <= 12);
  const parts = nums.map((n) => MONTH_NAMES[n - 1]);
  return listJoin(parts);
}

export function rruleToText(rrule: string): string {
  const r = parseRRule(rrule);

  const freqText = describeFreq(r.FREQ, r.INTERVAL);
  const pieces: string[] = [`Recurring ${freqText}`];

  // Weekly patterns: BYDAY list (MO,TU,...) or nth weekdays (1MO, -1FR)
  if (r.BYDAY) {
    const byDayText = describeByDay(r.BYDAY, /*includeOrdinals*/ r.FREQ !== "WEEKLY");
    // For weekly, prefer plurals ("Mondays"); for monthly/yearly, ordinals like "the first Monday"
    const prefix = r.FREQ === "WEEKLY" ? "on " : "on ";
    pieces.push(`${prefix}${byDayText}`);
  }

  // Monthly “on day 15” (BYMONTHDAY)
  if (r.BYMONTHDAY) {
    pieces.push(`on the ${describeByMonthDay(r.BYMONTHDAY)}`);
  }

  // Yearly “in June” or “in March and September”
  if (r.BYMONTH) {
    const months = describeByMonth(r.BYMONTH);
    pieces.push(`in ${months}`);
  }

  // End conditions
  if (r.COUNT) {
    pieces.push(`for ${Number(r.COUNT)} occurrence${Number(r.COUNT) === 1 ? "" : "s"}`);
  }

  // Tidy up spacing
  let text = pieces.join(" ").replace(/\s+/g, " ").trim();

  // Small polish: “on the last Monday” (already correct), but ensure capitalization
  // Example: “Recurring weekly on Tuesdays and Thursdays”
  return text;
}
