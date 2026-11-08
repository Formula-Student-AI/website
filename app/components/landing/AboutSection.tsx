"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/app/hooks/useInView";
import { FSAI_TEAMS, type FsaiTeamKey } from "@/lib/fsaiTeams";

// The photos are stand-ins from the brochure folder. To change one, replace the file in
// public/landing/ (or point these paths at a new file) and update its alt text.
const TEAM_PHOTO = {
  src: "/landing/about_team.jpg",
  alt: "The Bristol FSAI team with the ADS-DV",
};

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
    image: "/landing/about_ddt.jpg",
    imageAlt: "DDT members at their laptops beside the ADS-DV",
    href: "/team",
    linkLabel: "Meet the DDT teams",
  },
  {
    key: "APC",
    text: "Our Autonomous Platform Cup (APC) team is building our first car of our own: a low-voltage autonomous EV, designed from a blank sheet and built entirely by students.",
    image: "/landing/about_apc.jpg",
    imageAlt: "A render of the autonomous EV our APC team is building",
    href: "/team/apc",
    linkLabel: "Meet the APC team",
  },
];

const SUBTEAM_COUNT = Object.values(FSAI_TEAMS).reduce(
  (total, team) => total + team.subteams.length,
  0
);

const COUNT_UP_MS = 1400;

/**
 * A number that counts up from zero the first time it scrolls into view. The server renders the
 * final number, so it is correct without JavaScript, and screen readers only ever hear that.
 */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { top, bottom } = el.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) return; // already on screen: keep the final number

    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / COUNT_UP_MS);
          setShown(Math.round(to * (1 - (1 - t) ** 3)));
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

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

const STATS: { label: string; value: React.ReactNode }[] = [
  { label: "Students", value: <CountUp to={100} suffix="+" /> },
  { label: "Founded", value: "2024" },
  { label: "Subteams", value: <CountUp to={SUBTEAM_COUNT} /> },
  { label: "Drivers needed", value: "0" },
];

/** Fade-and-rise classes for content that appears as it scrolls into view. */
function reveal(visible: boolean) {
  return `transition duration-700 ease-out motion-reduce:transition-none ${
    visible
      ? "translate-y-0 opacity-100"
      : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
  }`;
}

export default function AboutSection() {
  const intro = useInView<HTMLDivElement>({ threshold: 0.2 });
  const stats = useInView<HTMLDListElement>({ threshold: 0.3 });
  const teams = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section
      aria-labelledby="about-us-label"
      className="relative isolate overflow-hidden bg-logo-blue text-white"
    >
      {/* Background: two soft red glows and a faint grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-university-red/25 blur-3xl" />
        <div className="absolute -bottom-56 -left-48 h-[36rem] w-[36rem] rounded-full bg-university-red/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_15%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28">
        {/* Who we are */}
        <div ref={intro.ref} className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className={reveal(intro.visible)}>
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
              Bristol Formula Student AI (FSAI) is the University of Bristol’s autonomous racing
              team, a student-led society representing over 100 students. Founded in 2024, we made
              our Silverstone debut the following summer and came back in 2026 to finish 3rd in the
              new Autonomous Platform Cup.
            </p>
          </div>

          <div className={reveal(intro.visible)} style={{ transitionDelay: "150ms" }}>
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-university-red/70 sm:translate-x-5 sm:translate-y-5"
              />
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-2xl shadow-black/40 ring-1 ring-white/10">
                <Image
                  src={TEAM_PHOTO.src}
                  alt={TEAM_PHOTO.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 576px, 100vw"
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
              className={`flex flex-col-reverse justify-end gap-1 md:px-8 md:first:pl-0 ${reveal(stats.visible)}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <dt className="text-sm font-medium uppercase tracking-wider text-white/60">
                {stat.label}
              </dt>
              <dd className="text-4xl font-extrabold tracking-tight md:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>

        {/* The two teams */}
        <div className="mt-20 md:mt-24">
          <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
            We are split into two teams
          </h3>
          <div ref={teams.ref} className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-8">
            {TEAM_CARDS.map((card, i) => {
              const team = FSAI_TEAMS[card.key];
              return (
                <div
                  key={card.key}
                  className={reveal(teams.visible)}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:ring-university-red/70 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-white motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
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
                      <h4 className="text-2xl font-bold">{team.name}</h4>
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
                        className="mt-auto inline-flex items-center gap-2 self-start pt-8 font-semibold text-white focus:outline-none after:absolute after:inset-0 after:content-['']"
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
