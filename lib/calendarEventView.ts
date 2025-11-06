import { CalendarEvent } from "./calendarEvent";
import { rruleToText } from "./rruleHelper";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export type CalendarEventView = {
  id: string;
  unix: number;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  month: number;
  day: number;
  year: number;
  weekday: string;
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
          unix: startDate.getTime(),
          title,
          startTime: startDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          endTime: endDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          location,
          description,
          month: startDate.getMonth() + 1, // 1-12
          day: startDate.getDate(),
          year: startDate.getFullYear(),
          weekday: DAY_NAMES[startDate.getDay()],
          isRecurring, // copied as requested
          recurrenceString: rruleToText(recurrenceRule), // recurrenceRule -> recurrenceString
          featured: description.includes("FEATURED"),
        } as CalendarEventView;
      })
  );
}
