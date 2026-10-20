import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import type { Sponsor, SponsorTier } from "@/interfaces/sponsor";

const sponsorsDirectory = join(process.cwd(), "_sponsors");
const tierOrder: Record<SponsorTier, number> = { Gold: 0, Silver: 1, Bronze: 2 };

export function getAllSponsors(): Sponsor[] {
  return fs.readdirSync(sponsorsDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename): Sponsor => {
      const { data, content } = matter(
        fs.readFileSync(join(sponsorsDirectory, filename), "utf8")
      );
      if (typeof data.name !== "string" || !data.name.trim()) {
        throw new Error(`Sponsor ${filename} must have a name.`);
      }
      if (data.tier !== undefined &&
          data.tier !== "Gold" && data.tier !== "Silver" && data.tier !== "Bronze") {
        throw new Error(`Sponsor ${filename} tier must be Gold, Silver or Bronze, or omitted.`);
      }
      return {
        slug: filename.replace(/\.md$/, ""),
        name: data.name,
        logo: typeof data.logo === "string" ? data.logo : undefined,
        logo_crop_padding: data.logo_crop_padding === true,
        tier: data.tier,
        website_link: typeof data.website_link === "string" ? data.website_link : undefined,
        spotlight_text: typeof data.spotlight_text === "string" ? data.spotlight_text : undefined,
        spotlight_visible: data.spotlight_visible === true,
        content,
      };
    })
    .sort((a, b) =>
      (a.tier ? tierOrder[a.tier] : 3) - (b.tier ? tierOrder[b.tier] : 3) ||
      a.name.localeCompare(b.name)
    );
}
