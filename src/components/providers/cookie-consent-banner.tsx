"use client";

import { usePathname } from "next/navigation";
import { getMetaPixelId, syncMetaPixelConsent } from "@/lib/meta-pixel";
import { useMarketingConsent } from "@/components/providers/consent-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { getChrome } from "@/content/get-content";

export function CookieConsentBanner() {
  const pixelId = getMetaPixelId();
  const pathname = usePathname();
  const { consent, hydrated, setConsent } = useMarketingConsent();
  const locale = useLocale();
  const chrome = getChrome(locale);

  if (!pixelId || !hydrated || consent) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-body"
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-brand-midnight/10 bg-brand-cream/95 p-4 shadow-[0_-8px_30px_rgba(22,27,38,0.12)] backdrop-blur-md md:p-5"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p id="cookie-consent-title" className="text-sm font-semibold text-brand-midnight">
            {chrome.cookie.title}
          </p>
          <p id="cookie-consent-body" className="mt-1 text-sm text-brand-midnight/70">
            {chrome.cookie.body}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setConsent("denied");
              syncMetaPixelConsent("denied", pathname);
            }}
            className="h-11 rounded-full border border-brand-midnight/20 px-5 text-sm font-medium text-brand-midnight transition-colors hover:bg-brand-midnight/5"
          >
            {chrome.cookie.reject}
          </button>
          <button
            type="button"
            onClick={() => {
              setConsent("granted");
              syncMetaPixelConsent("granted", pathname);
            }}
            className="h-11 rounded-full bg-brand-navy px-5 text-sm font-medium text-white transition-colors hover:bg-brand-midnight"
          >
            {chrome.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
