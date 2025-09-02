"use client";

import { useState, useEffect } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { Logo } from "@/app/components/header/Logo";
import NavLinks from "@/app/components/header/NavLinks";
import MobileMenu from "@/app/components/header/MobileMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`backdrop-blur-md fixed left-0 w-full z-50 bg-white/35 transition-all duration-500 ${
          isVisible ? 'top-0 translate-y-0' : '-top-16 -translate-y-full'
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex">
            <NavLinks onClick={() => {}} />
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsOpen(true)}
            aria-label="Open mobile menu"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
