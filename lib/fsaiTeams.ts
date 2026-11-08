/**
 * Our two competition teams and their subteams. The Join us form and the homepage's
 * About us section both read this list, so a change here updates both.
 */
export const FSAI_TEAMS = {
  APC: {
    name: "Autonomous Platform Cup",
    description:
      "Design and build our first car of our own: a low-voltage autonomous EV.",
    subteams: ["Mechanical Design", "Powertrains", "Braking Systems", "Electrical Systems"],
  },
  DDT: {
    name: "Dynamic Driving Task",
    description:
      "Develop the perception, SLAM and control software that drives the ADS-DV, and present our work to the judges at Silverstone.",
    subteams: ["Perception", "Planning & Control", "SLAM", "Systems Integration", "Statics"],
  },
} as const;

export type FsaiTeamKey = keyof typeof FSAI_TEAMS;
