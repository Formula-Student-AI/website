"use client";

import React from "react";

export default function TeamCard({
  id,
  title,
  summary,
  icon,
  onOpen,
}: {
  id: string;
  title: string;
  summary?: string;
  icon?: React.ReactNode;
  onOpen: (id: string) => void;
}) {
  return (
    <div
      onClick={() => onOpen(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(id)}
      aria-label={`${title} details`}
      className="group relative cursor-pointer"
    >
      {/* Hover pop: scale background layer only (keeps text crisp) */}
      <div
        className={[
          "absolute inset-0 rounded-2xl border border-gray-200 bg-white shadow-sm",
          "transition-transform duration-250 ease-out",
          "group-hover:scale-[1.02] group-hover:shadow-lg",
        ].join(" ")}
        aria-hidden="true"
      />

      {/* Content layer (never upscales past 1) */}
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

      {/* On hover/focus, lift text scale to 1 (never >1) */}
      <style jsx>{`
        .group:hover .relative.z-10,
        .group:focus-within .relative.z-10 {
          --textScale: 1;
        }
      `}</style>
    </div>
  );
}
