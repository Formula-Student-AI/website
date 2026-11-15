import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { TEAM_DIR, CURRENT_ACADEMIC_YEAR } from "./constants";
import {
  Team,
  TeamMember,
  SubTeam,
  SubTeamType,
  compareSubTeams,
} from "@/interfaces/team";
import { loadSubTeamDocsMap } from "./subteamApi";

export function getTeamFilenames(): string[] {
  return fs.existsSync(TEAM_DIR)
    ? fs.readdirSync(TEAM_DIR).filter((f) => f.toLowerCase().endsWith(".md"))
    : [];
}

function getFlatMembersForYear(slug: string): TeamMember[] {
  const real = slug.replace(/\.md$/i, "");
  const full = join(TEAM_DIR, `${real}.md`);
  const raw = fs.readFileSync(full, "utf8");
  const { data } = matter(raw);
  const members = (data as unknown as { members?: TeamMember[] }).members;
  return Array.isArray(members) ? members : [];
}

export function getTeamBySlug(slug: string): Team {
  const real = slug.replace(/\.md$/i, "");
  const full = join(TEAM_DIR, `${real}.md`);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);

  const start_year = Number((data as unknown as { start_year?: number }).start_year);
  const end_year = Number((data as unknown as { end_year?: number }).end_year);

  // Build subteam metas by enriching from static docs
  const docs = loadSubTeamDocsMap();
  const metas: SubTeam[] = Array.from(docs.values())
    .sort((a, b) => compareSubTeams(a.name, b.name))
    .map((d) => ({
      name: d.name,
      image: d.image,
      summary: d.summary,
      description: d.description,
    }));

  return {
    start_year,
    end_year,
    sub_teams: metas,
    description: content ?? "",
  };
}

export function getAllTeams(): Team[] {
  return getTeamFilenames()
    .map(getTeamBySlug)
    .sort((a, b) => b.start_year - a.start_year);
}

// President/project leads, committee and team leads together, then other members.
function memberGroup(member: TeamMember): number {
  if (/\bpresident\b|\bproject (lead|manager)\b/i.test(member.role)) return 0;
  const teams = Array.isArray(member.sub_team) ? member.sub_team : [member.sub_team];
  if (teams.includes("committee") || /\b(treasurer|secretary|social sec)\b|business.*sponsorship/i.test(member.role)) return 1;
  if (/\blead\b/i.test(member.role)) return 1;
  return 2;
}

/** members by year slug (e.g. "2024-2025") **/
export function getMembersByYear(slug: string): TeamMember[] {
  return getFlatMembersForYear(slug).sort((a, b) =>
    memberGroup(a) - memberGroup(b) || Number(Boolean(b.image)) - Number(Boolean(a.image))
  );
}

/** members by year slug + subteam **/
export function getMembersForSubTeam(
  slug: string,
  subteam: SubTeamType
): TeamMember[] {
  return getMembersByYear(slug)
    .filter((member) =>
      Array.isArray(member.sub_team)
        ? member.sub_team.includes(subteam)
        : member.sub_team === subteam
    )
    // Keep leads ahead of members, even when a lead has no photo.
    .sort((a, b) => Number(/\blead\b/i.test(b.role)) - Number(/\blead\b/i.test(a.role)));
}

export function getTeamMemberByEmail(email: string): TeamMember | undefined {
  // Authors remain valid after they leave the current year's roster.
  const years = [
    CURRENT_ACADEMIC_YEAR,
    ...getTeamFilenames()
      .map((filename) => filename.replace(/\.md$/i, ""))
      .filter((year) => year !== CURRENT_ACADEMIC_YEAR)
      .sort((a, b) => b.localeCompare(a)),
  ];

  for (const year of years) {
    const member = getFlatMembersForYear(year).find((m) => m.email === email);
    if (member) return member;
  }

  return undefined;
}
