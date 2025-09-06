"use client";

import MembersSection from "@/app/components/team/members/MembersSection";
import type { TeamMember } from "@/interfaces/team";
import { useState } from "react";

export default function MembersSectionClient({
  allMembersByYear,
  defaultYear,
  yearOptions,
}: {
  allMembersByYear: Record<string, TeamMember[]>;
  defaultYear: string;
  yearOptions: string[];
}) {
  const [year, setYear] = useState(defaultYear);

  return (
    <MembersSection
      members={allMembersByYear[year]}
      selectedYear={year}
      yearOptions={yearOptions}
      onYearChange={setYear}
    />
  );
}
