import {
  appendAttributionParams,
  appendLocaleParam,
  captureLandingAttribution,
  clearStoredCampaignHandoff,
  getMergedAttributionParams,
} from "@/lib/constants";
import {
  getMarketingConsentSnapshot,
  type MarketingConsent,
} from "@/lib/marketing-consent";
import {
  DEFAULT_LOCALE,
  localeFromPathname,
  stripLocalePrefix,
  type Locale,
} from "@/lib/i18n/config";

const PIXEL_ID_PATTERN = /^\d+$/;

export type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export type MetaStandardEvent = "PageView" | "ViewContent" | "InitiateCheckout" | "Lead";

export type MetaCtaPlacement =
  | "get_card"
  | "hero_slug"
  | "nav"
  | "final_cta"
  | "process"
  | "freelancer_hero"
  | "freelancer_niche"
  | "agency_hero"
  | "agency_workspace"
  | "pricing_free"
  | "pricing_pro"
  | "pricing_team"
  | "promo_strip"
  | "solutions_carousel";

const CREATE_CARD_PLACEMENTS: ReadonlySet<MetaCtaPlacement> = new Set([
  "hero_slug",
  "get_card",
  "final_cta",
  "process",
  "freelancer_hero",
  "freelancer_niche",
  "solutions_carousel",
]);

export type MetaEventParams = {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
};

function isMetaPixelAllowedInThisEnv(): boolean {
  if (process.env.NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD === "true") {
    return true;
  }
  return process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
}

/** Pixel IDs are public (browser snippet). Digits-only avoids injecting untrusted strings. */
export function getMetaPixelId(): string | null {
  if (!isMetaPixelAllowedInThisEnv()) {
    return null;
  }
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  if (!id || !PIXEL_ID_PATTERN.test(id)) {
    return null;
  }
  return id;
}

export function createMetaEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `ot-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function trackMetaEvent(
  event: MetaStandardEvent,
  params?: MetaEventParams,
  eventId?: string,
): void {
  if (typeof window === "undefined") {
    return;
  }
  if (getMarketingConsentSnapshot() !== "granted") {
    return;
  }
  const id = eventId ?? createMetaEventId();
  window.fbq?.("track", event, params ?? {}, { eventID: id });
}

export function classifyOutboundHref(
  href: string,
  placement?: MetaCtaPlacement | null,
): MetaStandardEvent | null {
  if (!href.startsWith("http")) {
    return null;
  }
  try {
    const url = new URL(href);
    if (url.pathname.startsWith("/create/basics")) {
      return "InitiateCheckout";
    }
    if (url.pathname === "/register" || url.pathname.startsWith("/register/")) {
      return placement && CREATE_CARD_PLACEMENTS.has(placement)
        ? "InitiateCheckout"
        : "Lead";
    }
    return null;
  } catch {
    return null;
  }
}

export function withLandingAttribution(
  url: string,
  locale?: Locale,
  validatedPromoSlug?: string | null,
  options?: { preserveBilling?: boolean },
): string {
  const live =
    typeof window === "undefined"
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);
  if (typeof window !== "undefined") {
    captureLandingAttribution(live);
    clearStoredCampaignHandoff();
  }
  const attributed = appendAttributionParams(
    url,
    getMergedAttributionParams(live),
    validatedPromoSlug,
    options,
  );
  const resolved =
    locale ??
    (typeof window === "undefined"
      ? DEFAULT_LOCALE
      : localeFromPathname(window.location.pathname));
  return appendLocaleParam(attributed, resolved);
}

/** Copy landing `fbclid`/UTMs + `lang` onto the app URL and fire the matching conversion, if any. */
export function navigateToApp(
  href: string,
  placement?: MetaCtaPlacement | null,
  locale?: Locale,
  validatedPromoSlug?: string | null,
  options?: { preserveBilling?: boolean },
): string {
  const attributed = withLandingAttribution(
    href,
    locale,
    validatedPromoSlug,
    options,
  );
  if (placement) {
    const event = classifyOutboundHref(attributed, placement);
    if (event === "InitiateCheckout") {
      trackMetaEvent(event, {
        content_name: placement,
        content_category: "create_card",
      });
    } else if (event === "Lead") {
      trackMetaEvent(event, {
        content_name: placement,
        content_category: "signup",
      });
    }
  }
  return attributed;
}

export function viewContentForPath(pathname: string): MetaEventParams | null {
  const bare = stripLocalePrefix(pathname);
  if (bare === "/") {
    return { content_name: "home", content_category: "marketing" };
  }
  if (bare === "/pricing") {
    return { content_name: "pricing", content_category: "marketing" };
  }
  if (bare === "/faq") {
    return { content_name: "faq", content_category: "marketing" };
  }
  if (bare === "/blog") {
    return { content_name: "blog_index", content_category: "marketing" };
  }
  if (bare === "/solutions/freelancers") {
    return { content_name: "solutions_freelancers", content_category: "marketing" };
  }
  if (bare === "/solutions/agencies") {
    return { content_name: "solutions_agencies", content_category: "marketing" };
  }
  const blogMatch = bare.match(/^\/blog\/([^/]+)\/?$/);
  if (blogMatch?.[1]) {
    return {
      content_name: "blog_post",
      content_category: "marketing",
      content_ids: [blogMatch[1]],
    };
  }
  return null;
}

export function trackViewContentForPath(pathname: string): void {
  const params = viewContentForPath(pathname);
  if (!params) {
    return;
  }
  trackMetaEvent("ViewContent", params);
}

const META_PIXEL_SCRIPT_SRC = "https://connect.facebook.net/en_US/fbevents.js";

/**
 * Lazy-load `fbevents.js` and initialize the Meta Pixel ONLY after marketing consent
 * is granted. Zero requests are sent to Facebook prior to Accept.
 */
export function ensureMetaPixelLoaded(pixelId: string): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }
  if (!PIXEL_ID_PATTERN.test(pixelId)) {
    return;
  }
  if (typeof window.fbq === "function") {
    return;
  }

  const fbqFn: Fbq = function (...args: unknown[]) {
    if (fbqFn.callMethod) {
      fbqFn.callMethod(...args);
    } else {
      fbqFn.queue.push(args);
    }
  } as Fbq;
  fbqFn.push = fbqFn;
  fbqFn.loaded = true;
  fbqFn.version = "2.0";
  fbqFn.queue = [];

  window.fbq = fbqFn;
  if (!window._fbq) {
    window._fbq = fbqFn;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = META_PIXEL_SCRIPT_SRC;
  const firstScript = document.getElementsByTagName("script")[0];
  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }

  fbqFn("consent", "revoke");
  fbqFn("set", "autoConfig", false, pixelId);
  fbqFn("init", pixelId);
}

let lastTrackedPath: string | null = null;

/**
 * Apply consent and fire landing events. Loads `fbevents.js` on demand when
 * consent is `"granted"`, and never touches Facebook when rejected or unset.
 */
export function syncMetaPixelConsent(
  consent: MarketingConsent | null,
  pathname: string,
): void {
  if (typeof window === "undefined") {
    return;
  }

  if (consent === "granted") {
    const pixelId = getMetaPixelId();
    if (!pixelId) {
      return;
    }
    ensureMetaPixelLoaded(pixelId);
    window.fbq?.("consent", "grant");
    if (lastTrackedPath !== pathname) {
      trackMetaEvent("PageView");
      trackViewContentForPath(pathname);
      lastTrackedPath = pathname;
    }
    return;
  }

  if (typeof window.fbq === "function") {
    window.fbq("consent", "revoke");
  }
  lastTrackedPath = null;
}
