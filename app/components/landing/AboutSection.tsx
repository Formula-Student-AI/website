"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/app/hooks/useInView";
import BrandGlow from "@/app/components/common/BrandGlow";
import { REVEAL_IN_VIEW, revealClasses } from "@/app/components/common/revealClasses";
import TeamSplitCards from "@/app/components/team/TeamSplitCards";
import { FSAI_TEAMS } from "@/lib/fsaiTeams";

// A stand-in photo from the brochure folder. To change it, replace the file in public/landing/
// (or point this path at a new file) and update its alt text.
const TEAM_PHOTO = {
  src: "/landing/about_team.jpg",
  alt: "The Bristol FSAI team with the ADS-DV",
};

const SUBTEAM_COUNT = Object.values(FSAI_TEAMS).reduce(
  (total, team) => total + team.subteams.length,
  0
);

const COUNT_UP_MS = 1400;

/**
 * A number that counts up from zero as its stat fades in (when `start` turns true, after
 * `delayMs`). The server renders the final number, so it is correct without JavaScript, and
 * screen readers only ever hear that.
 */
function CountUp({
  to,
  suffix = "",
  start,
  delayMs = 0,
}: {
  to: number;
  suffix?: string;
  start: boolean;
  delayMs?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  // True while the number is wound back to 0, waiting to count up.
  const armed = useRef(false);
  const [shown, setShown] = useState(to);

  // After hydration: if the number is still off screen (and motion is fine), wind it back to 0.
  // If it is already on screen, it just keeps showing the final number.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { top, bottom } = el.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) return;
    armed.current = true;
    setShown(0);
  }, []);

  useEffect(() => {
    if (!start || !armed.current) return;
    let frame = 0;
    const begin = performance.now() + delayMs;
    const step = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - begin) / COUNT_UP_MS));
      setShown(Math.round(to * (1 - (1 - t) ** 3)));
      if (t < 1) frame = requestAnimationFrame(step);
      else armed.current = false;
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [start, to, delayMs]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {shown}
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </>
  );
}

/** Each stat fades in this long after the one before it; a count-up waits the same time. */
const STAT_STAGGER_MS = 100;

const STATS: { label: string; value: number | string; suffix?: string }[] = [
  { label: "Students", value: 100, suffix: "+" },
  { label: "Founded", value: "2024" },
  { label: "Subteams", value: SUBTEAM_COUNT },
  { label: "Drivers needed", value: "0" },
];

export default function AboutSection() {
  const intro = useInView<HTMLDivElement>(REVEAL_IN_VIEW);
  const stats = useInView<HTMLDListElement>(REVEAL_IN_VIEW);

  return (
    <section
      aria-labelledby="about-us-label"
      className="relative isolate overflow-hidden bg-logo-blue text-white"
    >
      <BrandGlow />

      <div className="container mx-auto px-4 py-20 md:py-28">
        {/* Who we are */}
        <div ref={intro.ref} className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className={revealClasses(intro.visible)}>
            <p
              id="about-us-label"
              className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/70"
            >
              <span aria-hidden="true" className="h-0.5 w-10 bg-university-red" />
              About us
            </p>
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">
              Built by students.
              <br />
              Driven by{" "}
              <span className="relative inline-block">
                software.
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 h-1.5 rounded-full bg-university-red transition-[width] delay-500 duration-1000 ease-out motion-reduce:w-full motion-reduce:transition-none ${
                    intro.visible ? "w-full" : "w-0"
                  }`}
                />
              </span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
              We are a student-led society of over 100 students, building the software and hardware
              that let a race car drive itself. Founded in 2024, we made our Silverstone debut the
              following summer and came back in 2026 to finish 3rd in the new Autonomous Platform
              Cup.
            </p>
          </div>

          <div className={revealClasses(intro.visible)} style={{ transitionDelay: "150ms" }}>
            {/* lg:mr-5 leaves room for the offset frame, which sits 20px right of the photo. */}
            <div className="relative mx-auto max-w-xl lg:mr-5 lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-university-red/70 sm:translate-x-5 sm:translate-y-5"
              />
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-2xl shadow-black/40 ring-1 ring-white/10">
                <Image
                  src={TEAM_PHOTO.src}
                  alt={TEAM_PHOTO.alt}
                  fill
                  sizes="(min-width: 1536px) 700px, (min-width: 1280px) 572px, (min-width: 1024px) 444px, (min-width: 640px) 576px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* In numbers */}
        <dl
          ref={stats.ref}
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-white/10 py-10 md:mt-24 md:grid-cols-4 md:gap-x-0 md:divide-x md:divide-white/10"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              // column-reverse puts the number above its label; justify-end keeps the numbers level
              // when a label wraps onto two lines.
              className={`flex flex-col-reverse justify-end gap-1 md:px-8 md:first:pl-0 ${revealClasses(stats.visible)}`}
              style={{ transitionDelay: `${i * STAT_STAGGER_MS}ms` }}
            >
              <dt className="text-sm font-medium uppercase tracking-wider text-white/60">
                {stat.label}
              </dt>
              <dd className="text-4xl font-extrabold tracking-tight md:text-5xl">
                {typeof stat.value === "number" ? (
                  <CountUp
                    to={stat.value}
                    suffix={stat.suffix}
                    start={stats.visible}
                    delayMs={i * STAT_STAGGER_MS}
                  />
                ) : (
                  stat.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        {/* The two teams */}
        <div className="mt-20 md:mt-24">
          <h3 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
            We are split into two teams
          </h3>
          <TeamSplitCards titleAs="h4" />
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-5 text-center sm:flex-row">
          <p className="text-lg text-white/80">Want to be part of it?</p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 rounded-full bg-university-red px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-black/30 transition-all duration-200 hover:bg-university-red/90 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Join us
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
