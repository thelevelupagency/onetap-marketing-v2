"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMarketingConsent } from "@/components/providers/consent-provider";
import { getMetaPixelId, syncMetaPixelConsent } from "@/lib/meta-pixel";

/** SPA PageView + returning visitors who already accepted. Accept click syncs in the banner. */
export function MetaPixel() {
  const pixelId = getMetaPixelId();
  const pathname = usePathname();
  const { consent } = useMarketingConsent();

  useEffect(() => {
    if (!pixelId) {
      return;
    }
    syncMetaPixelConsent(consent, pathname);
  }, [consent, pathname, pixelId]);

  return null;
}
