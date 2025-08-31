"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  image?: string;
  title: string;
  summary?: string;
  delayMs?: number;
  durationMs?: number;
};

export default function HeroReveal({
  image,
  title,
  summary,
  delayMs = 220,
  durationMs = 900,
}: Props) {
  const [started, setStarted] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setStarted(true))
      );
    };

    if (!image) {
      start();
      return;
    }

    const img = imgRef.current;
    const fallback = setTimeout(start, 1200);
    if (img) {
      if (img.complete) start();
      else {
        img.addEventListener("load", start, { once: true });
        img.addEventListener("error", start, { once: true });
      }
    } else {
      start();
    }
    return () => clearTimeout(fallback);
  }, [image]);

  return (
    <section
      className="relative h-[100svh] overflow-hidden isolate"
      style={
        {
          "--hero-delay": `${delayMs}ms`,
          "--hero-duration": `${durationMs}ms`,
          "--hero-ease": "cubic-bezier(.22,.61,.36,1)",
        } as React.CSSProperties
      }
    >
      {/* Background */}
      {image ? (
        <img
          ref={imgRef}
          src={image}
          alt=""
          className={[
            "absolute inset-0 z-0 h-full w-full object-cover",
            "will-change-[transform,filter] transform-gpu",
            started ? "animate-hero-image" : "scale-100 blur-0",
          ].join(" ")}
          decoding="async"
          fetchPriority="high"
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-100 to-white" />
      )}

      {/* Darken */}
      <div
        className={[
          "absolute inset-0 z-10 pointer-events-none opacity-0",
          "bg-gradient-to-b from-black/70 via-black/50 to-black/70",
          started ? "animate-hero-overlay" : "",
        ].join(" ")}
        aria-hidden="true"
      />

      {/* Text overlay */}
      <div
        className={[
          "absolute inset-0 z-20 flex items-center justify-center px-6 text-center",
          "opacity-0 translate-y-3",
          started ? "animate-hero-text" : "",
        ].join(" ")}
      >
        <div className="max-w-3xl">
          <p className="text-xs md:text-sm uppercase tracking-widest text-university-red font-semibold">
            Team Information
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {title}
          </h1>
          {summary ? (
            <p className="mt-4 text-base md:text-lg text-gray-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              {summary}
            </p>
          ) : null}
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-image {
          from {
            transform: scale(1);
            filter: blur(0px);
          }
          to {
            transform: scale(1.02);
            filter: blur(3px);
          }
        }
        @keyframes hero-overlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1; /* gradient already has alpha stops */
          }
        }
        @keyframes hero-text {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-hero-image {
          animation: hero-image var(--hero-duration) var(--hero-ease)
            var(--hero-delay) forwards;
        }
        .animate-hero-overlay {
          animation: hero-overlay calc(var(--hero-duration) * 0.85)
            var(--hero-ease) calc(var(--hero-delay) + 120ms) forwards;
        }
        .animate-hero-text {
          animation: hero-text calc(var(--hero-duration) * 0.85)
            var(--hero-ease) calc(var(--hero-delay) + 220ms) forwards;
        }
      `}</style>
    </section>
  );
}
