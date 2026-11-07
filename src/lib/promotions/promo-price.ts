/**
 * Promo price math for marketing plan cards.
 *
 * The list price is the Lemon variant charge: the monthly price, or the
 * yearly total (monthly-equivalent × 12). Percent off is
 * `Math.round(listCents * percent / 100)`, clamped at 0. A percent of 100 or
 * more prices the variant at 0. A percent of 0 or less is no change. Fixed
 * off subtracts `amountCents`. Both results clamp at 0. The card shows the yearly checkout total and its per-month
 * equivalent (`round(yearlyCents / 12)`).
 */

export type PromoDiscountPeriod = "monthly" | "annual" | "both";
export type PromoPlanId = "pro" | "team";
/** Lemon discount duration. Does not change which checkout interval is eligible. */
export type PromoPriceDuration = "once" | "repeating" | "forever";
/** Billing intervals on the public payload. The app says `yearly`, not `annual`. */
export type PromoApiPeriod = "monthly" | "yearly";

/** Wire shape from onetap-app `PublicPromoPriceDisplay`. */
export type PublicPromoPriceDisplay = {
  discount:
    | { kind: "percent"; percent: number }
    | { kind: "fixed"; amountCents: number };
  duration: PromoPriceDuration;
  /** Set only when `duration` is `repeating`. Null while repeating means no promo price. */
  durationInMonths: number | null;
  eligiblePlans: PromoPlanId[];
  eligiblePeriods: PromoApiPeriod[];
};

/**
 * Parsed `price`, plus `period` collapsed from `eligiblePeriods` for the cards.
 */
export type PublicPromoDiscount = PublicPromoPriceDisplay & {
  period: PromoDiscountPeriod;
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

const PLAN_IDS = new Set<PromoPlanId>(["pro", "team"]);

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
  if (!PLAN_IDS.has(planId as PromoPlanId)) return false;
  if (!discount.eligiblePlans.includes(planId as PromoPlanId)) return false;
  if (discount.period !== "both" && discount.period !== period) return false;
  return true;
}

/**
 * Variant charge after the Lemon discount.
 * Returns null when the list cents are unusable. Equal to `listCents` means no change.
 */
export function applyDiscountToCents(
  listCents: number,
  discount: PublicPromoDiscount,
): number | null {
  if (!Number.isInteger(listCents) || listCents < 0) return null;
  if (discount.discount.kind === "percent") {
    const percent = discount.discount.percent;
    if (!Number.isFinite(percent) || percent <= 0) return listCents;
    if (percent >= 100) return 0;
    const off = Math.max(0, Math.round((listCents * percent) / 100));
    return Math.max(0, listCents - off);
  }
  return Math.max(0, listCents - discount.discount.amountCents);
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
