export const MARKETING_CONSENT_STORAGE_KEY = "onetap-consent-marketing";

export type MarketingConsent = "granted" | "denied";

const listeners = new Set<() => void>();
let consentCache: MarketingConsent | null | undefined;

function emitConsentChange(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function isMarketingConsentValue(value: string | null): value is MarketingConsent {
  return value === "granted" || value === "denied";
}

export function readMarketingConsent(): MarketingConsent | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(MARKETING_CONSENT_STORAGE_KEY);
    return isMarketingConsentValue(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function getMarketingConsentSnapshot(): MarketingConsent | null {
  if (consentCache === undefined) {
    consentCache = readMarketingConsent();
  }
  return consentCache;
}

export function subscribeMarketingConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function writeMarketingConsent(value: MarketingConsent): void {
  if (typeof window !== "undefined") {
    try {
      window.localStorage?.setItem(MARKETING_CONSENT_STORAGE_KEY, value);
    } catch {
      // Ignore private-mode / storage-restricted failures; in-memory cache still updates.
    }
  }
  consentCache = value;
  emitConsentChange();
}

export function clearMarketingConsent(): void {
  if (typeof window !== "undefined") {
    try {
      window.localStorage?.removeItem(MARKETING_CONSENT_STORAGE_KEY);
    } catch {
      // Ignore private-mode / storage-restricted failures.
    }
  }
  consentCache = null;
  emitConsentChange();
}
