import { TeamMember } from "./team";

export interface Post {
  published: boolean;
  title: string;
  slug: string;
  date: Date;
  coverImage: string;
  excerpt: string;
  content: string;
  author: TeamMember;
  tags?: string[];
}
