// Highest tier first; this order drives sorting and the category sections on /sponsors.
export const SPONSOR_TIERS = ["Platinum", "Gold", "Silver", "Bronze"] as const;
export type SponsorTier = (typeof SPONSOR_TIERS)[number];

export interface Sponsor {
  slug: string;
  name: string;
  logo?: string;
  logo_crop_padding?: boolean;
  // Optional alternative logo for the homepage logo strip (falls back to `logo`).
  strip_logo?: string;
  tier?: SponsorTier;
  website_link?: string;
  spotlight_text?: string;
  spotlight_visible: boolean;
  content: string;
}
