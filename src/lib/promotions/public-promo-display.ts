import {
  type PromoApiPeriod,
  type PromoDiscountPeriod,
  type PromoPlanId,
  type PromoPriceDuration,
  type PublicPromoDiscount,
  type PublicPromoPriceDisplay,
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
 * Top-level `price` on `GET {APP}/api/billing/promotions/public?promo={slug}`.
 * Matches onetap-app `PublicPromoPriceDisplay`. See
 * `docs/engineering/public-promo-display.md`.
 * Missing, null, repeating-without-months, or any other unexpected shape
 * returns null so cards keep the list price.
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
  const durationKind = duration as PromoPriceDuration;
  const durationInMonths = record.durationInMonths;
  if (durationKind === "repeating") {
    if (durationInMonths == null) return null;
    if (!isPositiveInt(durationInMonths)) return null;
  } else if (durationInMonths !== null) {
    return null;
  }

  const eligiblePlans = readPlans(record.eligiblePlans);
  const eligiblePeriods = readPeriods(record.eligiblePeriods);
  if (!eligiblePlans || !eligiblePeriods) return null;
  const period = collapsePeriods(eligiblePeriods);
  if (!period) return null;

  const discount = readDiscount(record.discount);
  if (!discount) return null;

  const display: PublicPromoPriceDisplay = {
    discount,
    duration: durationKind,
    durationInMonths: durationKind === "repeating" ? (durationInMonths as number) : null,
    eligiblePlans,
    eligiblePeriods,
  };
  return { ...display, period };
}

function readDiscount(value: unknown): PublicPromoPriceDisplay["discount"] | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  if (hasForbiddenKey(value)) return null;
  const record = value as Record<string, unknown>;
  if (record.kind === "percent") {
    if (typeof record.percent !== "number" || !Number.isFinite(record.percent)) return null;
    return { kind: "percent", percent: record.percent };
  }
  if (record.kind === "fixed") {
    if (!isNonNegativeInt(record.amountCents)) return null;
    return { kind: "fixed", amountCents: record.amountCents };
  }
  return null;
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

function isPositiveInt(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function isNonNegativeInt(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function hasForbiddenKey(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_KEYS.has(key)) return true;
    if (child && typeof child === "object" && hasForbiddenKey(child)) return true;
  }
  return false;
}
