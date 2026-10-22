"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { AppOutboundLink } from "@/components/marketing/app-outbound-link";
import { useMarketingConsent } from "@/components/providers/consent-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { getChrome } from "@/content/get-content";
import { COOKIES_URL } from "@/lib/constants";
import { getMetaPixelId, syncMetaPixelConsent } from "@/lib/meta-pixel";
import { cn } from "@/lib/utils";

const controlFocusClassName =
  "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise/30 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream";

export function CookieConsentBanner() {
  const pixelId = getMetaPixelId();
  const pathname = usePathname();
  const { consent, hydrated, setConsent } = useMarketingConsent();
  const locale = useLocale();
  const chrome = getChrome(locale);
  const bannerRef = useRef<HTMLDivElement>(null);
  const isVisible = Boolean(pixelId && hydrated && !consent);

  const denyMarketingCookies = useCallback(() => {
    setConsent("denied");
    syncMetaPixelConsent("denied", pathname);
  }, [pathname, setConsent]);

  const acceptMarketingCookies = useCallback(() => {
    setConsent("granted");
    syncMetaPixelConsent("granted", pathname);
  }, [pathname, setConsent]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      const root = bannerRef.current;
      if (!root || !root.contains(document.activeElement)) {
        return;
      }
      denyMarketingCookies();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [denyMarketingCookies, isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-body"
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-brand-midnight/10 bg-brand-cream/95 p-4 shadow-[0_-8px_30px_rgba(22,27,38,0.12)] backdrop-blur-md md:p-5"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-4 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center">
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
        <button
          type="button"
          onClick={denyMarketingCookies}
          aria-label={chrome.cookie.dismiss}
          className={cn(
            "col-start-2 row-start-1 flex size-11 shrink-0 items-center justify-center rounded-full text-brand-midnight/60 transition-colors hover:bg-brand-midnight/5 hover:text-brand-midnight md:col-start-3",
            controlFocusClassName,
          )}
        >
          <X className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={acceptMarketingCookies}
          className={cn(
            "col-span-2 h-11 w-full rounded-full bg-brand-navy px-5 text-sm font-medium text-white transition-colors hover:bg-brand-midnight sm:w-auto md:col-span-1 md:col-start-2 md:row-start-1 md:justify-self-end",
            controlFocusClassName,
          )}
        >
          {chrome.cookie.accept}
        </button>
      </div>
    </div>
  );
}
