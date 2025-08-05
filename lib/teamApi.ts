import { TEAM_DIR } from "./constants";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { Team, TeamMember } from "@/interfaces/team";
import { CURRENT_ACADEMIC_YEAR } from "./constants";

export function getTeamFilenames() {
  return fs.readdirSync(TEAM_DIR);
}

export function getTeamBySlug(slug: string): Team {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(TEAM_DIR, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const team = {
    ...data,
    description: content,
  } as Team;

  return team;
}

export function getAllTeams(): Team[] {
  const filenames = getTeamFilenames();
  const teams = filenames
    .map(getTeamBySlug)
    .sort((a, b) => a.start_year - b.start_year); // Sort by start year, newest first
  return teams;
}

export function getTeamMemberByEmail(email: string): TeamMember | undefined {
  const team = getTeamBySlug(CURRENT_ACADEMIC_YEAR);
  return team.members.find((member) => member.email === email);
}
