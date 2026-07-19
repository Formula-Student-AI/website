"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useInView } from "@/app/hooks/useInView";
import { type SubTeam, prettySubTeam } from "@/interfaces/team";

type SubTeamCard = Pick<SubTeam, "name" | "image" | "summary">;

/** Compact label for teams without a hero image, e.g. "APC", "P&C" */
function shortLabel(name: string): string {
  const pretty = prettySubTeam(name);
  const words = pretty.split(/\s+/).filter(Boolean);
  return words.length > 1
    ? words.map((w) => w[0]).join("").toUpperCase()
    : pretty.toUpperCase();
}

function isGif(src?: string) {
  return !!src && src.toLowerCase().endsWith(".gif");
}

function FallbackVisual({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-logo-blue via-[#14041f] to-black">
      <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-university-red/30 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-university-red/15 blur-3xl" />
      <span className="absolute inset-0 flex select-none items-center justify-center text-7xl font-extrabold tracking-tight text-white/10">
        {shortLabel(name)}
      </span>
    </div>
  );
}

export default function TeamsSection({ subteams }: { subteams: SubTeamCard[] }) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.15, once: true });

  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);

  const active = subteams[activeIdx] ?? null;

  const handleSelect = useCallback(
    (idx: number, name: string) => {
      const isDesktop =
        typeof window !== "undefined" &&
        window.matchMedia("(min-width: 768px)").matches;
      if (isDesktop) {
        router.push(`/team/${name}`);
      } else {
        setExpandedIdx((cur) => (cur === idx ? null : idx));
      }
    },
    [router]
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-16">
        <header className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Meet the <span className="text-university-red">Teams</span>
            <span
              aria-hidden
              className={`absolute -bottom-2 left-0 h-1 bg-university-red transition-all duration-1000 ease-out ${
                visible ? "w-full" : "w-0"
              }`}
            />
          </h2>
        </header>

        <div className="md:grid md:grid-cols-2 md:items-start md:gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Team index list */}
          <ul
            className="border-t border-gray-200"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {subteams.map((t, i) => {
              const isActive = i === activeIdx;
              const isExpanded = expandedIdx === i;
              const title = prettySubTeam(t.name);

              return (
                <li
                  key={t.name}
                  className={`border-b border-gray-200 transition-all duration-700 ease-out ${
                    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIdx(i)}
                    onFocus={() => setActiveIdx(i)}
                    onClick={() => handleSelect(i, t.name)}
                    aria-expanded={isExpanded}
                    className="group flex w-full items-center gap-4 rounded-sm py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-university-red/60 md:gap-6 md:py-5"
                  >
                    <span
                      className={`font-mono text-xs tabular-nums transition-colors duration-300 md:text-sm ${
                        isActive
                          ? "text-university-red"
                          : hovering
                          ? "text-gray-300"
                          : "text-gray-400"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-2xl font-extrabold leading-tight tracking-tight transition-all duration-300 md:text-3xl lg:text-4xl ${
                        isActive
                          ? "text-gray-900 md:translate-x-2"
                          : hovering
                          ? "text-gray-300 opacity-70"
                          : "text-gray-500"
                      }`}
                    >
                      {title}
                    </span>
                    <span
                      aria-hidden
                      className={`text-xl text-university-red transition-all duration-300 md:text-2xl ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-2 opacity-0"
                      }`}
                    >
                      →
                    </span>
                  </button>

                  {/* Mobile accordion detail */}
                  <div
                    className={`grid transition-all duration-500 ease-out md:hidden ${
                      isExpanded
                        ? "grid-rows-[1fr] pb-5 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="relative aspect-video overflow-hidden rounded-xl">
                        {t.image ? (
                          <Image
                            src={t.image}
                            alt={title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            unoptimized={isGif(t.image)}
                          />
                        ) : (
                          <FallbackVisual name={t.name} />
                        )}
                      </div>
                      <p className="mt-3 text-sm text-gray-600">{t.summary}</p>
                      <Link
                        href={`/team/${t.name}`}
                        className="mt-3 inline-block text-sm font-semibold text-university-red"
                      >
                        Read the full story →
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Preview panel (desktop) */}
          <div
            className={`relative hidden transition-all duration-1000 ease-out md:block ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "250ms" }}
          >
            <div className="sticky top-24">
              <div
                aria-hidden
                className={`absolute -inset-4 -z-10 rounded-[2rem] blur-2xl transition-colors duration-500 ${
                  hovering ? "bg-university-red/25" : "bg-university-red/10"
                }`}
              />
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 ${
                  hovering
                    ? "scale-[1.015] shadow-university-red/25 ring-2 ring-university-red/40"
                    : "shadow-gray-900/20 ring-1 ring-gray-900/5"
                }`}
              >
                {subteams.map((t, i) => (
                  <div
                    key={t.name}
                    aria-hidden={i !== activeIdx}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      i === activeIdx
                        ? "scale-100 opacity-100"
                        : "scale-[1.06] opacity-0"
                    }`}
                  >
                    {t.image ? (
                      <Image
                        src={t.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 40vw, 50vw"
                        className="object-cover"
                        unoptimized={isGif(t.image)}
                      />
                    ) : (
                      <FallbackVisual name={t.name} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  </div>
                ))}

                {active ? (
                  <div
                    key={active.name}
                    className="absolute inset-x-0 bottom-0 p-6 lg:p-8 motion-opacity-in-0 motion-translate-y-in-25 motion-blur-in-sm motion-duration-500"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
                      Team {String(activeIdx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-2xl font-bold text-white lg:text-3xl">
                      {prettySubTeam(active.name)}
                    </h3>
                    <p className="mt-2 text-sm text-white/85 line-clamp-3 lg:text-base">
                      {active.summary}
                    </p>
                    <Link
                      href={`/team/${active.name}`}
                      className="mt-4 inline-flex items-center gap-2 border-b border-white/40 pb-0.5 text-sm font-semibold text-white transition-all hover:gap-3 hover:border-white"
                    >
                      Full story <span aria-hidden>→</span>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/team"
            className="inline-block rounded-full bg-university-red px-8 py-3 text-lg font-semibold text-white shadow-md transition-all duration-200 hover:bg-university-red/90 hover:shadow-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
