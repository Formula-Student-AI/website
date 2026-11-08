import AutoMarquee from "@/app/components/landing/sponsors/AutoMarquee";
import SponsorRow, {
  type Sponsor,
} from "@/app/components/landing/sponsors/SponsorRow";
import { getAllSponsors } from "@/lib/sponsorApi";

// The University of Bristol has no file in _sponsors/, so it is listed here.
const UNIVERSITY: Sponsor = {
  name: "University of Bristol",
  logo: "/sponsors/uob-logo.svg",
  url: "https://www.bristol.ac.uk/",
};

export default function SponsorBar() {
  // Every sponsor in _sponsors/ that has a logo, in the same order as /sponsors.
  // A sponsor's `strip_logo`, if set, replaces its main logo here.
  const sponsors: Sponsor[] = [
    UNIVERSITY,
    ...getAllSponsors().flatMap((sponsor) => {
      const logo = sponsor.strip_logo ?? sponsor.logo;
      return logo
        ? [
            {
              name: sponsor.name,
              logo,
              url: sponsor.website_link,
              cropPadding: sponsor.strip_logo ? false : sponsor.logo_crop_padding,
            },
          ]
        : [];
    }),
  ];
  const gap = 48;
  const row = <SponsorRow sponsors={sponsors} gap={gap} />;

  return (
    <section className="relative bg-gray-50 py-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-university-red/35" />

      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Powered by our <span className="text-university-red">Partners</span>
          </h2>
          <p className="mt-2 text-gray-900 text-sm md:text-base">
            We thank our sponsors for helping us drive innovation forward
          </p>
        </header>

        <AutoMarquee
          row={row}
          speed={35}
          direction="left"
          gradient={false}
          centerWhenStatic
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-university-red/35" />
    </section>
  );
}
