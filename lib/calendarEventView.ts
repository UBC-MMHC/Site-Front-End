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
};

export function buildCalendarEventViews(
  events: CalendarEvent[]
): CalendarEventView[] {
  return (
    events
      // TODO:  build a filter function to remove events from the calendar
      .filter((evt) => evt.title != "Weekly Executive Meeting")
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
        } as CalendarEventView;
      })
  );
}
