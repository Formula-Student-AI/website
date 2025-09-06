import { Event } from "@/interfaces/event";
import { format } from "date-fns";
import DateFormatter from "../common/date-formatter";
import { EventCard } from "./event-card";

type Props = {
  events: Event[];
};

export function EventTimeline({ events }: Props) {
  // Group events by date
  const groupedEvents = events.reduce((groups, event) => {
    const dateKey = event.date.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
    return groups;
  }, {} as Record<string, Event[]>);

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {Object.entries(groupedEvents).map(([dateString, dayEvents]) => {
        const date = new Date(dateString);
        return (
          <div key={dateString} className="relative">
            {/* Date indicator */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-logo-blue rounded-full mr-4"></div>
                <div className="text-xl font-bold text-gray-900">
                  <DateFormatter date={date} />
                  <span className="text-gray-500 font-normal">
                    {" " + format(date, "EEEE")}
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-7 space-y-3">
              {dayEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
