import { notFound } from "next/navigation";
import { getAllTeams, getMembersForSubTeam } from "@/lib/teamApi";
import { loadSubTeamDocsMap } from "@/lib/subteamApi";
import markdownToHtml from "@/lib/markdownToHtml";
import type { SubTeamType } from "@/interfaces/team";
import SubTeamView from "@/app/components/team/SubTeamView";

type PageProps = {
  params: { slug: string };
  searchParams: { year?: string };
};

export async function generateStaticParams() {
  const docs = loadSubTeamDocsMap();
  return Array.from(docs.keys()).map((name) => ({ slug: name }));
}

export default async function SubTeamPage({ params, searchParams }: PageProps) {
  const slug = (await params).slug as SubTeamType;

  const docs = loadSubTeamDocsMap();
  const doc = docs.get(slug);
  if (!doc) return notFound();

  const teams = getAllTeams();
  const yearOptions = teams.map((t) => `${t.start_year}-${t.end_year}`);

  const year = (await searchParams).year;
  const selectedYear =
    year && yearOptions.includes(year) ? year : yearOptions[0];

  const descriptionHtml = await markdownToHtml(doc.description || "");

  const members = selectedYear ? getMembersForSubTeam(selectedYear, slug) : [];
  console.log(doc.image);

  return (
    <SubTeamView
      subteamKey={slug}
      bannerImage={doc.image}
      summary={doc.summary}
      descriptionHtml={descriptionHtml}
      members={members}
      yearOptions={yearOptions}
      selectedYear={selectedYear ?? ""}
    />
  );
}
