import { Suspense } from "react";
import EventsList from "../../components/events/EventsList";
import { EventsSkeleton } from "../../components/events/skeletons";

export default function EventsPage() {
  return (
    <main className="max-w-4xl mx-auto my-16 px-6">
      <section>
        <h2 className="text-5xl font-semibold text-gray-900 mb-4">
          Upcoming Events
        </h2>

        {/* Slow chunk streams later; skeleton shows first */}
        <Suspense fallback={<EventsSkeleton />}>
          {/* EventsList waits on getCalendarEvents() server-side */}
          <EventsList />
        </Suspense>
      </section>
    </main>
  );
}
