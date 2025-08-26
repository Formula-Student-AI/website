import Container from "../components/common/container";
import { Intro } from "../components/events/intro";
import { MajorEvent } from "../components/events/major-event";
import { getAllFutureEvents } from "@/lib/eventApi";
import { Metadata } from "next";
import { UpcomingEvents } from "../components/events/upcoming-events";

export const metadata: Metadata = {
  title: "Events | Bristol Formula Student AI",
  description:
    "Check out the latest events from the Bristol Formula Student AI team.",
  openGraph: {
    title: "Events | Bristol Formula Student AI",
    description:
      "Check out the latest events from the Bristol Formula Student AI team.",
    type: "website",
  },
};

export default function Events() {
  const futureEvents = getAllFutureEvents();
  const majorEvent = futureEvents.find((event) => event.major_event);

  return (
    <main>
      <Container>
        <Intro />
        <MajorEvent event={majorEvent} />
        <UpcomingEvents events={futureEvents} />
      </Container>
    </main>
  );
}
