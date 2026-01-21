import { Suspense } from "react";
import EventList from "../../components/events/EventList";
import { EventsSkeleton } from "../../components/events/skeletons";

// Opt-out of static rendering - calendar data requires runtime fetch
export const dynamic = "force-dynamic";

export default function EventsPage() {
    return (
        <main className="bg-primary-bg min-h-screen px-6 pt-24 pb-16">
            <section className="mx-auto max-w-4xl">
                <h2 className="text-primary-text mb-8 text-5xl font-semibold">Upcoming Events</h2>

                <Suspense fallback={<EventsSkeleton />}>
                    <EventList />
                </Suspense>
            </section>
        </main>
    );
}
