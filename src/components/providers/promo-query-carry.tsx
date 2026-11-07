"use client";

import { useEffect } from "react";
import {
  APP_ORIGIN,
  PROMO_SLUG_QUERY_KEY,
  appendPromoQueryToHref,
  capturePromoSlug,
  sanitizePromoSlug,
} from "@/lib/constants";

/**
 * Keep last-touch `?promo=` on same-origin navigational links so the next
 * marketing page server-renders the linked campaign. App outbound links are
 * stamped separately by `AppOutboundLink`.
 */
export function PromoQueryCarry() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = capturePromoSlug(params);
    if (!slug) return;

    const rewrite = () => {
      const current = sanitizePromoSlug(
        new URLSearchParams(window.location.search).get(PROMO_SLUG_QUERY_KEY),
      ) || slug;
      if (!current) return;

      const anchors = document.querySelectorAll<HTMLAnchorElement>("a[href]");
      for (const anchor of anchors) {
        const href = anchor.getAttribute("href");
        if (!href) continue;
        if (
          href.startsWith("#") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.startsWith("javascript:")
        ) {
          continue;
        }
        try {
          const absolute = new URL(href, window.location.origin);
          if (absolute.origin === APP_ORIGIN) continue;
          if (absolute.origin !== window.location.origin) continue;
        } catch {
          continue;
        }
        const next = appendPromoQueryToHref(href, current);
        if (next !== href) {
          anchor.setAttribute("href", next);
        }
      }
    };

    rewrite();
    const observer = new MutationObserver(rewrite);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
