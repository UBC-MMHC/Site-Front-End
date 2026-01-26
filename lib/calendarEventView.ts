import type { CalendarEvent } from "./calendarEvent";
import { rruleToText, combineRRules } from "./rruleHelper";

export interface CalendarEventView {
	id: string;
	unix: number; // start date unix timestamp (for sorting)
	startUnix: number; // start date unix timestamp
	endUnix: number; // end date unix timestamp
	title: string;
	location: string;
	description: string;
	isRecurring: boolean;
	recurrenceString: string;
	featured: boolean;
}

export function buildCalendarEventViews(events: CalendarEvent[]): CalendarEventView[] {
	// First, filter out events we don't want to show
	const filtered = events.filter((evt) => evt.title !== "Weekly Executive Meeting");

	// Separate recurring and non-recurring events
	const nonRecurring: CalendarEvent[] = [];
	const recurringByTitle = new Map<string, CalendarEvent[]>();

	for (const evt of filtered) {
		if (!evt.isRecurring) {
			nonRecurring.push(evt);
		} else {
			const title = evt.title.trim();
			if (!recurringByTitle.has(title)) {
				recurringByTitle.set(title, []);
			}
			recurringByTitle.get(title)!.push(evt);
		}
	}

	const views: CalendarEventView[] = [];

	// Add non-recurring events as-is
	for (const evt of nonRecurring) {
		views.push({
			id: evt.id,
			unix: evt.startDate.getTime(),
			startUnix: evt.startDate.getTime(),
			endUnix: evt.endDate.getTime(),
			title: evt.title,
			location: evt.location,
			description: evt.description,
			isRecurring: false,
			recurrenceString: "",
			featured: evt.description.includes("FEATURED"),
		});
	}

	// For recurring events, group by title and create one card per title
	for (const [title, eventsWithTitle] of recurringByTitle) {
		// Sort by start date to get the earliest upcoming occurrence
		eventsWithTitle.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

		const earliest = eventsWithTitle[0];

		// Collect unique recurrence rules from all events with this title
		// Also track corresponding start dates for inferring days for weekly events
		const uniqueRules: string[] = [];
		const startDates: Date[] = [];
		const seenRules = new Set<string>();
		for (const evt of eventsWithTitle) {
			if (evt.recurrenceRule && !seenRules.has(evt.recurrenceRule)) {
				seenRules.add(evt.recurrenceRule);
				uniqueRules.push(evt.recurrenceRule);
				startDates.push(evt.startDate);
			}
		}

		// Build combined recurrence string
		const combinedRecurrence = combineRRules(uniqueRules, startDates);

		views.push({
			id: earliest.id,
			unix: earliest.startDate.getTime(),
			startUnix: earliest.startDate.getTime(),
			endUnix: earliest.endDate.getTime(),
			title,
			location: earliest.location,
			description: earliest.description,
			isRecurring: true,
			recurrenceString: combinedRecurrence,
			featured: earliest.description.includes("FEATURED"),
		});
	}

	// Sort all views by start time
	views.sort((a, b) => a.unix - b.unix);

	return views;
}
