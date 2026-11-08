"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { useInView } from "@/app/hooks/useInView";
import BrandGlow from "@/app/components/common/BrandGlow";
import { REVEAL_IN_VIEW, revealClasses } from "@/app/components/common/revealClasses";
import SectionTitle from "@/app/components/team/SectionTitle";

type Photo = { src: string; alt: string };
type Step = { when: string; title: string; text: string; image?: Photo; finish?: boolean };

/** The step we are on now; earlier steps are done, later ones are still to come. */
const CURRENT_STEP = 2;

/** The car's story so far, as a racing line from the first design to the first laps. */
export default function ApcJourney({ buildPhoto }: { buildPhoto?: Photo }) {
  const { ref, visible } = useInView<HTMLOListElement>(REVEAL_IN_VIEW);

  const steps: Step[] = [
    {
      when: "2025–26",
      title: "A blank sheet",
      text: "Preliminary design of the car.",
      image: { src: "/subteams/apc/apc_render.jpg", alt: "A render of the finished APC car" },
    },
    {
      when: "FSUK 2026",
      title: "3rd place, first time out",
      text: "We took our initial design to the brand-new Autonomous Platform Cup at Silverstone and finished 3rd.",
      image: {
        src: "/subteams/apc_presentation_26.jpg",
        alt: "The APC team presenting their design at Formula Student UK 2026",
      },
    },
    {
      when: "Now",
      title: "Building it",
      text: "The design has left the screen. The frame is built, and the team is putting the car together in the workshop.",
      image: buildPhoto,
    },
    {
      when: "2027",
      title: "First laps",
      text: "Next summer we take it to Silverstone to compete in the dynamic events for the first time.",
      finish: true,
    },
  ];

  return (
    <section
      id="journey"
      aria-labelledby="apc-journey"
      className="relative isolate scroll-mt-20 overflow-hidden bg-logo-blue text-white"
    >
      <BrandGlow />
      <div className="container mx-auto px-4 py-20 md:py-28">
        <SectionTitle id="apc-journey" tone="dark">
          From blank sheet to Silverstone
        </SectionTitle>
        <p className="mb-14 max-w-3xl text-lg leading-relaxed text-white/75">
          How our first car is coming together.
        </p>

        <ol ref={ref} className="grid md:grid-cols-4">
          {steps.map((step, i) => {
            const reached = i <= CURRENT_STEP;
            const current = i === CURRENT_STEP;
            return (
              <li
                key={step.title}
                aria-current={current ? "step" : undefined}
                className={`relative border-l-2 pb-12 pl-8 last:pb-0 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pr-6 md:pt-10 ${
                  reached ? "border-university-red" : "border-dashed border-white/25"
                } ${revealClasses(visible)}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* The dot on the line */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full md:-top-[9px] md:left-0 ${
                    reached
                      ? "bg-university-red ring-4 ring-logo-blue"
                      : "border-2 border-white/40 bg-logo-blue"
                  }`}
                >
                  {current ? (
                    <span className="absolute inset-0 animate-ping rounded-full bg-university-red motion-reduce:hidden" />
                  ) : null}
                </span>

                <p className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-red-300">
                  {step.when}
                  {current ? (
                    <span className="rounded-full bg-university-red px-2 py-0.5 text-[10px] tracking-[0.15em] text-white">
                      In progress
                    </span>
                  ) : null}
                </p>
                <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-white/75">{step.text}</p>

                {step.image ? (
                  <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-white/10">
                    <Image
                      src={step.image.src}
                      alt={step.image.alt}
                      fill
                      sizes="(min-width: 1536px) 352px, (min-width: 1280px) 288px, (min-width: 1024px) 224px, (min-width: 768px) 160px, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : step.finish ? (
                  <div className="relative mt-6 flex aspect-[4/3] items-end overflow-hidden rounded-xl ring-1 ring-white/10">
                    {/* A chequered flag */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-20 [background-image:conic-gradient(#fff_25%,transparent_0_50%,#fff_0_75%,transparent_0)] [background-size:32px_32px]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-logo-blue via-logo-blue/40 to-transparent"
                    />
                    <p className="relative p-5 font-mono text-xs uppercase tracking-[0.2em] text-white/85">
                      Silverstone, summer 2027
                    </p>
                  </div>
                ) : (
                  <div className="relative mt-6 flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-dashed border-white/25 text-white/70">
                    <Wrench aria-hidden="true" className="h-8 w-8" />
                    <p className="font-mono text-xs uppercase tracking-[0.2em]">In the workshop</p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-16 flex flex-col items-center justify-center gap-5 text-center sm:flex-row">
          <p className="text-lg text-white/80">Want to help build it?</p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 rounded-full bg-university-red px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-black/30 transition-all duration-200 hover:bg-university-red/90 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Join APC
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
