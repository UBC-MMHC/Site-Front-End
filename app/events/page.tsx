import { Suspense } from "react";
import EventList from "../../components/events/EventList";
import { EventsSkeleton } from "../../components/events/skeletons";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-primary-bg pt-24 pb-16 px-6">
      <section className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-semibold text-primary-text mb-8">
          Upcoming Events
        </h2>

        <Suspense fallback={<EventsSkeleton />}>
          <EventList />
        </Suspense>
      </section>
    </main>
  );
}

