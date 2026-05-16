import { HeroBanner } from "../components/sponsors/hero-banner";
import { WhyFsai } from "../components/sponsors/why-fsai";
import { SponsorshipTiers } from "../components/sponsors/sponsorship-tiers";
import { PackageDetails } from "../components/sponsors/package-details";
import { ContactSection } from "../components/sponsors/contact-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor us | Bristol Formula Student AI",
  description:
    "Explore sponsorship opportunities with Bristol Formula Student AI.",
  openGraph: {
    title: "Sponsor us | Bristol Formula Student AI",
    description:
      "Explore sponsorship opportunities with Bristol Formula Student AI.",
    type: "website",
  },
};

export default function Sponsors() {
  return (
    <main>
      <HeroBanner />
      <WhyFsai />
      <SponsorshipTiers />
      <PackageDetails />
      <ContactSection />
    </main>
  );
}
