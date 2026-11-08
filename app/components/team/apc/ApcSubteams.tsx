"use client";

import { useInView } from "@/app/hooks/useInView";
import { REVEAL_IN_VIEW, revealClasses } from "@/app/components/common/revealClasses";
import SectionTitle from "@/app/components/team/SectionTitle";
import { APC_PARTS, APC_SUBTEAMS, type ApcPart } from "@/app/components/team/apc/apcCar";

/** "Ann", "Ann and Bob", "Ann, Bob and Cat" */
function listNames(names: string[]) {
  return names.length < 2
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** How APC is split up: one card per subteam, pointing at its parts in the cutaway above. */
export default function ApcSubteams({ leads }: { leads: Record<string, string[]> }) {
  const { ref, visible } = useInView<HTMLDivElement>(REVEAL_IN_VIEW);

  return (
    <section aria-labelledby="apc-split" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionTitle id="apc-split">How we’re split up</SectionTitle>
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-gray-600">
          APC is split into {APC_SUBTEAMS.length} subteams, each owning one part of the car. The
          numbers match the parts in Fig. 01 above.
        </p>

        <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {APC_SUBTEAMS.map((subteam, i) => {
            const Icon = subteam.icon;
            const names = leads[subteam.name] ?? [];
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
                    <ul aria-label={`${subteam.name} parts in Fig. 01`} className="mt-5 space-y-1.5">
                      {parts.map((part) => (
                        <li key={part.n} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-university-red text-[10px] font-bold text-white">
                            {part.n}
                          </span>
                          {part.name}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {names.length ? (
                    <div className="mt-auto pt-6">
                      <p className="border-t border-gray-100 pt-4 text-sm text-gray-700">
                        <span className="text-gray-500">Led by </span>
                        {listNames(names)}
                      </p>
                    </div>
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
