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
import { loadSubTeamDocsMap, type SubTeamDoc } from "./subteamApi";

export function getTeamFilenames(): string[] {
  return fs.existsSync(TEAM_DIR)
    ? fs.readdirSync(TEAM_DIR).filter((f) => f.toLowerCase().endsWith(".md"))
    : [];
}

function groupMembersIntoSubTeams(
  members: TeamMember[] | undefined
): SubTeam[] {
  if (!members?.length) return [];

  const byName = new Map<SubTeamType, SubTeam>();
  const ensure = (name: SubTeamType) => {
    let bucket = byName.get(name);
    if (!bucket) {
      bucket = { name, members: [], description: "" };
      byName.set(name, bucket);
    }
    return bucket;
  };

  for (const m of members) {
    ensure(m.sub_team).members.push(m);
  }

  const out = Array.from(byName.values());
  out.sort((a, b) => compareSubTeams(a.name, b.name));
  return out;
}

function enrichSubTeamsWithStatic(subTeams: SubTeam[]): SubTeam[] {
  const docs = loadSubTeamDocsMap();
  return subTeams.map((st) => {
    const doc: SubTeamDoc | undefined = docs.get(st.name);
    return {
      ...st,
      image: st.image ?? doc?.image,
      description: st.description?.trim().length
        ? st.description
        : doc?.description ?? "",
    };
  });
}

/* -------- public API -------- */
export function getTeamBySlug(slug: string): Team {
  const realSlug = slug.replace(/\.md$/i, "");
  const full = join(TEAM_DIR, `${realSlug}.md`);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);

  const start_year = Number((data as Record<string, unknown>)?.start_year);
  const end_year = Number((data as Record<string, unknown>)?.end_year);
  const flatMembers = (data as Record<string, unknown>)?.members as
    | TeamMember[]
    | undefined;

  const grouped = groupMembersIntoSubTeams(flatMembers);
  const sub_teams = enrichSubTeamsWithStatic(grouped);

  return {
    start_year,
    end_year,
    sub_teams,
    description: content ?? "",
  };
}

export function getAllTeams(): Team[] {
  return getTeamFilenames()
    .map(getTeamBySlug)
    .sort((a, b) => b.start_year - a.start_year);
}

export function getTeamMemberByEmail(email: string): TeamMember | undefined {
  const team = getTeamBySlug(CURRENT_ACADEMIC_YEAR);
  return team.sub_teams
    .flatMap((st) => st.members)
    .find((m) => m.email === email);
}
