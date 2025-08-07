"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/app/components/header/Logo";
import NavLinks from "@/app/components/header/NavLinks";
import MobileMenu from "@/app/components/header/MobileMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-shadow duration-300 ${
          isOpen ? "" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
