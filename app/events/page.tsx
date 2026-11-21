import { Suspense } from "react";
import EventList from "@/components/events/EventList";
import EventTabs from "@/components/events/EventTabs";
import { EventsSkeleton } from "@/components/events/skeletons";
import DarkPageShell from "@/components/layout/DarkPageShell";
import PageHeader from "@/components/layout/PageHeader";

export const dynamic = "force-dynamic";

export default function EventsPage() {
	return (
		<DarkPageShell>
			<main className="px-6 pt-28 pb-24">
				<div className="mx-auto max-w-7xl">
					<PageHeader
						title="Upcoming Events"
						description="Join discussions, runs, study sessions, and more with the UBC MMHC community."
					/>

					<EventTabs />

					<Suspense fallback={<EventsSkeleton />}>
						<EventList />
					</Suspense>
				</div>
			</main>
		</DarkPageShell>
	);
}
