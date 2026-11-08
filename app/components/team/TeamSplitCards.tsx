"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/app/hooks/useInView";
import { REVEAL_IN_VIEW, revealClasses } from "@/app/components/common/revealClasses";
import { FSAI_TEAMS, type FsaiTeamKey } from "@/lib/fsaiTeams";

// To change a card's photo, replace the file (or point the path at a new one) and update its alt text.
const TEAM_CARDS: {
  key: FsaiTeamKey;
  text: string;
  image: string;
  imageAlt: string;
  href: string;
  linkLabel: string;
}[] = [
  {
    key: "DDT",
    text: "Our Dynamic Driving Task (DDT) teams develop the perception, SLAM and control software that drives the IMechE’s ADS-DV.",
    image: "/subteams/ddt/ddt_hero.jpg",
    imageAlt: "The ADS-DV driving itself through a cone course at Silverstone",
    href: "/team/ddt",
    linkLabel: "Meet the DDT teams",
  },
  {
    key: "APC",
    text: "Our Autonomous Platform Cup (APC) team is building our first car of our own: a low-voltage autonomous EV, designed from a blank sheet and built entirely by students.",
    image: "/subteams/apc/apc_cad.jpg",
    imageAlt: "A cutaway render of the autonomous EV our APC team is building",
    href: "/team/apc",
    linkLabel: "Meet the APC team",
  },
];

/**
 * The DDT and APC cards, shared by the homepage and the Team page. They are styled for a navy
 * background. Pass the heading level that fits where the cards sit on the page.
 */
export default function TeamSplitCards({ titleAs: Title = "h3" }: { titleAs?: "h2" | "h3" | "h4" }) {
  const { ref, visible } = useInView<HTMLDivElement>(REVEAL_IN_VIEW);

  return (
    <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:gap-8">
      {TEAM_CARDS.map((card, i) => {
        const team = FSAI_TEAMS[card.key];
        return (
          // The hover group is this wrapper, which doesn't move, so the lifted card can't flicker
          // when the pointer is on its bottom edge.
          <div
            key={card.key}
            className={`group ${revealClasses(visible)}`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10 transition duration-300 group-hover:-translate-y-1 group-hover:bg-white/[0.07] group-hover:ring-university-red/70 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-white motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  // The widest the card gets at each breakpoint, on the homepage or the Team page.
                  sizes="(min-width: 1536px) 736px, (min-width: 1280px) 608px, (min-width: 1024px) 480px, (min-width: 768px) 356px, 100vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-logo-blue/70 to-transparent"
                />
                <span className="absolute left-4 top-4 rounded-full bg-university-red px-3 py-1 text-xs font-bold tracking-[0.2em] text-white shadow-lg">
                  {card.key}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <Title className="text-2xl font-bold">{team.name}</Title>
                <p className="mt-3 leading-relaxed text-white/75">{card.text}</p>
                <ul aria-label={`${card.key} subteams`} className="mt-6 flex flex-wrap gap-2">
                  {team.subteams.map((subteam) => (
                    <li
                      key={subteam}
                      className="rounded-full bg-white/[0.06] px-3 py-1.5 text-sm text-white/85 ring-1 ring-white/15"
                    >
                      {subteam}
                    </li>
                  ))}
                </ul>
                {/* The link's ::after covers the whole card, so the card is one big link. */}
                <Link
                  href={card.href}
                  className="mt-auto inline-flex items-center gap-2 self-start pt-8 font-semibold text-white focus:outline-hidden after:absolute after:inset-0 after:content-['']"
                >
                  {card.linkLabel}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </Link>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
