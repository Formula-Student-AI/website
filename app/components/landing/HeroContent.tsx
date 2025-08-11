"use client";

import HeroRevealSection from "@/app/components/landing/HeroRevealSection";

export default function HeroContent() {
  return (
    <main className="bg-white">
      <HeroRevealSection
        sectionHeightClass="h-[200vh]"
        imageSrc="/posts/2025-08-04-first-post/silverstone_2025.jpg"
        imageAlt="Landing Background"
        introTitle={
          <>
            Bristol Formula Student{" "}
            <span className="text-university-red">AI</span>
          </>
        }
        introSubtitle="Autonomous racing at the University of Bristol"
        overlayTitle={
          <>
            Bristol Formula Student{" "}
            <span className="text-university-red">AI</span>
          </>
        }
        overlaySubtitle="Autonomous racing at the University of Bristol"
      />

      <section className="relative px-6 py-24 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 drop-shadow-lg">
          Bristol Formula Student{" "}
          <span className="text-university-red">AI</span>
        </h2>
        <p className="mt-4 text-lg text-gray-900 max-w-2xl mx-auto drop-shadow-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
          consectetur id, quos accusantium libero autem cum dolorem vero, facere
          dignissimos nobis odit laudantium ipsa unde quam. Officia expedita
          tenetur aliquid?
        </p>

        <div className="h-[50vh]" />
      </section>
    </main>
  );
}
