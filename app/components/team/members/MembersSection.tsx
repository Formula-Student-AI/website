"use client";

import RevealWrapper from "@/app/components/common/RevealWrapper";
import MemberCard from "./MemberCard";
import type { TeamMember } from "@/interfaces/team";
import React from "react";

export default function MembersSection({
  members,
  selectedYear,
  yearOptions,
  onYearChange,
}: {
  members: TeamMember[];
  selectedYear: string;
  yearOptions: string[];
  onYearChange: (year: string) => void;
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs md:text-sm uppercase tracking-widest text-university-red font-semibold">
            Members
          </p>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Academic Year {selectedYear}
          </h2>
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <span className="whitespace-nowrap">Academic Year</span>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-university-red/60"
            aria-label="Select academic year"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </header>

      {members.length ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {members.map((m, i) => (
            <RevealWrapper
              key={`${m.email || m.name}-${i}`}
              direction="up"
              delayMs={i * 40}
            >
              <li className="h-full">
                <MemberCard member={m} className="h-full" />
              </li>
            </RevealWrapper>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No members found for {selectedYear}.</p>
      )}
    </section>
  );
}
