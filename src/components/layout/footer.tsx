"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { MarketingContainer } from "@/components/marketing/primitives";
import { footerCopy } from "@/content/site";
import { PRIVACY_URL, TERMS_URL } from "@/lib/constants";

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
      { name: "Terms", href: TERMS_URL, external: true },
      { name: "Privacy", href: PRIVACY_URL, external: true },
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
              {footerCopy.blurb}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-3 gap-8">
            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key}>
                <h4 className="type-subsection-title mb-6 text-white">{key}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          className="text-brand-cream/60 hover:text-brand-turquoise transition-colors text-sm md:text-base"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-brand-cream/60 hover:text-brand-turquoise transition-colors text-sm md:text-base">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-y border-white/10 py-10 mb-10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="max-w-md text-center lg:text-left">
            <h3 className="type-subsection-title mb-2 text-white uppercase tracking-wide">
              {footerCopy.newsletter.headline}
            </h3>
            <p className="text-brand-cream/60">{footerCopy.newsletter.body}</p>
          </div>
          <p className="text-brand-cream/50 text-sm text-center lg:text-right max-w-md">
            {footerCopy.newsletter.comingSoon}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-cream/40">
          <span>© {currentYear} OneTap Card. All rights reserved.</span>
          <div className="flex gap-6">
            <a href={PRIVACY_URL} className="hover:text-brand-turquoise transition-colors" rel="noopener noreferrer" target="_blank">
              Privacy
            </a>
            <a href={TERMS_URL} className="hover:text-brand-turquoise transition-colors" rel="noopener noreferrer" target="_blank">
              Terms
            </a>
          </div>
        </div>
      </MarketingContainer>
      <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-brand-turquoise/5 rounded-full blur-[120px] pointer-events-none" aria-hidden />
    </footer>
  );
}
