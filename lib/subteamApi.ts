import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { SUBTEAM_DIR } from "./constants";
import { SubTeamType, SUBTEAM_ORDER } from "@/interfaces/team";

export type SubTeamDoc = {
  name: SubTeamType; 
  image?: string; 
  description: string;
};

let _cache: Map<SubTeamType, SubTeamDoc> | null = null;

function isSubTeamType(v: unknown): v is SubTeamType {
  return (
    typeof v === "string" &&
    (SUBTEAM_ORDER as readonly string[]).includes(v as string)
  );
}

function listMarkdownFiles(dir: string): string[] {
  return fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".md"))
    : [];
}

export function loadSubTeamDocsMap(): Map<SubTeamType, SubTeamDoc> {
  if (_cache) return _cache;

  const map = new Map<SubTeamType, SubTeamDoc>();
  for (const file of listMarkdownFiles(SUBTEAM_DIR)) {
    const full = join(SUBTEAM_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);

    const name = (data as Record<string, unknown>)?.name;
    if (!isSubTeamType(name)) continue;

    map.set(name, {
      name,
      image: (data as Record<string, unknown>)?.image as string | undefined,
      description: (content ?? "").trim(),
    });
  }

  _cache = map;
  return map;
}

export function resetSubTeamDocsCache() {
  _cache = null;
}
