import { getEventTypeColor } from "./event-card";
import { Event } from "@/interfaces/event";

export function DetailsCard({ event }: { event: Event }) {
  return (
    <div className="rounded-xl shadow-sm bg-gray-50 p-4 md:p-6">
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Details
      </div>

      <div className="mt-3">
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Tags
        </div>
        <div className="mt-2 flex flex-row gap-2">
          <span
            className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getEventTypeColor(
              event.event_type
            )}`}
          >
            {event.event_type}
          </span>
        </div>
      </div>

      {event.description && (
        <div className="mt-4">
          <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Description
          </div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {event.description}
          </div>
        </div>
      )}

      {event.links?.ticket_link && (
        <div className="mt-6">
          <a
            href={event.links.ticket_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-university-red hover:bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
          >
            Get Tickets
          </a>
        </div>
      )}
    </div>
  );
}
