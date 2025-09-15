import { Event } from "@/interfaces/event";
import CoverImage from "@/app/components/common/cover-image";
import { isSameDay } from "date-fns";
import { DEFAULT_TIMEZONE } from "@/lib/constants";
import { DetailsCard } from "./details-card";
import { CancelBanner } from "./cancel-banner";
import { CohostsList } from "./cohosts-list";
import { WhereCard } from "./where-card";
import { SponsorsList } from "./sponsors-list";
import { WhenCard } from "./when-card";
import markdownToHtml from "@/lib/markdownToHtml";
import { EventContent } from "./event-content";

type Props = {
  event: Event;
};

async function LeftColumn({ event }: { event: Event }) {
  const content = await markdownToHtml(event.content || "");

  return (
    <div className="space-y-6 lg:col-span-6">
      <div className="overflow-hidden rounded-xl">
        <div className="m-6 p-6 border-8 border-university-red border-dashed rounded-2xl">
          <div className="p-10 border-8 border-logo-blue rounded-2xl">
            <CoverImage title={event.title} src={event.coverImage} />
          </div>
        </div>
        {(event.cohost?.length || event.sponsors?.length) && (
          <div className="p-4 dark:border-zinc-800">
            <CohostsList cohost={event.cohost} />
            <SponsorsList sponsors={event.sponsors} />
          </div>
        )}
      </div>

      {content && (
        <div className="mt-6">
          <EventContent content={content} />
        </div>
      )}
    </div>
  );
}

function RightColumn({ event }: { event: Event }) {
  const dateLine = new Intl.DateTimeFormat("en-GB", {
    timeZone: DEFAULT_TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(event.date);
  const sameDay = isSameDay(event.date, event.date_end);
  const tz = new Intl.DateTimeFormat("en-GB", {
    timeZone: DEFAULT_TIMEZONE,
    timeZoneName: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(event.date).split(" ").pop();
  const startTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: DEFAULT_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(event.date);
  const endTimeSameDay = new Intl.DateTimeFormat("en-GB", {
    timeZone: DEFAULT_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(event.date_end);
  const endDateDifferentDay = new Intl.DateTimeFormat("en-GB", {
    timeZone: DEFAULT_TIMEZONE,
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(event.date_end);
  const timeRangeLine = sameDay
    ? `${startTime} - ${endTimeSameDay} ${tz}`
    : `${startTime} - ${endDateDifferentDay} ${tz}`;

  return (
    <div className="space-y-6 lg:col-span-4 lg:sticky lg:top-24 lg:h-fit">
      <WhenCard
        date={event.date}
        dateLine={dateLine}
        timeRangeLine={timeRangeLine}
      />
      <WhereCard
        location={event.location}
        googleMaps={event.links?.google_maps ?? undefined}
      />
      <DetailsCard event={event} />
    </div>
  );
}

export async function EventGrids({ event }: Props) {
  return (
    <section className="mt-6 md:mt-8">
      <CancelBanner
        cancelled={event.cancelled}
        cancelReason={event.cancel_reason}
      />

      {/* Responsive grid: 2 columns on lg+ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
        {/* Left column: Cover image (+ Cohosts/Sponsors) and additional content */}
        <LeftColumn event={event} />

        {/* Right column: When + Where + Details cards */}
        <RightColumn event={event} />
      </div>
    </section>
  );
}
