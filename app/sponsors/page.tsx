import { HeroBanner } from "../components/sponsors/hero-banner";
import { WhyFsai } from "../components/sponsors/why-fsai";
import { SponsorshipTiers } from "../components/sponsors/sponsorship-tiers";
import { PackageDetails } from "../components/sponsors/package-details";
import { ContactSection } from "../components/sponsors/contact-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor us | Bristol Formula Student AI",
  description:
    "Check out the sponsorship opportunities from the Bristol Formula Student AI team.",
  openGraph: {
    title: "Sponsor us | Bristol Formula Student AI",
    description:
      "Check out the sponsorship opportunities from the Bristol Formula Student AI team.",
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