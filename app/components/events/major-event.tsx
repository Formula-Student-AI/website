"use client";

import { Event } from "@/interfaces/event";
import CoverImage from "../posts/cover-image";
import Link from "next/link";
import DateFormatter from "../common/date-formatter";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

type Props = {
  event?: Event;
};

export function MajorEvent({ event }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!event) {
    return null;
  }

  return (
    <section className="mb-24 md:mb-30">
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        Major Event
      </h2>
      <div className="group relative rounded-2xl shadow-2xl shadow-logo-blue/45 hover:shadow-logo-blue/80 overflow-hidden transition-all duration-600">
        <div className="absolute inset-0 pointer-events-none z-0">
          {isMounted && <Confetti recycle={true} numberOfPieces={100} />}
        </div>

        <div className="relative z-10 md:grid md:grid-cols-2 md:gap-x-8">
          {/* Image on the left */}
          <div className="p-8 scale-95 group-hover:scale-100 transition-transform duration-600">
            <CoverImage
              title={event.title}
              src={event.coverImage}
              slug={event.slug}
            />
          </div>

          {/* Text descriptions on the right */}
          <div className="p-8 flex flex-col justify-center">
            <h3 className="mb-4 -ml-4 text-4xl lg:text-5xl leading-tight font-bold">
              <Link
                href={`/events/${event.slug}`}
                className="inline-block px-4 py-2 text-logo-blue group-hover:bg-logo-blue group-hover:text-white group-active:bg-logo-blue group-active:text-white hover:underline transition-all duration-600"
              >
                {event.title}
              </Link>
            </h3>
            <div className="mb-4 text-lg">
              <DateFormatter date={event.date} />
            </div>
            <div className="mb-2 text-lg font-semibold text-university-red">
              {event.location}
            </div>
            <div className="mb-6 text-sm uppercase tracking-wide text-gray-600">
              {event.event_type}
            </div>

            {event.ticket_link && (
              <div className="mb-4">
                <Link
                  href={event.ticket_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-university-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Get Tickets
                </Link>
              </div>
            )}
            {event.cohost && event.cohost.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold">Co-hosted with: </span>
                <span className="text-gray-700">{event.cohost.join(", ")}</span>
              </div>
            )}
            {event.sponsors && event.sponsors.length > 0 && (
              <div>
                <span className="font-semibold">Sponsored by: </span>
                <span className="text-gray-700">
                  {event.sponsors.join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
