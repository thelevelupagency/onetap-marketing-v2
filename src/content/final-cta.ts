export type FinalCtaCopy = {
  title: string;
  accent: string;
  subheadline: string;
  cta: string;
  microcopyItems: readonly string[];
};

export type FinalCtaVariant =
  | "default"
  | "pricing"
  | "blog"
  | "faq"
  | "freelancers"
  | "agencies";

export const finalCtaVariants: Record<FinalCtaVariant, FinalCtaCopy> = {
  default: {
    title: "Ready to transform",
    accent: "your networking?",
    subheadline:
      "Create your professional digital card today and give people one place to view all your details, contact you, trust you, and take the next step.",
    cta: "Create Your Card For FREE",
    microcopyItems: ["No app required", "Free to start", "Live in 60 seconds"],
  },
  pricing: {
    title: "Ready to",
    accent: "get started?",
    subheadline:
      "Launch your card on the Free plan in minutes — or choose Pro or Agencies & Teams when you need more power, branding, and team control.",
    cta: "Create Your Card For FREE",
    microcopyItems: ["Free plan available", "No app required", "Upgrade anytime"],
  },
  blog: {
    title: "Ready to put",
    accent: "it into practice?",
    subheadline:
      "Turn what you read into a card people can save, contact, and remember — one link or QR code, no app required.",
    cta: "Create Your Card For FREE",
    microcopyItems: ["No app required", "Free to start", "Share in minutes"],
  },
  faq: {
    title: "Ready to see",
    accent: "it in action?",
    subheadline:
      "The best way to answer your questions is to try it — build your free card and share it in under a minute.",
    cta: "Create Your Card For FREE",
    microcopyItems: ["No app required", "Free to start", "Live in 60 seconds"],
  },
  freelancers: {
    title: "Ready to win",
    accent: "more clients?",
    subheadline:
      "Freelancers use OneTap to share one professional link, capture leads, and follow up faster — without juggling apps or outdated PDFs.",
    cta: "Create Your Card For FREE",
    microcopyItems: ["Built for freelancers", "Free to start", "Lead capture included"],
  },
  agencies: {
    title: "Ready to scale",
    accent: "your team's brand?",
    subheadline:
      "Give every rep an on-brand digital card, team analytics, and centralized lead capture — with guardrails admins control.",
    cta: "Create Your Card For FREE",
    microcopyItems: ["Brand Lock for teams", "Bulk import", "Team analytics"],
  },
};

export function getFinalCtaCopy(variant: FinalCtaVariant = "default"): FinalCtaCopy {
  return finalCtaVariants[variant];
}
