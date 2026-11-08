import { getAllSponsors } from "@/lib/sponsorApi";
import { SPONSOR_TIERS, type Sponsor } from "@/interfaces/sponsor";
import markdownToHtml from "@/lib/markdownToHtml";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "../common/container";

type SponsorWithHtml = Sponsor & { html: string };

export async function SponsorCards() {
  const sponsors: SponsorWithHtml[] = await Promise.all(
    getAllSponsors().map(async (sponsor) => ({
      ...sponsor,
      html: await markdownToHtml(sponsor.content),
    }))
  );

  // One category per tier (highest first), then sponsors without a tier.
  // Categories with no sponsors are not shown.
  const categories = [
    ...SPONSOR_TIERS.map((tier) => ({
      id: tier.toLowerCase(),
      heading: `${tier} Sponsors`,
      sponsors: sponsors.filter((sponsor) => sponsor.tier === tier),
    })),
    {
      id: "special-thanks",
      heading: "Special thanks to",
      sponsors: sponsors.filter((sponsor) => !sponsor.tier),
    },
  ].filter((category) => category.sponsors.length > 0);

  return (
    <div className="py-20">
      <Container>
        {categories.map((category) => (
          <section
            key={category.id}
            className="mb-16 last:mb-0"
            aria-labelledby={`sponsors-${category.id}`}
          >
            <h2
              id={`sponsors-${category.id}`}
              className="mb-8 text-2xl font-bold text-gray-900"
            >
              {category.heading}
            </h2>
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {category.sponsors.map((sponsor) => (
                <li key={sponsor.slug}>
                  <SponsorCard sponsor={sponsor} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>
    </div>
  );
}

function SponsorLogo({ sponsor }: { sponsor: SponsorWithHtml }) {
  if (!sponsor.logo) return null;
  // Logo files with built-in whitespace are cropped to a wide box.
  return sponsor.logo_crop_padding ? (
    <span className="relative block h-12 w-60 max-w-full overflow-hidden">
      <Image
        src={sponsor.logo}
        alt={`${sponsor.name} logo`}
        fill
        sizes="240px"
        className="object-cover"
      />
    </span>
  ) : (
    <Image
      src={sponsor.logo}
      alt={`${sponsor.name} logo`}
      width={400}
      height={100}
      className="h-12 w-auto max-w-[min(100%,16rem)] object-contain object-left"
    />
  );
}

function SponsorCard({ sponsor }: { sponsor: SponsorWithHtml }) {
  return (
    <article className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow transition-all duration-200 hover:shadow-lg motion-safe:hover:-translate-y-1">
      {sponsor.logo && (
        <div className="mb-6">
          {sponsor.website_link ? (
            <a
              href={sponsor.website_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block max-w-full"
            >
              <SponsorLogo sponsor={sponsor} />
            </a>
          ) : (
            <SponsorLogo sponsor={sponsor} />
          )}
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900">{sponsor.name}</h3>
      <div
        className="prose prose-gray mt-6 max-w-none leading-relaxed text-gray-600 [&>p]:my-0 [&>p+p]:mt-4"
        dangerouslySetInnerHTML={{ __html: sponsor.html }}
      />
      {sponsor.website_link && (
        <a
          href={sponsor.website_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 font-semibold text-university-red hover:underline"
        >
          Visit {sponsor.name}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
      )}
    </article>
  );
}
