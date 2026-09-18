"use client";

import Link from "next/link";
import Image from "next/image";
import { desktopNavigation, mobileNavigation } from "@/content/site";
import { useState, useEffect } from "react";
import { cn } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-atelier/95 backdrop-blur-md border-gold/10 py-3"
          : "bg-gradient-to-b from-atelier/80 to-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0 relative h-10 w-48 md:w-56">
            <Image
              src="/brand/fashion-look-logo-original.png"
              alt="Fashion Look"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {desktopNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm uppercase tracking-widest text-ivory/80 hover:text-gold transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-widest text-ivory/80 hover:text-gold transition-colors font-medium mr-2"
            >
              WhatsApp
            </a>
            <Link
              href="/book"
              className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-atelier transition-colors text-sm uppercase tracking-widest font-medium"
            >
              Book Appointment
            </Link>
          </div>

          <button
            className="lg:hidden text-ivory p-2 z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-atelier pt-24 px-6 overflow-y-auto pb-24">
          <div className="flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-2">
              {mobileNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xl uppercase tracking-widest text-ivory/90 hover:text-gold py-3 border-b border-gold/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-auto pt-8 flex flex-col gap-4 pb-12">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full px-6 py-4 border border-gold text-gold hover:bg-gold hover:text-atelier text-center uppercase tracking-widest font-medium transition-colors"
              >
                WhatsApp
              </a>
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full px-6 py-4 bg-gold text-atelier text-center uppercase tracking-widest font-medium transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
