import { CREATE_BASICS_URL } from "@/lib/constants";

export type PlanTier = "free" | "pro" | "team";

export interface Plan {
  id: PlanTier;
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  annualBilled?: string;
  cta: string;
  ctaHref: string;
  popular?: boolean;
  features: string[];
}

export type BillingPeriod = "monthly" | "annual";

export type PlanPriceDisplay = {
  current: number;
  previous: number | null;
  billedNote: string | null;
};

/** Display values for plan cards — single source of truth for price formatting. */
export function getPlanPriceDisplay(
  plan: Plan,
  period: BillingPeriod,
): PlanPriceDisplay {
  const monthlyPrice = plan.monthlyPrice;
  const annualPrice = plan.annualPrice;

  if (monthlyPrice === null || annualPrice === null) {
    return { current: 0, previous: null, billedNote: null };
  }

  if (period === "annual") {
    const hasDiscount = annualPrice < monthlyPrice;
    return {
      current: annualPrice,
      previous: hasDiscount ? monthlyPrice : null,
      billedNote: plan.annualBilled ?? null,
    };
  }

  return {
    current: monthlyPrice,
    previous: null,
    billedNote: null,
  };
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "For getting started",
    monthlyPrice: 0,
    annualPrice: 0,
    cta: "Start For Free",
    ctaHref: CREATE_BASICS_URL,
    features: [
      "1 digital card",
      "Profile, QR code, and shareable link",
      "One-Tap contact buttons",
      "Up to 4 sections — About, gallery, video, highlights, FAQ, testimonials",
      "Starter templates",
      "OneTap branding included",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals who want more control",
    monthlyPrice: 12,
    annualPrice: 10,
    annualBilled: "Billed $120 yearly",
    cta: "Start Pro trial",
    ctaHref: CREATE_BASICS_URL,
    popular: true,
    features: [
      "Everything in Free",
      "1 digital card",
      "Unlimited sections, including a lead form",
      "Lead inbox with filters and CSV export",
      "90-day insights",
      "Custom branding and brand kit — no OneTap logo",
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "For teams that need shared cards and branding",
    monthlyPrice: 35,
    annualPrice: 28,
    annualBilled: "Billed $336 yearly",
    cta: "Start Team",
    ctaHref: CREATE_BASICS_URL,
    features: [
      "Everything in Pro",
      "Up to 10 cards and 10 members",
      "Admin workspace",
      "Shared brand kit",
      "Team insights (1 year)",
      "Leads center",
      "Priority support",
    ],
  },
];

export const comparisonFeatures = [
  { name: "Active digital cards", free: "1", pro: "1", team: "Up to 10" },
  { name: "Team members", free: "1", pro: "1", team: "Up to 10" },
  { name: "Sections", free: "Up to 4", pro: "Unlimited", team: "Unlimited" },
  { name: "Lead capture form", free: false, pro: true, team: true },
  { name: "Lead inbox", free: false, pro: true, team: true },
  { name: "Insights", free: false, pro: "90 days", team: "1 year" },
  { name: "Custom branding", free: false, pro: true, team: true },
  { name: "Remove OneTap branding", free: false, pro: true, team: true },
  { name: "Admin workspace", free: false, pro: false, team: true },
  { name: "Shared brand kit", free: false, pro: false, team: true },
];

export const pricingFaqs = [
  {
    q: "Can I switch between monthly and annual billing?",
    a: "Yes. You can switch at any time from your billing settings. Annual plans are billed once per year at a lower monthly equivalent.",
  },
  {
    q: "What happens when I cancel?",
    a: "Your card stays active until the end of your billing period. After that, your account reverts to the Free plan — your data is never deleted.",
  },
  {
    q: "Do you offer a Team plan?",
    a: "Yes. Team includes everything in Pro, plus up to 10 cards, 10 members, an admin workspace, and a shared brand kit. Start Team from this page — no sales call required.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Yes. First-time Pro subscribers get a 14-day trial. If you have already had a paid OneTap subscription, checkout is billed immediately.",
  },
];
