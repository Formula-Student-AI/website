"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/app/hooks/useInView";
import { REVEAL_IN_VIEW, revealClasses } from "@/app/components/common/revealClasses";
import SectionTitle from "@/app/components/team/SectionTitle";

export type DdtSystem = {
  name: string;
  href: string;
  /** One word for the team's part in driving the car, e.g. "Sense". */
  stage: string;
  summary: string;
  image?: string;
  /** An animated image (served as-is) plus a still frame for people who prefer reduced motion. */
  animated?: { src: string; still: string };
};

const imageClass =
  "object-cover transition duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100";

/** "Our Systems": one card per DDT team, then a card inviting people to join. */
export default function DdtSystems({ systems }: { systems: DdtSystem[] }) {
  const { ref, visible } = useInView<HTMLDivElement>(REVEAL_IN_VIEW);

  return (
    <section aria-labelledby="ddt-systems" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionTitle id="ddt-systems">Our Systems</SectionTitle>
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-gray-600">
          DDT is split into {systems.length} teams. Each owns one part of how the ADS-DV drives
          itself, from spotting the cones to presenting our work to the judges.
        </p>

        <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((system, i) => (
            // The hover group is this wrapper, which doesn't move, so the lifted card can't flicker
            // when the pointer is on its bottom edge.
            <div
              key={system.name}
              className={`group ${revealClasses(visible)}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-logo-blue text-white shadow-lg shadow-logo-blue/20 ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-university-red motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  {system.animated ? (
                    <picture>
                      <source media="(prefers-reduced-motion: reduce)" srcSet={system.animated.still} />
                      {/* A plain <img>: the animated WebP is served as-is, not through the image optimiser. */}
                      <img
                        src={system.animated.src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-0 h-full w-full ${imageClass}`}
                      />
                    </picture>
                  ) : system.image ? (
                    <Image
                      src={system.image}
                      alt=""
                      fill
                      sizes="(min-width: 1536px) 488px, (min-width: 1280px) 403px, (min-width: 1024px) 318px, (min-width: 640px) 50vw, 100vw"
                      className={imageClass}
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                    {system.stage}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{system.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{system.summary}</p>
                  {/* The link's ::after covers the whole card, so the card is one big link. */}
                  <Link
                    href={system.href}
                    className="mt-auto inline-flex items-center gap-2 self-start pt-5 text-sm font-semibold text-white focus:outline-hidden after:absolute after:inset-0 after:content-['']"
                  >
                    Learn more<span className="sr-only"> about {system.name}</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                    />
                  </Link>
                </div>
              </article>
            </div>
          ))}

          <div
            className={revealClasses(visible)}
            style={{ transitionDelay: `${systems.length * 90}ms` }}
          >
            <aside className="flex h-full flex-col justify-center rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <p className="text-xl font-semibold text-gray-900">Want to get involved?</p>
              <p className="mt-2 text-gray-600">
                Choose DDT on our sign-up form and pick the teams you’d like to join.
              </p>
              <Link
                href="/join"
                className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-university-red px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-university-red/90 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-university-red"
              >
                Join the team
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
