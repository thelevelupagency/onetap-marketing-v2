import { APP_ORIGIN, sanitizePromoSlug } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";
import type { PublicPromoDiscount } from "@/lib/promotions/promo-price";
import { parsePublicPromoPrice } from "@/lib/promotions/public-promo-display";

export type PublicMarketingPromoCopy = {
  payNow: Record<Locale, string>;
  priceBadge: Record<Locale, string>;
};

export type PublicMarketingPromoCampaign = {
  slug: string;
  endsAt: string;
  priority: number;
  marketingPublic: boolean;
  requiresPromoPin: boolean;
  copy: PublicMarketingPromoCopy;
};

export type PublicPromoPayload = {
  campaign: PublicMarketingPromoCampaign | null;
  discount: PublicPromoDiscount | null;
};

/** Middleware and page reads. A cold app must be allowed to answer. */
export const PUBLIC_PROMO_FETCH_TIMEOUT_MS = 5000;

export type PublicPromoFetchOptions = {
  revalidate?: number | false;
  /** Defaults to {@link PUBLIC_PROMO_FETCH_TIMEOUT_MS}. Tests pass a shorter wait. */
  timeoutMs?: number;
};

/**
 * `ok` is a completed answer (including an explicit unknown campaign).
 * `unavailable` is a timeout, network error, HTTP 408/429, or HTTP 5xx.
 * Those must not be treated as "this slug is unknown".
 */
export type PublicPromoRead =
  | { status: "ok"; payload: PublicPromoPayload }
  | { status: "unavailable" };

/**
 * 429 and 503, and any other non-200, leave both campaign and price empty
 * so plan cards keep the list price. A 200 with `price: null` still returns
 * the campaign (strip) and no rewritten price.
 * Middleware must not use this empty payload as a slug rejection — call
 * {@link readPublicPromo} and {@link slugAfterPublicPromoRead} instead.
 */
export function publicPromoPayloadFromHttp(
  status: number,
  body: unknown,
): PublicPromoPayload {
  const empty: PublicPromoPayload = { campaign: null, discount: null };
  if (status === 429 || status === 503 || status !== 200) return empty;
  if (!body || typeof body !== "object") return empty;
  const campaign = sanitizePublicCampaign(
    (body as { campaign?: PublicMarketingPromoCampaign | null }).campaign,
  );
  return {
    campaign,
    discount: campaign ? parsePublicPromoPrice(body) : null,
  };
}

function isUnavailableHttpStatus(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}

/**
 * One read of `GET {APP}/api/billing/promotions/public`.
 * `campaign` is the strip copy. `discount` comes from the sibling `price` object.
 * A bad or missing `price` leaves `discount` null (list price) and does not drop the strip.
 * Timeout, network errors, 408, 429, and 5xx are `unavailable` (not an unknown slug).
 * Any other completed response is `ok`, including a 200 with `campaign: null`.
 */
export async function readPublicPromo(
  promoSlug: string | null,
  options?: PublicPromoFetchOptions,
): Promise<PublicPromoRead> {
  const empty: PublicPromoPayload = { campaign: null, discount: null };
  const slug = sanitizePromoSlug(promoSlug);
  const url = new URL(`${APP_ORIGIN}/api/billing/promotions/public`);
  if (slug) {
    url.searchParams.set("promo", slug);
  }

  const revalidate = options?.revalidate === undefined ? 60 : options.revalidate;
  const timeoutMs = options?.timeoutMs ?? PUBLIC_PROMO_FETCH_TIMEOUT_MS;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("public_promo_timeout")), timeoutMs);
  });
  try {
    // No AbortSignal: Next skips the data cache when a signal is attached.
    const response = await Promise.race([
      fetch(url.toString(), {
        method: "GET",
        headers: { Accept: "application/json" },
        ...(revalidate === false
          ? { cache: "no-store" as const }
          : { next: { revalidate } }),
      }),
      timeout,
    ]);
    if (isUnavailableHttpStatus(response.status)) {
      return { status: "unavailable" };
    }
    if (!response.ok) {
      return { status: "ok", payload: empty };
    }
    let body: unknown;
    try {
      body = (await response.json()) as unknown;
    } catch {
      return { status: "unavailable" };
    }
    return { status: "ok", payload: publicPromoPayloadFromHttp(response.status, body) };
  } catch {
    return { status: "unavailable" };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/**
 * Page render of {@link readPublicPromo}.
 * Unavailable and any non-campaign answer both become an empty payload so
 * cards keep the list price and the strip stays hidden.
 */
export async function fetchPublicPromoPayload(
  promoSlug: string | null,
  options?: PublicPromoFetchOptions,
): Promise<PublicPromoPayload> {
  const read = await readPublicPromo(promoSlug, options);
  if (read.status === "unavailable") {
    return { campaign: null, discount: null };
  }
  return read.payload;
}

/**
 * Slug middleware may keep after a public promo read.
 * Unavailable keeps the sanitized alias. A completed read keeps it only when
 * that campaign is still current and matches the alias. Otherwise null, which
 * the navigation plan treats as an explicit unknown/expired rejection.
 */
export function slugAfterPublicPromoRead(
  requestedSlug: string,
  read: PublicPromoRead,
  now = Date.now(),
): string | null {
  const slug = sanitizePromoSlug(requestedSlug);
  if (!slug) return null;
  if (read.status === "unavailable") return slug;
  return selectActiveCampaign(read.payload.campaign, slug, now)?.slug ?? null;
}

/**
 * Pricing and strip state for one read.
 * A failed read keeps `forwardSlug` so the address bar is not stripped, and
 * leaves campaign and discount empty (list price, no badge, no strip).
 */
export function marketingPromoFromRead(
  requestedSlug: string | null,
  read: PublicPromoRead,
  now = Date.now(),
): {
  campaign: PublicMarketingPromoCampaign | null;
  discount: PublicPromoDiscount | null;
  forwardSlug: string | null;
} {
  const requested = sanitizePromoSlug(requestedSlug);
  if (read.status === "unavailable") {
    return { campaign: null, discount: null, forwardSlug: requested };
  }
  const campaign = selectActiveCampaign(read.payload.campaign, requested, now);
  if (!campaign) {
    return { campaign: null, discount: null, forwardSlug: null };
  }
  return {
    campaign,
    discount: read.payload.discount,
    forwardSlug: campaign.slug,
  };
}

/** Campaign half of {@link fetchPublicPromoPayload}. Used when only the slug is needed. */
export async function fetchPublicPromoCampaign(
  promoSlug: string | null,
  options?: { revalidate?: number | false },
): Promise<PublicMarketingPromoCampaign | null> {
  const payload = await fetchPublicPromoPayload(promoSlug, options);
  return payload.campaign;
}

/** Allowlist fields only — never pass through unexpected keys (e.g. a Lemon code). */
function sanitizePublicCampaign(
  campaign: PublicMarketingPromoCampaign | null | undefined,
): PublicMarketingPromoCampaign | null {
  if (!campaign || typeof campaign !== "object") return null;
  const payNow = campaign.copy?.payNow;
  const priceBadge = campaign.copy?.priceBadge;
  if (!payNow || !priceBadge) return null;
  const slug =
    typeof campaign.slug === "string" ? sanitizePromoSlug(campaign.slug) : null;
  if (!slug) return null;
  if (typeof campaign.endsAt !== "string" || !campaign.endsAt.trim()) return null;
  if (typeof campaign.priority !== "number") return null;
  if (typeof campaign.marketingPublic !== "boolean") return null;
  if (typeof campaign.requiresPromoPin !== "boolean") return null;
  const enPay = typeof payNow.en === "string" ? payNow.en : "";
  const hePay = typeof payNow.he === "string" ? payNow.he : "";
  const enBadge = typeof priceBadge.en === "string" ? priceBadge.en : "";
  const heBadge = typeof priceBadge.he === "string" ? priceBadge.he : "";
  return {
    slug,
    endsAt: campaign.endsAt,
    priority: campaign.priority,
    marketingPublic: campaign.marketingPublic,
    requiresPromoPin: campaign.requiresPromoPin,
    copy: {
      payNow: { en: enPay, he: hePay },
      priceBadge: { en: enBadge, he: heBadge },
    },
  };
}

/** True when the campaign is public and its end instant is still in the future. */
export function isCampaignCurrent(
  campaign: PublicMarketingPromoCampaign | null,
  now = Date.now(),
): campaign is PublicMarketingPromoCampaign {
  if (!campaign?.marketingPublic) return false;
  const ends = Date.parse(campaign.endsAt);
  return Number.isFinite(ends) && ends > now;
}

/**
 * Keep a campaign only when it is live.
 * A requested slug must match `campaign.slug` exactly — a lookalike code is not accepted.
 * Pass `requestedSlug: null` for the unpinned public campaign.
 */
export function selectActiveCampaign(
  campaign: PublicMarketingPromoCampaign | null,
  requestedSlug: string | null,
  now = Date.now(),
): PublicMarketingPromoCampaign | null {
  if (!isCampaignCurrent(campaign, now)) return null;
  if (requestedSlug && campaign?.slug !== requestedSlug) return null;
  return campaign;
}

/** Locale sentence for the strip. Blank → null (fail closed). */
export function resolveStripSentence(
  campaign: PublicMarketingPromoCampaign | null,
  locale: Locale,
): string | null {
  const sentence = campaign?.copy?.payNow?.[locale]?.trim();
  return sentence || null;
}

/** Locale price-badge phrase. Blank → null (fail closed). */
export function resolvePriceBadgePhrase(
  campaign: PublicMarketingPromoCampaign | null,
  locale: Locale,
): string | null {
  const phrase = campaign?.copy?.priceBadge?.[locale]?.trim();
  return phrase || null;
}
