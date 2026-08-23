"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import {
  clearMarketingConsent,
  getMarketingConsentSnapshot,
  subscribeMarketingConsent,
  writeMarketingConsent,
  type MarketingConsent,
} from "@/lib/marketing-consent";
import { useHasHydrated } from "@/lib/use-has-hydrated";

type ConsentContextValue = {
  consent: MarketingConsent | null;
  hydrated: boolean;
  setConsent: (value: MarketingConsent) => void;
  reopenPreferences: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function MarketingConsentProvider({ children }: { children: ReactNode }) {
  const hydrated = useHasHydrated();
  const storedConsent = useSyncExternalStore(
    subscribeMarketingConsent,
    getMarketingConsentSnapshot,
    () => null,
  );

  const setConsent = useCallback((value: MarketingConsent) => {
    writeMarketingConsent(value);
  }, []);

  const reopenPreferences = useCallback(() => {
    clearMarketingConsent();
  }, []);

  const value = useMemo(
    () => ({
      consent: hydrated ? storedConsent : null,
      hydrated,
      setConsent,
      reopenPreferences,
    }),
    [hydrated, reopenPreferences, setConsent, storedConsent],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useMarketingConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useMarketingConsent must be used within MarketingConsentProvider");
  }
  return context;
}
