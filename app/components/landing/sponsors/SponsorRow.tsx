"use client";

import Image from "next/image";

export type Sponsor = {
  name: string;
  logo: string;
  url?: string;
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
        const img = (
          <Image
            src={s.logo}
            alt={s.name}
            width={160}
            height={80}
            className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
            draggable={false}
            sizes="(max-width: 768px) 120px, 160px"
          />
        );

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
