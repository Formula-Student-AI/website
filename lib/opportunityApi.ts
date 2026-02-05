import { OPPORTUNITY_DIR } from "./constants";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import type { Opportunity } from "@/interfaces/opportunity";

const normalizeStringArray = (value: unknown): string[] | undefined => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }
  if (typeof value === "string") {
    return [value];
  }
  return undefined;
};

export function getOpportunityFilenames() {
  return fs.readdirSync(OPPORTUNITY_DIR);
}

export function getOpportunityBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(OPPORTUNITY_DIR, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const opportunity = {
    ...data,
    slug,
    open_date: new Date(data.open_date),
    close_date: data.close_date ? new Date(data.close_date) : null,
    tags: normalizeStringArray(data.tags),
    requirements: normalizeStringArray(data.requirements),
    responsibilities: normalizeStringArray(data.responsibilities),
    content,
  } as Opportunity;

  return opportunity;
}

export function getAllOpportunities(): Opportunity[] {
  const filenames = getOpportunityFilenames();
  const opportunities = filenames.map(getOpportunityBySlug);

  return opportunities;
}

export function getPublishedOpportunities(): Opportunity[] {
  return getAllOpportunities()
    .filter((opportunity) => opportunity.published)
    .sort((a, b) => (a.open_date > b.open_date ? -1 : 1));
}
