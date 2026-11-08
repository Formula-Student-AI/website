"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { APC_CAD, APC_PARTS } from "@/app/components/team/apc/apcCar";

/**
 * The top of the APC page: a "blank sheet" of blueprint grid with the cutaway render as a parts
 * diagram. Pointing at a part in the list (or its number on the drawing) highlights both.
 */
export default function ApcHero({ title, summary }: { title: string; summary: string }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="apc-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-white to-gray-100"
    >
      {/* Blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgb(22_0_54/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(22_0_54/0.07)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]"
      />

      <div className="container mx-auto px-4 pt-14 pb-16 md:pt-20 md:pb-24">
        <div>
          <p className="text-xs md:text-sm uppercase tracking-widest text-university-red font-semibold">
            Team Information
          </p>
          <h1
            id="apc-title"
            className="mt-3 max-w-5xl text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg md:text-xl leading-relaxed text-gray-600">
            {summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#journey"
              className="inline-flex items-center gap-2 rounded-full bg-university-red px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-university-red/90 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-university-red"
            >
              Our story so far
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </a>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 shadow-sm transition-colors duration-200 hover:border-university-red hover:text-university-red focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-university-red"
            >
              Join APC
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <figure className="mt-12 md:mt-16">
          {/* The numbers sit outside the clipped, rounded image so ones near the edge aren't cut off. */}
          <div className="relative aspect-video">
            <div className="absolute inset-0 overflow-hidden rounded-2xl bg-white shadow-xl shadow-logo-blue/10 ring-1 ring-gray-900/5">
              <Image
                src={APC_CAD.src}
                alt={APC_CAD.alt}
                fill
                priority
                sizes="(min-width: 1536px) 1504px, (min-width: 1280px) 1248px, (min-width: 1024px) 992px, 100vw"
                className="object-cover"
              />
            </div>
            {APC_PARTS.map((part) => (
              <span
                key={part.n}
                aria-hidden="true"
                onMouseEnter={() => setActive(part.n)}
                onMouseLeave={() => setActive(null)}
                className={`absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full bg-university-red text-[11px] font-bold text-white shadow-lg ring-2 ring-white transition-transform duration-200 motion-reduce:transition-none sm:h-8 sm:w-8 sm:text-sm ${
                  active === part.n ? "z-10 scale-125" : ""
                }`}
                style={{ left: `${part.x}%`, top: `${part.y}%` }}
              >
                {active === part.n ? (
                  <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-university-red/60 motion-reduce:hidden" />
                ) : null}
                {part.n}
              </span>
            ))}
          </div>
        </figure>

        <ol aria-label="Parts of the car" className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {APC_PARTS.map((part) => (
            <li
              key={part.n}
              onMouseEnter={() => setActive(part.n)}
              onMouseLeave={() => setActive(null)}
              className={`-mx-2 flex gap-3 rounded-xl px-2 py-2 transition-colors duration-200 ${
                active === part.n ? "bg-university-red/5" : ""
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-university-red text-xs font-bold text-white">
                {part.n}
              </span>
              <span>
                <span className="block font-semibold text-gray-900">{part.name}</span>
                <span className="block text-sm leading-relaxed text-gray-600">{part.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
