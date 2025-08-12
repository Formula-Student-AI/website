export type EventType = "workshop" | "hackathon" | "social" | "other";

export interface Event {
  published: boolean;
  slug: string;
  cancelled: boolean;
  cancel_reason?: string | null;
  title: string;
  date: Date;
  date_end: Date;
  coverImage: string;
  location: string;
  event_type: EventType;
  links?: { [key: string]: string };
  cohost?: string[];
  sponsors?: string[];
  description?: string;
  content?: string;
  created_at?: Date;
  id?: number;
}
