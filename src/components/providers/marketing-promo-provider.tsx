"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { PublicMarketingPromoCampaign } from "@/lib/promotions/public-promo";

const MarketingPromoContext = createContext<PublicMarketingPromoCampaign | null>(
  null,
);

export function MarketingPromoProvider({
  campaign,
  children,
}: {
  campaign: PublicMarketingPromoCampaign | null;
  children: ReactNode;
}) {
  return (
    <MarketingPromoContext.Provider value={campaign}>
      {children}
    </MarketingPromoContext.Provider>
  );
}

export function useMarketingPromoCampaign(): PublicMarketingPromoCampaign | null {
  return useContext(MarketingPromoContext);
}
