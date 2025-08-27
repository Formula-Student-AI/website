"use client";

import { useMemo, useState, useCallback } from "react";
import TeamCard from "@/app/components/landing/teams/TeamCard";
import Modal from "@/app/components/landing/Modal";
import RevealWrapper from "@/app/components/common/RevealWrapper";

type TeamItem = {
  id: string;
  title: string;
  summary: string;
  details: React.ReactNode;
  icon?: React.ReactNode;
};

const directions = ["up", "down", "left", "right", "scale"] as const;

const TEAMS: TeamItem[] = [
  {
    id: "perception",
    title: "Perception Team",
    summary: "Vision, lidar & fusion for robust situational awareness.",
    details: (
      <div className="space-y-4">
        <p>
          We build the sensing stack that helps the car understand the world in
          real time.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Object detection / tracking / segmentation</li>
          <li>Sensor fusion (camera, lidar)</li>
          <li>Datasets, labeling, and evaluation tooling</li>
        </ul>
      </div>
    ),
  },
  {
    id: "planning",
    title: "Planning & Control",
    summary: "Trajectory generation and vehicle control.",
    details: (
      <div className="space-y-4">
        <p>We turn perception into motion with safe, fast decisions.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Racing line & local/global planners</li>
          <li>MPC / PID controllers</li>
          <li>Latency, constraints, and tuning</li>
          <li>Simulation-in-the-loop testing</li>
        </ul>
      </div>
    ),
  },
  {
    id: "systems",
    title: "Systems Integration",
    summary: "ROS graph, middleware, and CI/CD glue.",
    details: (
      <div className="space-y-4">
        <p>We stitch everything together and keep it reliable.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>CI/CD, containerization, reproducibility</li>
          <li>Real-time comms & safety interlocks</li>
        </ul>
      </div>
    ),
  },
  {
    id: "hardware",
    title: "Hardware Team",
    summary: "Compute, sensors, power, mounting, reliability.",
    details: (
      <div className="space-y-4">
        <p>We make sure the car’s hardware is race-ready and robust.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Sensor selection & calibration</li>
          <li>Power delivery & thermal management</li>
          <li>Maintainability</li>
          <li>Trackside diagnostics</li>
        </ul>
      </div>
    ),
  },
  {
    id: "static",
    title: "Static Events",
    summary: "Business plan, design review, cost & manufacturing.",
    details: (
      <div className="space-y-4">
        <p>We win crucial points off-track through strong documentation.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Design report & presentation prep</li>
          <li>Costing & manufacturability analysis</li>
          <li>Team storytelling & branding</li>
          <li>Judging criteria strategy</li>
        </ul>
      </div>
    ),
  },
  {
    id: "webdev",
    title: "Web Dev Team",
    summary: "Web presence, dashboards, internal tooling.",
    details: (
      <div className="space-y-4">
        <p>We build the apps which keep us fast and informed.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Next.js apps & internal portals</li>
          <li>Telemetry visualization</li>
          <li>DevOps, CI, and observability</li>
          <li>Design system & accessibility</li>
        </ul>
      </div>
    ),
  },
];

export default function TeamsSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openTeam = useCallback((id: string) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);
  const active = useMemo(
    () => TEAMS.find((t) => t.id === openId) || null,
    [openId]
  );

  return (
    <section className="relative px-6 py-24 max-w-6xl mx-auto">
      <header className="mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Meet the <span className="text-university-red">Teams</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Click a category to learn what each group focuses on.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {TEAMS.map((t, i) => (
          <RevealWrapper
            key={t.id}
            direction={directions[i % directions.length]}
            delayMs={i * 80}
          >
            <TeamCard
              id={t.id}
              title={t.title}
              summary={t.summary}
              icon={t.icon}
              onOpen={openTeam}
            />
          </RevealWrapper>
        ))}
      </div>

      <Modal
        open={!!active}
        onClose={close}
        title={active?.title}
        widthClass="max-w-3xl"
      >
        {active?.details}
      </Modal>
    </section>
  );
}
