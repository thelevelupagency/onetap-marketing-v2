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

const FETCH_TIMEOUT_MS = 2500;

/**
 * 429 and 503, and any other non-200, leave both campaign and price empty
 * so plan cards keep the list price. A 200 with `price: null` still returns
 * the campaign (strip) and no rewritten price.
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

/**
 * One read of `GET {APP}/api/billing/promotions/public`.
 * `campaign` is the strip copy. `discount` comes from the sibling `price` object.
 * A bad or missing `price` leaves `discount` null (list price) and does not drop the strip.
 * Fail closed on transport errors: both are null.
 */
export async function fetchPublicPromoPayload(
  promoSlug: string | null,
  options?: { revalidate?: number | false },
): Promise<PublicPromoPayload> {
  const empty: PublicPromoPayload = { campaign: null, discount: null };
  const slug = sanitizePromoSlug(promoSlug);
  const url = new URL(`${APP_ORIGIN}/api/billing/promotions/public`);
  if (slug) {
    url.searchParams.set("promo", slug);
  }

  const revalidate = options?.revalidate === undefined ? 60 : options.revalidate;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("public_promo_timeout")), FETCH_TIMEOUT_MS);
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
    const body = response.ok ? ((await response.json()) as unknown) : null;
    return publicPromoPayloadFromHttp(response.status, body);
  } catch {
    return empty;
  } finally {
    if (timer) clearTimeout(timer);
  }
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
