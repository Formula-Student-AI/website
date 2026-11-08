import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { SPONSOR_TIERS, type Sponsor, type SponsorTier } from "@/interfaces/sponsor";

const sponsorsDirectory = join(process.cwd(), "_sponsors");
// Untiered sponsors sort after every tier.
const tierRank = (tier?: SponsorTier) =>
  tier ? SPONSOR_TIERS.indexOf(tier) : SPONSOR_TIERS.length;

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
      if (data.tier !== undefined && !SPONSOR_TIERS.includes(data.tier)) {
        throw new Error(
          `Sponsor ${filename} tier must be Platinum, Gold, Silver or Bronze, or omitted.`
        );
      }
      return {
        slug: filename.replace(/\.md$/, ""),
        name: data.name,
        logo: typeof data.logo === "string" ? data.logo : undefined,
        logo_crop_padding: data.logo_crop_padding === true,
        strip_logo: typeof data.strip_logo === "string" ? data.strip_logo : undefined,
        tier: data.tier,
        website_link: typeof data.website_link === "string" ? data.website_link : undefined,
        spotlight_text: typeof data.spotlight_text === "string" ? data.spotlight_text : undefined,
        spotlight_visible: data.spotlight_visible === true,
        content,
      };
    })
    .sort((a, b) => tierRank(a.tier) - tierRank(b.tier) || a.name.localeCompare(b.name));
}
