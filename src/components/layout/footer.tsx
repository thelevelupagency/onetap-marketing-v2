"use client";

import { Suspense } from "react";
import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { Logo } from "@/components/shared/logo";
import { LanguageSwitcher } from "@/components/marketing/language-switcher";
import { AppOutboundLink } from "@/components/marketing/app-outbound-link";
import { MarketingContainer } from "@/components/marketing/primitives";
import { useLocale } from "@/components/providers/locale-provider";
import { getChrome, getSite } from "@/content/get-content";
import {
  PRIVACY_URL,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_LINKEDIN_URL,
  SOCIAL_YOUTUBE_URL,
  TERMS_URL,
} from "@/lib/constants";
import { localizePath } from "@/lib/i18n/config";
import { getMetaPixelId } from "@/lib/meta-pixel";
import { useMarketingConsent } from "@/components/providers/consent-provider";

const socialIconClassName =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-brand-cream/60 transition-colors hover:border-brand-turquoise/40 hover:text-brand-turquoise";

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
      { name: chrome.footer.terms, href: TERMS_URL, external: true as const },
      { name: chrome.footer.privacy, href: PRIVACY_URL, external: true as const },
    ],
  };

  const socialLinks = [
    {
      href: SOCIAL_FACEBOOK_URL,
      label: chrome.footer.socialFacebook,
      Icon: IconBrandFacebook,
    },
    {
      href: SOCIAL_INSTAGRAM_URL,
      label: chrome.footer.socialInstagram,
      Icon: IconBrandInstagram,
    },
    {
      href: SOCIAL_LINKEDIN_URL,
      label: chrome.footer.socialLinkedin,
      Icon: IconBrandLinkedin,
    },
    {
      href: SOCIAL_YOUTUBE_URL,
      label: chrome.footer.socialYoutube,
      Icon: IconBrandYoutube,
    },
  ];

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
            <nav aria-label={chrome.footer.socialNav} className="flex flex-wrap items-center gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={socialIconClassName}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-3 gap-8">
            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key}>
                <h4 className="type-subsection-title mb-6 text-white">{key}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      {"external" in link && link.external ? (
                        <AppOutboundLink
                          href={link.href}
                          placement={null}
                          target="_blank"
                          className="text-brand-cream/60 hover:text-brand-turquoise transition-colors text-sm md:text-base"
                        >
                          {link.name}
                        </AppOutboundLink>
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
            <AppOutboundLink
              href={PRIVACY_URL}
              placement={null}
              target="_blank"
              className="hover:text-brand-turquoise transition-colors"
            >
              {chrome.footer.privacy}
            </AppOutboundLink>
            <AppOutboundLink
              href={TERMS_URL}
              placement={null}
              target="_blank"
              className="hover:text-brand-turquoise transition-colors"
            >
              {chrome.footer.terms}
            </AppOutboundLink>
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
