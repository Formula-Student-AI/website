"use client";

import { useInView } from "@/app/hooks/useInView";
import Container from "../common/container";
import { FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";

interface Contact {
  title: string;
  link: string;
  icon: React.ReactNode;
}

export function ContactSection() {
  const { ref, visible } = useInView<HTMLElement>();

  const contacts: Contact[] = [
    {
      title: "fsai.cssbristol.co.uk",
      link: "https://fsai.cssbristol.co.uk",
      icon: <FaGlobe />,
    },
    {
      title: "@bristol_fsai",
      link: "https://instagram.com/bristol_fsai",
      icon: <FaInstagram />,
    },
    {
      title: "/bristol_fsai",
      link: "https://www.linkedin.com/company/bristol-fsai",
      icon: <FaLinkedin />,
    },
  ];

  return (
    <section ref={ref} className="border-t-16 border-university-red">
      <div className="border-t-18 border-logo-blue" />
      <Container>
        <div className="py-16 mx-auto">
          <div className={`${visible ? 'motion-preset-slide-up' : 'opacity-0'}`}>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Column - Titles */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight motion-preset-typewriter-[11] md:motion-preset-typewriter-[12]">
                    Interested?
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold">
                  Get in touch.
                </h3>
              </div>
              
              {/* Right Column - Content */}
              <div className="space-y-8">
                <div>
                  <p className="text-lg mb-4">
                    If you&apos;re interested in working with us, please get in touch with us by emailing{" "}
                    <a 
                      href="mailto:bristol.fsai@gmail.com" 
                      className="underline font-bold hover:text-yellow-200 transition-colors"
                    >
                      bristol.fsai@gmail.com
                    </a>
                    {" "}for more information.
                  </p>
                </div>
                
                <div>
                  <p className="text-lg mb-6">You can keep up to date by following us:</p>
                  <div className="flex flex-col gap-1 text-sm">
                    {contacts.map((contact) => (
                      <a 
                        key={contact.title}
                        href={contact.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-yellow-200 transition-colors"
                      >
                        <span className="text-lg">{contact.icon}</span>
                        {contact.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

