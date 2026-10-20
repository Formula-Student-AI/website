export type SponsorTier = "Gold" | "Silver" | "Bronze";

export interface Sponsor {
  slug: string;
  name: string;
  logo?: string;
  logo_crop_padding?: boolean;
  tier?: SponsorTier;
  website_link?: string;
  spotlight_text?: string;
  spotlight_visible: boolean;
  content: string;
}
