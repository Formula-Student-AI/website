import { getAllSubTeams } from "@/lib/subteamApi";
import { getAllTeams, getMembersByYear } from "@/lib/teamApi";
import SubTeamGrid from "@/app/components/team/SubTeamGrid";
import MembersSectionClient from "@/app/components/team/members/MembersSectionClient";
import type { TeamMember } from "@/interfaces/team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team | Bristol Formula Student AI",
  description:
    "Check out the team from the Bristol Formula Student AI team.",
  openGraph: {
    title: "Team | Bristol Formula Student AI",
    description:
      "Check out the team from the Bristol Formula Student AI team.",
    type: "website",
  },
};


export default async function TeamLandingPage() {
  const subteams = getAllSubTeams();
  const teams = getAllTeams();

  const yearOptions = teams.map((t) => `${t.start_year}-${t.end_year}`);
  if (yearOptions.length === 0) {
    return (
      <main className="bg-white">
        <section className="relative mx-auto max-w-6xl px-6 py-20">
          <h1 className="text-3xl font-bold">Explore our Teams</h1>
          <p className="mt-4 text-gray-600">No team data available yet.</p>
        </section>
      </main>
    );
  }

  const latestYear = yearOptions[0];
  // 👇 Build-time: read every year's members once
  const allMembersByYear: Record<string, TeamMember[]> = Object.fromEntries(
    yearOptions.map((year) => [year, getMembersByYear(year)]),
  );

  return (
    <main className="bg-white">
      {/* Subteams */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-xs md:text-sm uppercase tracking-widest text-university-red font-semibold">
            Formula Student AI • Teams
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Explore our Teams
          </h1>
          <p className="mt-4 max-w-3xl text-gray-600">
            Learn what each group focuses on. Click a sub-team to see members by
            academic year.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-16">
        <SubTeamGrid subteams={subteams} />
      </section>

      {/* Separator */}
      <div className="relative">
        <div className="mx-auto max-w-6xl px-6">
          <div className="my-6 h-px bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
        </div>
      </div>

      {/* Featured Members */}
      <MembersSectionClient
        allMembersByYear={allMembersByYear}
        defaultYear={latestYear}
        yearOptions={yearOptions}
      />
    </main>
  );
}
