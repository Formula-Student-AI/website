"use client";

export default function CenteredOverlay({
  title,
  subtitle,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  const textOpacity = `clamp(0, calc((var(--p) - 0.85) / 0.15), 1)`;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
      style={{
        opacity: textOpacity,
        transform: `translateY(calc((1 - ${textOpacity}) * 20px))`,
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      <h1 className="text-4xl md:text-6xl font-extrabold">{title}</h1>
      {subtitle ? <p className="mt-4 max-w-2xl text-lg md:text-xl">{subtitle}</p> : null}
    </div>
  );
}