"use client";

import * as React from "react";
import Image from "next/image";
import type { CalendarEventView } from "@/lib/calendarEventView";
import { Repeat, Star } from "lucide-react";
import { surfaceCard, surfaceCardHover, textHeading, textMuted, textSubtle } from "@/lib/theme";

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

type HomeEventCardProps = Readonly<{
	ev: CalendarEventView;
	thumbnail?: string;
}>;

export default function HomeEventCard({ ev, thumbnail }: HomeEventCardProps) {
	const [mounted, setMounted] = React.useState(false);

	React.useLayoutEffect(() => {
		setMounted(true);
	}, []);

	const startDate = new Date(ev.startUnix);
	const endDate = new Date(ev.endUnix);

	const dateString = mounted
		? `${DAY_NAMES[startDate.getDay()]}, ${MONTH_NAMES[startDate.getMonth()]} ${startDate.getDate()}, ${startDate.getFullYear()}`
		: "";

	const startTime = mounted
		? startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
		: "";
	const endTime = mounted
		? endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
		: "";
	const timeString = mounted ? `${startTime} – ${endTime}` : "";

	const mediaUrl = thumbnail ?? "/events/building_dither.svg";
	const hasLocation = Boolean(ev.location?.trim());

	return (
		<article className={`overflow-hidden ${surfaceCard} ${surfaceCardHover}`}>
			<div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-200 dark:bg-surface-elevated">
				<Image
					alt={ev.title}
					src={mediaUrl}
					fill
					className="object-cover"
					loading="lazy"
				/>
			</div>

			<div className="p-6">
				<div className="mb-3 flex flex-wrap gap-2">
					{ev.featured && (
						<span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 text-xs text-page-fg">
							<Star className="h-3 w-3" aria-hidden />
							Featured
						</span>
					)}
					{ev.isRecurring && ev.recurrenceString && (
						<span className={`inline-flex items-center gap-1 rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 text-xs ${textMuted}`}>
							<Repeat className="h-3 w-3" aria-hidden />
							{ev.recurrenceString}
						</span>
					)}
				</div>

				<h3 className={`text-lg font-semibold leading-tight ${textHeading}`}>{ev.title}</h3>

				{mounted && (
					<p className={`mt-2 text-sm ${textMuted}`}>
						<span className="text-page-fg">{dateString}</span>
						<span className="mx-2 text-theme-line">·</span>
						{timeString}
					</p>
				)}

				{hasLocation && (
					<p className={`mt-3 text-sm ${textSubtle}`}>{ev.location}</p>
				)}

				{ev.description && (
					<p className={`mt-4 line-clamp-3 text-sm leading-relaxed ${textMuted}`}>{ev.description}</p>
				)}
			</div>
		</article>
	);
}
