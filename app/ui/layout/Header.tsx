"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* FSAI Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/favicon-transparent.png"
              alt="FSAI Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-semibold text-gray-900">FSAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-sm sm:text-base font-medium text-gray-800">
            <Link
              href="/posts"
              className="hover:text-gray-600 transition-colors"
            >
              Posts
            </Link>
            <Link
              href="/events"
              className="hover:text-gray-600 transition-colors"
            >
              Events
            </Link>
            <Link
              href="/team"
              className="hover:text-gray-600 transition-colors"
            >
              Team
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Backdrop Overlay (Mobile) */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 backdrop-blur-sm bg-black/30 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Slide-Out Panel (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <X
              className={`w-5 h-5 text-gray-800 transform transition-transform duration-500 ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <nav className="flex flex-col px-4 py-6 space-y-4 text-base text-gray-800">
          <Link href="/posts" onClick={() => setIsMobileMenuOpen(false)}>
            Posts
          </Link>
          <Link href="/events" onClick={() => setIsMobileMenuOpen(false)}>
            Events
          </Link>
          <Link href="/team" onClick={() => setIsMobileMenuOpen(false)}>
            Team
          </Link>
        </nav>
      </div>
    </>
  );
}
