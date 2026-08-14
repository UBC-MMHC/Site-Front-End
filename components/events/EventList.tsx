import { getFutureCalendarEvents } from "@/lib/calendarEvent";
import type { CalendarEventView } from "@/lib/calendarEventView";
import { buildCalendarEventViews } from "@/lib/calendarEventView";
import { CalendarDays } from "lucide-react";
import { GOOGLE_CALENDAR_URL } from "@/app/constants";
import HomeEventCard from "@/components/home/HomeEventCard";
import Link from "next/link";
import { dashedEmpty, pillOutline, textHeading, textMuted, textSubtle } from "@/lib/theme";

export function CalendarSubscribeLink() {
	return (
		<Link
			href={GOOGLE_CALENDAR_URL}
			target="_blank"
			rel="noopener noreferrer"
			className={`inline-flex items-center gap-2 ${pillOutline}`}
		>
			<CalendarDays className="h-4 w-4" aria-hidden />
			Add to Google Calendar
		</Link>
	);
}

function getThumbnailForEvent(ev: CalendarEventView): string | undefined {
	const title = ev.title?.toLowerCase() ?? "";
	if (title.includes("discussion")) return "/events/plato_dither.svg";
	if (title.includes("study session")) return "/events/tree_dither.svg";
	if (title.includes("test")) return "/events/test_event.jpg";
	if (title.includes("mmhc run")) return "/events/run_dither.svg";
	return undefined;
}

function groupEventsByYear(events: CalendarEventView[]): Record<string, CalendarEventView[]> {
	const map: Record<string, CalendarEventView[]> = {};
	for (const ev of events) {
		const year = new Date(ev.startUnix).getUTCFullYear();
		const yearKey = String(year);
		if (!map[yearKey]) map[yearKey] = [];
		map[yearKey].push(ev);
	}
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
		.sort((a, b) => b - a);

	if (years.length === 0) {
		return (
			<div className={dashedEmpty}>
				<CalendarDays className="mx-auto mb-3 h-8 w-8 text-theme-accent-muted" />
				<p className={`font-medium ${textHeading}`}>No events to show yet.</p>
				<p className={`mt-2 text-sm ${textSubtle}`}>Check back soon for new events.</p>
			</div>
		);
	}

	return (
		<div className="space-y-12">
			<div className="flex justify-start">
				<CalendarSubscribeLink />
			</div>

			{years.map((year) => (
				<section key={year} className="space-y-6">
					<header className="flex flex-wrap items-baseline gap-3">
						<h2 className={`text-2xl font-semibold md:text-3xl ${textHeading}`}>{year}</h2>
						<span className={`text-sm ${textSubtle}`}>
							({byYear[String(year)].length} event
							{byYear[String(year)].length === 1 ? "" : "s"})
						</span>
					</header>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{byYear[String(year)].map((ev) => (
							<HomeEventCard key={ev.id} ev={ev} thumbnail={getThumbnailForEvent(ev)} />
						))}
					</div>
				</section>
			))}
		</div>
	);
}

export default async function EventList({ limit }: { limit?: number } = {}) {
	const events = await getFutureCalendarEvents();
	const allViews = buildCalendarEventViews(events);
	const upcomingEventViews = limit ? allViews.slice(0, limit) : allViews;

	if (!allViews.length) {
		return (
			<div className={dashedEmpty}>
				<p className={`mb-1 font-medium ${textHeading}`}>No upcoming events found.</p>
				<p className={`text-sm ${textSubtle}`}>Check back soon.</p>
			</div>
		);
	}

	return <EventByYear events={upcomingEventViews} />;
}
