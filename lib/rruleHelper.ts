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
		DAILY: ["Daily", `Every ${interval} days`],
		WEEKLY: ["Weekly", `Every ${interval} weeks`],
		MONTHLY: ["Monthly", `Every ${interval} months`],
		YEARLY: ["Yearly", `Every ${interval} years`],
		HOURLY: ["Hourly", `Every ${interval} hours`],
		MINUTELY: ["Every minute", `Every ${interval} minutes`],
		SECONDLY: ["Every second", `Every ${interval} seconds`],
	};
	const entry = map[(freq || "").toUpperCase()];
	if (!entry) return "";
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
		if (!nthStr || !includeOrdinals) return dayName;
		const nth = Number(nthStr);
		if (nth === -1) return `last ${dayName}`;
		return `${ordinal(nth)} ${dayName}`;
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
	if (!rrule) return "";

	const r = parseRRule(rrule);
	const freq = (r.FREQ || "").toUpperCase();

	// For monthly events with BYDAY (e.g., "2nd Mon"), just show the day pattern
	if (freq === "MONTHLY" && r.BYDAY) {
		return describeByDay(r.BYDAY, true);
	}

	// For weekly events, show "Weekly" or day pattern
	if (freq === "WEEKLY") {
		if (r.BYDAY) {
			return describeByDay(r.BYDAY, false);
		}
		return "Weekly";
	}

	// For other frequencies, show the frequency
	const freqText = describeFreq(r.FREQ, r.INTERVAL);
	if (!freqText) return "";

	return freqText;
}

/** Combines multiple RRULE strings into a single concise description.
 *  For monthly events with BYDAY, merges the day patterns (e.g., "2nd & 4th Mon"). */
export function combineRRules(rrules: string[]): string {
	if (rrules.length === 0) return "";
	if (rrules.length === 1) return rruleToText(rrules[0]);

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
		return describeByDay(sorted.join(","), true);
	}

	// Check if all are weekly with BYDAY - can merge them
	const allWeeklyByDay = parsed.every((r) => (r.FREQ || "").toUpperCase() === "WEEKLY" && r.BYDAY);

	if (allWeeklyByDay) {
		const allTokens = new Set<string>();
		for (const r of parsed) {
			const tokens = r.BYDAY.split(",").filter(Boolean);
			tokens.forEach((t) => allTokens.add(t.toUpperCase()));
		}
		return describeByDay(Array.from(allTokens).join(","), false);
	}

	// Fallback: just join unique text representations
	const uniqueTexts = [...new Set(rrules.map(rruleToText).filter(Boolean))];
	return uniqueTexts.join(" & ");
}
