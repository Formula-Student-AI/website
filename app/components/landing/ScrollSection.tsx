"use client";

import Image from "next/image";
import { useRef } from "react";
import { useSectionProgressVar } from "@/app/hooks/useSectionProgressVar";
import { GalleryItem } from "../sponsors/GalleryItem";

type Block = {
  imageSrc: string;
  imageAlt?: string;
  heading: string;
  text: string;
  content?: {
    imageSrc?: string;
    imageAlt?: string;
    imageCaption?: string;
    heading?: string;
  }[];
};

const blocks: Block[] = [
  {
    imageSrc: "/sponsors/bristol_uni.jpg",
    imageAlt: "Hero Image 1",
    heading: "2024",
    text: "The year FSAI was founded by students from the University of Bristol",
    content: [
      {
        imageSrc: "/landing/team_photo_2025.jpg",
        imageCaption: "Team Photo 2025",
      },
    ],
  },
  {
    imageSrc: "/subteams/static-hero.jpg",
    imageAlt: "Hero Image 2",
    heading: "2025",
    text: "We took part in the Silverstone FSAI competition for the first time",
    content: [
      {
        imageSrc: "/landing/racetrack.png",
        imageAlt: "Dynamic & Static Events",
        imageCaption: "Dynamic & Static Events",
        heading: "Overall 16th",
      },
      {
        imageSrc: "/landing/real_world_ai.webp",
        imageAlt: "Real World AI Presentation",
        imageCaption: "Real World AI Presentation",
        heading: "Top 3",
      }
    ],
  },
];

export default function ScrollSection() {
  return (
    <section className="-mb-10">
      {blocks.map((block, i) => (
        <BlurScrollBlock key={i} {...block} />
      ))}
    </section>
  );
}

function BlurScrollBlock({
  imageSrc,
  imageAlt = "Image",
  heading,
  text,
  content,
}: Block) {
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionProgressVar(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh]"
      style={{ ["--p" as any]: 0 }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />

          {/* Background blur and dim */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              backdropFilter:
                "blur(calc(clamp(0, (var(--p) - 0.05) * 15, 1) * 12px))",
              backgroundColor:
                "rgba(0,0,0,calc(clamp(0, (var(--p) - 0.05) * 2, 0.3)))",
            }}
          />

          {/* Text content */}
          <div
            className="absolute max-w-4xl mx-auto inset-0 flex flex-col justify-center items-center text-center px-6 text-white transition-all duration-500"
            style={{
              opacity: `clamp(0, calc((var(--p) - 0.08) * 5), 1)`,
              transform: `translateY(calc((1 - var(--p)) * 20px))`,
            }}
          >
            <h2 className="bg-university-red/50 p-4 rounded-lg text-3xl md:text-5xl font-bold mb-4">{heading}</h2>
            <p className="text-lg md:text-xl text-white/90 mb-16">{text}</p>

            {/* Cards content */}
            {content && (
              <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-10 text-center px-6 text-white transition-all duration-500">
                {content.map((item, index) => (
                  <div key={index} className="flex-1 max-w-sm">
                    {item.heading && <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.heading}</h3>}
                    {item.imageSrc && <GalleryItem src={item.imageSrc} alt={item.imageAlt} caption={item.imageCaption} index={index} />}
                  </div>
                ))}
              </div>
            )}
          </div>


        </div>
      </div>
    </section>
  );
}
