"use client";

import RevealWrapper from "@/app/components/common/RevealWrapper";
import MemberCard from "@/app/components/team/members/MemberCard";
import type { TeamMember } from "@/interfaces/team";

export default function MembersGrid({
  members,
  year,
}: {
  members: TeamMember[];
  year: string;
}) {
  if (!members.length) {
    return <p className="text-gray-500">No members found for {year}.</p>;
  }

  return (
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
  );
}
