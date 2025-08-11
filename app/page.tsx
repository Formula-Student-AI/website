import { Metadata } from "next";
import HeroContent from "@/app/components/landing/HeroContent";

export const metadata: Metadata = {
  title: "Home | Bristol Formula Student AI",
  description:
    "Welcome to Bristol Formula Student AI - pioneering autonomous vehicle technology in Formula Student competition. Discover our innovative AI-driven approach to racing.",
  openGraph: {
    title: "Bristol Formula Student AI",
    description:
      "Welcome to Bristol Formula Student AI - pioneering autonomous vehicle technology in Formula Student competition. Discover our innovative AI-driven approach to racing.",
    type: "website",
  },
};

export default function Home() {
  return (
    <HeroContent />
  )
}
