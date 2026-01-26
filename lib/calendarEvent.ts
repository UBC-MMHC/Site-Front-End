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

	const icsUrl = process.env.ICS_URL;
	if (!icsUrl) {
		console.warn("ICS_URL environment variable is not set");
		return [];
	}

	const r = await fetch(icsUrl, { next: { revalidate: 60 } });
	if (!r.ok) throw new Error("Upstream calendar fetch failed");

	const text = await r.text();
	const vcalendar = new ICAL.Component(ICAL.parse(text));
	const vevents = vcalendar.getAllSubcomponents("vevent");

	const windowStart = new Date(now);
	const windowEnd = new Date(now + lookaheadMs);

	// Group VEVENTs by UID to properly handle recurring events with modifications.
	// When a recurring event is modified in Google Calendar (e.g., renamed),
	// it can create multiple VEVENTs with the same UID.
	const eventsByUid = new Map<
		string,
		{ main: ICAL.Component | null; exceptions: ICAL.Component[] }
	>();

	for (const ve of vevents) {
		try {
			const ev = new ICAL.Event(ve);
			const uid = ev.uid || cryptoRandomId();

			if (!eventsByUid.has(uid)) {
				eventsByUid.set(uid, { main: null, exceptions: [] });
			}

			const group = eventsByUid.get(uid)!;

			if (ev.isRecurrenceException()) {
				// This VEVENT has a RECURRENCE-ID, meaning it's an exception/modification
				// to a specific occurrence of a recurring event
				group.exceptions.push(ve);
			} else if (group.main === null) {
				// First main event for this UID
				group.main = ve;
			} else {
				// Multiple main events with same UID (no RECURRENCE-ID) - pick the newer one
				// This can happen when Google Calendar updates a recurring event's properties
				const existingStamp = getEventTimestamp(group.main);
				const newStamp = getEventTimestamp(ve);
				if (newStamp > existingStamp) {
					group.main = ve;
				}
			}
		} catch {
			continue;
		}
	}

	const out: CalendarEvent[] = [];

	for (const [uid, group] of eventsByUid) {
		if (!group.main) continue;

		try {
			const ev = new ICAL.Event(group.main);

			// Relate all exceptions to the main event so ical.js can handle them
			for (const exceptionVe of group.exceptions) {
				try {
					ev.relateException(new ICAL.Event(exceptionVe));
				} catch {
					// Skip malformed exceptions
				}
			}

			// Skip events with missing dates
			if (!ev.startDate || !ev.endDate) continue;

			// Skip past events that have fully ended before the window.
			if (!ev.isRecurring()) {
				const start = ev.startDate.toJSDate();
				const end = ev.endDate.toJSDate();
				if (end < windowStart) continue;

				out.push({
					id: uid,
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

			const it = ev.iterator();

			let count = 0;
			let occStart = it.next();
			while (count < maxOccurrences && occStart) {
				const occStartDate = occStart.toJSDate();
				if (occStartDate > windowEnd) break; // beyond our window

				if (occStartDate >= windowStart) {
					const occEnd = occStart.clone();
					occEnd.addDuration(duration);

					// Get the occurrence details (handles exceptions automatically)
					const occDetails = ev.getOccurrenceDetails(occStart);
					const occEvent = occDetails.item;

					const id = `${uid}-${occStart.toUnixTime()}`;

					out.push({
						id,
						title: occEvent.summary || "",
						startDate: occStartDate,
						endDate: occEnd.toJSDate(),
						location: occEvent.location || "",
						description: occEvent.description || "",
						isRecurring: true,
						recurrenceRule: getRRuleString(group.main),
					});

					count++;
				}

				occStart = it.next();
			}
		} catch {
			// Skip malformed events
			continue;
		}
	}

	// Sort ascending by start time and filter to events that haven't ended
	const filtered = out
		.filter((e) => e.endDate >= windowStart)
		.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

	return filtered;
}

/** Extract a canonical RRULE string if present */
function getRRuleString(vevent: ICAL.Component): string {
	try {
		const prop = vevent.getFirstProperty("rrule");
		if (!prop) return "";
		const recur = prop.getFirstValue() as ICAL.Recur | undefined;
		if (!recur || typeof recur.toString !== "function") return "";
		// .toJSON() is also available; toString() yields an RFC5545 string
		return recur.toString();
	} catch {
		return "";
	}
}

/** Tiny helper for non-UID events (should be rare) */
function cryptoRandomId(): string {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
		return crypto.randomUUID();
	}
	return "evt_" + Math.random().toString(36).slice(2);
}

/** Get the timestamp for a VEVENT to determine which version is newer.
 *  Prefers LAST-MODIFIED, falls back to DTSTAMP, then 0. */
function getEventTimestamp(ve: ICAL.Component): number {
	try {
		const lastMod = ve.getFirstPropertyValue("last-modified") as ICAL.Time | undefined;
		if (lastMod) return lastMod.toUnixTime();

		const dtstamp = ve.getFirstPropertyValue("dtstamp") as ICAL.Time | undefined;
		if (dtstamp) return dtstamp.toUnixTime();
	} catch {
		// Ignore errors
	}
	return 0;
}
