export type BlogCategory = "best-practice" | "success-stories" | "how-to" | "news";

export interface BlogHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  author: string;
  coverImage: string;
  content: string[];
  headings: BlogHeading[];
}

export const categoryLabels: Record<BlogCategory, string> = {
  "best-practice": "Best Practice",
  "success-stories": "Success Stories",
  "how-to": "How To",
  news: "News",
};

export const posts: BlogPost[] = [
  {
    slug: "digital-business-card-best-practices",
    title: "10 Digital Business Card Best Practices for 2026",
    excerpt: "Stand out at every networking event with these proven strategies for digital cards.",
    category: "best-practice",
    date: "2026-05-10",
    author: "OneTap Team",
    coverImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop",
    headings: [
      { id: "lead-with-value", text: "Lead with value", level: 2 },
      { id: "optimize-for-mobile", text: "Optimize for mobile", level: 2 },
      { id: "capture-leads", text: "Capture leads automatically", level: 2 },
    ],
    content: [
      "Your digital business card is often the first impression you make after a handshake. In 2026, the professionals who win are the ones who treat their card like a microsite — not a link dump.",
      "## Lead with value\n\nPut your strongest asset above the fold: a intro video, client logo strip, or one compelling stat. Recipients decide in under 3 seconds whether to save your contact.",
      "## Optimize for mobile\n\nOver 90% of card views happen on phones. Large tap targets, fast load times, and a clear primary CTA (Save Contact) are non-negotiable.",
      "## Capture leads automatically\n\nPassive cards miss opportunities. Add a short lead form so interested prospects can reach you even if they forget to follow up at the event.",
    ],
  },
  {
    slug: "freelancer-80-percent-more-inquiries",
    title: "How a Freelance Designer Got 80% More Inquiries",
    excerpt: "Elena Torres replaced paper cards with OneTap and transformed her client pipeline.",
    category: "success-stories",
    date: "2026-04-22",
    author: "Elena Torres",
    coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop",
    headings: [
      { id: "the-challenge", text: "The challenge", level: 2 },
      { id: "the-solution", text: "The solution", level: 2 },
      { id: "the-results", text: "The results", level: 2 },
    ],
    content: [
      "As a freelance brand strategist, I was handing out 30+ paper cards a month at events. Half got lost. The rest never converted.",
      "## The challenge\n\nI needed a way to look premium, share my portfolio instantly, and capture leads without awkward follow-up emails.",
      "## The solution\n\nI built my OneTap card in under a minute. Gallery for case studies, a 30-second intro video, and a lead form that pings my inbox.",
      "## The results\n\nWithin 30 days, inquiries were up 80%. Clients tell me they saved my contact before I finished introducing myself.",
    ],
  },
  {
    slug: "how-to-set-up-onetap-card",
    title: "How to Set Up Your OneTap Card in 60 Seconds",
    excerpt: "A step-by-step guide to launching your professional digital business card.",
    category: "how-to",
    date: "2026-04-15",
    author: "OneTap Team",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    headings: [
      { id: "step-1", text: "Create your account", level: 2 },
      { id: "step-2", text: "Add your essentials", level: 2 },
      { id: "step-3", text: "Share everywhere", level: 2 },
    ],
    content: [
      "Getting started with OneTap takes less than a minute. Here's exactly how to go from zero to a shareable card.",
      "## Create your account\n\nSign up free at app.onetap-card.com. No credit card required.",
      "## Add your essentials\n\nUpload a photo, add your name and title, then drop in your key links. Premium users can add gallery, video, and lead capture sections.",
      "## Share everywhere\n\nYour card works via QR code, NFC tap, or direct link. Add it to your email signature, LinkedIn, and phone home screen.",
    ],
  },
  {
    slug: "agency-brand-lock-case-study",
    title: "How a Real Estate Agency Onboarded 250 Agents in One Week",
    excerpt: "Empire Real Estate used Brand Lock and bulk import to unify their team's identity.",
    category: "success-stories",
    date: "2026-03-28",
    author: "David Park",
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop",
    headings: [
      { id: "scale-problem", text: "The scale problem", level: 2 },
      { id: "brand-lock", text: "Brand Lock in action", level: 2 },
    ],
    content: [
      "Managing professional identity across 250 agents was our biggest operational headache. Inconsistent branding made us look fragmented to clients.",
      "## The scale problem\n\nEvery agent had a different card design. Compliance reviews took weeks. CRM data was scattered.",
      "## Brand Lock in action\n\nWith OneTap Agency, we uploaded our brand assets once and applied them to all 250 cards via CSV import. CRM sync went live the same day.",
    ],
  },
  {
    slug: "nfc-business-cards-guide",
    title: "The Complete Guide to NFC Business Cards",
    excerpt: "Everything you need to know about tap-to-share networking in 2026.",
    category: "how-to",
    date: "2026-03-10",
    author: "OneTap Team",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85b820?w=800&auto=format&fit=crop",
    headings: [
      { id: "what-is-nfc", text: "What is NFC?", level: 2 },
      { id: "onetap-nfc", text: "OneTap + NFC", level: 2 },
    ],
    content: [
      "NFC (Near Field Communication) lets you share your digital card with a single tap — no QR scanning required.",
      "## What is NFC?\n\nNFC chips embedded in cards, keychains, or phone cases store a URL. When tapped against a smartphone, the URL opens instantly.",
      "## OneTap + NFC\n\nEvery OneTap card has a permanent URL that works with any NFC device. Update your profile anytime — the NFC link stays the same.",
    ],
  },
  {
    slug: "onetap-product-update-may-2026",
    title: "OneTap Product Update: May 2026",
    excerpt: "New analytics dashboard, improved lead capture, and faster card editor.",
    category: "news",
    date: "2026-05-01",
    author: "OneTap Team",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    headings: [
      { id: "analytics", text: "Enhanced analytics", level: 2 },
      { id: "editor", text: "Faster card editor", level: 2 },
    ],
    content: [
      "We've shipped our biggest update of the year. Here's what's new for Premium and Agency users.",
      "## Enhanced analytics\n\nSee per-section engagement, geographic breakdowns, and lead source attribution in your dashboard.",
      "## Faster card editor\n\nDrag-and-drop section reordering and real-time mobile preview make building your card even quicker.",
    ],
  },
];
