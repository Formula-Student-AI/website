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
      <h4 className="text-center md:text-justify text-md md:text-lg mt-5 md:pl-8 max-w-3xl">
        We are a student-led society competing in the
        Formula Student AI annual championship. We 
        <b> represent over 150 engineering students from the University
        of Bristol</b> focused on building the next best AI and
        robotics systems for the self-driving competition.
      </h4>
    </section>
  );
}
  