import {
  CHECKOUT_COUPON_QUERY_KEY,
  PROMO_SLUG_QUERY_KEY,
  sanitizePromoSlug,
} from "@/lib/constants";
import { stripLocalePrefix } from "@/lib/i18n/config";

export type PromoAlias =
  | { kind: "none"; slug: null }
  | { kind: "promo" | "coupon"; slug: string | null };

/**
 * `?promo=` and `?coupon=` are aliases for the campaign pin, matching onetap-app.
 * An explicit `promo` wins. The slug is only the kebab form (`bf-test`); a raw
 * code that merely matches the slug charset still has to be confirmed by the API.
 */
export function readPromoAlias(params: URLSearchParams): PromoAlias {
  const promoRaw = params.get(PROMO_SLUG_QUERY_KEY);
  const couponRaw = params.get(CHECKOUT_COUPON_QUERY_KEY);
  const promoPresent = promoRaw != null && promoRaw.trim() !== "";
  const couponPresent = couponRaw != null && couponRaw.trim() !== "";
  if (promoPresent) {
    return { kind: "promo", slug: sanitizePromoSlug(promoRaw) };
  }
  if (couponPresent) {
    return { kind: "coupon", slug: sanitizePromoSlug(couponRaw) };
  }
  return { kind: "none", slug: null };
}

export function buildCanonicalPromoSearch(
  current: URLSearchParams,
  validatedSlug: string | null,
): URLSearchParams {
  const next = new URLSearchParams(current.toString());
  next.delete(CHECKOUT_COUPON_QUERY_KEY);
  next.delete(PROMO_SLUG_QUERY_KEY);
  const slug = sanitizePromoSlug(validatedSlug);
  if (slug) next.set(PROMO_SLUG_QUERY_KEY, slug);
  return next;
}

export function samePromoSearch(a: URLSearchParams, b: URLSearchParams): boolean {
  const keys = new Set([...a.keys(), ...b.keys()]);
  for (const key of keys) {
    const left = a.getAll(key);
    const right = b.getAll(key);
    if (left.length !== right.length) return false;
    for (let i = 0; i < left.length; i += 1) {
      if (left[i] !== right[i]) return false;
    }
  }
  return true;
}

export type PromoNavigationPlan = {
  redirectTo: URLSearchParams | null;
  setRejectCookie: boolean;
  clearRejectCookie: boolean;
  /** Validated slug to put on the request header. Null when absent or rejected. */
  requestedSlug: string | null;
  rejected: boolean;
};

/**
 * Decide the redirect and the request flag for a marketing hit.
 * `validatedSlug` is the slug to keep. Pass the sanitized alias when the public
 * read timed out or returned 408/429/5xx so the param stays and the reject
 * cookie is not set. Pass null when the alias is missing, locally invalid, or
 * the API explicitly returned an unknown or expired campaign.
 */
export function planPromoNavigation(input: {
  search: URLSearchParams;
  validatedSlug: string | null;
  rejectCookie: boolean;
}): PromoNavigationPlan {
  const alias = readPromoAlias(input.search);
  const slug = sanitizePromoSlug(input.validatedSlug);

  if (alias.kind !== "none") {
    if (slug) {
      const canonical = buildCanonicalPromoSearch(input.search, slug);
      return {
        redirectTo: samePromoSearch(input.search, canonical) ? null : canonical,
        setRejectCookie: false,
        clearRejectCookie: input.rejectCookie,
        requestedSlug: slug,
        rejected: false,
      };
    }
    const canonical = buildCanonicalPromoSearch(input.search, null);
    return {
      redirectTo: samePromoSearch(input.search, canonical) ? null : canonical,
      setRejectCookie: true,
      clearRejectCookie: false,
      requestedSlug: null,
      rejected: true,
    };
  }

  if (input.rejectCookie) {
    return {
      redirectTo: null,
      setRejectCookie: false,
      clearRejectCookie: true,
      requestedSlug: null,
      rejected: true,
    };
  }

  return {
    redirectTo: null,
    setRejectCookie: false,
    clearRejectCookie: false,
    requestedSlug: null,
    rejected: false,
  };
}

/**
 * Slug stamped on signup. Rejected aliases and stored codes contribute nothing.
 * Stored values are accepted so tests can prove they are ignored.
 */
export function isMarketingBlogPath(pathname: string): boolean {
  const bare = stripLocalePrefix(pathname);
  return bare === "/blog" || bare.startsWith("/blog/");
}

export function signupPromoSlug(input: {
  rejected: boolean;
  campaignSlug: string | null;
  storedCoupon?: string | null;
  storedPromo?: string | null;
}): string | null {
  void input.storedCoupon;
  void input.storedPromo;
  if (input.rejected) return null;
  return sanitizePromoSlug(input.campaignSlug);
}
