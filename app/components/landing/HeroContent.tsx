import HeroRevealSection from "@/app/components/landing/HeroRevealSection";
import TeamsSection from "./teams/TeamsSection";
import SponsorBar from "./sponsors/SponsorBar";
import { getAllSubTeams } from "@/lib/subteamApi";
import markdownToHtml from "@/lib/markdownToHtml";
import ScrollSection from "./ScrollSection";

export default async function HeroContent() {
  const subteams = getAllSubTeams();

  const subteamsWithHtml = await Promise.all(
    subteams.map(async (t) => ({
      ...t,
      description: await markdownToHtml(t.description || ""),
    }))
  );

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

      <TeamsSection subteams={subteamsWithHtml} />

      <SponsorBar />

      <ScrollSection />
    </main>
  );
}
