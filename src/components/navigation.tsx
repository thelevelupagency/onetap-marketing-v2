"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { MagneticWrapper } from "@/components/ui/magnetic-button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
  ];

  const LOGIN_URL = "https://app.onetap-card.com/login";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled
          ? "bg-brand-cream/60 backdrop-blur-2xl border-b border-brand-midnight/5 shadow-glass py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.02] active:scale-95">
          <div className="w-8 h-8 bg-brand-turquoise rounded-full flex items-center justify-center font-serif text-brand-midnight text-xl font-bold shadow-soft-diffusion">
            O
          </div>
          <span className="font-serif text-2xl tracking-tight text-brand-midnight">OneTap</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 relative py-1",
                  isActive 
                    ? "text-brand-midnight" 
                    : "text-brand-midnight/60 hover:text-brand-midnight"
                )}
              >
                {link.name}
                {isActive && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-turquoise-dark rounded-full animate-in fade-in zoom-in duration-500" />
                )}
              </Link>
            );
          })}
          <MagneticWrapper>
            <Link
              href={LOGIN_URL}
              className="bg-brand-midnight text-brand-cream px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-turquoise hover:text-brand-midnight transition-all duration-300 shadow-soft-diffusion"
            >
              Get your card
            </Link>
          </MagneticWrapper>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-brand-midnight"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-cream/95 backdrop-blur-xl border-b border-brand-midnight/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-lg font-medium py-2 flex items-center justify-between",
                  isActive ? "text-brand-turquoise-dark" : "text-brand-midnight"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
                {isActive && <div className="w-2 h-2 bg-brand-turquoise-dark rounded-full" />}
              </Link>
            );
          })}
          <Link
            href={LOGIN_URL}
            className="bg-brand-turquoise text-brand-midnight px-5 py-3 rounded-full font-medium text-center w-full mt-2 shadow-soft-diffusion"
            onClick={() => setIsMobileMenuOpen(false)}
          >
             Get your card
          </Link>
        </div>
      )}
    </header>
  );
}
