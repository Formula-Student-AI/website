"use client";

import Container from "../common/container";
import { Intro } from "./intro";
import Image from "next/image";
import { useState, useEffect } from "react";

export function HeroBanner() {
  const interval = 4500;
  const images = [
    "/sponsors/bristol_uni.jpg",
    "/sponsors/racecar.jpg",
    "/sponsors/silverstone_2025_all_teams.jpg",
    "/sponsors/coding.jpg",
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="h-[50vh] md:h-[70vh] relative flex items-center justify-center group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white z-10" />
      
      {/* Render all images with opacity transition */}
      {images.map((image, index) => (
        <Image 
          key={index}
          src={image} 
          alt={`Sponsors Banner ${index + 1}`} 
          fill
          className={`object-cover motion-duration-20000 motion-ease-linear motion-scale-loop-105 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
      <div className="relative z-20 text-center">
        <Container>
          <Intro />
        </Container>
      </div>

    </section>
  );
}
