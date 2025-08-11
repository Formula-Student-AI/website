"use client";

import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { Logo } from "@/app/components/header/Logo";
import NavLinks from "@/app/components/header/NavLinks";
import MobileMenu from "@/app/components/header/MobileMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header
        className={`backdrop-blur-md fixed top-0 left-0 w-full z-50 bg-white/35 transition-shadow duration-300`}
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
