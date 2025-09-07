"use client";

import { useInView } from "@/app/hooks/useInView";
import Container from "../common/container";

interface TierFeature {
  text: string;
  included: boolean;
}

interface SponsorshipTier {
  name: string;
  isPremium?: boolean;
  features: TierFeature[];
}

export function SponsorshipTiers() {
  const { ref, visible } = useInView<HTMLElement>();    

  const tiers: SponsorshipTier[] = [
    {
      name: "Standard Plan",
      features: [
        { text: "Logo on website", included: true },
        { text: "Logo on merchandise", included: false },
        { text: "Run a tech talk", included: true },
        { text: "Run a custom workshop", included: false },
        { text: "Advertising for all events", included: true },
        { text: "Job postings on website", included: true },
        { text: "Regular updates from committee", included: true },
      ],
    },
    {
      name: "Premium Plan",
      isPremium: true,
      features: [
        { text: "Logo on website", included: true },
        { text: "Logo on merchandise", included: true },
        { text: "Run a tech talk", included: true },
        { text: "Run a custom workshop", included: true },
        { text: "Advertising for all events", included: true },
        { text: "Job postings on website", included: true },
        { text: "Regular updates from committee", included: true },
      ],
    },
  ];

  return (
    <section 
      ref={ref} 
      className="py-16 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/sponsors/acceleration.jpg')",
      }}
    >
      {/* White gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      <Container>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-4 relative inline-block">
              2025 SPONSORSHIP
              <span 
                className={`absolute bottom-0 left-0 h-1.5 bg-university-red transition-all duration-1000 ease-out ${visible ? 'w-full' : 'w-0'}`}
              />
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`rounded-lg p-8 shadow-2xl ${
                  tier.isPremium 
                    ? 'bg-university-red text-white shadow-university-red/50 opacity-90' 
                    : 'bg-gray-100 text-gray-900 shadow-white/50 opacity-90'
                  } ${visible ? 'motion-opacity-in-0 motion-translate-y-in-20 motion-blur-in-md motion-duration-2000' : 'opacity-0 translate-y-20 blur-md duration-2000'}`}
                style={{ animationDelay: `${index * 500}ms` }}
              >
                <div className="text-center mb-8">
                  <div className="flex flex-col items-center">
                    <h3 className={`mb-2 text-2xl md:text-3xl font-extrabold tracking-tight ${
                      tier.isPremium 
                        ? 'bg-gradient-to-r from-yellow-200 via-white to-yellow-300 text-transparent bg-clip-text' 
                        : 'bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text'
                    }`}>
                      {tier.name}
                      {tier.isPremium && <span className="ml-2 align-middle">🏆</span>}
                    </h3>
                    <span className={`${tier.isPremium ? 'bg-yellow-300/80' : 'bg-gray-400/60'} block h-0.5 w-12 rounded-full`}></span>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <span className={`text-lg ${
                        feature.included 
                          ? tier.isPremium ? 'text-green-300' : 'text-green-600'
                          : tier.isPremium ? 'text-red-300' : 'text-red-500'
                      }`}>
                        {feature.included ? '✓' : '✗'}
                      </span>
                      <span className={`${
                        !feature.included 
                          ? tier.isPremium ? 'text-gray-300' : 'text-gray-500'
                          : ''
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
