"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { LanguageSwitcher } from "@/components/marketing/language-switcher";
import { MarketingContainer } from "@/components/marketing/primitives";
import { useLocale } from "@/components/providers/locale-provider";
import { getChrome, getSite } from "@/content/get-content";
import { PRIVACY_URL, TERMS_URL, appendLocaleParam } from "@/lib/constants";
import { localizePath } from "@/lib/i18n/config";
import { getMetaPixelId } from "@/lib/meta-pixel";
import { useMarketingConsent } from "@/components/providers/consent-provider";

export function Footer() {
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const pixelId = getMetaPixelId();
  const { reopenPreferences } = useMarketingConsent();
  const chrome = getChrome(locale);
  const siteMod = getSite(locale);

  const footerLinks = {
    [chrome.footer.product]: [
      { name: chrome.footer.home, href: localizePath("/", locale) },
      { name: chrome.footer.freelancers, href: localizePath("/solutions/freelancers", locale) },
      { name: chrome.footer.agencies, href: localizePath("/solutions/agencies", locale) },
      { name: chrome.footer.pricing, href: localizePath("/pricing", locale) },
      { name: chrome.footer.faq, href: localizePath("/faq", locale) },
    ],
    [chrome.footer.company]: [
      { name: chrome.footer.blog, href: localizePath("/blog", locale) },
    ],
    [chrome.footer.resources]: [
      { name: chrome.footer.helpCenter, href: localizePath("/faq", locale) },
      { name: chrome.footer.terms, href: appendLocaleParam(TERMS_URL, locale), external: true },
      { name: chrome.footer.privacy, href: appendLocaleParam(PRIVACY_URL, locale), external: true },
    ],
  };

  return (
    <footer className="relative w-full overflow-hidden bg-brand-midnight text-brand-cream pt-16 md:pt-24 pb-8 md:pb-12 border-t border-white/5">
      <MarketingContainer width="full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12 md:mb-16">
          <div className="lg:col-span-2">
            <Logo
              href={localizePath("/", locale)}
              theme="bright"
              className="mb-6"
              imageClassName="h-10 w-auto md:h-11"
            />
            <p className="text-brand-cream/60 max-w-sm mb-8 text-lg leading-relaxed">
              {siteMod.footerCopy.blurb}
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

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-cream/40 border-t border-white/10 pt-8">
          <span>© {currentYear} OneTap Card. {chrome.footer.rightsReserved}</span>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Suspense fallback={null}>
              <LanguageSwitcher variant="footer" />
            </Suspense>
            <a href={appendLocaleParam(PRIVACY_URL, locale)} className="hover:text-brand-turquoise transition-colors" rel="noopener noreferrer" target="_blank">
              {chrome.footer.privacy}
            </a>
            <a href={appendLocaleParam(TERMS_URL, locale)} className="hover:text-brand-turquoise transition-colors" rel="noopener noreferrer" target="_blank">
              {chrome.footer.terms}
            </a>
            {pixelId ? (
              <button
                type="button"
                onClick={reopenPreferences}
                className="hover:text-brand-turquoise transition-colors"
              >
                {chrome.footer.cookieSettings}
              </button>
            ) : null}
          </div>
        </div>
      </MarketingContainer>
      <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-brand-turquoise/5 rounded-full blur-[120px] pointer-events-none" aria-hidden />
    </footer>
  );
}
