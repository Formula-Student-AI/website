"use client";

import RevealWrapper from "@/app/components/common/RevealWrapper";
import MemberCard from "./MemberCard";
import type { TeamMember } from "@/interfaces/team";
import React, { useRef, useState } from "react";

const MEMBERS_PER_PAGE = 15;

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
  const [pagination, setPagination] = useState({ year: selectedYear, page: 1 });
  const sectionRef = useRef<HTMLElement>(null);
  const totalPages = Math.max(1, Math.ceil(members.length / MEMBERS_PER_PAGE));
  const page = pagination.year === selectedYear ? Math.min(pagination.page, totalPages) : 1;
  const start = (page - 1) * MEMBERS_PER_PAGE;
  const visibleMembers = members.slice(start, start + MEMBERS_PER_PAGE);

  function changePage(nextPage: number) {
    setPagination({ year: selectedYear, page: nextPage });
    sectionRef.current?.scrollIntoView({ block: "start" });
  }

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto scroll-mt-24 px-6 pb-16">
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs md:text-sm uppercase tracking-widest text-university-red font-semibold">
            Core Team Members
          </p>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Academic Year {selectedYear}
          </h2>
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <span className="whitespace-nowrap">Academic Year</span>
          <select
            value={selectedYear}
            onChange={(e) => {
              setPagination({ year: e.target.value, page: 1 });
              onYearChange(e.target.value);
            }}
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
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {visibleMembers.map((m, i) => (
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
      {totalPages > 1 ? (
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-sm text-gray-600" role="status">
            Showing {start + 1}–{Math.min(start + MEMBERS_PER_PAGE, members.length)} of {members.length} members
          </p>
          <nav aria-label="Member pages" className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-university-red disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => changePage(number)}
                aria-label={`Page ${number}`}
                aria-current={page === number ? "page" : undefined}
                className={`min-w-10 rounded-lg border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-university-red ${
                  page === number
                    ? "border-university-red bg-university-red text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              type="button"
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-university-red disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </nav>
        </div>
      ) : null}
    </section>
  );
}
