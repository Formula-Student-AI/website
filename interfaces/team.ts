export type SubTeam = "perception" | "planning_and_control" | "slam" | "static" | "committee" | "other";

export interface TeamMember {
  name: string;
  sub_team: SubTeam;
  role: string;
  is_committee: boolean;
  email: string;
  image?: string;
  links?: { [key: string]: string };
}

export interface Team {
  start_year: number;
  end_year: number;
  members: TeamMember[];
  description: string;
}