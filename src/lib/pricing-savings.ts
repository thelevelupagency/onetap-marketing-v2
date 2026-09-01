export type PricedPlan = {
  monthlyPrice: number | null;
  annualPrice: number | null;
};

/** Yearly saving % vs monthly list price (annualPrice is monthly-equivalent). */
export function yearlySavingPercent(plan: PricedPlan): number | null {
  if (plan.monthlyPrice === null || plan.annualPrice === null) return null;
  if (plan.monthlyPrice === 0) return null;
  if (plan.annualPrice >= plan.monthlyPrice) return null;
  return Math.round(((plan.monthlyPrice - plan.annualPrice) / plan.monthlyPrice) * 100);
}

/** Max yearly saving % among plans (for period-toggle badge). */
export function maxYearlySavingPercent(plans: PricedPlan[]): number | null {
  const percents = plans
    .map(yearlySavingPercent)
    .filter((percent): percent is number => percent != null && percent > 0);
  if (percents.length === 0) return null;
  return Math.max(...percents);
}

export function formatSaveBadgeTemplate(template: string, percent: number): string {
  return template.replace("{n}", String(percent));
}
