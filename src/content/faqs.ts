import { pricingFaqs } from "@/content/pricing";

export const homeFaqs = [
  {
    q: "Do people need an app to view my card?",
    a: "No. OneTap is web-first. People can open your card in any browser, save your contact, click your links, and contact you without downloading an app.",
  },
  {
    q: "Can I update my card after sharing it?",
    a: "Yes. You can update your information anytime from the dashboard. Your live card updates instantly.",
  },
  {
    q: "Can visitors save my contact to their phone?",
    a: "Yes. OneTap supports contact saving through a vCard-style experience, making it easier for people to keep your details.",
  },
  {
    q: "Can I use OneTap for my business, not just myself?",
    a: "Yes. OneTap works for freelancers, service businesses, shops, agencies, teams, and companies that want a professional mobile profile.",
  },
  {
    q: "Can I collect leads from my card?",
    a: "Yes. You can add a lead capture form so visitors can send their name, phone, email, and message directly from your card.",
  },
  {
    q: "Is OneTap only for digital business cards?",
    a: "No. OneTap is more than a card. It works like a personal microsite where you can show your services, links, portfolio, videos, testimonials, contact options, and more.",
  },
];

export type FaqCategory = "getting-started" | "your-card" | "business" | "plans-billing";

export const faqCategoryLabels: Record<FaqCategory, string> = {
  "getting-started": "Getting started",
  "your-card": "Your digital card",
  business: "Business and leads",
  "plans-billing": "Plans and billing",
};

export const faqCategoryOrder: readonly FaqCategory[] = [
  "getting-started",
  "your-card",
  "business",
  "plans-billing",
] as const;

export interface FaqEntry {
  q: string;
  a: string;
  category: FaqCategory;
}

export const faqPageEntries: FaqEntry[] = [
  { ...homeFaqs[0], category: "getting-started" },
  {
    q: "How long does setup take?",
    a: "Most professionals launch their card in under 60 seconds. Add sections like gallery, video, and lead capture anytime from your dashboard.",
    category: "getting-started",
  },
  { ...homeFaqs[1], category: "your-card" },
  { ...homeFaqs[2], category: "your-card" },
  { ...homeFaqs[5], category: "your-card" },
  { ...homeFaqs[3], category: "business" },
  { ...homeFaqs[4], category: "business" },
  {
    q: "Can I use my own domain?",
    a: "Pro and Agencies & Teams plans support custom URLs and deeper branding options. Contact sales for white-label domain setup.",
    category: "plans-billing",
  },
  ...pricingFaqs.map((faq) => ({ ...faq, category: "plans-billing" as const })),
];

export type FaqSectionGroup = {
  category: FaqCategory;
  label: string;
  items: FaqEntry[];
};

export function groupFaqsByCategory(entries: readonly FaqEntry[]): FaqSectionGroup[] {
  return faqCategoryOrder
    .map((category) => ({
      category,
      label: faqCategoryLabels[category],
      items: entries.filter((entry) => entry.category === category),
    }))
    .filter((section) => section.items.length > 0);
}

export const freelancersFaqs = [
  {
    q: "Do people need an app to view my card?",
    a: "No. OneTap is web-first. People can open your card in any browser, save your contact, click your links, and contact you without downloading an app.",
  },
  {
    q: "Can I update my card after sharing it?",
    a: "Yes. You can update your information anytime from the dashboard. Your live card updates instantly.",
  },
  {
    q: "Can visitors save my contact to their phone?",
    a: "Yes. OneTap supports contact saving through a vCard-style experience, making it easier for people to keep your details.",
  },
  {
    q: "Can I collect leads from my card?",
    a: "Yes. You can add a lead capture form so visitors can send their name, phone, email, and message directly from your card.",
  },
  {
    q: "Is OneTap only for digital business cards?",
    a: "No. OneTap is more than a card. It works like a personal microsite where you can show your services, links, portfolio, videos, testimonials, contact options, and more.",
  },
  {
    q: "Is there a free plan for freelancers?",
    a: "Yes. You can create and share your card for free. Upgrade when you need advanced analytics, custom branding, or more sections.",
  },
];

export const agenciesFaqs = [
  {
    q: "What is Brand Lock?",
    a: "Brand Lock lets admins enforce firm colors, logos, and required fields across every team card — so reps can't accidentally go off-brand.",
  },
  {
    q: "Can we import users in bulk?",
    a: "Yes. Upload a CSV with names, titles, emails, and other fields to create or update hundreds of cards in one operation.",
  },
  {
    q: "How does team analytics work?",
    a: "Admins see aggregate and per-rep metrics — views, clicks, lead form submissions, and contact saves — to understand networking performance.",
  },
  {
    q: "Can I use OneTap for my business, not just myself?",
    a: "Yes. OneTap works for freelancers, service businesses, shops, agencies, teams, and companies that want a professional mobile profile.",
  },
  {
    q: "Do we need a demo to get started?",
    a: "Larger teams often book a demo to configure Brand Lock and onboarding. Smaller teams can start on the Agencies & Teams plan from the pricing page.",
  },
  {
    q: "Can agents edit their own cards?",
    a: "Yes. Admins control brand guardrails while each rep can update their bio, links, and contact options within approved templates.",
  },
];
