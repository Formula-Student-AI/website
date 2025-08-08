import Container from "../components/common/container";
import { Intro } from "../components/events/intro";
import { MajorEvent } from "../components/events/major-event";
import { getAllFutureEvents } from "@/lib/eventApi";

export default function Events() {
  const futureEvents = getAllFutureEvents();
  const majorEvent = futureEvents.find((event) => event.major_event);
  console.log(futureEvents);

  return (
    <main>
      <Container>
        <Intro />
        <MajorEvent event={majorEvent} />
      </Container>
    </main>
  );
}
