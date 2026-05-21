"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOGIN_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const solutionsLinks = [
  { name: "Freelancers", href: "/solutions/freelancers" },
  { name: "Agencies", href: "/solutions/agencies" },
];

const learnLinks = [
  { name: "Blog", href: "/blog" },
  { name: "Success Stories", href: "/blog?category=success-stories" },
  { name: "FAQ", href: "/faq" },
];

function NavDropdown({
  label,
  links,
  isOpen,
  onToggle,
  onClose,
}: {
  label: string;
  links: { name: string; href: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-medium text-brand-midnight/60 hover:text-brand-midnight transition-colors py-1"
      >
        {label}
        <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl border border-brand-midnight/10 shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-4 py-2 text-sm text-brand-midnight/80 hover:bg-brand-cream hover:text-brand-midnight transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled
          ? "bg-brand-cream/80 backdrop-blur-2xl border-b border-brand-midnight/5 shadow-glass py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.02]">
          <div className="w-8 h-8 bg-brand-turquoise rounded-full flex items-center justify-center font-logo text-brand-midnight text-xl font-bold shadow-soft-diffusion">
            O
          </div>
          <span className="font-logo text-2xl tracking-tight text-brand-midnight">OneTap</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors py-1",
              isActive("/") && pathname === "/"
                ? "text-brand-midnight"
                : "text-brand-midnight/60 hover:text-brand-midnight"
            )}
          >
            Home
          </Link>
          <NavDropdown
            label="Solutions"
            links={solutionsLinks}
            isOpen={openDropdown === "solutions"}
            onToggle={() => setOpenDropdown(openDropdown === "solutions" ? null : "solutions")}
            onClose={() => setOpenDropdown(null)}
          />
          <NavDropdown
            label="Learn"
            links={learnLinks}
            isOpen={openDropdown === "learn"}
            onToggle={() => setOpenDropdown(openDropdown === "learn" ? null : "learn")}
            onClose={() => setOpenDropdown(null)}
          />
          <Link
            href="/pricing"
            className={cn(
              "text-sm font-medium transition-colors py-1",
              isActive("/pricing") ? "text-brand-midnight" : "text-brand-midnight/60 hover:text-brand-midnight"
            )}
          >
            Pricing
          </Link>
          <Link href={LOGIN_URL}>
            <Button className="bg-brand-midnight text-brand-cream hover:bg-brand-turquoise hover:text-brand-midnight rounded-full px-6 shadow-soft-diffusion">
              Get your card
            </Button>
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-brand-midnight"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-cream/95 backdrop-blur-xl border-b border-brand-midnight/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300">
          <Link href="/" className="text-lg font-medium py-2" onClick={() => setIsMobileOpen(false)}>
            Home
          </Link>
          <div>
            <p className="text-xs uppercase tracking-wider text-brand-midnight/40 mb-2">Solutions</p>
            {solutionsLinks.map((l) => (
              <Link key={l.href} href={l.href} className="block text-lg py-2 text-brand-midnight/80" onClick={() => setIsMobileOpen(false)}>
                {l.name}
              </Link>
            ))}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-brand-midnight/40 mb-2">Learn</p>
            {learnLinks.map((l) => (
              <Link key={l.href} href={l.href} className="block text-lg py-2 text-brand-midnight/80" onClick={() => setIsMobileOpen(false)}>
                {l.name}
              </Link>
            ))}
          </div>
          <Link href="/pricing" className="text-lg font-medium py-2" onClick={() => setIsMobileOpen(false)}>
            Pricing
          </Link>
          <Link href={LOGIN_URL} onClick={() => setIsMobileOpen(false)}>
            <Button className="w-full bg-brand-turquoise text-brand-midnight rounded-full mt-2">Get your card</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
