import { HeroBanner } from "../components/sponsors/hero-banner";
import { WhyFsai } from "../components/sponsors/why-fsai";
import Container from "../components/common/container";
import { Download } from "lucide-react";
import { ContactSection } from "../components/sponsors/contact-section";
import { Metadata } from "next";
import { SponsorCards } from "../components/sponsors/sponsor-cards";

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
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <a
              href="/sponsors/Bristol%20FSAI%20-%20Sponsorship%20Brochure.pdf"
              download="Bristol FSAI - Sponsorship Brochure.pdf"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-university-red px-6 py-4 font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-university-red"
            >
              <Download aria-hidden="true" className="h-5 w-5 shrink-0" />
              Download sponsorship brochure (PDF)
            </a>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              You can contact us at our email, cs-fsai@bristol.ac.uk. We&apos;re always open to new ideas,
              so please just ask.
            </p>
          </div>
        </Container>
      </section>
      <SponsorCards />
      <WhyFsai />
      <ContactSection />
    </main>
  );
}
