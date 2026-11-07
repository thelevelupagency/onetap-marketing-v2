/**
 * Promo price math for marketing plan cards.
 *
 * Lemon checkout totals use half-up rounding to the nearest cent:
 * `Math.round(listCents * (100 - percent) / 100)` for a percent discount,
 * and `max(0, listCents - amountCents)` for a fixed amount.
 * Annual checkout is the yearly total (monthly-equivalent list × 12), then
 * the card shows that discounted yearly total and its per-month equivalent.
 */

export type PromoDiscountPeriod = "monthly" | "annual" | "both";
export type PromoPlanId = "free" | "pro" | "team";

export type PublicPromoDiscount = {
  type: "percent" | "amount";
  percent: number | null;
  amountCents: number | null;
  currency: "USD";
  period: PromoDiscountPeriod;
  plans: PromoPlanId[];
};

export type PromoPriceQuote = {
  currentCents: number;
  previousCents: number;
  yearlyCheckoutCents: number | null;
  previousYearlyCents: number | null;
  period: PromoDiscountPeriod;
};

type PricedPlan = {
  id: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
};

const PLAN_IDS = new Set<PromoPlanId>(["free", "pro", "team"]);

export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/** `$12` or `$7.20`. Never includes a campaign code. */
export function formatUsdFromCents(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(Math.round(cents));
  const dollars = Math.floor(abs / 100);
  const rem = abs % 100;
  if (rem === 0) return `${sign}$${dollars}`;
  return `${sign}$${dollars}.${String(rem).padStart(2, "0")}`;
}

/** Amount without `$`, for chrome templates that already include the symbol. */
export function formatUsdAmount(cents: number): string {
  return formatUsdFromCents(cents).replace(/^-?\$/, "");
}

export function discountAppliesTo(
  discount: PublicPromoDiscount | null,
  planId: string,
  period: "monthly" | "annual",
): discount is PublicPromoDiscount {
  if (!discount) return false;
  if (discount.currency !== "USD") return false;
  if (!PLAN_IDS.has(planId as PromoPlanId)) return false;
  if (!discount.plans.includes(planId as PromoPlanId)) return false;
  if (discount.period !== "both" && discount.period !== period) return false;
  return true;
}

/** Lemon half-up cent rounding. Returns null when the discount shape is unusable. */
export function applyDiscountToCents(
  listCents: number,
  discount: PublicPromoDiscount,
): number | null {
  if (!Number.isInteger(listCents) || listCents < 0) return null;
  if (discount.type === "percent") {
    const percent = discount.percent;
    if (percent == null || !Number.isFinite(percent) || percent <= 0 || percent > 100) {
      return null;
    }
    return Math.max(0, Math.round((listCents * (100 - percent)) / 100));
  }
  const amount = discount.amountCents;
  if (amount == null || !Number.isInteger(amount) || amount <= 0) return null;
  return Math.max(0, listCents - amount);
}

/**
 * Promo price for the selected billing period.
 * Null means "show the normal list price" (ineligible plan, other period, or no discount).
 */
export function quotePromoPrice(
  plan: PricedPlan,
  period: "monthly" | "annual",
  discount: PublicPromoDiscount | null,
): PromoPriceQuote | null {
  if (!discountAppliesTo(discount, plan.id, period)) return null;
  if (plan.monthlyPrice == null || plan.annualPrice == null) return null;

  if (period === "monthly") {
    const list = dollarsToCents(plan.monthlyPrice);
    if (list <= 0) return null;
    const next = applyDiscountToCents(list, discount);
    if (next == null || next === list) return null;
    return {
      currentCents: next,
      previousCents: list,
      yearlyCheckoutCents: null,
      previousYearlyCents: null,
      period: discount.period,
    };
  }

  const monthlyEquivalent = dollarsToCents(plan.annualPrice);
  if (monthlyEquivalent <= 0) return null;
  const yearlyList = monthlyEquivalent * 12;
  const yearlyNext = applyDiscountToCents(yearlyList, discount);
  if (yearlyNext == null || yearlyNext === yearlyList) return null;
  return {
    currentCents: Math.round(yearlyNext / 12),
    previousCents: monthlyEquivalent,
    yearlyCheckoutCents: yearlyNext,
    previousYearlyCents: yearlyList,
    period: discount.period,
  };
}
