import type { PainPointIconKey } from "@/content/homepage";

/** Shared FAQ shape for accordion sections. */
export type MarketingFaqItem = {
  q: string;
  a: string;
};

export type MarketingTestimonial = {
  name: string;
  role: string;
  content: string;
  avatar: string;
};

export type PainPointsCopy = {
  title: string;
  accent: string;
  lead: string;
  points: readonly {
    icon: PainPointIconKey;
    title: string;
    description: string;
    accent: string;
  }[];
};

export type SocialProofCopy = {
  title: string;
  accent: string;
  lead: string;
  audiences: readonly string[];
  testimonials: readonly MarketingTestimonial[];
};

export type PricingHeaderCopy = {
  title: string;
  accent: string;
  lead: string;
};

export type MarketingBandBackground = "cream" | "white";
