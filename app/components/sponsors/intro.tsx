"use client";

import { Download, Eye } from "lucide-react";
import { useInView } from "@/app/hooks/useInView";

const BROCHURE = "/sponsors/Bristol%20FSAI%20-%20Sponsorship%20Brochure.pdf";

export function Intro() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="flex-col flex items-center md:justify-between mt-16">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 relative">
        Sponsors.
        <span
          className={`absolute bottom-0 left-0 h-1.5 bg-university-red transition-all duration-1000 ease-out ${
            visible ? 'w-full' : 'w-0'
          }`}
        />
      </h1>
      <div className="text-center text-md md:text-lg mt-5 max-w-3xl space-y-4">
        <p>
          We are a student-led society representing <strong>over 100 engineering students </strong>
          at the University of Bristol, developing AI and robotics systems for
          the Formula Student AI competition.
        </p>
        <p>
          We&apos;d love to collaborate with you. Have a look through our sponsorship
          brochure below to learn more about the team and how you can support us.
        </p>
        <p>Thank you to our sponsors for supporting the team and our work.</p>
      </div>
      {/* No download attribute: the PDF opens in the browser's own viewer (the server sends it inline). */}
      <a
        href={BROCHURE}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center gap-3 rounded-lg bg-university-red px-6 py-4 font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-university-red"
      >
        <Eye aria-hidden="true" className="h-5 w-5 shrink-0" />
        View our sponsorship brochure
        <span className="sr-only">(PDF, opens in a new tab)</span>
      </a>
      <p className="mt-3 text-center text-sm text-gray-600">
        Opens right in your browser, no download needed. Want your own copy?{" "}
        <a
          href={BROCHURE}
          download="Bristol FSAI - Sponsorship Brochure.pdf"
          className="inline-flex items-center gap-1 font-medium text-university-red underline underline-offset-2 hover:no-underline"
        >
          <Download aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          Download the PDF
        </a>
      </p>
    </section>
  );
}
