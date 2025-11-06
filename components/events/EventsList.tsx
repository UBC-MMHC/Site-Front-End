import { getFutureCalendarEvents } from "@/lib/calendarEvent";
import {
  CalendarEventView,
  buildCalendarEventViews,
} from "@/lib/calendarEventView";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, Repeat } from "lucide-react";

const MONTHS = [
  "NULL",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function groupEventsByYear(
  events: CalendarEventView[]
): Record<string, CalendarEventView[]> {
  const map: Record<string, CalendarEventView[]> = {};
  for (const ev of events) {
    const yearKey = String(ev.year);
    if (!map[yearKey]) map[yearKey] = [];
    map[yearKey].push(ev);
  }
  // sort within each year by unix ascending
  for (const y of Object.keys(map)) {
    map[y].sort((a, b) => a.unix - b.unix);
  }
  return map;
}

function DateSquare({
  month,
  day,
  weekday,
}: Readonly<{ month: string; day: number; weekday: string }>) {
  return (
    <div className="w-42 h-42 bg-muted/60 border flex flex-col items-center justify-center shrink-0">
      <div className="text-lg tracking-wide text-muted-foreground">
        {weekday}
      </div>
      <div className="text-2xl font-semibold leading-none">{`${month} ${day}`}</div>
    </div>
  );
}

function EventCard({ ev }: Readonly<{ ev: CalendarEventView }>) {
  const recurrence = ev.isRecurring ? ev.recurrenceString : "One-time";
  return (
    <Card className="w-full overflow-hidden border shadow-sm py-0 rounded-none">
      <CardContent className="px-0">
        <div className="flex gap-4">
          <DateSquare
            month={MONTHS[ev.month]}
            day={ev.day}
            weekday={ev.weekday}
          />

          <div className="flex-1 min-w-0 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold leading-tight truncate">
                {ev.title}
              </h3>
              <Badge
                variant={ev.isRecurring ? "secondary" : "outline"}
                className="whitespace-nowrap flex items-center gap-1 text-sm"
              >
                {ev.isRecurring && <Repeat className="h-3.5 w-3.5" />}{" "}
                {recurrence}
              </Badge>
            </div>

            <div className="mt-2 flex flex-col items-start gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  {ev.startTime} - {ev.endTime}
                </span>
              </div>
              {ev.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{ev.location}</span>
                </div>
              )}
            </div>

            {ev.description && (
              <p className="mt-3 text-sm text-foreground/80 line-clamp-3">
                {ev.description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function EventsByYear({
  events,
}: Readonly<{ events: CalendarEventView[] }>) {
  const byYear = groupEventsByYear(events);
  const years = Object.keys(byYear)
    .map(Number)
    .filter((y) => byYear[String(y)]?.length)
    .sort((a, b) => b - a); // newest year first

  if (years.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <CalendarDays className="w-8 h-8 mx-auto mb-2" />
        <p>No events to show yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {years.map((year) => (
        <section key={year} className="space-y-4">
          <header className="flex items-center gap-3">
            <h2 className="text-4xl font-bold tracking-tight">{year}</h2>
            <span className="text-2xl text-muted-foreground">
              {byYear[String(year)].length} event
              {byYear[String(year)].length === 1 ? "" : "s"}
            </span>
          </header>
          <div className="grid grid-cols-1 gap-4">
            {byYear[String(year)].map((ev) => (
              <EventCard key={ev.id} ev={ev} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default async function EventsList() {
  const events = await getFutureCalendarEvents(); // server-side fetch (no client call)
  const upcomingEventViews = buildCalendarEventViews(events);

  console.log(events);

  if (!events.length) {
    return (
      <div className="text-gray-500 text-sm border border-dashed border-gray-300 rounded-xl p-8 text-center">
        <p className="font-medium text-gray-700 mb-1">
          No upcoming events found.
        </p>
        <p className="text-gray-500">Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <EventsByYear events={upcomingEventViews} />
    </div>
  );
}
