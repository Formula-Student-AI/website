"use client";

import { useInView } from "@/app/hooks/useInView";
import { REVEAL_IN_VIEW, revealClasses } from "@/app/components/common/revealClasses";
import SectionTitle from "@/app/components/team/SectionTitle";
import { APC_PARTS, APC_SUBTEAMS, type ApcPart } from "@/app/components/team/apc/apcCar";

/** How APC is split up: one card per subteam, pointing at its parts in the cutaway above. */
export default function ApcSubteams() {
  const { ref, visible } = useInView<HTMLDivElement>(REVEAL_IN_VIEW);

  return (
    <section aria-labelledby="apc-split" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionTitle id="apc-split">How we’re split up</SectionTitle>
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-gray-600">
          APC is split into {APC_SUBTEAMS.length} subteams, each owning one part of the car.
        </p>

        <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {APC_SUBTEAMS.map((subteam, i) => {
            const Icon = subteam.icon;
            const parts = subteam.parts
              .map((n) => APC_PARTS.find((part) => part.n === n))
              .filter((part): part is ApcPart => part !== undefined);
            return (
              <div
                key={subteam.name}
                className={revealClasses(visible)}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-university-red/10 text-university-red">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-gray-900">{subteam.name}</h3>
                  <p className="mt-2 leading-relaxed text-gray-600">{subteam.text}</p>
                  {parts.length ? (
                    <ul aria-label={`${subteam.name} parts in the drawing`} className="mt-5 space-y-1.5">
                      {parts.map((part) => (
                        <li key={part.n} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-university-red text-[10px] font-bold text-white">
                            {part.n}
                          </span>
                          {part.name}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
