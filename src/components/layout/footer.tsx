"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconBrandLinkedin, IconBrandInstagram, IconBrandTwitter } from "@tabler/icons-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { MarketingContainer } from "@/components/marketing/primitives";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Home", href: "/" },
      { name: "Freelancers", href: "/solutions/freelancers" },
      { name: "Agencies", href: "/solutions/agencies" },
      { name: "Pricing", href: "/pricing" },
      { name: "FAQ", href: "/faq" },
    ],
    company: [
      { name: "Blog", href: "/blog" },
      { name: "About", href: "#" },
      { name: "Contact", href: "#" },
    ],
    resources: [
      { name: "Help Center", href: "/faq" },
      { name: "Terms", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  };

  return (
    <footer className="relative w-full overflow-hidden bg-brand-midnight text-brand-cream pt-16 md:pt-24 pb-8 md:pb-12 border-t border-white/5">
      <MarketingContainer width="full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12 md:mb-16">
          <div className="lg:col-span-2">
            <Logo
              href="/"
              theme="bright"
              className="mb-6"
              imageClassName="h-10 w-auto md:h-11"
            />
            <p className="text-brand-cream/60 max-w-sm mb-8 text-lg leading-relaxed">
              Elevate your networking with professional digital business cards. Save contacts, capture leads, and grow your brand in one tap.
            </p>
            <div className="flex gap-5">
              <Link href="#" className="text-brand-cream/40 hover:text-brand-turquoise transition-colors" aria-label="Twitter">
                <IconBrandTwitter size={20} />
              </Link>
              <Link href="#" className="text-brand-cream/40 hover:text-brand-turquoise transition-colors" aria-label="LinkedIn">
                <IconBrandLinkedin size={20} />
              </Link>
              <Link href="#" className="text-brand-cream/40 hover:text-brand-turquoise transition-colors" aria-label="Instagram">
                <IconBrandInstagram size={20} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-3 gap-8">
            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key}>
                <h4 className="type-subsection-title mb-6 text-white">{key}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-brand-cream/60 hover:text-brand-turquoise transition-colors text-sm md:text-base">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-y border-white/10 py-10 mb-10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="max-w-md text-center lg:text-left">
            <h3 className="type-subsection-title mb-2 text-white">Join our newsletter</h3>
            <p className="text-brand-cream/60">Get networking tips and product updates delivered to your inbox.</p>
          </div>
          <form className="w-full max-w-md flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-brand-cream/30 focus:outline-none focus:ring-2 focus:ring-brand-turquoise/50 text-sm"
            />
            <Button type="submit" className="bg-brand-turquoise text-brand-midnight hover:bg-white rounded-xl h-12 px-6 font-medium">
              Subscribe
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-cream/40">
          <span>© {currentYear} OneTap Card. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-brand-turquoise transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-brand-turquoise transition-colors">Terms</Link>
          </div>
        </div>
      </MarketingContainer>
      <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-brand-turquoise/5 rounded-full blur-[120px] pointer-events-none" aria-hidden />
    </footer>
  );
}
