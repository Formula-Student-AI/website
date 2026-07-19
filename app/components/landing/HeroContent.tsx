import HeroRevealSection from "@/app/components/landing/HeroRevealSection";
import TeamsSection from "./teams/TeamsSection";
import SponsorBar from "./sponsors/SponsorBar";
import { getAllSubTeams } from "@/lib/subteamApi";
import ScrollSection from "./ScrollSection";
import EventsPrev from "./EventsPrev";
import PostsPrev from "./PostsPrev";
import Image from "next/image";

export default async function HeroContent() {
  const subteamCards = getAllSubTeams().map(({ name, image, summary }) => ({
    name,
    image,
    summary,
  }));

  return (
    <main className="bg-white">
      <HeroRevealSection
        sectionHeightClass="h-[200vh]"
        imageSrc="/landing/silverstone_2025.jpg"
        imageAlt="Landing Background"
        introTitle={
          <>
            Bristol Formula Student{" "}
            <span className="text-university-red">AI</span>
          </>
        }
        introSubtitle="Autonomous racing at the University of Bristol"
        overlayTitle={
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Image src="/landing/fs_logo.png" alt="Formula Student UK" width={100} height={100} />
            <span>Formula Student UK</span>
          </div>
        }
        overlaySubtitle={<span className="text-lg md:text-xl font-semibold rounded-lg bg-red-400/50 p-2 px-4">@ Silverstone 2025</span>}
      />  

      <TeamsSection subteams={subteamCards} />

      <SponsorBar />

      <ScrollSection />

      <EventsPrev />

      <PostsPrev />
    </main>
  );
}
