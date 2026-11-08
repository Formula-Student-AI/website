import type { Metadata } from "next";
import Image from "next/image";
import JoinForm from "../components/join/JoinForm";

export const metadata: Metadata = {
  title: "Join us | Bristol Formula Student AI",
  description:
    "Sign up to join Bristol Formula Student AI. Choose APC or DDT and the subteams you're interested in.",
  openGraph: {
    title: "Join us | Bristol Formula Student AI",
    description:
      "Sign up to join Bristol Formula Student AI. Choose APC or DDT and the subteams you're interested in.",
    type: "website",
  },
};

export default function JoinPage() {
  return (
    <div>
      {/* On desktop the hero leaves room (header + stripe + the "Sign up" intro)
          so the start of the form is visible without scrolling. */}
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden md:min-h-[calc(100vh-16rem)]">
        <Image
          src="/join/join-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[70%_50%] md:object-[50%_60%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-35% via-logo-blue/70 via-70% to-logo-blue"
        />
        <div className="container mx-auto px-4 pb-12 md:pb-20">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            Build the car that drives itself.
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/90">
            Bristol FSAI designs, builds and races autonomous cars for Formula Student AI at
            Silverstone. Sign up below to join APC or DDT this season.
          </p>
        </div>
      </section>

      <div
        aria-hidden="true"
        className="h-2.5"
        style={{
          background:
            "linear-gradient(100deg, var(--university-red) 0 68%, #fff 68% 69.5%, var(--university-red) 69.5% 100%)",
        }}
      />

      <section className="bg-gray-50 pt-10 pb-16 md:pb-20">
        <div className="mx-auto max-w-xl px-4">
          <JoinForm />
        </div>
      </section>
    </div>
  );
}
