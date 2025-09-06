"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { TeamMember, SubTeamType } from "@/interfaces/team";
import HeroReveal from "@/app/components/common/HeroReveal";
import TeamMarkdown from "@/app/components/team/TeamMarkdown";
import MembersSection from "@/app/components/team/members/MembersSection";

export default function SubTeamView({
  subteamKey,
  bannerImage,
  summary,
  descriptionHtml,
  members,
  yearOptions,
  selectedYear,
}: {
  subteamKey: SubTeamType;
  bannerImage?: string;
  summary?: string;
  descriptionHtml: string;
  members: TeamMember[];
  yearOptions: string[];
  selectedYear: string;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const title = useMemo(() => pretty(subteamKey), [subteamKey]);

  const handleYearChange = (year: string) => {
    const qs = new URLSearchParams(sp.toString());
    qs.set("year", year);
    router.push(`?${qs.toString()}`);
  };

  return (
    <main className="bg-white">
      <HeroReveal image={bannerImage}>
        <div className="max-w-3xl text-white">
          <p className="text-xs md:text-sm uppercase tracking-widest text-university-red font-semibold">
            Team Information
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow">
            {title}
          </h1>
          {summary ? (
            <p className="mt-4 text-base md:text-lg text-gray-200">{summary}</p>
          ) : null}
        </div>
      </HeroReveal>

      <TeamMarkdown html={descriptionHtml} />

      {/* Separator */}
      <div className="relative">
        <div className="mx-auto max-w-6xl px-6">
          <div className="my-6 h-px bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
        </div>
      </div>

      <MembersSection
        members={members}
        selectedYear={selectedYear}
        yearOptions={yearOptions}
        onYearChange={handleYearChange}
      />
    </main>
  );
}

function pretty(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
