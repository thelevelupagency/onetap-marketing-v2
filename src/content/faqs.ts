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
    a: "Yes — on Pro and Team. Add a lead capture form so visitors can send their name, phone, email, and message directly from your card. Free can show every other section type, with a 4-section cap.",
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
    q: "What can I add on the Free plan?",
    a: "Free includes one card, One-Tap buttons, a QR code and link, and up to four sections — About, gallery, video, highlights, FAQ, or testimonials. The lead form is a Pro feature.",
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
    a: "Yes — on Pro and Team. Add a lead capture form so visitors can send their name, phone, email, and message directly from your card.",
  },
  {
    q: "Is OneTap only for digital business cards?",
    a: "No. OneTap is more than a card. It works like a personal microsite where you can show your services, links, portfolio, videos, testimonials, contact options, and more.",
  },
  {
    q: "Is there a free plan for freelancers?",
    a: "Yes. You can create and share your card for free. Upgrade to Pro when you need a lead form, custom branding, or insights.",
  },
];

export const agenciesFaqs = [
  {
    q: "How do shared brand kits work?",
    a: "Team workspaces share colors, logos, and templates so every card starts on-brand. Each member can still update their own bio, links, and contact options.",
  },
  {
    q: "How do we add team members?",
    a: "Invite teammates from your workspace. Team includes up to 10 members and 10 cards — no CSV import or sales call required.",
  },
  {
    q: "How does team analytics work?",
    a: "Admins see workspace and per-card insights — views, clicks, lead form submissions, and contact saves — with one-year retention on Team.",
  },
  {
    q: "Can I use OneTap for my business, not just myself?",
    a: "Yes. OneTap works for freelancers, service businesses, shops, agencies, teams, and companies that want a professional mobile profile.",
  },
  {
    q: "Do we need a demo to get started?",
    a: "No. Start Team from the pricing page and invite your roster. The agencies page is a walkthrough of how teams use OneTap — not a separate plan name.",
  },
  {
    q: "Can agents edit their own cards?",
    a: "Yes. Admins manage the workspace and shared brand kit; each teammate can update their bio, links, and contact options.",
  },
];
