export interface TeamMember {
  name: string;
  is_committee: boolean;
  role: string;
  email: string;
  image: string;
  links: { [key: string]: string };
}