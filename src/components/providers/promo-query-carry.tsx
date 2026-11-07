"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  appendPromoQueryToHref,
  clearStoredCampaignHandoff,
} from "@/lib/constants";
import {
  buildCanonicalPromoSearch,
  samePromoSearch,
} from "@/lib/promotions/promo-navigation";
import { useMarketingPromo } from "@/components/providers/marketing-promo-provider";

function isModifiedClick(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

/**
 * Keep the validated campaign slug on in-site navigation and drop raw coupon
 * params from the address bar. Next.js `<Link>` navigates from its href prop,
 * so clicks are rewritten here as well as in `CampaignLink`.
 */
export function PromoQueryCarry() {
  const { forwardSlug } = useMarketingPromo();
  const router = useRouter();

  useEffect(() => {
    clearStoredCampaignHandoff();
    const current = new URLSearchParams(window.location.search);
    const canonical = buildCanonicalPromoSearch(current, forwardSlug);
    if (samePromoSearch(current, canonical)) return;
    const search = canonical.toString();
    const next = `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", next);
  }, [forwardSlug]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const next = appendPromoQueryToHref(href, forwardSlug);
      if (next === href) return;
      if (isModifiedClick(event) || (anchor.target && anchor.target !== "_self")) {
        anchor.setAttribute("href", next);
        return;
      }
      // preventDefault before the link's bubble handler so Next.js skips its
      // own router.push(prop href). The link's onClick still runs.
      event.preventDefault();
      router.push(next);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [forwardSlug, router]);

  return null;
}
