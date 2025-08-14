"use client";

import { useInView } from "@/app/hooks/useInView";
import React from "react";

type Direction = "up" | "down" | "left" | "right" | "scale";

export default function TeamCard({
  id,
  title,
  summary,
  direction = "up",
  delayMs = 0,
  icon,
  onOpen,
}: {
  id: string;
  title: string;
  summary?: string;
  direction?: Direction;
  delayMs?: number;
  icon?: React.ReactNode;
  onOpen: (id: string) => void;
}) {
  const { ref, visible } = useInView<HTMLDivElement>({
    threshold: 0.2,
    once: true,
  });

  const revealFrom =
    direction === "up"
      ? "translateY(24px)"
      : direction === "down"
      ? "translateY(-24px)"
      : direction === "left"
      ? "translateX(-24px)"
      : direction === "right"
      ? "translateX(24px)"
      : "scale(0.96)";

  return (
    // OUTER: one-off reveal
    <div
      ref={ref}
      className="opacity-0 will-change-[transform,opacity]"
      style={
        visible
          ? ({
              animation: "team-reveal 480ms ease-out forwards",
              animationDelay: `${delayMs}ms`,
              ["--reveal-from" as any]: revealFrom,
            } as React.CSSProperties)
          : ({
              transform: `var(--reveal-from, ${revealFrom})`,
            } as React.CSSProperties)
      }
    >
      {/* CARD ROOT */}
      <div
        onClick={() => onOpen(id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(id)}
        aria-label={`${title} details`}
        className="group relative cursor-pointer"
      >
        <div
          className={[
            "absolute inset-0 rounded-2xl border border-gray-200 bg-white shadow-sm",
            "transition-transform duration-250 ease-out",
            "group-hover:scale-[1.02] group-hover:shadow-lg",
          ].join(" ")}
          aria-hidden="true"
        />

        {/* Content layer: starts at 0.985, grows to 1 on hover */}
        <div
          className="relative z-10 p-6"
          style={{
            transform: "scale(var(--textScale, 0.985))",
            transformOrigin: "center",
            transition: "transform 200ms ease-out",
          }}
        >
          <div className="flex items-start gap-3">
            {icon ? <div className="mt-1 shrink-0">{icon}</div> : null}
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-900">
                <span
                  className={[
                    "inline-block rounded-md px-1 -mx-1",
                    "transition-colors duration-200",
                    "hover:bg-university-red hover:text-white",
                    "focus:outline-none focus-visible:bg-university-red focus-visible:text-white",
                  ].join(" ")}
                  tabIndex={-1}
                >
                  {title}
                </span>
              </h3>
              {summary ? <p className="mt-1 text-gray-600">{summary}</p> : null}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes team-reveal {
          from {
            opacity: 0;
            transform: var(--reveal-from, translateY(24px));
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        /* On hover/focus within the card, only bump text to 1 (never above) */
        .group:hover .relative.z-10,
        .group:focus-within .relative.z-10 {
          --textScale: 1;
        }
      `}</style>
    </div>
  );
}
