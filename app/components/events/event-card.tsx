import { Event } from "@/interfaces/event";
import Link from "next/link";
import { format } from "date-fns";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";

type Props = {
  event: Event;
};

function getOrganizerDisplay(event: Event) {
  if (event.cohost && event.cohost.length > 0) {
    return `By ${event.cohost[0]}`;
  }
  return "By Bristol Formula Student AI team";
}

export function getEventTypeColor(eventType: string) {
  switch (eventType) {
    case "workshop":
      return "bg-blue-100 text-blue-800";
    case "hackathon":
      return "bg-purple-100 text-purple-800";
    case "social":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function EventCard({ event }: Props) {
  return (
    <div key={event.slug} className="group relative">
      {/* Time */}
      <div className="text-sm font-medium text-gray-600 bg-white px-2 py-1 rounded mb-2 inline-block">
        {format(event.date, "z HH:mm")}
      </div>

      {/* Connecting line */}
      <div className="absolute -left-[23px] top-0 w-0.5 h-full border-l-2 border-dotted border-gray-300"></div>

      <div className="flex items-start">
        {/* Event content */}
        <div className="flex md:w-2/3 group-hover:transform group-hover:scale-[1.02] bg-gray-50 rounded-lg p-4 transition-all duration-300">
          <div className="flex items-start gap-4 w-full">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <Link
                  href={`/events/${event.slug}`}
                  className="block group-hover:text-logo-blue transition-colors duration-200"
                >
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:underline">
                    {event.title}
                  </h3>
                </Link>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 text-sm text-gray-600 mb-2">
                <span className="flex items-center">
                  <IoLocationOutline className="w-4 h-4 mr-1" />
                  {event.location}
                </span>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(
                    event.event_type
                  )}`}
                >
                  {event.event_type.charAt(0).toUpperCase() +
                    event.event_type.slice(1)}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-2">
                {getOrganizerDisplay(event)}
              </div>

              {event.links?.ticket_link ? (
                <div className="mt-4">
                  <Link
                    href={event.links.ticket_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 shadow-sm font-semibold rounded-lg hover:bg-university-red hover:text-white transition-colors duration-300"
                  >
                    Register Now
                  </Link>
                </div>
              ) : (
                <div className="text-sm font-semibold text-green-600">
                  Free • Register Not Required
                </div>
              )}
            </div>

            {/* Event image/placeholder */}
            {event.coverImage && (
              <div className="flex-shrink-0">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
