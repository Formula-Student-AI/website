import { Intro } from "../components/sponsors/intro";
import Container from "../components/common/container";
import { ContactSection } from "../components/sponsors/contact-section";
import { Metadata } from "next";
import { SponsorCards } from "../components/sponsors/sponsor-cards";

export const metadata: Metadata = {
  title: "Sponsors | Bristol Formula Student AI",
  description:
    "Meet the sponsors supporting Bristol Formula Student AI and find out how to partner with the team.",
  openGraph: {
    title: "Sponsors | Bristol Formula Student AI",
    description:
      "Meet the sponsors supporting Bristol Formula Student AI and find out how to partner with the team.",
    type: "website",
  },
};

export default function Sponsors() {
  return (
    <main>
      <Container>
        <Intro />
      </Container>
      <SponsorCards />
      <ContactSection />
    </main>
  );
}
