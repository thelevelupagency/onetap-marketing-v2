import { sanitizeCardSlug } from "@/lib/card-slug";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { getSiteUrl } from "@/lib/site-url";

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
export const COOKIES_URL = `${APP_ORIGIN}/cookies`;

/** Official brand social profiles (footer + Organization sameAs). */
export const SOCIAL_FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61586661953454";
export const SOCIAL_INSTAGRAM_URL = "https://www.instagram.com/onetap_card/";
export const SOCIAL_LINKEDIN_URL = "https://www.linkedin.com/company/onetap-card/";
export const SOCIAL_YOUTUBE_URL = "https://www.youtube.com/@ONETAP-CARD";

export const SOCIAL_PROFILE_URLS = [
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_LINKEDIN_URL,
  SOCIAL_YOUTUBE_URL,
] as const;

/** Site-wide Open Graph / Twitter share image (blog posts override with cover). */
export const DEFAULT_OG_IMAGE_URL =
  "https://res.cloudinary.com/dudwjf2pu/image/upload/v1788683330/onetap/static/marketing/onetap_og_image_va1yaw.jpg";

export const DEFAULT_OG_IMAGE = {
  url: DEFAULT_OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: "OneTap",
} as const;

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

/** Register entry; optional slug is sanitized before append (never overwrites later attribution keys). */
export function buildSignupUrl(slug?: string): string {
  const base = SIGNUP_URL;
  const trimmed = slug?.trim();
  if (!trimmed) return base;
  const sanitized = sanitizeCardSlug(trimmed);
  if (!sanitized) return base;
  return `${base}?slug=${encodeURIComponent(sanitized)}`;
}

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
export const CHECKOUT_COUPON_STORAGE_KEY = "onetap-checkout-coupon";
export const CHECKOUT_COUPON_QUERY_KEY = "coupon";
/** Campaign pin handoff — separate from Lemon `?coupon=`. */
export const PROMO_SLUG_STORAGE_KEY = "onetap-promo-slug";
export const PROMO_SLUG_QUERY_KEY = "promo";
/** Request header set by middleware from a validated public campaign slug. */
export const PROMO_SLUG_HEADER = "x-onetap-promo-slug";
/** Set when this request's alias was rejected. Value is always `1` — never a code. */
export const PROMO_REJECTED_HEADER = "x-onetap-promo-rejected";
/** One-shot cookie so a rejected alias survives the redirect that strips it from the URL. */
export const PROMO_REJECT_COOKIE = "onetap-promo-reject";
/** Public pathname (before the `/en` rewrite) so blog layouts can own the strip. */
export const PATHNAME_HEADER = "x-onetap-pathname";

const COUPON_PATTERN = /^[A-Z0-9_-]{1,64}$/;
/** Campaign slug: lowercase kebab, 1–63 chars (matches onetap-app). */
const PROMO_SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,62}$/;

type AttributionKey = (typeof ATTRIBUTION_QUERY_KEYS)[number];
type AttributionRecord = Partial<Record<AttributionKey, string>>;

/** Sanitize promo code (last-touch). Invalid → null. */
export function sanitizeCheckoutCouponCode(
  raw: string | null | undefined,
): string | null {
  if (raw == null) return null;
  const code = raw.trim().toUpperCase();
  if (!code || !COUPON_PATTERN.test(code)) return null;
  return code;
}

/** Sanitize campaign slug for `?promo=`. Invalid → null. */
export function sanitizePromoSlug(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  const slug = raw.trim().toLowerCase();
  if (!slug || !PROMO_SLUG_PATTERN.test(slug)) return null;
  return slug;
}

/** Drop legacy coupon/promo session keys so a stale code cannot reach a later CTA. */
export function clearStoredCampaignHandoff(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(CHECKOUT_COUPON_STORAGE_KEY);
    window.sessionStorage.removeItem(PROMO_SLUG_STORAGE_KEY);
  } catch {
    // Ignore quota / private-mode failures.
  }
}

/**
 * Marketing no longer persists Lemon codes or unvalidated slugs.
 * The argument is ignored; the call only clears stale storage.
 */
export function captureCheckoutCoupon(source?: URLSearchParams): string | null {
  void source;
  clearStoredCampaignHandoff();
  return null;
}

/** @see captureCheckoutCoupon */
export function capturePromoSlug(source?: URLSearchParams): string | null {
  void source;
  clearStoredCampaignHandoff();
  return null;
}

/**
 * Carry a validated campaign slug on a same-origin relative href.
 * Strips `coupon` so a raw code cannot ride along. Other keys (category, UTMs) stay.
 * Pure — safe for tests. External, hash, and mailto links are unchanged.
 */
export function appendPromoQueryToHref(
  href: string,
  promoSlug: string | null,
): string {
  const slug = sanitizePromoSlug(promoSlug);
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:") ||
    /^([a-z][a-z0-9+.-]*:)?\/\//i.test(href)
  ) {
    return href;
  }
  try {
    const url = new URL(href, "https://onetap.local");
    const hadCoupon = url.searchParams.has(CHECKOUT_COUPON_QUERY_KEY);
    const currentPromo = url.searchParams.get(PROMO_SLUG_QUERY_KEY);
    if (!slug && !hadCoupon && currentPromo == null) return href;
    url.searchParams.delete(CHECKOUT_COUPON_QUERY_KEY);
    if (slug) url.searchParams.set(PROMO_SLUG_QUERY_KEY, slug);
    else url.searchParams.delete(PROMO_SLUG_QUERY_KEY);
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return href;
  }
}

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

export function appendAttributionParams(
  url: string,
  source: URLSearchParams,
  validatedPromoSlug?: string | null,
): string {
  const base =
    typeof window !== "undefined" ? window.location.origin : getSiteUrl();
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

  // Never copy a Lemon code or an unvalidated slug from the source URL or storage.
  target.searchParams.delete(CHECKOUT_COUPON_QUERY_KEY);
  const promo = sanitizePromoSlug(validatedPromoSlug);
  if (promo) {
    target.searchParams.set(PROMO_SLUG_QUERY_KEY, promo);
  } else {
    target.searchParams.delete(PROMO_SLUG_QUERY_KEY);
  }

  if (!/^https?:\/\//i.test(url)) {
    return `${target.pathname}${target.search}${target.hash}`;
  }
  return target.toString();
}

/**
 * Stamp marketing locale onto an outbound app URL as `lang`.
 * Does not overwrite an existing `lang` or `slug`.
 */
export function appendLocaleParam(
  url: string,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const base =
    typeof window !== "undefined" ? window.location.origin : getSiteUrl();
  let target: URL;
  try {
    target = new URL(url, base);
  } catch {
    return url;
  }

  if (!target.searchParams.has("lang")) {
    target.searchParams.set("lang", locale);
  }

  if (!/^https?:\/\//i.test(url)) {
    return `${target.pathname}${target.search}${target.hash}`;
  }
  return target.toString();
}
