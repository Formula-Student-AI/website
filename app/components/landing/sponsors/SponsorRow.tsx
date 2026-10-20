"use client";

import Image from "next/image";

export type Sponsor = {
  name: string;
  logo: string;
  url?: string;
  cropPadding?: boolean;
};

export default function SponsorRow({
  sponsors,
  gap = 48,
}: {
  sponsors: Sponsor[];
  gap?: number;
}) {
  const pad = Math.round(gap / 2);

  return (
    <div className="flex items-center">
      {sponsors.map((s, i) => {
        const logo = (
          <Image
            src={s.logo}
            alt={s.name}
            width={s.cropPadding ? undefined : 160}
            height={s.cropPadding ? undefined : 80}
            fill={s.cropPadding}
            className={`${s.cropPadding ? "object-cover" : "h-12 w-auto object-contain"} grayscale hover:grayscale-0 transition duration-300`}
            draggable={false}
            sizes={s.cropPadding ? "320px" : "(max-width: 768px) 120px, 160px"}
          />
        );
        const img = s.cropPadding ? (
          <span className="relative block h-16 w-80 overflow-hidden">
            {logo}
          </span>
        ) : logo;

        const common = {
          className: "inline-flex items-center justify-center min-h-12",
          style: { paddingInline: pad },
        };

        return s.url ? (
          <a
            key={i}
            {...common}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            title={s.name}
          >
            {img}
          </a>
        ) : (
          <div key={i} {...common}>
            {img}
          </div>
        );
      })}
    </div>
  );
}
