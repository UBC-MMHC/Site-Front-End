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

// Map JS day index (0=Sun, 1=Mon, ...) to RRULE day code
const DAY_CODES = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

function getDayCodeFromDate(date: Date): string {
	return DAY_CODES[date.getDay()];
}

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
	const suffix =
		abs % 100 >= 11 && abs % 100 <= 13 ? "th" : (["th", "st", "nd", "rd"][abs % 10] ?? "th");
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

export function rruleToText(rrule: string, startDate?: Date): string {
	const r = parseRRule(rrule);
	const freq = (r.FREQ || "").toUpperCase();

	const freqText = describeFreq(r.FREQ, r.INTERVAL);
	const pieces: string[] = [`Recurring ${freqText}`];

	// For weekly events, always show the day (from BYDAY or inferred from startDate)
	if (freq === "WEEKLY") {
		let dayCode = r.BYDAY;
		if (!dayCode && startDate) {
			dayCode = getDayCodeFromDate(startDate);
		}
		if (dayCode) {
			const byDayText = describeByDay(dayCode, false);
			pieces.push(`on ${byDayText}`);
		}
	} else if (r.BYDAY) {
		// Monthly/yearly with BYDAY (e.g., "the 1st Monday")
		const byDayText = describeByDay(r.BYDAY, true);
		pieces.push(`on ${byDayText}`);
	}

	// Monthly "on day 15" (BYMONTHDAY)
	if (r.BYMONTHDAY) {
		pieces.push(`on the ${describeByMonthDay(r.BYMONTHDAY)}`);
	}

	// Yearly "in June" or "in March and September"
	if (r.BYMONTH) {
		const months = describeByMonth(r.BYMONTH);
		pieces.push(`in ${months}`);
	}

	// End conditions
	if (r.COUNT) {
		pieces.push(`for ${Number(r.COUNT)} occurrence${Number(r.COUNT) === 1 ? "" : "s"}`);
	}

	// Tidy up spacing
	const text = pieces.join(" ").replace(/\s+/g, " ").trim();

	// Example: "Recurring weekly on Thursdays"
	return text;
}

/** Combines multiple RRULE strings into a single concise description.
 *  For monthly events with BYDAY, merges the day patterns (e.g., "Recurring monthly on the 2nd and 4th Monday").
 *  For weekly events, merges the days (e.g., "Recurring weekly on Thursdays and Wednesdays").
 *  @param rrules - Array of RRULE strings
 *  @param startDates - Optional array of start dates (parallel to rrules) to infer days for weekly events without BYDAY */
export function combineRRules(rrules: string[], startDates?: Date[]): string {
	if (rrules.length === 0) return "";
	if (rrules.length === 1) return rruleToText(rrules[0], startDates?.[0]);

	// Parse all rules
	const parsed = rrules.map(parseRRule);

	// Check if all are monthly with BYDAY - can merge them
	const allMonthlyByDay = parsed.every(
		(r) => (r.FREQ || "").toUpperCase() === "MONTHLY" && r.BYDAY
	);

	if (allMonthlyByDay) {
		// Collect all BYDAY tokens
		const allTokens = new Set<string>();
		for (const r of parsed) {
			const tokens = r.BYDAY.split(",").filter(Boolean);
			tokens.forEach((t) => allTokens.add(t.toUpperCase()));
		}
		// Sort tokens by ordinal then day
		const sorted = Array.from(allTokens).sort((a, b) => {
			const aMatch = a.match(/^(-?\d+)?(MO|TU|WE|TH|FR|SA|SU)$/i);
			const bMatch = b.match(/^(-?\d+)?(MO|TU|WE|TH|FR|SA|SU)$/i);
			const aNum = aMatch?.[1] ? Number(aMatch[1]) : 0;
			const bNum = bMatch?.[1] ? Number(bMatch[1]) : 0;
			return aNum - bNum;
		});
		const byDayText = describeByDay(sorted.join(","), true);
		return `Recurring monthly on ${byDayText}`;
	}

	// Check if all are weekly - merge the days
	const allWeekly = parsed.every((r) => (r.FREQ || "").toUpperCase() === "WEEKLY");

	if (allWeekly) {
		// Collect all day codes from BYDAY or infer from startDates
		const allDayCodes = new Set<string>();
		for (let i = 0; i < parsed.length; i++) {
			const r = parsed[i];
			if (r.BYDAY) {
				const tokens = r.BYDAY.split(",").filter(Boolean);
				tokens.forEach((t) => allDayCodes.add(t.toUpperCase()));
			} else if (startDates?.[i]) {
				allDayCodes.add(getDayCodeFromDate(startDates[i]));
			}
		}
		if (allDayCodes.size > 0) {
			const byDayText = describeByDay(Array.from(allDayCodes).join(","), false);
			return `Recurring weekly on ${byDayText}`;
		}
		return "Recurring weekly";
	}

	// Fallback: just join unique text representations
	const uniqueTexts = [
		...new Set(rrules.map((r, i) => rruleToText(r, startDates?.[i])).filter(Boolean)),
	];
	return uniqueTexts.join(" & ");
}
