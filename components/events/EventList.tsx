import { getFutureCalendarEvents } from "@/lib/calendarEvent";
import { CalendarEventView, buildCalendarEventViews } from "@/lib/calendarEventView";
import { CalendarDays } from "lucide-react";
import EventCard from "./EventCard";

function getThumbnailForEvent(ev: CalendarEventView): string | undefined {
  const title = ev.title?.toLowerCase() ?? "";
  if (title.includes("discussion")) {
    return "/events/plato_dither.svg";
  } else if (title.includes("study session")) {
    return "/events/tree_dither.svg";
  } else if (title.includes("test")) {
    return "/events/test_event.jpg";
  } else if (title.includes("mmhc run")) {
    return "/events/run_dither.svg";
  }
  return undefined;
}

function groupEventsByYear(events: CalendarEventView[]): Record<string, CalendarEventView[]> {
  const map: Record<string, CalendarEventView[]> = {};
  for (const ev of events) {
    // Calculate year from unix timestamp using UTC to ensure consistent grouping
    // (The actual display will use user's timezone in EventCard)
    const year = new Date(ev.startUnix).getUTCFullYear();
    const yearKey = String(year);
    if (!map[yearKey]) map[yearKey] = [];
    map[yearKey].push(ev);
  }
  // sort within each year by unix ascending
  for (const y of Object.keys(map)) {
    map[y].sort((a, b) => a.unix - b.unix);
  }
  return map;
}

export function EventByYear({ events }: Readonly<{ events: CalendarEventView[] }>) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {byYear[String(year)].map((ev) => (
              <EventCard key={ev.id} ev={ev} thumbnail={getThumbnailForEvent(ev)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default async function EventList() {
  const events = await getFutureCalendarEvents(); // server-side fetch (no client call)
  const upcomingEventViews = buildCalendarEventViews(events);

  if (!events.length) {
    return (
      <div className="text-gray-500 text-sm border border-dashed border-gray-300 rounded-xl p-8 text-center">
        <p className="font-medium text-gray-700 mb-1">No upcoming events found.</p>
        <p className="text-gray-500">Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <EventByYear events={upcomingEventViews} />
    </div>
  );
}
