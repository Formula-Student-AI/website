"use client";

import Link from "next/link";
import RevealWrapper from "@/app/components/common/RevealWrapper";
import type { SubTeam, SubTeamType } from "@/interfaces/team";

const directions = ["up", "down", "left", "right", "scale"] as const;

export default function SubTeamGrid({ subteams }: { subteams: SubTeam[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
      {subteams.map((st, i) => (
        <RevealWrapper
          key={st.name}
          direction={directions[i % directions.length]}
          delayMs={i * 60}
        >
          {/* Make the child fill the grid row height */}
          <div className="h-full">
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
    <div className={["group relative h-full", className].join(" ")}>
      <Link
        href={href}
        className={[
          // Fill available height and use column layout
          "card-visual relative block h-full rounded-2xl border border-gray-200 bg-white shadow-sm",
          "flex flex-col",
          // Motion/interaction polish
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
        {/* Fixed-height cover to normalize top section */}
        {subteam.image ? (
          <div className="h-36 w-full overflow-hidden rounded-t-2xl shrink-0">
            <img
              src={subteam.image}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          // Keep height even if no image
          <div className="h-36 w-full rounded-t-2xl bg-gray-50 shrink-0" />
        )}

        {/* Content fills the rest; CTA sticks to bottom */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {/* Title tint only when the title itself is hovered */}
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

          {/* Summary: clamp to 3 lines AND reserve space so heights match */}
          {subteam.summary ? (
            <p
              className="my-2 text-gray-600 line-clamp-3"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                // Reserve ~3 lines: base text (16px) * leading (~1.5) * 3 ≈ 72px
                minHeight: "72px",
              }}
            >
              {subteam.summary}
            </p>
          ) : (
            // If no summary, keep the same vertical space
            <div aria-hidden className="my-2" style={{ minHeight: 72 }} />
          )}

          {/* CTA anchored at the bottom */}
          <span className="mt-auto text-university-red font-medium">
            View members →
          </span>
        </div>
      </Link>

      <style jsx>{`
        .group:hover .card-visual,
        .group:focus-within .card-visual {
          --scale: 1.015;
        }
      `}</style>
    </div>
  );
}

function pretty(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
