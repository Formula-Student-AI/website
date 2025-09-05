import { getAllSubTeams } from "@/lib/subteamApi";
import { getAllTeams, getMembersByYear } from "@/lib/teamApi";
import SubTeamGrid from "@/app/components/team/SubTeamGrid";
import MembersSectionClient from "@/app/components/team/members/MembersSectionClient";
import type { TeamMember } from "@/interfaces/team";

type Params = {
  searchParams?: Promise<{ year?: string }>;
};

export default async function TeamLandingPage(params: Params) {
  const searchParams = await params.searchParams;
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
  const selectedYear =
    searchParams?.year && yearOptions.includes(searchParams.year)
      ? searchParams.year
      : latestYear;

  const allMembers = getMembersByYear(selectedYear);
  const featured: TeamMember[] = allMembers.slice(0, 12);

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
        members={featured}
        selectedYear={selectedYear}
        yearOptions={yearOptions}
      />
    </main>
  );
}
