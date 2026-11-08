import { Cog, Disc3, Wrench, Zap, type LucideIcon } from "lucide-react";
import { FSAI_TEAMS } from "@/lib/fsaiTeams";

/** The cutaway render of the car, shown as "Fig. 01" on the APC page and on the APC cards. */
export const APC_CAD = {
  src: "/subteams/apc/apc_cad.jpg",
  alt: "A cutaway render of the autonomous EV our APC team is building",
};

/**
 * Numbered parts on the cutaway, front to back. x and y are where each number sits, as a
 * percentage of the image's width and height (re-measure them if the render changes).
 */
export const APC_PARTS = [
  { n: 1, name: "Onboard computer", text: "Runs the software that drives the car.", x: 27.4, y: 82.4 },
  { n: 2, name: "Front suspension", text: "Springs and dampers that keep the tyres on the track.", x: 39.9, y: 83.8 },
  { n: 3, name: "Battery pack", text: "Low-voltage cells, with their management board on top.", x: 57.3, y: 68.5 },
  { n: 4, name: "Spaceframe chassis", text: "The tube frame that everything bolts to.", x: 75.6, y: 24 },
  { n: 5, name: "LiDAR", text: "Scans the cones around the car.", x: 75.4, y: 3.6 },
  { n: 6, name: "Motor controller", text: "Feeds the motor the power it needs.", x: 77.3, y: 67.1 },
  { n: 7, name: "Motor and chain drive", text: "Turns the rear wheels.", x: 82.8, y: 54.7 },
] as const;

export type ApcPart = (typeof APC_PARTS)[number];

/**
 * APC's subteams (the names match the Join us form). "parts" are the numbers in the cutaway;
 * "lead" picks out the subteam's lead from the roles in _teams/.
 */
export const APC_SUBTEAMS: {
  name: (typeof FSAI_TEAMS.APC.subteams)[number];
  icon: LucideIcon;
  text: string;
  parts: number[];
  lead: RegExp;
}[] = [
  {
    name: "Mechanical Design",
    icon: Wrench,
    text: "Designs the chassis, suspension and steering, and makes sure every part fits together and survives the track.",
    parts: [4, 2],
    lead: /mechanical/i,
  },
  {
    name: "Powertrains",
    icon: Cog,
    text: "Turns battery power into motion: the motor, its controller and the chain drive to the rear wheels.",
    parts: [6, 7],
    lead: /powertrain/i,
  },
  {
    name: "Braking Systems",
    icon: Disc3,
    text: "Designs the brakes, including the emergency braking system that brings the car to a safe stop if anything goes wrong.",
    parts: [],
    lead: /brak/i,
  },
  {
    name: "Electrical Systems",
    icon: Zap,
    text: "Powers and connects the car: the battery, the wiring, and the computer and sensors that let it drive itself.",
    parts: [3, 1, 5],
    lead: /electrical/i,
  },
];
