import {
  type PromoApiPeriod,
  type PromoDiscountPeriod,
  type PromoPlanId,
  type PromoPriceDuration,
  type PublicPromoDiscount,
} from "@/lib/promotions/promo-price";

const PLAN_IDS = new Set<PromoPlanId>(["pro", "team"]);
const API_PERIODS = new Set<PromoApiPeriod>(["monthly", "yearly"]);
const DURATIONS = new Set<PromoPriceDuration>(["once", "repeating", "forever"]);
const FORBIDDEN_KEYS = new Set([
  "code",
  "coupon",
  "couponCode",
  "discountCode",
  "lemonCode",
  "promoCode",
]);

/**
 * `price` on `GET {APP}/api/billing/promotions/public?promo={slug}`.
 * See `docs/engineering/public-promo-display.md`.
 * A missing, null, or unexpected `price` returns null so cards keep the list price.
 */
export function parsePublicPromoPrice(body: unknown): PublicPromoDiscount | null {
  if (!body || typeof body !== "object") return null;
  const price = (body as { price?: unknown }).price;
  if (price == null) return null;
  if (typeof price !== "object" || Array.isArray(price)) return null;
  if (hasForbiddenKey(price)) return null;

  const record = price as Record<string, unknown>;
  const duration = record.duration;
  if (typeof duration !== "string" || !DURATIONS.has(duration as PromoPriceDuration)) {
    return null;
  }

  const plans = readPlans(record.eligiblePlans);
  const apiPeriods = readPeriods(record.eligiblePeriods);
  if (!plans || !apiPeriods) return null;
  const period = collapsePeriods(apiPeriods);
  if (!period) return null;

  const percent = record.percent;
  const fixedCents = record.fixedCents;
  const percentSet = percent != null;
  const fixedSet = fixedCents != null;
  if (percentSet === fixedSet) return null;

  if (percentSet) {
    if (typeof percent !== "number" || !Number.isFinite(percent) || percent <= 0 || percent > 100) {
      return null;
    }
    return {
      type: "percent",
      percent,
      fixedCents: null,
      duration: duration as PromoPriceDuration,
      plans,
      period,
    };
  }

  if (typeof fixedCents !== "number" || !Number.isInteger(fixedCents) || fixedCents <= 0) {
    return null;
  }
  return {
    type: "fixed",
    percent: null,
    fixedCents,
    duration: duration as PromoPriceDuration,
    plans,
    period,
  };
}

function readPlans(value: unknown): PromoPlanId[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const plans: PromoPlanId[] = [];
  for (const plan of value) {
    if (typeof plan !== "string" || !PLAN_IDS.has(plan as PromoPlanId)) return null;
    if (!plans.includes(plan as PromoPlanId)) plans.push(plan as PromoPlanId);
  }
  return plans;
}

function readPeriods(value: unknown): PromoApiPeriod[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const periods: PromoApiPeriod[] = [];
  for (const period of value) {
    if (typeof period !== "string" || !API_PERIODS.has(period as PromoApiPeriod)) return null;
    if (!periods.includes(period as PromoApiPeriod)) periods.push(period as PromoApiPeriod);
  }
  return periods;
}

function collapsePeriods(periods: PromoApiPeriod[]): PromoDiscountPeriod | null {
  const monthly = periods.includes("monthly");
  const yearly = periods.includes("yearly");
  if (monthly && yearly) return "both";
  if (monthly) return "monthly";
  if (yearly) return "annual";
  return null;
}

function hasForbiddenKey(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_KEYS.has(key)) return true;
    if (child && typeof child === "object" && hasForbiddenKey(child)) return true;
  }
  return false;
}
