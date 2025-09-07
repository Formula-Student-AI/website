import { notFound } from "next/navigation";
import { getAllTeams, getMembersForSubTeam } from "@/lib/teamApi";
import { loadSubTeamDocsMap } from "@/lib/subteamApi";
import markdownToHtml from "@/lib/markdownToHtml";
import type { SubTeamType, TeamMember } from "@/interfaces/team";
import SubTeamView from "@/app/components/team/SubTeamView";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const docs = loadSubTeamDocsMap();
  return Array.from(docs.keys()).map((slug) => ({ slug }));
}

export default async function SubTeamPage({ params }: PageProps) {
  const slug = (await params).slug as SubTeamType;

  const docs = loadSubTeamDocsMap();
  const doc = docs.get(slug);
  if (!doc) return notFound();

  const teams = getAllTeams();
  const yearOptions = teams.map((t) => `${t.start_year}-${t.end_year}`);
  if (!yearOptions.length) return notFound();

  const defaultYear = yearOptions[0];

  const allMembersByYear: Record<string, TeamMember[]> = Object.fromEntries(
    yearOptions.map((year) => [year, getMembersForSubTeam(year, slug)])
  );

  const descriptionHtml = await markdownToHtml(doc.description || "");

  return (
    <SubTeamView
      subteamKey={slug}
      bannerImage={doc.image}
      summary={doc.summary}
      descriptionHtml={descriptionHtml}
      allMembersByYear={allMembersByYear}
      defaultYear={defaultYear}
      yearOptions={yearOptions}
    />
  );
}
