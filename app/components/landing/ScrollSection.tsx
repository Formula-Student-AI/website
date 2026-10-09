"use client";

import HeroReveal from "@/app/components/common/HeroReveal";
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
    imageSrc: "/landing/working_on_car_2026.jpg",
    imageAlt: "Hero Image 2",
    heading: "2026",
    text: "We returned to Silverstone for our second ever FSAI competition",
    content: [
      {
        imageSrc: "/landing/trackdrive_2026.jpg",
        imageAlt: "Trackdrive",
        imageCaption: "Trackdrive",
        heading: "7th Place",
      },
      {
        imageSrc: "/landing/ddt_system_presentation_2026.jpg",
        imageAlt: "Dynamic & Static Events",
        imageCaption: "Dynamic & Static Events",
        heading: "Overall 19th",
      },
    ],
  },
  {
    imageSrc: "/landing/all_fs_teams_2025.jpg",
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
      },
    ],
  },
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
];

export default function ScrollSection() {
  return (
    <section className="-mb-10">
      {blocks.map((block, i) => (
        <HeroReveal key={i} image={block.imageSrc} threshold={0.5}>
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="bg-university-red/60 inline-block rounded-lg px-4 py-2 text-3xl md:text-5xl font-bold">
              {block.heading}
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              {block.text}
            </p>

            {block.content?.length ? (
              <div className="mt-10 flex flex-col md:flex-row gap-8 justify-center">
                {block.content.map((item, idx) => (
                  <div key={idx} className="w-full max-w-sm text-center mx-auto">
                    {item.heading ? (
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        {item.heading}
                      </h3>
                    ) : null}
                    {item.imageSrc ? (
                      <GalleryItem
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        caption={item.imageCaption}
                        index={idx}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </HeroReveal>
      ))}
    </section>
  );
}
