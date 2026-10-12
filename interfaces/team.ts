export type SubTeamType =
  | "apc"
  | "committee"
  | "perception"
  | "planning_and_control"
  | "slam"
  | "static_events"
  | "systems_integration"
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
  "apc",
  "perception",
  "planning_and_control",
  "slam",
  "static_events",
  "systems_integration",
  "web_dev",
] as const satisfies readonly SubTeamType[];

export const SUBTEAM_ORDER_INDEX: Record<SubTeamType, number> =
  Object.fromEntries(SUBTEAM_ORDER.map((k, i) => [k, i])) as Record<
    SubTeamType,
    number
  >;

export const compareSubTeams = (a: SubTeamType, b: SubTeamType) =>
  SUBTEAM_ORDER_INDEX[a] - SUBTEAM_ORDER_INDEX[b];

/** Public labels; keep the underlying keys stable for links and member rosters. */
const SUBTEAM_DISPLAY_NAMES: Partial<Record<SubTeamType, string>> = {
  apc: "Autonomous Platform Cup",
  perception: "DDT: Perception",
  planning_and_control: "DDT: Planning & Control",
  slam: "DDT: SLAM",
  static_events: "Statics",
};

/** Convert a SubTeamType key to a human-readable display name */
export function prettySubTeam(s: string): string {
  if (SUBTEAM_DISPLAY_NAMES[s as SubTeamType]) {
    return SUBTEAM_DISPLAY_NAMES[s as SubTeamType]!;
  }
  return s.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
