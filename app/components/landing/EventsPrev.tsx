import { getAllFutureEvents } from "@/lib/eventApi";
import { Event } from "@/interfaces/event";
import { MajorEvent } from "../events/major-event";
import Link from "next/link";

export default function EventsPrev() {
  const futureEvents = getAllFutureEvents();
  const majorEvent = futureEvents.find((event: Event) => event.major_event);

  return (
    <div className="relative mx-auto px-6 pt-22 pb-16">
      <div className="px-6 md:px-10 lg:px-14 bg-white rounded-2xl">
        <MajorEvent event={majorEvent} />
      </div>

      <div className="text-center -mt-18">
        <Link
          href="/posts"
          className="inline-block rounded-full bg-university-red px-8 py-3 text-lg font-semibold text-white shadow-md hover:bg-university-red/90 hover:shadow-lg transition-all duration-200"
        >
          More Events
        </Link>
      </div>
    </div>
  );
}
