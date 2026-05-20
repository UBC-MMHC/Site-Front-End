import Link from "next/link";
import { getFutureCalendarEvents } from "@/lib/calendarEvent";
import { buildCalendarEventViews } from "@/lib/calendarEventView";
import HomeEventCard from "@/components/home/HomeEventCard";
import { dashedEmpty, pillOutline, textHeading, textSubtle } from "@/lib/theme";

function getThumbnailForEvent(title: string): string | undefined {
	const t = title.toLowerCase();
	if (t.includes("discussion")) return "/events/plato_dither.svg";
	if (t.includes("study session")) return "/events/tree_dither.svg";
	if (t.includes("mmhc run")) return "/events/run_dither.svg";
	return undefined;
}

export default async function HomeEventsSection({ limit = 4 }: { limit?: number }) {
	const events = await getFutureCalendarEvents();
	const views = buildCalendarEventViews(events).slice(0, limit);

	return (
		<section id="events" className="px-6 py-32">
			<div className="mx-auto max-w-7xl">
				<div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
					<div>
						<h2 className={`text-3xl font-semibold tracking-tight md:text-5xl ${textHeading}`}>
							Upcoming Events
						</h2>
					</div>
					<Link href="/events" className={pillOutline}>
						See all events
					</Link>
				</div>

				{views.length === 0 ? (
					<div className={dashedEmpty}>
						<p className={`font-medium ${textHeading}`}>No upcoming events right now.</p>
						<p className={`mt-2 text-sm ${textSubtle}`}>Check back soon for new events.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{views.map((ev) => (
							<HomeEventCard
								key={ev.id}
								ev={ev}
								thumbnail={getThumbnailForEvent(ev.title ?? "")}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
