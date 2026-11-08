import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import RevealWrapper from "@/app/components/common/RevealWrapper";

const FSUK_URL = "https://www.imeche.org/events/formula-student";

/** Who we are and which competition we enter: the first section under the hero. */
export default function FsukIntro() {
  return (
    <section aria-label="Formula Student UK" className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="lg:order-2">
            <RevealWrapper>
              <div className="max-w-xl space-y-6 text-lg leading-relaxed text-gray-600">
                <p>
                  Bristol Formula Student AI is an autonomous Formula Student team based out of
                  the University of Bristol’s School of Computer Science.
                </p>
                <p>
                  We participate in FSUK (Formula Student UK), part of the world’s largest
                  student engineering competition, with over 600 universities taking part in its
                  numerous competitions internationally.
                </p>
              </div>
              <a
                href={FSUK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-university-red px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-university-red/90 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-university-red"
              >
                Visit the FSUK website
                <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </RevealWrapper>
          </div>

          <div className="lg:order-1">
            <RevealWrapper direction="scale">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-900/5">
                <Image
                  src="/landing/fsuk_cone_course.jpg"
                  alt="A team member checking the ADS-DV on the cone course at Formula Student UK, Silverstone"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
