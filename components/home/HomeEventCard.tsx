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
			<div className="dark:bg-surface-elevated relative aspect-[16/9] w-full overflow-hidden bg-zinc-200">
				<Image alt={ev.title} src={mediaUrl} fill className="object-cover" loading="lazy" />
			</div>

			<div className="p-6">
				<div className="mb-3 flex flex-wrap gap-2">
					{ev.featured && (
						<span className="border-border bg-surface-elevated text-page-fg inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs">
							<Star className="h-3 w-3" aria-hidden />
							Featured
						</span>
					)}
					{ev.isRecurring && ev.recurrenceString && (
						<span
							className={`border-border bg-surface-elevated inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs ${textMuted}`}
						>
							<Repeat className="h-3 w-3" aria-hidden />
							{ev.recurrenceString}
						</span>
					)}
				</div>

				<h3 className={`text-lg leading-tight font-semibold ${textHeading}`}>{ev.title}</h3>

				{mounted && (
					<p className={`mt-2 text-sm ${textMuted}`}>
						<span className="text-page-fg">{dateString}</span>
						<span className="text-theme-line mx-2">·</span>
						{timeString}
					</p>
				)}

				{hasLocation && <p className={`mt-3 text-sm ${textSubtle}`}>{ev.location}</p>}

				{ev.description && (
					<p className={`mt-4 line-clamp-3 text-sm leading-relaxed ${textMuted}`}>
						{ev.description}
					</p>
				)}
			</div>
		</article>
	);
}
