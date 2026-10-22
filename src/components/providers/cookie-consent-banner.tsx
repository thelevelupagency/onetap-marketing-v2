"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { AppOutboundLink } from "@/components/marketing/app-outbound-link";
import { useMarketingConsent } from "@/components/providers/consent-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { getChrome } from "@/content/get-content";
import { COOKIES_URL } from "@/lib/constants";
import { getMetaPixelId, syncMetaPixelConsent } from "@/lib/meta-pixel";

export function CookieConsentBanner() {
  const pixelId = getMetaPixelId();
  const pathname = usePathname();
  const { consent, hydrated, setConsent } = useMarketingConsent();
  const locale = useLocale();
  const chrome = getChrome(locale);

  if (!pixelId || !hydrated || consent) {
    return null;
  }

  const denyMarketingCookies = () => {
    setConsent("denied");
    syncMetaPixelConsent("denied", pathname);
  };

  const acceptMarketingCookies = () => {
    setConsent("granted");
    syncMetaPixelConsent("granted", pathname);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-body"
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-brand-midnight/10 bg-brand-cream/95 p-4 pe-12 shadow-[0_-8px_30px_rgba(22,27,38,0.12)] backdrop-blur-md md:p-5 md:pe-14"
    >
      <button
        type="button"
        onClick={denyMarketingCookies}
        aria-label={chrome.cookie.dismiss}
        className="absolute end-3 top-3 flex size-9 items-center justify-center rounded-full text-brand-midnight/60 transition-colors hover:bg-brand-midnight/5 hover:text-brand-midnight md:end-4 md:top-4"
      >
        <X className="size-5" aria-hidden />
      </button>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p id="cookie-consent-title" className="text-sm font-semibold text-brand-midnight">
            {chrome.cookie.title}
          </p>
          <p id="cookie-consent-body" className="mt-1 text-sm text-brand-midnight/70">
            {chrome.cookie.body}{" "}
            <AppOutboundLink
              href={COOKIES_URL}
              placement={null}
              target="_blank"
              className="font-medium text-brand-midnight underline underline-offset-2 hover:text-brand-navy"
            >
              {chrome.cookie.policyLinkLabel}
            </AppOutboundLink>
          </p>
        </div>
        <div className="flex shrink-0">
          <button
            type="button"
            onClick={acceptMarketingCookies}
            className="h-11 w-full rounded-full bg-brand-navy px-5 text-sm font-medium text-white transition-colors hover:bg-brand-midnight sm:w-auto"
          >
            {chrome.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
