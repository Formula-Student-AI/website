"use client";

import Image from "next/image";

type Props = { title: React.ReactNode; subtitle?: React.ReactNode };

const SPOTLIGHT_SPONSORS = [
  {
    name: "About:Energy",
    logo: "/sponsors/about_energy.webp",
    tagline: "Powering our battery modelling & simulation",
  },
  {
    name: "Motion Applied",
    logo: "/sponsors/motion_applied_logo.png",
    tagline: "Accelerating our vehicle data & analysis",
  },
];

export default function IntroHeading({ title, subtitle }: Props) {
  return (
    <div
      className="absolute top-0 left-0 w-full text-center px-6 pt-16 md:pt-24 z-10 text-gray-900"
      style={{
        // fades out by ~p=0.5 and slides up
        opacity: `clamp(0, calc(1 - var(--p) * 2), 1)`,
        transform: `translateY(calc(var(--p) * -20px))`,
        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
      }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h2>
      {subtitle ? <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{subtitle}</p> : null}

      {/* Sponsor spotlight */}
      <section
        aria-label="Sponsor spotlight"
        className="mx-auto mt-10 md:mt-16 max-w-3xl"
      >
        <div className="flex items-center justify-center gap-4 motion-opacity-in-0 motion-duration-700">
          <span
            aria-hidden
            className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-university-red/50"
          />
          <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.3em] text-university-red">
            Sponsor spotlight
          </span>
          <span
            aria-hidden
            className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-university-red/50"
          />
        </div>

        <div className="mt-5 md:mt-7 grid gap-3 md:gap-6 md:grid-cols-2">
          {SPOTLIGHT_SPONSORS.map((sponsor, i) => (
            <div
              key={sponsor.name}
              className={`group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white/70 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-university-red/30 hover:shadow-xl hover:shadow-university-red/5 motion-opacity-in-0 motion-translate-y-in-25 motion-blur-in-sm ${
                i > 0 ? "motion-delay-200" : ""
              }`}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-university-red transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <div className="flex items-center gap-5 p-5 text-left md:flex-col md:gap-4 md:p-7 md:text-center">
                <div className="flex h-12 w-24 shrink-0 items-center justify-center md:h-16 md:w-full">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={400}
                    height={200}
                    className="max-h-full max-w-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900">
                    {sponsor.name}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-gray-600">
                    {sponsor.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs md:text-sm text-gray-500 motion-opacity-in-0 motion-delay-300">
          Thank you to our sponsors for driving Bristol FSAI forward.
        </p>
      </section>
    </div>
  );
}