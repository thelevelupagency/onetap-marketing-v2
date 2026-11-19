"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  EMPTY_MARKETING_PROMO,
  type MarketingPromoState,
} from "@/lib/promotions/promo-state";

const MarketingPromoContext = createContext<MarketingPromoState>(EMPTY_MARKETING_PROMO);

export function MarketingPromoProvider({
  value,
  children,
}: {
  value: MarketingPromoState;
  children: ReactNode;
}) {
  return (
    <MarketingPromoContext.Provider value={value}>
      {children}
    </MarketingPromoContext.Provider>
  );
}

export function useMarketingPromo(): MarketingPromoState {
  return useContext(MarketingPromoContext);
}

export function useMarketingPromoCampaign(): MarketingPromoState["campaign"] {
  return useMarketingPromo().campaign;
}
