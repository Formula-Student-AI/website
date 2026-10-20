"use client";

import { useLayoutEffect, useRef } from "react";
import { useSectionProgressVar } from "@/app/hooks/useSectionProgressVar";
import ExpandingImageBox from "@/app/components/landing/ExpandingImageBox";
import IntroHeading from "@/app/components/landing/IntroHeading";
import CenteredOverlay from "@/app/components/landing/CenteredOverlay";
import type { SpotlightSponsor } from "./IntroHeading";

type Props = {
    sponsors: SpotlightSponsor[];
    sectionHeightClass?: string;
    imageSrc: string;
    imageAlt: string;
    introTitle: React.ReactNode;
    introSubtitle?: React.ReactNode;
    overlayTitle: React.ReactNode;
    overlaySubtitle?: React.ReactNode;
  };
  
  export default function HeroRevealSection({
    sponsors,
    sectionHeightClass = "h-[200vh]",
    imageSrc,
    imageAlt,
    introTitle,
    introSubtitle,
    overlayTitle,
    overlaySubtitle,
  }: Props) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const introRef = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
      const intro = introRef.current;
      const section = sectionRef.current;
      if (!intro || !section) return;
      const update = () => {
        section.style.setProperty("--intro-height", `${intro.offsetHeight}px`);
      };
      update();
      const observer = new ResizeObserver(update);
      observer.observe(intro);
      return () => observer.disconnect();
    }, []);
    useSectionProgressVar(sectionRef);
  
    const sectionStyle = { "--p": 0 } as React.CSSProperties;
  
    return (
      <section
        ref={sectionRef}
        className={`relative ${sectionHeightClass}`}
        aria-label="Hero reveal"
        style={sectionStyle}
      >
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ minHeight: "calc(var(--intro-height, 0px) + 224px)" }}
        >
          <div ref={introRef}>
            <IntroHeading title={introTitle} subtitle={introSubtitle} sponsors={sponsors} />
          </div>
          <ExpandingImageBox imageSrc={imageSrc} imageAlt={imageAlt} followIntro>
            <CenteredOverlay title={overlayTitle} subtitle={overlaySubtitle} />
          </ExpandingImageBox>
        </div>
      </section>
    );
  }
