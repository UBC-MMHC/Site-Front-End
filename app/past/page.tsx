import DarkPageShell from "@/components/layout/DarkPageShell";
import PageHeader from "@/components/layout/PageHeader";
import PastEventsGallery from "@/components/events/PastEventGallery";
import EventTabs from "@/components/events/EventTabs";

export default function PastEventsPage() {
	return (
		<DarkPageShell>
			<main className="px-6 pt-28 pb-24">
				<div className="mx-auto max-w-7xl">
					<PageHeader
						title="Past Events"
						description="Take a look back at the events and memories we've shared as a community."
					/>

					<EventTabs />

					<PastEventsGallery />
				</div>
			</main>
		</DarkPageShell>
	);
}
