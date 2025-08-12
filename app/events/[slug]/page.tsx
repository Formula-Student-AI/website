import Container from "@/app/components/common/container";
import { EventTitle } from "@/app/components/events/event-title";
import { getAllEvents, getEventBySlug } from "@/lib/eventApi";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventGrids } from "@/app/components/events/event-grids";
import markdownToHtml from "@/lib/markdownToHtml";
import { EventContent } from "@/app/components/events/event-content";

type Params = { params: Promise<{ slug: string }> };

export default async function EventPage({ params }: Params) {
  const slug = (await params).slug;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const content = await markdownToHtml(event.content || "");

  return (
    <main>
      <Container>
        <article className="mt-16 mb-32 space-y-15">
          <EventTitle>{event.title}</EventTitle>
          <EventGrids
            event={event}
            leftChildren={
              content && (
                <div className="mt-6">
                  <EventContent content={content} />
                </div>
              )
            }
          />
        </article>
      </Container>
    </main>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const slug = (await props.params).slug;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const title = `${event.title} | Bristol Formula Student AI`;

  return {
    title,
    description: event.description,
    openGraph: {
      title,
      description: event.description,
      images: [{ url: event.coverImage, alt: event.title }],
    },
  };
}

export async function generateStaticParams() {
  const events = getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}
