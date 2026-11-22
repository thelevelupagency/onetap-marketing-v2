"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { useMarketingConsent } from "@/components/providers/consent-provider";
import { trackMarketingPageView } from "@/lib/marketing-measurement";

/** First-party page views. Not a Meta visitor and not a product `$pageview`. */
export function MarketingMeasurement() {
  const pathname = usePathname();
  const locale = useLocale();
  const { consent, hydrated } = useMarketingConsent();

  useEffect(() => {
    if (!hydrated || !pathname) return;
    trackMarketingPageView({
      pathname,
      locale,
      consent,
      search: window.location.search,
    });
  }, [consent, hydrated, locale, pathname]);

  return null;
}
