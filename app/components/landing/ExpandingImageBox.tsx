"use client";

import Image from "next/image";

type Props = {
  imageSrc: string;
  imageAlt: string;
  startHeightVh?: number; // default 20
  startWidthVw?: number; // default 60
  className?: string;
  children?: React.ReactNode;
};

export default function ExpandingImageBox({
  imageSrc,
  imageAlt,
  startHeightVh = 20,
  startWidthVw = 60,
  className,
  children,
}: Props) {
  const growH = 100 - startHeightVh;
  const growW = 100 - startWidthVw;

  return (
    <div
      className={`absolute bottom-0 left-1/2 -translate-x-1/2 z-0 overflow-hidden rounded-lg will-change-[height,width] ${
        className ?? ""
      }`}
      style={{
        height: `calc(${startHeightVh}vh + ${growH}vh * var(--p))`,
        width: `calc(${startWidthVw}vw + ${growW}vw * var(--p))`,
        transition: "height 0.12s ease-out, width 0.12s ease-out",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(calc(1.05 + 0.12 * var(--p)))`,
          transition: "transform 0.12s ease-out",
          willChange: "transform",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Darkening overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-150"
        style={{ opacity: `calc(var(--p) * 0.5)` }}
      />

      {children}
    </div>
  );
}
