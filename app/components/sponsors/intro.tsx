"use client";

import { useInView } from "@/app/hooks/useInView";

export function Intro() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="flex-col flex items-center md:justify-between mt-16 mb-20">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 relative">
        Sponsor us.
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
          We&apos;d love to collaborate with you. Please download our sponsorship
          brochure below to learn more about the team and how you can support us.
        </p>
        <p>Thank you to our sponsors for supporting the team and our work.</p>
      </div>
    </section>
  );
}
