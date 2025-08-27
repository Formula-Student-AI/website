import AutoMarquee from "@/app/components/landing/sponsors/AutoMarquee";
import SponsorRow, {
  type Sponsor,
} from "@/app/components/landing/sponsors/SponsorRow";

const SPONSORS: Sponsor[] = [
  {
    name: "University of Bristol",
    logo: "/sponsors/uob-logo.svg",
    url: "https://www.bristol.ac.uk/",
  },
  {
    name: "University of Bristol",
    logo: "/sponsors/uob-logo.svg",
    url: "https://www.bristol.ac.uk/",
  },
  {
    name: "University of Bristol",
    logo: "/sponsors/uob-logo.svg",
    url: "https://www.bristol.ac.uk/",
  },
  {
    name: "University of Bristol",
    logo: "/sponsors/uob-logo.svg",
    url: "https://www.bristol.ac.uk/",
  },
];

export default function SponsorBar() {
  const gap = 48;
  const row = <SponsorRow sponsors={SPONSORS} gap={gap} />;

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
