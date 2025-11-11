import { Suspense } from "react";
import EventList from "../../components/events/EventList";
import { EventsSkeleton } from "../../components/events/skeletons";

export default function EventsPage() {
  return (
    <main className="flex max-w-4xl mx-auto my-16 px-6">
      <section>
        <h2 className="text-5xl font-semibold text-gray-900 mb-4">
          Upcoming Events
        </h2>

        {/* Slow chunk streams later; skeleton shows first */}
        <Suspense fallback={<EventsSkeleton />}>
          {/* EventsList waits on getCalendarEvents() server-side */}
          <EventList />
        </Suspense>
      </section>
    </main>
  );
}
