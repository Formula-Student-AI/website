export type OpportunityType =
  | "team_role"
  | "internship"
  | "volunteer"
  | "part_time"
  | "full_time"
  | "other";

export interface Opportunity {
  published: boolean;
  featured?: boolean;
  slug: string;
  title: string;
  summary: string;
  description?: string;
  content?: string;
  coverImage?: string;
  location?: string;
  remote?: boolean;
  opportunity_type: OpportunityType;
  open_date: Date;
  close_date?: Date | null;
  requirements?: string[];
  responsibilities?: string[];
  tags?: string[];
  links?: Record<string, string>;
  application_form_url?: string;
  contact_email?: string;
  created_at?: Date;
  id?: number;
}
