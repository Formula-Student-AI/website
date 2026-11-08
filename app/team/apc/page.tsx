import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getAllTeams, getMembersForSubTeam } from "@/lib/teamApi";
import MembersSectionClient from "@/app/components/team/members/MembersSectionClient";
import ApcHero from "@/app/components/team/apc/ApcHero";
import ApcSubteams from "@/app/components/team/apc/ApcSubteams";
import ApcJourney from "@/app/components/team/apc/ApcJourney";
import { APC_CAD, APC_SUBTEAMS } from "@/app/components/team/apc/apcCar";
import type { TeamMember } from "@/interfaces/team";

const TITLE = "Autonomous Platform Cup";
const SUMMARY =
  "We are building our first car of our own: a low-voltage autonomous EV, designed from a blank sheet and built entirely by students.";

// The photo for "Building it". It appears once this file exists in public/ (on the next deploy).
const BUILD_PHOTO = {
  src: "/subteams/apc/apc_build.jpg",
  alt: "APC team members at the lathe beside the car’s red tube frame",
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

  // Each subteam's lead(s) this year, from the roles in _teams/ (e.g. "Powertrain Team Lead").
  const thisYear = years.length ? allMembersByYear[years[0]] : [];
  const leads: Record<string, string[]> = Object.fromEntries(
    APC_SUBTEAMS.map((subteam) => [
      subteam.name,
      thisYear
        .filter((member) => /\blead\b/i.test(member.role ?? "") && subteam.lead.test(member.role ?? ""))
        .map((member) => member.name),
    ])
  );

  const buildPhoto = existsSync(join(process.cwd(), "public", BUILD_PHOTO.src)) ? BUILD_PHOTO : undefined;

  return (
    <main className="bg-white">
      <ApcHero title={TITLE} summary={SUMMARY} />
      <ApcSubteams leads={leads} />
      <ApcJourney buildPhoto={buildPhoto} />
      {years.length ? (
        <div className="pt-16">
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
