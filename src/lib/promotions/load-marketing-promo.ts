import { cache } from "react";
import { headers } from "next/headers";
import {
  PROMO_REJECTED_HEADER,
  PROMO_SLUG_HEADER,
  sanitizePromoSlug,
} from "@/lib/constants";
import { marketingPromoFromRead, readPublicPromo } from "@/lib/promotions/public-promo";
import {
  EMPTY_MARKETING_PROMO,
  type MarketingPromoState,
} from "@/lib/promotions/promo-state";

export type { MarketingPromoState } from "@/lib/promotions/promo-state";
export { EMPTY_MARKETING_PROMO } from "@/lib/promotions/promo-state";

/** One promo read per request, shared by the locale shell and blog layout. */
export const loadMarketingPromo = cache(async (): Promise<MarketingPromoState> => {
  const headerStore = await headers();
  if (headerStore.get(PROMO_REJECTED_HEADER) === "1") {
    return EMPTY_MARKETING_PROMO;
  }
  const requested = sanitizePromoSlug(headerStore.get(PROMO_SLUG_HEADER));
  const read = await readPublicPromo(requested);
  return marketingPromoFromRead(requested, read);
});
