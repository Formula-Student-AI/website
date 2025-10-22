"use client";

import Image from "next/image";

type Props = { title: React.ReactNode; subtitle?: React.ReactNode };

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

      {/* Sponsor spotlight element */}
      <div className="mt-10 md:mt-20 md:mx-auto my-auto max-w-3xl">
        <div
          aria-label="About Energy sponsor spotlight"
          className="group block overflow-hidden rounded-2xl border hover:shadow-lg transition-shadow duration-300 border-white/10  motion-opacity-in-0 motion-blur-in-md motion-translate-x-in-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
          title="About Energy"
        >
          <div className="relative isolate flex w-full flex-col items-center text-center gap-4 p-6 md:p-8">
            <Image
              src="/sponsors/about_energy.webp"
              alt="About Energy logo"
              className="h-16 md:h-20 w-auto object-contain"
              width={400}
              height={400}
            />
            <div className="w-full">
              <span className="inline-flex items-center rounded-full border border-university-red/10 bg-university-red/10 backdrop-blur px-2.5 py-1 text-xs font-medium tracking-wide text-university-red">
                Sponsor spotlight
              </span>
              <h3 className="mt-3 text-lg md:text-xl font-bold text-gray-900">Thank you, About Energy</h3>
              <p className="mt-1.5 text-sm md:text-base text-gray-700">for being our first industry sponsor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}