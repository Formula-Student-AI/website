import { getEventBySlug } from "@/lib/eventApi";
import { notFound } from "next/navigation";

type Params = { params: Promise<{ slug: string }> };

export default async function EventPage({ params }: Params) {
  const slug = (await params).slug;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return <div>EventPage</div>;
}