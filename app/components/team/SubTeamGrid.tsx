"use client";

import Link from "next/link";
import RevealWrapper from "@/app/components/common/RevealWrapper";
import type { SubTeam, SubTeamType } from "@/interfaces/team";

const directions = ["up", "down", "left", "right", "scale"] as const;

export default function SubTeamGrid({ subteams }: { subteams: SubTeam[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
      {subteams.map((st, i) => (
        <RevealWrapper
          key={st.name}
          direction={directions[i % directions.length]}
          delayMs={i * 60}
        >
          <div>
            <SubTeamLinkCard subteam={st} />
          </div>
        </RevealWrapper>
      ))}
    </div>
  );
}

function SubTeamLinkCard({
  subteam,
  className = "",
}: {
  subteam: SubTeam;
  className?: string;
}) {
  const href = `/team/${subteam.name as SubTeamType}`;

  return (
    <div className={["group relative", className].join(" ")}>
      <Link
        href={href}
        className={[
          "card-visual relative block w-full rounded-2xl border border-gray-200 bg-white shadow-sm",
          "transition-[transform,box-shadow] duration-200 ease-out",
          "hover:shadow-lg focus:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-university-red/60",
          "transform-gpu will-change-transform",
        ].join(" ")}
        style={{
          transform: "translateZ(0) scale(var(--scale,1))",
          transformOrigin: "center",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
        aria-label={`${pretty(subteam.name)} sub-team`}
      >
        {/* Optional cover image */}
        {subteam.image ? (
          <div className="h-36 w-full overflow-hidden rounded-t-2xl">
            <img
              src={subteam.image}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : null}

        {/* Content */}
        <div className="p-6 flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900">
            {/* Title turns red only when *title* is hovered */}
            <span
              className={[
                "inline-block -mx-1 rounded-md px-1",
                "transition-colors duration-200",
                "hover:bg-university-red hover:text-white",
              ].join(" ")}
            >
              {pretty(subteam.name)}
            </span>
          </h3>

          {/* Summary clamped to keep equal heights */}
          {subteam.summary ? (
            <p
              className="mt-2 text-gray-600 line-clamp-3"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {subteam.summary}
            </p>
          ) : null}

          {/* Optional subtle CTA text */}
          <span className="mt-4 text-university-red font-medium">
            View members →
          </span>
        </div>
      </Link>

      <style jsx>{`
        .group:hover .card-visual,
        .group:focus-within .card-visual {
          --scale: 1.015; /* whole card scales subtly (border, bg, shadow, text) */
        }
      `}</style>
    </div>
  );
}

function pretty(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
