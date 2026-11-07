import { APP_ORIGIN, sanitizePromoSlug } from "@/lib/constants";
import {
  type PromoDiscountPeriod,
  type PromoPlanId,
  type PublicPromoDiscount,
} from "@/lib/promotions/promo-price";

const FETCH_TIMEOUT_MS = 2500;
const PLAN_IDS = new Set<PromoPlanId>(["free", "pro", "team"]);
const PERIODS = new Set<PromoDiscountPeriod>(["monthly", "annual", "both"]);
const FORBIDDEN_KEYS = new Set([
  "code",
  "coupon",
  "couponCode",
  "discountCode",
  "lemonCode",
  "promoCode",
]);

/**
 * Contract assumed for the onetap-app public promo display route
 * (parallel app PR; not required for the strip copy endpoint).
 *
 * `GET {APP_ORIGIN}/api/billing/promotions/public/display?promo={publicSlug}`
 *
 * ```json
 * {
 *   "discount": {
 *     "type": "percent",
 *     "percent": 40,
 *     "amountCents": null,
 *     "currency": "USD",
 *     "period": "both",
 *     "plans": ["pro", "team"]
 *   }
 * }
 * ```
 *
 * `type: "amount"` uses integer `amountCents` (minor units) and `percent: null`.
 * `period` is `monthly`, `annual`, or `both` — which checkout interval the
 * discount changes. `plans` lists eligible marketing plan ids.
 * `discount: null` means the campaign has no price change.
 *
 * The body must not contain a coupon, Lemon code, or any forbidden key.
 * Non-200, timeout, or any unexpected shape → null (list price, no badge).
 * Percent math is half-up to the cent so the card matches Lemon checkout.
 * See `docs/engineering/public-promo-display.md`.
 */
export async function fetchPublicPromoDiscount(
  promoSlug: string | null,
): Promise<PublicPromoDiscount | null> {
  const slug = sanitizePromoSlug(promoSlug);
  if (!slug) return null;
  const url = new URL(`${APP_ORIGIN}/api/billing/promotions/public/display`);
  url.searchParams.set("promo", slug);

  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("public_promo_display_timeout")), FETCH_TIMEOUT_MS);
  });
  try {
    const response = await Promise.race([
      fetch(url.toString(), {
        method: "GET",
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
      }),
      timeout,
    ]);
    if (!response.ok) return null;
    const body = (await response.json()) as unknown;
    return parsePublicPromoDiscount(body);
  } catch {
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export function parsePublicPromoDiscount(body: unknown): PublicPromoDiscount | null {
  if (!body || typeof body !== "object") return null;
  if (hasForbiddenKey(body)) return null;
  const discount = (body as { discount?: unknown }).discount;
  if (discount == null) return null;
  if (typeof discount !== "object") return null;
  if (hasForbiddenKey(discount)) return null;
  const record = discount as Record<string, unknown>;
  const type = record.type;
  const currency = record.currency;
  const period = record.period;
  if (type !== "percent" && type !== "amount") return null;
  if (currency !== "USD") return null;
  if (typeof period !== "string" || !PERIODS.has(period as PromoDiscountPeriod)) return null;
  if (!Array.isArray(record.plans) || record.plans.length === 0) return null;
  const plans: PromoPlanId[] = [];
  for (const plan of record.plans) {
    if (typeof plan !== "string" || !PLAN_IDS.has(plan as PromoPlanId)) return null;
    plans.push(plan as PromoPlanId);
  }
  const percent = record.percent;
  const amountCents = record.amountCents;
  if (type === "percent") {
    if (typeof percent !== "number" || !Number.isFinite(percent) || percent <= 0 || percent > 100) {
      return null;
    }
    if (amountCents != null) return null;
    return {
      type,
      percent,
      amountCents: null,
      currency: "USD",
      period: period as PromoDiscountPeriod,
      plans,
    };
  }
  if (typeof amountCents !== "number" || !Number.isInteger(amountCents) || amountCents <= 0) {
    return null;
  }
  if (percent != null) return null;
  return {
    type,
    percent: null,
    amountCents,
    currency: "USD",
    period: period as PromoDiscountPeriod,
    plans,
  };
}

function hasForbiddenKey(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_KEYS.has(key)) return true;
    if (child && typeof child === "object" && hasForbiddenKey(child)) return true;
  }
  return false;
}
