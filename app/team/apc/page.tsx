import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getAllTeams, getMembersForSubTeam } from "@/lib/teamApi";
import MembersSectionClient from "@/app/components/team/members/MembersSectionClient";
import ApcHero from "@/app/components/team/apc/ApcHero";
import ApcSubteams from "@/app/components/team/apc/ApcSubteams";
import ApcJourney from "@/app/components/team/apc/ApcJourney";
import { APC_CAD } from "@/app/components/team/apc/apcCar";
import type { TeamMember } from "@/interfaces/team";

const TITLE = "Autonomous Platform Cup";
const SUMMARY =
  "We are building Bristol’s first autonomous EV: a low-voltage car designed from a blank sheet and built entirely by students.";

// The photo for "Building it". It appears once this file exists in public/ (on the next deploy).
const BUILD_PHOTO = {
  src: "/subteams/apc/apc_build.jpg",
  alt: "The car’s tube-frame chassis on its wheels in the workshop",
};

export const metadata: Metadata = {
  title: `${TITLE} | Bristol Formula Student AI`,
  description: SUMMARY,
  openGraph: {
    title: `${TITLE} | Bristol Formula Student AI`,
    description: SUMMARY,
    images: [{ url: APC_CAD.src, alt: APC_CAD.alt }],
  },
};

export default function ApcPage() {
  const years = getAllTeams().map((t) => `${t.start_year}-${t.end_year}`);
  const allMembersByYear: Record<string, TeamMember[]> = Object.fromEntries(
    years.map((year) => [year, getMembersForSubTeam(year, "apc")])
  );

  const buildPhoto = existsSync(join(process.cwd(), "public", BUILD_PHOTO.src)) ? BUILD_PHOTO : undefined;

  return (
    <main className="bg-white">
      <ApcHero title={TITLE} summary={SUMMARY} />
      <ApcSubteams />
      <ApcJourney buildPhoto={buildPhoto} />
      {years.length ? (
        // Line the shared members section up with the APC sections above (it is narrower by default).
        <div className="container mx-auto px-4 pt-16 [&>section]:max-w-none [&>section]:px-0">
          <MembersSectionClient
            allMembersByYear={allMembersByYear}
            defaultYear={years[0]}
            yearOptions={years}
          />
        </div>
      ) : null}
    </main>
  );
}
