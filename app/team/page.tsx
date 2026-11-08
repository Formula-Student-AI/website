import { getAllTeams, getMembersByYear } from "@/lib/teamApi";
import MembersSectionClient from "@/app/components/team/members/MembersSectionClient";
import TeamSplitCards from "@/app/components/team/TeamSplitCards";
import BrandGlow from "@/app/components/common/BrandGlow";
import type { TeamMember } from "@/interfaces/team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team | Bristol Formula Student AI",
  description:
    "Meet the Bristol Formula Student AI team: our Dynamic Driving Task (DDT) and Autonomous Platform Cup (APC) teams, and everyone in them by academic year.",
  openGraph: {
    title: "Team | Bristol Formula Student AI",
    description:
      "Meet the Bristol Formula Student AI team: our Dynamic Driving Task (DDT) and Autonomous Platform Cup (APC) teams, and everyone in them by academic year.",
    type: "website",
  },
};

export default async function TeamLandingPage() {
  const teams = getAllTeams();
  const yearOptions = teams.map((t) => `${t.start_year}-${t.end_year}`);

  // Build-time: read every year's members once
  const allMembersByYear: Record<string, TeamMember[]> = Object.fromEntries(
    yearOptions.map((year) => [year, getMembersByYear(year)]),
  );

  return (
    <main className="bg-white">
      {/* The two teams */}
      <section className="relative isolate overflow-hidden bg-logo-blue text-white">
        <BrandGlow />
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="text-xs md:text-sm uppercase tracking-widest text-red-300 font-semibold">
            Formula Student AI • Teams
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
            Explore our Teams
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/75">
            We are split into two teams. Pick one to see what it works on, or scroll down to meet
            everyone.
          </p>
          <div className="mt-10 md:mt-12">
            <TeamSplitCards titleAs="h2" />
          </div>
        </div>
      </section>

      {/* Members by academic year */}
      {yearOptions.length ? (
        <div className="pt-16">
          <MembersSectionClient
            allMembersByYear={allMembersByYear}
            defaultYear={yearOptions[0]}
            yearOptions={yearOptions}
          />
        </div>
      ) : (
        <p className="mx-auto max-w-6xl px-6 py-16 text-gray-600">No team data available yet.</p>
      )}
    </main>
  );
}
