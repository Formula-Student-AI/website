import { HeroBanner } from "../components/sponsors/hero-banner";
import { WhyFsai } from "../components/sponsors/why-fsai";
import { SponsorshipTiers } from "../components/sponsors/sponsorship-tiers";
import { PackageDetails } from "../components/sponsors/package-details";
import { ContactSection } from "../components/sponsors/contact-section";

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