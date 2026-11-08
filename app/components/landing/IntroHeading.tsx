"use client";

type Props = { title: React.ReactNode; subtitle?: React.ReactNode };

export default function IntroHeading({ title, subtitle }: Props) {
  return (
    <div
      className="relative w-full text-center px-6 pt-12 md:pt-20 z-10 text-gray-900"
      style={{
        // fades out by ~p=0.5 and slides up
        opacity: `clamp(0, calc(1 - var(--p) * 2), 1)`,
        transform: `translateY(calc(var(--p) * -20px))`,
        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
      }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h2>
      {subtitle ? <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{subtitle}</p> : null}
    </div>
  );
}
