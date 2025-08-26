"use client";

import { useInView } from "@/app/hooks/useInView";
import Container from "../common/container";

export function WhyFsai() {
  return (
    <section className="py-16 my-16">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8 md:text-lg leading-relaxed text-gray-700">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6 relative">
              Why FSAI?
            </h2>
              <p className="mb-6">
              Bristol Formula Student AI (FSAI) is a highly specialised society with students across 
              engineering disciplines building AI and robotics systems.
              </p>

              <p className="mb-6">
              Sponsorship is an excellent way to promote your brand and attract top talent. Bristol FSAI 
              offers a unique platform to showcase your company's innovation as well as engaging with 
              the next generation of engineers.
              </p>
              
              <p className="mb-8">
              Your sponsorship is invaluable for developing the autonomous systems and ensuring 
              inclusivity for our team.
              </p>
          </div>
        
          <div className="aspect-video w-full border-8 border-university-red p-4 border-dashed rounded-lg">
            <iframe
                src="https://www.youtube.com/embed/nW3JDPNSwBY"
                title="Bristol FSAI Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg border-8 border-logo-blue p-6"
            />
            </div>
        </div>
      </Container>
    </section>
  );
}
