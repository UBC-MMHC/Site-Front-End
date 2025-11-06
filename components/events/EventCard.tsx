import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Repeat } from "lucide-react";
import { Clock, MapPin } from "lucide-react";
import { CalendarEventView } from "@/lib/calendarEventView";

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

function DateSquare({
  month,
  day,
  weekday,
  featured,
}: Readonly<{
  month: string;
  day: number;
  weekday: string;
  featured?: boolean;
}>) {
  const containerClass = featured
    ? "w-42 h-42 bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-500 text-white border flex flex-col items-center justify-center shrink-0"
    : "w-42 h-42 bg-muted/60 border flex flex-col items-center justify-center shrink-0";
  const weekdayClass = featured
    ? "text-lg tracking-wide opacity-90"
    : "text-lg tracking-wide text-muted-foreground";
  const dateClass = featured
    ? "text-2xl font-semibold leading-none drop-shadow-sm"
    : "text-2xl font-semibold leading-none";

  return (
    <div className={containerClass}>
      <div className={weekdayClass}>{weekday}</div>
      <div className={dateClass}>{`${month} ${day}`}</div>
    </div>
  );
}

export default function EventCard({ ev }: Readonly<{ ev: CalendarEventView }>) {
  const recurrence = ev.isRecurring ? ev.recurrenceString : "One-time";
  return (
    <Card
      className={
        ev.featured
          ? "w-full overflow-hidden border shadow-sm py-0 rounded-none"
          : "w-full overflow-hidden border shadow-sm py-0 rounded-none"
      }
    >
      <CardContent className="px-0">
        <div className="flex gap-4">
          <DateSquare
            month={MONTHS[ev.month]}
            day={ev.day}
            weekday={ev.weekday}
            featured={ev.featured}
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
