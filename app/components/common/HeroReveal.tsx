"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "@/app/hooks/useInView";

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
    <section
      ref={ref}
      className="relative h-[100svh] min-h-screen overflow-hidden isolate bg-black"
    >
      {image ? (
        <img
          ref={imgRef}
          src={image}
          alt=""
          decoding="async"
          fetchPriority="high"
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
          <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center hero-text-base hero-animate-text">
            <div className="max-w-3xl">{children}</div>
          </div>
        </>
      )}
    </section>
  );
}
