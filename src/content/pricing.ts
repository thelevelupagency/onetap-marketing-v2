import { LOGIN_URL, SIGNUP_URL } from "@/lib/constants";

export type PlanTier = "free" | "premium" | "agency";

export interface Plan {
  id: PlanTier;
  name: string;
  description: string;
  summary?: string;
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
    summary:
      "Create your first digital business card and start sharing your professional profile.",
    monthlyPrice: 0,
    annualPrice: 0,
    cta: "Start For Free",
    ctaHref: SIGNUP_URL,
    features: [
      "1 active digital card",
      "Up to 6 One-Tap buttons",
      "24/7 profile editing",
      "QR code and shareable link",
      "Standard templates",
      "Basic sections",
      "Basic analytics",
      "OneTap branding included",
    ],
  },
  {
    id: "premium",
    name: "Pro",
    description: "For professionals who want more control",
    summary:
      "Build a stronger profile with advanced sections, deeper customization, and better insights.",
    monthlyPrice: 12,
    annualPrice: 10,
    annualBilled: "Billed $120 yearly",
    cta: "Start Premium Trial",
    ctaHref: SIGNUP_URL,
    popular: true,
    features: [
      "Multiple active cards",
      "Custom branding",
      "Advanced templates",
      "Advanced sections (Gallery, video, services, FAQ, testimonials, etc.)",
      "Lead capture form",
      "Lead inbox (mini CRM)",
      "Enhanced analytics",
      "Integrations and webhooks",
      "Remove OneTap branding",
    ],
  },
  {
    id: "agency",
    name: "Agencies & Teams",
    description: "For teams that need brand consistency and centralized control",
    summary:
      "Manage multiple cards, keep your team on-brand, and track performance from one dashboard.",
    monthlyPrice: 299,
    annualPrice: 249,
    annualBilled: "Billed $2,988 yearly",
    cta: "Contact us",
    ctaHref: LOGIN_URL,
    features: [
      "Everything in Pro",
      "Admin workspace dashboard",
      "Team member management",
      "Custom onboarding session",
      "Shared brand templates",
      "Team analytics",
      "Leads center",
      "CRM integrations, mail reminders & CSV export",
      "Priority support",
    ],
  },
];

export const comparisonFeatures = [
  { name: "Active digital cards", free: "1", premium: "Multiple", agency: "Multiple" },
  { name: "One-Tap buttons", free: "Up to 6", premium: "Unlimited", agency: "Unlimited" },
  { name: "Custom branding", free: false, premium: true, agency: true },
  { name: "Advanced sections", free: false, premium: true, agency: true },
  { name: "Lead capture form", free: false, premium: true, agency: true },
  { name: "Lead inbox (mini CRM)", free: false, premium: true, agency: true },
  { name: "Enhanced analytics", free: false, premium: true, agency: true },
  { name: "Admin dashboard", free: false, premium: false, agency: true },
  { name: "Team member management", free: false, premium: false, agency: true },
  { name: "Team analytics", free: false, premium: false, agency: true },
  { name: "CRM integrations", free: false, premium: false, agency: true },
  { name: "Remove OneTap branding", free: false, premium: true, agency: true },
];

export const pricingFaqs = [
  {
    q: "Can I switch between monthly and annual billing?",
    a: "Yes. You can switch at any time from your account settings. Annual plans include two months free compared to monthly billing.",
  },
  {
    q: "What happens when I cancel?",
    a: "Your card stays active until the end of your billing period. After that, your account reverts to the Free plan — your data is never deleted.",
  },
  {
    q: "Do you offer team or enterprise pricing?",
    a: "Agencies & Teams plans cover multiple cards with centralized control. For larger organizations, contact our sales team for custom enterprise pricing.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "The Free plan lets you explore OneTap with no credit card required. Start a Premium Trial on Pro whenever you're ready for advanced features.",
  },
];
