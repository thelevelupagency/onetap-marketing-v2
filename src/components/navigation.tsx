"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { MagneticWrapper } from "@/components/ui/magnetic-button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-brand-cream/60 backdrop-blur-2xl border-b border-brand-midnight/5 shadow-glass py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-turquoise rounded-full flex items-center justify-center font-serif text-brand-midnight text-xl font-bold shadow-soft-diffusion">
            O
          </div>
          <span className="font-serif text-2xl tracking-tight text-brand-midnight hidden sm:block">
            OneTap
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-brand-midnight font-medium">
          <Link href="/solutions" className="hover:text-brand-turquoise transition-colors">
            Solutions
          </Link>
          <Link href="/pricing" className="hover:text-brand-turquoise transition-colors">
            Pricing
          </Link>
          <Link href="/faq" className="hover:text-brand-turquoise transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-brand-midnight font-medium hover:text-brand-turquoise transition-colors px-2">
            Log in
          </Link>
          <MagneticWrapper>
            <Link
              href="/signup"
              className="inline-block bg-brand-midnight text-brand-cream px-6 py-2.5 rounded-full font-medium hover:bg-brand-midnight/90 transition-colors shadow-soft-diffusion"
            >
              Get your card
            </Link>
          </MagneticWrapper>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brand-midnight p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-cream border-b border-brand-midnight/10 py-4 px-4 flex flex-col gap-4 shadow-xl backdrop-blur-xl">
          <Link href="/solutions" className="text-lg font-medium text-brand-midnight" onClick={() => setIsMobileMenuOpen(false)}>
            Solutions
          </Link>
          <Link href="/pricing" className="text-lg font-medium text-brand-midnight" onClick={() => setIsMobileMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="/faq" className="text-lg font-medium text-brand-midnight" onClick={() => setIsMobileMenuOpen(false)}>
            FAQ
          </Link>
          <hr className="border-brand-midnight/10" />
          <Link href="/login" className="text-lg font-medium text-brand-midnight" onClick={() => setIsMobileMenuOpen(false)}>
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-brand-midnight text-brand-cream px-5 py-3 rounded-full font-medium text-center w-full mt-2 shadow-soft-diffusion"
            onClick={() => setIsMobileMenuOpen(false)}
          >
             Get your card
          </Link>
        </div>
      )}
    </header>
  );
}
