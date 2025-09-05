"use client";

import Image from "next/image";
import { useRef } from "react";
import { useSectionProgressVar } from "@/app/hooks/useSectionProgressVar";

type Block = {
  imageSrc: string;
  imageAlt?: string;
  heading: string;
  text: string;
};

const blocks: Block[] = [
  {
    imageSrc: "/sponsors/bristol_uni.jpg",
    imageAlt: "Hero Image 1",
    heading: "2024",
    text: "The year FSAI was founded by students from the University of Bristol",
  },
  {
    imageSrc: "/subteams/static-hero.jpg",
    imageAlt: "Hero Image 2",
    heading: "2025",
    text: "We took part in the competition for the first time",
  },
];

export default function ScrollSection() {
  return (
    <section>
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
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white transition-all duration-500"
            style={{
              opacity: `clamp(0, calc((var(--p) - 0.08) * 5), 1)`,
              transform: `translateY(calc((1 - var(--p)) * 20px))`,
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{heading}</h2>
            <p className="max-w-xl text-lg md:text-xl text-white/90">{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
