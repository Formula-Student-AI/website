"use client";

import React from "react";

export default function TeamCard({
  id,
  title,
  summary,
  icon,
  onOpen,
  className = "",
}: {
  id: string;
  title: string;
  summary?: string;
  icon?: React.ReactNode;
  onOpen: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={["group relative h-full", className].join(" ")}>
      <button
        onClick={() => onOpen(id)}
        className={[
          "card-visual relative h-full w-full rounded-2xl border border-gray-200 bg-white shadow-sm",
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
        aria-label={`${title} details`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-start gap-3">
            {icon ? <div className="mt-1 shrink-0">{icon}</div> : null}
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-900">
                <span
                  className={[
                    "inline-block -mx-1 rounded-md px-1",
                    "transition-colors duration-200",
                    "hover:bg-university-red hover:text-white",
                  ].join(" ")}
                >
                  {title}
                </span>
              </h3>

              {summary ? (
                <p
                  className="mt-2 text-gray-600 line-clamp-3"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {summary}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </button>

      <style jsx>{`
        .group:hover .card-visual,
        .group:focus-within .card-visual {
          --scale: 1.015;
        }
      `}</style>
    </div>
  );
}
