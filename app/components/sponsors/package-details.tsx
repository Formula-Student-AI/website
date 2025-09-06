"use client";

import { useInView } from "@/app/hooks/useInView";
import Container from "../common/container";
import { GalleryItem } from "./GalleryItem";

export function PackageDetails() {
  const { ref, visible } = useInView<HTMLElement>();

  const images = [
    {
       src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
       width: 320,
       height: 174,
       caption: "After Rain (Jeshu John - designerspics.com)",
       alt: "After Rain landscape photography"
    },
    {
       src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
       width: 320,
       height: 212,
       alt: "Boats (Jeshu John - designerspics.com)",
    },
    {
       src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
       width: 320,
       height: 212,
       alt: "Ocean landscape"
    },
 ];

  const packages = [
    {
      title: "Run a Custom Workshop",
      description: "Running a custom event is the perfect opportunity to show students interesting technical problems you work on, what it's like to work at your company, and what you're looking for in new engineers.",
      details: "We help our partners run a variety of workshops including programming contests, data science challenges and capture the flag.",
    },
    {
      title: "Give a Tech Talk",
      description: "You send the presenter, we organise venue, tech setup, and advertising.",
      details: "You can expect an audience of around 30 to 50 people (variable depending on the availability and interest of students). Similar talks have covered topics such as high-performance computing, JVM internals, formal hardware verification and banking security.",
    },
    {
      title: "Collaborative Sponsorships",
      description: "We collaborate closely with the University of Bristol Computer Science Society (CSS), who host an array of events throughout the year including the annual BrisHack hackathon.",
      details: "Interested in sponsoring CSS x FSAI? Let us know and we can arrange a specialised sponsorship package.",
    },
  ];

  return (
    <section ref={ref} className="py-16 my-16">
      <Container>
        <div className="max-w-5xl md:w-[70vw] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-4 relative inline-block">
              SPONSORSHIP GUIDE 2025
              <span 
                className={`absolute bottom-0 left-0 h-1.5 bg-logo-blue transition-all duration-1000 ease-out ${
                  visible ? 'w-full' : 'w-0'
                }`}
              />
            </h2>
          </div>
          
          <div className="space-y-12">
            {packages.map((pkg, index) => (
              <div key={pkg.title} className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {pkg.title}
                </h3>
                <p className="mb-4">
                  {pkg.description}
                </p>
                <p className="mb-6">
                  {pkg.details}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <GalleryItem
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  caption={image.caption}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

