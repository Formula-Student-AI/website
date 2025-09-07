import { notFound } from "next/navigation";
import { getAllTeams, getMembersForSubTeam,  } from "@/lib/teamApi";
import { loadSubTeamDocsMap } from "@/lib/subteamApi";
import markdownToHtml from "@/lib/markdownToHtml";
import type { SubTeamType, TeamMember } from "@/interfaces/team";
import SubTeamView from "@/app/components/team/SubTeamView";
import { Metadata } from "next";
import { DEFAULT_AVATAR } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const docs = loadSubTeamDocsMap();
  return Array.from(docs.keys()).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const slug = (await props.params).slug as SubTeamType;
  const docs = loadSubTeamDocsMap();
  const doc = docs.get(slug);

  if (!doc) {
    notFound();
  }

  const team_name = pretty(doc.name);
  const title = `${team_name} | Bristol Formula Student AI`;

  return {
    title,
    description: doc.summary,
    openGraph: {
      title,
      description: doc.summary,
      images: [{ url: doc.image || DEFAULT_AVATAR, alt: team_name }],
    },
  };
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

function pretty(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}