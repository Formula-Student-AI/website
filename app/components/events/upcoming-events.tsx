"use client";

import { Event } from "@/interfaces/event";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { EventTimeline } from "./event-timeline";

type Props = {
  events: Event[];
};

export function UpcomingEvents({ events }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.event_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-24">
      {/* Header with search */}
      <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:justify-between items-start md:items-center mb-8">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          Upcoming Events
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-logo-blue focus:border-transparent"
          />
          <IoSearch className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Timeline */}
      <EventTimeline events={filteredEvents} />

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {searchTerm
              ? "No events found matching your search."
              : "No upcoming events at this time."}
          </div>
        </div>
      )}
    </section>
  );
}
