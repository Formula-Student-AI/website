"use client";

import { useRouter, useSearchParams } from "next/navigation";
import MembersSection from "@/app/components/team/members/MembersSection";
import type { TeamMember } from "@/interfaces/team";

export default function MembersSectionClient({
  members,
  selectedYear,
  yearOptions,
}: {
  members: TeamMember[];
  selectedYear: string;
  yearOptions: string[];
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const onYearChange = (year: string) => {
    const qs = new URLSearchParams(sp.toString());
    qs.set("year", year);
    router.push(`?${qs.toString()}`);
  };

  return (
    <MembersSection
      members={members}
      selectedYear={selectedYear}
      yearOptions={yearOptions}
      onYearChange={onYearChange}
    />
  );
}
