import type { PublicPromoDiscount } from "@/lib/promotions/promo-price";
import type { PublicMarketingPromoCampaign } from "@/lib/promotions/public-promo";

export type MarketingPromoState = {
  campaign: PublicMarketingPromoCampaign | null;
  discount: PublicPromoDiscount | null;
  forwardSlug: string | null;
};

export const EMPTY_MARKETING_PROMO: MarketingPromoState = {
  campaign: null,
  discount: null,
  forwardSlug: null,
};
