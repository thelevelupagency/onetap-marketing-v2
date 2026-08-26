import { sanitizeCardSlug } from "@/lib/card-slug";

const DEFAULT_APP_ORIGIN = "https://app.onetap-card.com";
const DEFAULT_CARD_BASE_URL = "https://card.onetap-card.com";

function normalizeOrigin(value: string): string {
  return value.replace(/\/$/, "");
}

function getAppOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_MAIN_APP_URL?.trim();
  if (!raw) return DEFAULT_APP_ORIGIN;
  return normalizeOrigin(raw);
}

function getCardBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_CARD_BASE_URL?.trim();
  if (!raw) return DEFAULT_CARD_BASE_URL;
  return normalizeOrigin(raw);
}

export const APP_ORIGIN = getAppOrigin();
export const LOGIN_URL = `${APP_ORIGIN}/login`;
export const SIGNUP_URL = `${APP_ORIGIN}/register`;
export const PRIVACY_URL = `${APP_ORIGIN}/privacy`;
export const TERMS_URL = `${APP_ORIGIN}/terms`;

/** Host + trailing slash for inline slug inputs (e.g. `card.onetap-card.com/`). */
export function getCardHostPrefix(): string {
  try {
    const url = new URL(getCardBaseUrl());
    return `${url.host}/`;
  } catch {
    return "card.onetap-card.com/";
  }
}

export const CARD_HOST_PREFIX = getCardHostPrefix();

/** Wizard basics entry; optional slug is sanitized before append. */
export function buildCreateBasicsUrl(slug?: string): string {
  const base = `${APP_ORIGIN}/create/basics`;
  const trimmed = slug?.trim();
  if (!trimmed) return base;
  const sanitized = sanitizeCardSlug(trimmed);
  if (!sanitized) return base;
  return `${base}?slug=${encodeURIComponent(sanitized)}`;
}

export const CREATE_BASICS_URL = buildCreateBasicsUrl();

/** Query keys copied from the marketing landing URL onto app CTAs. Never overwrite `slug`. */
export const ATTRIBUTION_QUERY_KEYS = [
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export const ATTRIBUTION_STORAGE_KEY = "onetap-attribution";

type AttributionKey = (typeof ATTRIBUTION_QUERY_KEYS)[number];
type AttributionRecord = Partial<Record<AttributionKey, string>>;

function readStoredAttribution(): AttributionRecord {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    const result: AttributionRecord = {};
    for (const key of ATTRIBUTION_QUERY_KEYS) {
      const value = (parsed as Record<string, unknown>)[key];
      if (typeof value === "string" && value.trim()) {
        result[key] = value.trim();
      }
    }
    return result;
  } catch {
    return {};
  }
}

/** First-touch: keep the original ad click IDs if the visitor later browses a URL without them. */
export function captureLandingAttribution(source: URLSearchParams): void {
  if (typeof window === "undefined") {
    return;
  }
  const next = readStoredAttribution();
  let changed = false;
  for (const key of ATTRIBUTION_QUERY_KEYS) {
    const value = source.get(key)?.trim();
    if (value && !next[key]) {
      next[key] = value;
      changed = true;
    }
  }
  if (!changed) {
    return;
  }
  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore quota / private-mode failures; live query params still work.
  }
}

/** Live URL wins; stored first-touch fills missing keys after in-site navigation. */
export function getMergedAttributionParams(live: URLSearchParams): URLSearchParams {
  const merged = new URLSearchParams();
  const stored = readStoredAttribution();
  for (const key of ATTRIBUTION_QUERY_KEYS) {
    const value = live.get(key)?.trim() || stored[key];
    if (value) {
      merged.set(key, value);
    }
  }
  return merged;
}

export function appendAttributionParams(url: string, source: URLSearchParams): string {
  const base =
    typeof window !== "undefined" ? window.location.origin : "https://onetap-card.com";
  let target: URL;
  try {
    target = new URL(url, base);
  } catch {
    return url;
  }

  for (const key of ATTRIBUTION_QUERY_KEYS) {
    const value = source.get(key)?.trim();
    if (!value || target.searchParams.has(key)) {
      continue;
    }
    target.searchParams.set(key, value);
  }

  if (!/^https?:\/\//i.test(url)) {
    return `${target.pathname}${target.search}${target.hash}`;
  }
  return target.toString();
}
