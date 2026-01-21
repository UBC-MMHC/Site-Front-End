import ICAL from "ical.js";

export interface CalendarEvent {
	id: string;
	title: string;
	startDate: Date;
	endDate: Date;
	location: string;
	description: string;
	isRecurring: boolean;
	recurrenceRule: string;
}

interface GetEventsOpts {
	/** How far ahead to expand recurring events (ms). Default: 180 days */
	lookaheadMs?: number;
	/** Hard cap to prevent infinite recurrences */
	maxOccurrences?: number;
}

export async function getFutureCalendarEvents(
	now = Date.now(),
	opts: GetEventsOpts = {}
): Promise<CalendarEvent[]> {
	const lookaheadMs = opts.lookaheadMs ?? 1000 * 60 * 60 * 24 * 180; // 180 days
	const maxOccurrences = opts.maxOccurrences ?? 1000;

	const r = await fetch(process.env.ICS_URL!, { next: { revalidate: 60 } });
	if (!r.ok) throw new Error("Upstream calendar fetch failed");

	const text = await r.text();
	const vcalendar = new ICAL.Component(ICAL.parse(text));
	const vevents = vcalendar.getAllSubcomponents("vevent");

	const windowStart = new Date(now);
	const windowEnd = new Date(now + lookaheadMs);

	const out: CalendarEvent[] = [];

	for (const ve of vevents) {
		const ev = new ICAL.Event(ve);

		// Skip past events that have fully ended before the window.
		if (!ev.isRecurring()) {
			const start = ev.startDate.toJSDate();
			const end = ev.endDate.toJSDate();
			if (end < windowStart) continue;

			out.push({
				id: ev.uid || cryptoRandomId(),
				title: ev.summary || "",
				startDate: start,
				endDate: end,
				location: ev.location || "",
				description: ev.description || "",
				isRecurring: false,
				recurrenceRule: "",
			});
			continue;
		}

		// Recurring: expand within the window
		const baseStart = ev.startDate.clone();
		const duration = ev.endDate.subtractDate(ev.startDate);

		const it = new ICAL.RecurExpansion({
			component: ve,
			dtstart: baseStart,
		});

		let count = 0;
		while (count < maxOccurrences && it.next()) {
			const occStart = it.last; // ICAL.Time
			const occStartDate = occStart.toJSDate();
			if (occStartDate > windowEnd) break; // beyond our window
			if (occStartDate < windowStart) continue; // before window

			const occEnd = occStart.clone();
			occEnd.addDuration(duration);

			const id = `${ev.uid || cryptoRandomId()}-${occStart.toUnixTime()}`;

			out.push({
				id,
				title: ev.summary || "",
				startDate: occStartDate,
				endDate: occEnd.toJSDate(),
				location: ev.location || "",
				description: ev.description || "",
				isRecurring: true,
				recurrenceRule: getRRuleString(ve), // e.g. "FREQ=WEEKLY;BYDAY=MO,WE,FR"
			});

			count++;
		}
	}

	// Sort ascending by start time and filter to events that haven't ended
	const filtered = out
		.filter((e) => e.endDate >= windowStart)
		.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

	return filtered;
}

/** Extract a canonical RRULE string if present */
function getRRuleString(vevent: any): string {
	const prop = vevent.getFirstProperty("rrule");
	if (!prop) return "";
	const recur = prop.getFirstValue() as ICAL.Recur;
	// .toJSON() is also available; toString() yields an RFC5545 string
	return recur?.toString?.() ?? "";
}

/** Tiny helper for non-UID events (should be rare) */
function cryptoRandomId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
		// @ts-expect-error
		return crypto.randomUUID();
	}
	return "evt_" + Math.random().toString(36).slice(2);
}
