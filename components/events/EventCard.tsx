import * as React from "react";
import { CalendarEventView } from "@/lib/calendarEventView";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Repeat, Star } from "lucide-react";

// TODO: Refactor thumbnail to be property of CalendarEventView

const MONTH_NAMES = [
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

type EventCardProps = Readonly<{
  ev: CalendarEventView;
  /** URL string or any React node (e.g., <svg />) to render as media */
  thumbnail?: string | React.ReactNode;
}>;

function EventCard({ ev, thumbnail }: EventCardProps) {
  const dateString = `${ev.weekday}, ${MONTH_NAMES[ev.month - 1]} ${ev.day}, ${
    ev.year
  }`;
  const timeString = `${ev.startTime} – ${ev.endTime}`;

  const hasLocation = Boolean(ev.location && ev.location.trim().length > 0);
  const showRecurrence = ev.isRecurring && ev.recurrenceString;

  const isStringThumb = typeof thumbnail === "string" && thumbnail.length > 0;
  const hasCustomNode = Boolean(thumbnail) && typeof thumbnail !== "string";
  const mediaUrl = isStringThumb
    ? (thumbnail as string)
    : "/building_dither.svg";

  return (
    <Card className="overflow-hidden gap-4 py-0">
      <div className="w-full bg-muted">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {hasCustomNode ? (
            <div className="absolute inset-0 flex h-full w-full items-center justify-center p-4">
              <div className="max-h-full max-w-full">{thumbnail}</div>
            </div>
          ) : (
            <img
              alt={ev.title}
              src={mediaUrl}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>
      </div>

      <CardHeader className="gap-1 px-5">
        <CardTitle className="text-lg leading-tight">{ev.title}</CardTitle>
        <CardDescription className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
          <span className="font-medium text-foreground">{dateString}</span>
          <span className="hidden text-muted-foreground sm:inline">•</span>
          <span>{timeString}</span>
        </CardDescription>
        <div className="mt-1 flex flex-wrap gap-2">
          {ev.featured ? (
            <Badge>
              <Star className="shrink-0" />
              Featured
            </Badge>
          ) : null}
          {showRecurrence ? (
            <Badge variant="secondary">
              <Repeat className="shrink-0" />
              {ev.recurrenceString}
            </Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-5">
        {hasLocation ? (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="leading-5">{ev.location}</span>
          </div>
        ) : null}
        {ev.description ? (
          <p className="text-sm leading-6">{ev.description}</p>
        ) : null}
      </CardContent>

      <CardFooter className="justify-end px-5">
        {/* Reserved for actions/links if needed later */}
      </CardFooter>
    </Card>
  );
}

export default EventCard;
