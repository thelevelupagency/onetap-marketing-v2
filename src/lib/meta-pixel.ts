import { appendAttributionParams } from "@/lib/constants";

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
  | "solutions_carousel";

export type MetaEventParams = {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
};

function isMetaPixelAllowedInThisEnv(): boolean {
  if (process.env.NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD === "true") {
    return true;
  }
  // VERCEL_ENV is server-only. Client bundles must use NEXT_PUBLIC_VERCEL_ENV
  // (Vercel injects it) or the banner and pixel never load in production.
  return (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
    process.env.VERCEL_ENV === "production"
  );
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
  const id = eventId ?? createMetaEventId();
  window.fbq?.("track", event, params ?? {}, { eventID: id });
}

export function classifyOutboundHref(href: string): MetaStandardEvent | null {
  if (!href.startsWith("http")) {
    return null;
  }
  try {
    const url = new URL(href);
    if (url.pathname.startsWith("/create/basics")) {
      return "InitiateCheckout";
    }
    if (url.pathname === "/register" || url.pathname.startsWith("/register/")) {
      return "Lead";
    }
    return null;
  } catch {
    return null;
  }
}

export function withLandingAttribution(url: string): string {
  if (typeof window === "undefined") {
    return url;
  }
  return appendAttributionParams(url, new URLSearchParams(window.location.search));
}

/** Copy landing `fbclid`/UTMs onto the app URL and fire the matching conversion, if any. */
export function navigateToApp(href: string, placement?: MetaCtaPlacement | null): string {
  const attributed = withLandingAttribution(href);
  if (placement) {
    const event = classifyOutboundHref(attributed);
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
  if (pathname === "/") {
    return { content_name: "home", content_category: "marketing" };
  }
  if (pathname === "/pricing") {
    return { content_name: "pricing", content_category: "marketing" };
  }
  if (pathname === "/faq") {
    return { content_name: "faq", content_category: "marketing" };
  }
  if (pathname === "/blog") {
    return { content_name: "blog_index", content_category: "marketing" };
  }
  if (pathname === "/solutions/freelancers") {
    return { content_name: "solutions_freelancers", content_category: "marketing" };
  }
  if (pathname === "/solutions/agencies") {
    return { content_name: "solutions_agencies", content_category: "marketing" };
  }
  const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
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
