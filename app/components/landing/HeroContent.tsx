"use client";

import HeroRevealSection from "@/app/components/landing/HeroRevealSection";
import TeamsSection from "./teams/TeamsSection";
import SponsorBar from "./sponsors/SponsorBar";

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

      <TeamsSection />

      <SponsorBar />
    </main>
  );
}
