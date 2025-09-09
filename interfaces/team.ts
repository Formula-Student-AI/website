export type SubTeamType =
  | "perception"
  | "planning_and_control"
  | "committee"
  | "systems_integration"
  | "static_events"
  | "web_dev";

export interface TeamMember {
  name: string;
  sub_team: SubTeamType;
  role: string;
  email: string;
  image?: string;
  links?: Record<string, string>;
}

export interface SubTeam {
  name: SubTeamType;
  image?: string;
  summary: string;
  description: string;
}

export interface Team {
  start_year: number;
  end_year: number;
  sub_teams: SubTeam[];
  description: string;
}

/** Ordering helpers */
export const SUBTEAM_ORDER = [
  "committee",
  "systems_integration",
  "perception",
  "planning_and_control",
  "static_events",
  "web_dev",
] as const satisfies readonly SubTeamType[];

export const SUBTEAM_ORDER_INDEX: Record<SubTeamType, number> =
  Object.fromEntries(SUBTEAM_ORDER.map((k, i) => [k, i])) as Record<
    SubTeamType,
    number
  >;

export const compareSubTeams = (a: SubTeamType, b: SubTeamType) =>
  SUBTEAM_ORDER_INDEX[a] - SUBTEAM_ORDER_INDEX[b];
