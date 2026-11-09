import type { Metadata } from "next";
import TeamHero from "@/app/components/team/TeamHero";
import SectionTitle from "@/app/components/team/SectionTitle";
import DdtSystems, { type DdtSystem } from "@/app/components/team/ddt/DdtSystems";
import { loadSubTeamDocsMap } from "@/lib/subteamApi";
import { FSAI_TEAMS } from "@/lib/fsaiTeams";
import type { SubTeamType } from "@/interfaces/team";

const TITLE = "Dynamic Driving Task";
const SUMMARY =
  "Develops the perception, SLAM and control software that drives the IMechE’s ADS-DV.";
// Also the DDT card's photo on the homepage and the Team page.
const HERO_IMAGE = "/subteams/ddt/ddt_hero.jpg";
const VIDEO = "/subteams/ddt/silverstone_run.mp4";
const VIDEO_POSTER = "/subteams/ddt/silverstone_run_poster.jpg";

export const metadata: Metadata = {
  title: `${TITLE} | Bristol Formula Student AI`,
  description: SUMMARY,
  openGraph: {
    title: `${TITLE} | Bristol Formula Student AI`,
    description: SUMMARY,
    images: [{ url: HERO_IMAGE, alt: "The ADS-DV driving itself through a cone course at Silverstone" }],
  },
};

/**
 * The DDT teams in the order the car uses them: see the cones, work out where it is, decide where
 * to go, keep everything talking, then present it all to the judges. Each team's summary and
 * picture come from its file in _subteams/; the names match the Join us form.
 */
const SYSTEMS: {
  name: (typeof FSAI_TEAMS.DDT.subteams)[number];
  slug: SubTeamType;
  stage: string;
  animated?: DdtSystem["animated"];
}[] = [
  { name: "Perception", slug: "perception", stage: "Sense" },
  { name: "SLAM", slug: "slam", stage: "Locate" },
  {
    name: "Planning & Control",
    slug: "planning_and_control",
    stage: "Decide",
    // The same animation as planning_control_hero.gif, at an eighth of the size.
    animated: {
      src: "/subteams/planning_control_hero.webp",
      still: "/subteams/planning_control_still.webp",
    },
  },
  { name: "Systems Integration", slug: "systems_integration", stage: "Connect" },
  { name: "Statics", slug: "static_events", stage: "Present" },
];

export default function DdtPage() {
  const docs = loadSubTeamDocsMap();
  const systems: DdtSystem[] = SYSTEMS.map(({ name, slug, stage, animated }) => {
    const doc = docs.get(slug);
    if (!doc) throw new Error(`The DDT page lists "${slug}", but _subteams/ has no file for it.`);
    const summary = doc.summary.trim();
    return {
      name,
      href: `/team/${slug}`,
      stage,
      summary: !summary || /[.!?]$/.test(summary) ? summary : `${summary}.`,
      image: doc.image,
      animated,
    };
  });

  return (
    <main className="bg-white">
      <TeamHero image={HERO_IMAGE} title={TITLE} summary={SUMMARY} />

      <DdtSystems systems={systems} />

      <section aria-labelledby="ddt-in-action" className="pb-20 md:pb-28">
        <div className="container mx-auto px-4">
          <SectionTitle id="ddt-in-action">See it in action</SectionTitle>
          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-600">
            Our first ever Trackdrive lap and dynamic event points!
          </p>
          <div className="mx-auto w-full lg:w-[80%]">
            <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-xl ring-1 ring-gray-900/10">
              <video
                className="h-full w-full"
                controls
                muted
                playsInline
                preload="metadata"
                poster={VIDEO_POSTER}
              >
                <source src={VIDEO} type="video/mp4" />
                Your browser can’t play this video. <a href={VIDEO}>Download it</a> instead.
              </video>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
