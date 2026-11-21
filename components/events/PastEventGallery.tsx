"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CalendarDays, Images, Instagram } from "lucide-react";
import { EVENT_CATEGORIES, pastEvents, type EventCategory, type PastEvent } from "@/lib/pastEvents";
import { surfaceCard, surfaceCardHover, textHeading, textMuted, textSubtle } from "@/lib/theme";

type CategoryFilter = "All Events" | EventCategory;

function PastEventCard({ event }: { event: PastEvent }) {
	const eventDate = new Date(`${event.date}T12:00:00`);

	const formattedDate = eventDate.toLocaleDateString("en-CA", {
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: "America/Vancouver",
	});

	return (
		<article className={`overflow-hidden ${surfaceCard} ${surfaceCardHover}`}>
			<div className="bg-surface-elevated relative aspect-[4/3] w-full overflow-hidden">
				{event.imageUrl ? (
					<Image
						src={event.imageUrl}
						alt={`${event.title} event photo`}
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-contain"
					/>
				) : (
					<div className="flex h-full items-center justify-center">
						<Images className="text-theme-accent-muted h-12 w-12" aria-hidden="true" />
					</div>
				)}
			</div>

			<div className="space-y-4 p-6">
				<p className={`text-xs font-medium ${textSubtle}`}>{event.category}</p>

				<h2 className={`text-xl font-semibold ${textHeading}`}>{event.title}</h2>

				<p className={`flex items-center gap-2 text-sm ${textMuted}`}>
					<CalendarDays size={16} aria-hidden="true" />
					{formattedDate}
				</p>

				<p className={`text-sm leading-relaxed ${textMuted}`}>{event.description}</p>

				{event.instagramUrl && (
					<a
						href={event.instagramUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-theme-accent inline-flex items-center gap-2 text-sm font-medium hover:underline"
					>
						<Instagram size={16} aria-hidden="true" />
						View Instagram Post
					</a>
				)}
			</div>
		</article>
	);
}

export default function PastEventsGallery() {
	const [category, setCategory] = useState<CategoryFilter>("All Events");
	const [year, setYear] = useState("All Years");

	const years = useMemo(
		() =>
			[...new Set(pastEvents.map((event) => event.date.slice(0, 4)))].sort((a, b) =>
				b.localeCompare(a)
			),
		[]
	);

	const filteredEvents = useMemo(() => {
		return pastEvents
			.filter((event) => category === "All Events" || event.category === category)
			.filter((event) => year === "All Years" || event.date.startsWith(year))
			.sort((a, b) => b.date.localeCompare(a.date));
	}, [category, year]);

	return (
		<div className="space-y-8">
			<div className="flex flex-wrap gap-3">
				{(["All Events", ...EVENT_CATEGORIES] as CategoryFilter[]).map((item) => (
					<button
						key={item}
						type="button"
						onClick={() => setCategory(item)}
						aria-pressed={category === item}
						className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
							category === item
								? "bg-pill text-pill-fg"
								: "border-border text-page-fg hover:bg-surface-elevated border"
						}`}
					>
						{item}
					</button>
				))}
			</div>

			<div className="flex flex-wrap items-center justify-between gap-4">
				<p className={`text-sm ${textMuted}`}>
					{filteredEvents.length} event
					{filteredEvents.length === 1 ? "" : "s"}
				</p>

				<select
					value={year}
					onChange={(event) => setYear(event.target.value)}
					aria-label="Filter events by year"
					className="border-border bg-surface text-page-fg rounded-lg border px-4 py-2 text-sm"
				>
					<option value="All Years">All Years</option>
					{years.map((item) => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>

			{filteredEvents.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{filteredEvents.map((event) => (
						<PastEventCard key={event.id} event={event} />
					))}
				</div>
			) : (
				<div className="border-border rounded-2xl border border-dashed px-8 py-16 text-center">
					<p className={`font-medium ${textHeading}`}>No events found.</p>
					<p className={`mt-2 text-sm ${textSubtle}`}>Try another category or year.</p>
				</div>
			)}
		</div>
	);
}
