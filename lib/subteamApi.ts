import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { SUBTEAM_DIR } from "./constants";
import { SubTeamType, SUBTEAM_ORDER, SubTeam } from "@/interfaces/team";

let _cache: Map<SubTeamType, SubTeam> | null = null;

const isSubTeamType = (v: unknown): v is SubTeamType =>
  typeof v === "string" &&
  (SUBTEAM_ORDER as readonly string[]).includes(v as string);

const listMarkdownFiles = (dir: string): string[] =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".md"))
    : [];

/** first-paragraph extractor for fallback */
function firstParagraph(md: string): string {
  const trimmed = (md || "").trim();
  const para = trimmed.split(/\n\s*\n/)[0] || "";
  return para
    .replace(/^#.+\n/, "")
    .replace(/\*\*?|__|`/g, "")
    .trim();
}

export function loadSubTeamDocsMap(): Map<SubTeamType, SubTeam> {
  if (_cache) return _cache;

  const map = new Map<SubTeamType, SubTeam>();
  for (const file of listMarkdownFiles(SUBTEAM_DIR)) {
    const full = join(SUBTEAM_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);

    const name = (data as Record<string, unknown>)?.name;
    if (!isSubTeamType(name)) continue;

    const summary =
      ((data as Record<string, unknown>)?.summary as string | undefined) ??
      firstParagraph(content) ??
      "";

    map.set(name, {
      name,
      image: (data as Record<string, unknown>)?.image as string | undefined,
      summary: summary.trim(),
      description: (content ?? "").trim(),
    });
  }

  _cache = map;
  return map;
}

export function resetSubTeamDocsCache() {
  _cache = null;
}

export function getAllSubTeams(): SubTeam[] {
  return Array.from(loadSubTeamDocsMap().values()).sort(
    (a, b) => SUBTEAM_ORDER.indexOf(a.name) - SUBTEAM_ORDER.indexOf(b.name)
  );
}
