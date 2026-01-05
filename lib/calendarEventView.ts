import { CalendarEvent } from "./calendarEvent";
import { rruleToText } from "./rruleHelper";

export type CalendarEventView = {
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
};

export function buildCalendarEventViews(
  events: CalendarEvent[]
): CalendarEventView[] {
  return (
    events
      // Filter out subsequent recurring occurrences with the same title (keep earliest upcoming)
      .filter(
        (() => {
          const seenRecurringTitles = new Set<string>();
          return (evt: CalendarEvent) => {
            if (evt.title == "Weekly Executive Meeting") return false;
            if (!evt.isRecurring) return true;
            const key = evt.title.trim().toLowerCase();
            if (seenRecurringTitles.has(key)) return false;
            seenRecurringTitles.add(key);
            return true;
          };
        })()
      )
      .map((evt) => {
        const {
          id,
          title,
          startDate,
          endDate,
          location,
          description,
          isRecurring,
          recurrenceRule,
        } = evt;

        return {
          id,
          unix: startDate.getTime(), // kept for backward compatibility and sorting
          startUnix: startDate.getTime(),
          endUnix: endDate.getTime(),
          title,
          location,
          description,
          isRecurring, // copied as requested
          recurrenceString: rruleToText(recurrenceRule), // recurrenceRule -> recurrenceString
          featured: description.includes("FEATURED"),
        } as CalendarEventView;
      })
  );
}
