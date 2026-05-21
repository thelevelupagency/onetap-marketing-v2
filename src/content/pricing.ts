export const LOGIN_URL = "https://app.onetap-card.com/login";

export type PlanTier = "free" | "premium" | "agency";

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
    description: "Perfect for trying out OneTap.",
    monthlyPrice: 0,
    annualPrice: 0,
    cta: "Get Started",
    ctaHref: LOGIN_URL,
    features: [
      "1 Active digital card",
      "6 Social/Contact links",
      "Standard templates",
      "OneTap branding",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "For professionals building their brand.",
    monthlyPrice: 12,
    annualPrice: 10,
    annualBilled: "Billed $120 yearly",
    cta: "Upgrade to Premium",
    ctaHref: LOGIN_URL,
    popular: true,
    features: [
      "Unlimited sections (Video, FAQ)",
      "Custom branding & colors",
      "Advanced analytics",
      "Lead capture forms",
      "Remove OneTap branding",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    description: "For teams requiring control at scale.",
    monthlyPrice: 299,
    annualPrice: 249,
    annualBilled: "Billed $2,988 yearly",
    cta: "Contact Sales",
    ctaHref: LOGIN_URL,
    features: [
      "Up to 50 agent cards",
      "Admin dashboard & Brand Lock",
      "CRM Integration (HubSpot/Salesforce)",
      "Dedicated success manager",
    ],
  },
];

export const comparisonFeatures = [
  { name: "Active digital cards", free: "1", premium: "Unlimited", agency: "Up to 50" },
  { name: "Custom branding", free: false, premium: true, agency: true },
  { name: "Lead capture forms", free: false, premium: true, agency: true },
  { name: "Advanced analytics", free: false, premium: true, agency: true },
  { name: "Admin dashboard", free: false, premium: false, agency: true },
  { name: "Brand Lock", free: false, premium: false, agency: true },
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
    a: "Agency plans cover teams up to 50 cards. For larger organizations, contact our sales team for custom enterprise pricing.",
  },
  {
    q: "Is there a free trial for Premium?",
    a: "The Free plan lets you explore OneTap with no credit card required. Upgrade to Premium whenever you're ready for advanced features.",
  },
];
