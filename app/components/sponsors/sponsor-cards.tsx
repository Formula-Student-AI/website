import { getAllSponsors } from "@/lib/sponsorApi";
import type { SponsorTier } from "@/interfaces/sponsor";
import markdownToHtml from "@/lib/markdownToHtml";
import Image from "next/image";
import Container from "../common/container";

const tierStyles: Record<SponsorTier, string> = {
  Gold: "border-amber-300 bg-amber-100 text-amber-900",
  Silver: "border-slate-300 bg-slate-100 text-slate-700",
  Bronze: "border-orange-300 bg-orange-100 text-orange-900",
};

export async function SponsorCards() {
  const sponsors = await Promise.all(
    getAllSponsors().map(async (sponsor) => ({
      ...sponsor,
      html: await markdownToHtml(sponsor.content),
    }))
  );
  return (
    <section className="py-16" aria-labelledby="our-sponsors-heading">
      <Container>
        <h2
          id="our-sponsors-heading"
          className="mb-10 text-4xl md:text-6xl font-bold tracking-tighter leading-tight"
        >
          Our sponsors
        </h2>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {sponsors.map((sponsor) => (
            <li key={sponsor.slug} className="h-full">
              <article className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm transition-[transform,box-shadow] duration-200 ease-out motion-safe:hover:scale-[1.01] hover:shadow-md">
                <div className="flex h-44 items-center justify-center overflow-hidden rounded-t-2xl border-b border-gray-100 p-6">
                  {sponsor.logo ? (
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      width={320}
                      height={128}
                      className="max-h-32 w-auto max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-3xl font-bold tracking-tight text-gray-900">
                      {sponsor.name}
                    </span>
                  )}
                </div>
                <div className="p-5 md:p-6">
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {sponsor.name}
                    </h3>
                    {sponsor.tier && (
                      <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${tierStyles[sponsor.tier]}`}>
                        {sponsor.tier} Sponsor
                      </span>
                    )}
                  </div>
                  <div
                    className="prose prose-gray max-w-none leading-relaxed text-gray-700 [&>p]:my-0 [&>p+p]:mt-4"
                    dangerouslySetInnerHTML={{ __html: sponsor.html }}
                  />
                  {sponsor.website_link && (
                    <a
                      href={sponsor.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-block font-semibold text-university-red hover:underline"
                    >
                      Visit {sponsor.name} website <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
