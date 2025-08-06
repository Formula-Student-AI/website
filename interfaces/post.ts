import { TeamMember } from "./team";

export interface Post {
  published: boolean;
  featured: boolean;
  title: string;
  slug: string;
  date: Date;
  coverImage: string;
  excerpt: string;
  content: string;
  author: TeamMember;
  tags?: string[];
}
