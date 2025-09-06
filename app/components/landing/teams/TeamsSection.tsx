"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import TeamCard from "@/app/components/landing/teams/TeamCard";
import Modal from "@/app/components/landing/Modal";
import RevealWrapper from "@/app/components/common/RevealWrapper";
import type { SubTeam } from "@/interfaces/team";

const directions = ["up", "down", "left", "right", "scale"] as const;

export default function TeamsSection({ subteams }: { subteams: SubTeam[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const openTeam = useCallback((id: string) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);
  const handleHover = useCallback((id: string | null) => setHoveredId(id), []);

  const active = useMemo(
    () => subteams.find((t) => t.name === openId) || null,
    [openId, subteams]
  );

  return (
    <section className="relative overflow-hidden">
      {/* Background layer that covers entire section including padding */}
      <div className="absolute inset-0 z-0">
        {/* Base background */}
        <div className="absolute inset-0 bg-white" />

        {/* Render all team images */}
        {subteams.map((team) => 
          team.image ? (
            <div key={team.name} className="absolute inset-0">
              <Image
                src={team.image}
                alt={`${team.name} background`}
                fill
                sizes="100vw"
                className={[
                  "object-cover object-center",
                  "transition-opacity duration-[1000ms] ease-in-out",
                  hoveredId === team.name ? "opacity-100" : "opacity-0",
                  "will-change-[opacity] select-none pointer-events-none",
                ].join(" ")}
                priority={hoveredId === team.name}
              />
            </div>
          ) : null
        )}

        {/* Overlay gradient on top of all images */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: "linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1))" 
          }}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10 px-6 pt-24 pb-10 max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Meet the <span className="text-university-red">Teams</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Click a category to learn what each group focuses on.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {subteams.map((t, i) => (
            <RevealWrapper
              key={t.name}
              direction={directions[i % directions.length]}
              delayMs={i * 80}
            >
              <div className="h-full">
                <TeamCard
                  id={t.name}
                  title={pretty(t.name)}
                  summary={t.summary}
                  onOpen={openTeam}
                  onHover={handleHover}
                  className="h-full"
                />
              </div>
            </RevealWrapper>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/team"
            className="inline-block rounded-full bg-university-red px-8 py-3 text-lg font-semibold text-white shadow-md hover:bg-university-red/90 hover:shadow-lg transition-all duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>

      <Modal
        open={!!active}
        onClose={close}
        title={pretty(active?.name ?? "")}
        widthClass="max-w-3xl"
      >
        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: active?.summary ?? "" }}
        />
      </Modal>
    </section>
  );
}

function pretty(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
