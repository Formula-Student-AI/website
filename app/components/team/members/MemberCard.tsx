"use client";

import React from "react";
import Image from "next/image";
import type { TeamMember } from "@/interfaces/team";

export default function MemberCard({
  member,
  className = "",
}: {
  member: TeamMember;
  className?: string;
}) {
  return (
    <article
      className={[
        "h-full rounded-2xl border border-gray-200 bg-white shadow-sm",
        "transition-[transform,box-shadow] duration-200 ease-out",
        "hover:shadow-md transform-gpu will-change-transform",
        className,
      ].join(" ")}
      style={{ transform: "translateZ(0) scale(var(--s,1))" }}
      onMouseEnter={(e) => e.currentTarget.style.setProperty("--s", "1.01")}
      onMouseLeave={(e) => e.currentTarget.style.setProperty("--s", "1")}
    >
      <div className="overflow-hidden rounded-t-2xl flex justify-center items-center p-4">
        <Image
          src={member.image || "/placeholder-member.jpg"}
          alt={member.name}
          width={400}
          height={400}
          loading="lazy"
          className="h-44 w-44 object-cover rounded-full"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">
          <span className="inline-block -mx-1 rounded-md px-1 transition-colors duration-200 hover:bg-university-red hover:text-white">
            {member.name}
          </span>
        </h3>

        {member.role ? (
          <p className="mt-1 text-gray-600">{member.role}</p>
        ) : null}

        {member.email ? (
          <p className="mt-1 text-sm text-gray-500">{member.email}</p>
        ) : null}

        {member.links ? (
          <ul className="mt-3 flex flex-wrap gap-3">
            {Object.entries(member.links).map(([k, v]) => (
              <li key={k}>
                <a
                  href={v}
                  target="_blank"
                  rel="noreferrer"
                  className="text-university-red hover:underline text-sm"
                >
                  {capitalize(k)}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
