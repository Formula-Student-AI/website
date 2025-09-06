"use client";

import { useRef } from "react";
import { useSectionProgressVar } from "@/app/hooks/useSectionProgressVar";
import ExpandingImageBox from "@/app/components/landing/ExpandingImageBox";
import IntroHeading from "@/app/components/landing/IntroHeading";
import CenteredOverlay from "@/app/components/landing/CenteredOverlay";

type Props = {
    sectionHeightClass?: string;
    imageSrc: string;
    imageAlt: string;
    introTitle: React.ReactNode;
    introSubtitle?: React.ReactNode;
    overlayTitle: React.ReactNode;
    overlaySubtitle?: React.ReactNode;
  };
  
  export default function HeroRevealSection({
    sectionHeightClass = "h-[200vh]",
    imageSrc,
    imageAlt,
    introTitle,
    introSubtitle,
    overlayTitle,
    overlaySubtitle,
  }: Props) {
    const sectionRef = useRef<HTMLElement | null>(null);
    useSectionProgressVar(sectionRef);
  
    const sectionStyle = { ["--p" as any]: 0 } as React.CSSProperties;
  
    return (
      <section
        ref={sectionRef}
        className={`relative ${sectionHeightClass}`}
        aria-label="Hero reveal"
        style={sectionStyle}
      >
        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          <IntroHeading title={introTitle} subtitle={introSubtitle} />
          <ExpandingImageBox imageSrc={imageSrc} imageAlt={imageAlt}>
            <CenteredOverlay title={overlayTitle} subtitle={overlaySubtitle} />
          </ExpandingImageBox>
        </div>
      </section>
    );
  }