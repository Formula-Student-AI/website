"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "@/app/hooks/useInView";
import Image from "next/image";

type Props = {
  image?: string;
  children: React.ReactNode;
  threshold?: number | number[];
  rootMargin?: string;
};

export default function HeroReveal({
  image,
  children,
  threshold = 0.7,
  rootMargin = "0px 0px -6% 0px",
}: Props) {
  const { ref, visible } = useInView<HTMLElement>({
    threshold,
    rootMargin,
    once: true,
  });

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgReady, setImgReady] = useState(!image);

  useEffect(() => {
    if (!image) return;

    let done = false;
    const settle = () => {
      if (done) return;
      done = true;
      setImgReady(true);
    };

    const img = imgRef.current;
    const fallback = setTimeout(settle, 1500);

    if (img) {
      if (img.complete) {
        (img.decode?.() || Promise.resolve()).finally(settle).catch(settle);
      } else {
        const onLoad = () =>
          (img.decode?.() || Promise.resolve()).finally(settle).catch(settle);
        img.addEventListener("load", onLoad, { once: true });
        img.addEventListener("error", settle, { once: true });
      }
    } else {
      settle();
    }

    return () => clearTimeout(fallback);
  }, [image]);

  const started = visible && imgReady;

  return (
    <section ref={ref} className="relative min-h-[100svh] bg-black overflow-hidden">
      {image ? (
        <Image
          ref={imgRef}
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className={[
            "absolute inset-0 z-0 h-full w-full object-cover transform-gpu will-change-[transform,filter]",
            started ? "hero-animate-image" : "",
          ].join(" ")}
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-100 to-white" />
      )}

      {/* Overlay & text */}
      {started && (
        <>
          <div
            className="absolute inset-0 z-10 pointer-events-none hero-overlay-base hero-animate-overlay"
            aria-hidden="true"
          />
          <div className="relative z-20 px-6 text-center hero-text-base hero-animate-text">
            <div className="mx-auto max-w-3xl min-h-[100svh] flex items-center justify-center py-12 md:py-16 lg:py-24">
              {children}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
