import HeroReveal from "@/app/components/common/HeroReveal";

/** The full-screen photo header at the top of each team page. */
export default function TeamHero({
  image,
  title,
  summary,
  eyebrow = "Team Information",
}: {
  image?: string;
  title: React.ReactNode;
  summary?: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <HeroReveal image={image}>
      <div className="max-w-3xl text-white">
        <p className="text-xs md:text-sm uppercase tracking-widest text-red-400 font-semibold">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow">
          {title}
        </h1>
        {summary ? <p className="mt-4 text-base md:text-lg text-gray-200">{summary}</p> : null}
      </div>
    </HeroReveal>
  );
}
