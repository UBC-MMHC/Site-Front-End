"use client";

import * as React from "react";
import Image from "next/image";
import type { CalendarEventView } from "@/lib/calendarEventView";
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

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type EventCardProps = Readonly<{
	ev: CalendarEventView;
	/** URL string or any React node (e.g., <svg />) to render as media */
	thumbnail?: string | React.ReactNode;
}>;

function EventCard({ ev, thumbnail }: EventCardProps) {
	// Only format dates after mount to prevent hydration mismatch
	// This ensures we use the client's timezone from the start
	// Use useLayoutEffect to run synchronously before paint to minimize flash
	const [mounted, setMounted] = React.useState(false);

	React.useLayoutEffect(() => {
		setMounted(true);
	}, []);

	// Format dates and times using the user's browser timezone
	const startDate = new Date(ev.startUnix);
	const endDate = new Date(ev.endUnix);

	const dateString = mounted
		? `${DAY_NAMES[startDate.getDay()]}, ${
				MONTH_NAMES[startDate.getMonth()]
			} ${startDate.getDate()}, ${startDate.getFullYear()}`
		: "";

	const startTime = mounted
		? startDate.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			})
		: "";
	const endTime = mounted
		? endDate.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			})
		: "";
	const timeString = mounted ? `${startTime} – ${endTime}` : "";

	const hasLocation = Boolean(ev.location && ev.location.trim().length > 0);
	const showRecurrence = ev.isRecurring && ev.recurrenceString;

	const isStringThumb = typeof thumbnail === "string" && thumbnail.length > 0;
	const hasCustomNode = Boolean(thumbnail) && typeof thumbnail !== "string";
	const mediaUrl = isStringThumb ? (thumbnail as string) : "/events/building_dither.svg";

	return (
		<Card className="gap-4 overflow-hidden py-0">
			<div className="bg-muted w-full">
				<div className="relative aspect-[16/9] w-full overflow-hidden">
					{hasCustomNode ? (
						<div className="absolute inset-0 flex h-full w-full items-center justify-center p-4">
							<div className="max-h-full max-w-full">{thumbnail}</div>
						</div>
					) : (
						<Image alt={ev.title} src={mediaUrl} fill className="object-cover" loading="lazy" />
					)}
				</div>
			</div>

			<CardHeader className="gap-1 px-5">
				<CardTitle className="text-lg leading-tight">{ev.title}</CardTitle>
				<CardDescription className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
					{mounted && (
						<>
							<span className="text-foreground font-medium">{dateString}</span>
							<span className="text-muted-foreground hidden sm:inline">•</span>
							<span>{timeString}</span>
						</>
					)}
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
					<div className="text-muted-foreground flex items-start gap-2 text-sm">
						<MapPin className="mt-0.5 h-4 w-4 shrink-0" />
						<span className="leading-5">{ev.location}</span>
					</div>
				) : null}
				{ev.description ? <p className="text-sm leading-6">{ev.description}</p> : null}
			</CardContent>

			<CardFooter className="justify-end px-5 pb-5">
				{hasLocation ? (
					<a
						href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.location)}`}
						target="_blank"
						rel="noopener noreferrer"
						className="transition-opacity hover:opacity-80"
					>
						<Image
							src="/buttons/View in Maps MMHC Button.png"
							alt="View in Maps"
							width={180}
							height={40}
							className="h-auto"
						/>
					</a>
				) : null}
			</CardFooter>
		</Card>
	);
}

export default EventCard;
