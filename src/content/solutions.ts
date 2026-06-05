import type { PainPointIconKey } from "@/content/homepage";
import { audienceMarqueeItems, howItWorksCopy } from "@/content/homepage";
import {
  CARD_SCREENSHOT_BARBER,
  CARD_SCREENSHOT_FITNESS,
  CARD_SCREENSHOT_INTERIOR,
} from "@/lib/phone-screenshots";
import { CARD_HOST_PREFIX } from "@/lib/constants";

export type SolutionFeatureIconKey =
  | "zap"
  | "link2"
  | "userPlus"
  | "barChart3"
  | "image"
  | "refreshCw"
  | "lock"
  | "users"
  | "upload"
  | "palette"
  | "inbox"
  | "contactRound";

export type FreelancerNicheCard = {
  id: string;
  personaName: string;
  styleLabel: string;
  imageSrc: string;
  slug: string;
  alt: string;
};

export type FreelancerNiche = {
  id: string;
  label: string;
  cards: readonly FreelancerNicheCard[];
};

const freelancerCardInterior: FreelancerNicheCard = {
  id: "interior",
  personaName: "Katy Delma",
  styleLabel: "Portfolio",
  imageSrc: CARD_SCREENSHOT_INTERIOR,
  slug: "sofi-schwartz",
  alt: "Interior designer OneTap digital business card",
};

const freelancerCardBarber: FreelancerNicheCard = {
  id: "barber",
  personaName: "Frame Studio",
  styleLabel: "Clean",
  imageSrc: CARD_SCREENSHOT_BARBER,
  slug: "franklin-barbershop",
  alt: "Barbershop OneTap digital business card",
};

const freelancerCardFitness: FreelancerNicheCard = {
  id: "fitness",
  personaName: "Urban Lens",
  styleLabel: "Bold",
  imageSrc: CARD_SCREENSHOT_FITNESS,
  slug: "almog-menashe",
  alt: "Fitness professional OneTap digital business card",
};

const freelancerCardEditorial: FreelancerNicheCard = {
  id: "editorial",
  personaName: "Lena Voss",
  styleLabel: "Editorial",
  imageSrc: CARD_SCREENSHOT_FITNESS,
  slug: "almog-menashe",
  alt: "Creative professional OneTap digital business card",
};

export const freelancersHeroCopy = {
  badge: "For Freelancers & Creators",
  title: "Your Identity, Digitized in",
  accent: "60 Seconds.",
  lead: "Unify your portfolio, social links, and contact details into one contactless card. Share with NFC, QR, or a single link — no app download required.",
  cta: "Create your free card",
} as const;

export const freelancersNicheSelectorCopy = {
  title: "Preview cards",
  accent: "for your niche",
  lead: "Choose your field to see four starter styles you can launch in minutes.",
} as const;

export const freelancersNicheManifest = {
  defaultNicheId: "photography",
  niches: [
    {
      id: "photography",
      label: "Photography",
      cards: [
        freelancerCardInterior,
        freelancerCardBarber,
        freelancerCardFitness,
        freelancerCardEditorial,
      ],
    },
    {
      id: "design",
      label: "Design",
      cards: [
        freelancerCardInterior,
        freelancerCardFitness,
        freelancerCardBarber,
        freelancerCardEditorial,
      ],
    },
    {
      id: "fitness",
      label: "Fitness & Coaching",
      cards: [
        freelancerCardFitness,
        freelancerCardInterior,
        freelancerCardBarber,
        freelancerCardEditorial,
      ],
    },
    {
      id: "consulting",
      label: "Consulting",
      cards: [
        freelancerCardInterior,
        freelancerCardFitness,
        freelancerCardBarber,
        freelancerCardEditorial,
      ],
    },
    {
      id: "real-estate",
      label: "Real Estate",
      cards: [
        freelancerCardInterior,
        freelancerCardFitness,
        freelancerCardBarber,
        freelancerCardEditorial,
      ],
    },
    {
      id: "creator",
      label: "Creators",
      cards: [
        freelancerCardFitness,
        freelancerCardInterior,
        freelancerCardBarber,
        freelancerCardEditorial,
      ],
    },
    {
      id: "marketing",
      label: "Marketing",
      cards: [
        freelancerCardInterior,
        freelancerCardFitness,
        freelancerCardBarber,
        freelancerCardEditorial,
      ],
    },
    {
      id: "freelance",
      label: "Freelance Services",
      cards: [
        freelancerCardBarber,
        freelancerCardInterior,
        freelancerCardFitness,
        freelancerCardEditorial,
      ],
    },
  ] as const satisfies readonly FreelancerNiche[],
} as const;

export const freelancersCardIncludesCopy = {
  title: "Every card",
  accent: "includes the essentials.",
  lead: "Build once in 60 seconds — then share, save contacts, and stay on-brand from one link or tap.",
  points: [
    {
      icon: "zap" as SolutionFeatureIconKey,
      title: "One-Tap Sharing",
      description: `Share via NFC, QR code, or your permalink (${CARD_HOST_PREFIX}username). One link works everywhere you network.`,
      accent: "from-brand-navy/10 to-brand-turquoise/10",
    },
    {
      icon: "contactRound" as SolutionFeatureIconKey,
      title: "Instant Contact Resolution",
      description:
        "Visitors save your details to their phone contacts with native vCard — no app download, no friction.",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
    },
    {
      icon: "palette" as SolutionFeatureIconKey,
      title: "Custom Structural Branding",
      description:
        "Control colors, typography, and layout so your card looks unmistakably yours — not a generic template.",
      accent: "from-brand-midnight/10 to-brand-navy/10",
    },
  ],
} as const;

export const freelancersPainPointsCopy = {
  title: "No more",
  accent: "lost opportunities.",
  lead: "Freelancers juggle events, DMs, and link-in-bio tools — but still lose leads when follow-up is slow or your presence looks scattered.",
  points: [
    {
      icon: "contactRound" as PainPointIconKey,
      title: "No more lost contacts after events",
      description:
        "Hand someone one link. They save your details, message you, or submit a lead form before you leave the room.",
      accent: "from-brand-navy/10 to-brand-turquoise/10",
    },
    {
      icon: "link2" as PainPointIconKey,
      title: "No more scattered link-in-bio",
      description:
        "Portfolio, services, socials, and booking live in one polished profile — not five different tools.",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
    },
    {
      icon: "lineChart" as PainPointIconKey,
      title: "No more guessing what works",
      description:
        "See which meetings, posts, and events actually drive views, clicks, and inquiries.",
      accent: "from-brand-midnight/10 to-brand-navy/10",
    },
  ],
} as const;

export const freelancersHowItWorksCopy = {
  title: "From handshake to",
  accent: "new client",
  description: "Launch in minutes. Share everywhere you network. Convert attention into real conversations.",
  steps: [
    {
      step: "01",
      title: "Create",
      description:
        "Add your photo, services, portfolio, testimonials, contact buttons, and a lead form — no designer or developer needed.",
      image: howItWorksCopy.steps[0].image,
      imageAlt: howItWorksCopy.steps[0].imageAlt,
    },
    {
      step: "02",
      title: "Share",
      description:
        "Drop your OneTap URL in your email signature, LinkedIn, WhatsApp, conference badge QR, or Instagram bio — always on-brand.",
      image: howItWorksCopy.steps[1].image,
      imageAlt: howItWorksCopy.steps[1].imageAlt,
    },
    {
      step: "03",
      title: "Connect",
      description:
        "Prospects save your contact, book a call, or send their details from your card — so you follow up while you're still top of mind.",
      image: howItWorksCopy.steps[2].image,
      imageAlt: howItWorksCopy.steps[2].imageAlt,
    },
  ],
} as const;

export const freelancersFeaturesCopy = {
  title: "Built for how",
  accent: "you work solo",
  lead: "Everything you need to look credible, stay reachable, and grow your client pipeline — without juggling five tools.",
  features: [
    {
      icon: "zap" as SolutionFeatureIconKey,
      title: "60-second setup",
      description:
        "Launch your card before your next coffee meeting. No design skills required.",
    },
    {
      icon: "link2" as SolutionFeatureIconKey,
      title: "Link-in-bio replacement",
      description:
        "One beautiful URL for portfolio, socials, services, and contact — always up to date.",
    },
    {
      icon: "userPlus" as SolutionFeatureIconKey,
      title: "Automatic lead capture",
      description: "Built-in forms collect prospect details and notify you instantly.",
    },
    {
      icon: "barChart3" as SolutionFeatureIconKey,
      title: "Engagement analytics",
      description: "Track views, button clicks, and form submissions from one dashboard.",
    },
    {
      icon: "image" as SolutionFeatureIconKey,
      title: "Portfolio & testimonials",
      description: "Showcase case studies, gallery, and client quotes that build trust fast.",
    },
    {
      icon: "refreshCw" as SolutionFeatureIconKey,
      title: "Always current",
      description: "Update your offer or contact info once — every future visitor sees the latest version.",
    },
  ],
} as const;

export const freelancersCreatorsCopy = {
  badge: "For Creators",
  title: "5x faster",
  accent: "exposure",
  lead: "Showcase your gallery, embed videos, and link every platform from one stunning mobile profile. Your audience saves your contact in one tap.",
  cta: "Start creating",
  phoneUrl: "almog-menashe",
  phoneAlt: "Creator OneTap card preview",
} as const;

export const freelancersSocialProofCopy = {
  title: "Trusted by freelancers",
  accent: "who network for a living.",
  lead: "From consultants to creators — solo pros worldwide trust OneTap to make every introduction count.",
  audiences: audienceMarqueeItems,
  testimonials: [
    {
      name: "Elena Torres",
      role: "Freelance Brand Strategist",
      content:
        "I set up my card in under a minute. Clients save my contact before I finish my elevator pitch.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Marcus Chen",
      role: "Independent Consultant",
      content:
        "One link for my calendar, portfolio, and WhatsApp. Prospects reach me faster after every intro call.",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
      name: "Priya Shah",
      role: "Marketing Consultant",
      content:
        "I replaced three link-in-bio tools with one card. New leads hit my inbox the same day I meet someone at an event.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Diego Ramos",
      role: "Freelance Photographer",
      content:
        "At every shoot I share one QR code. Models and clients save my contact and browse my portfolio before they leave the set.",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ],
} as const;

export const freelancersPricingHeader = {
  title: "Start free.",
  accent: "Upgrade when you grow.",
  lead: "Launch your professional card at no cost. Add analytics, custom branding, and more when your business scales.",
} as const;

export const agenciesPainPointsCopy = {
  title: "No more",
  accent: "brand chaos.",
  lead: "Growing teams can't afford off-brand cards, manual onboarding, or zero visibility into how reps actually network.",
  points: [
    {
      icon: "palette" as PainPointIconKey,
      title: "No more inconsistent agent cards",
      description:
        "Brand Lock keeps logos, colors, and compliance fields aligned across every teammate — automatically.",
      accent: "from-brand-navy/10 to-brand-turquoise/10",
    },
    {
      icon: "users" as PainPointIconKey,
      title: "No more painful onboarding",
      description:
        "Import hundreds of users from CSV and issue on-brand cards in minutes, not weeks.",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
    },
    {
      icon: "lineChart" as PainPointIconKey,
      title: "No more blind spots",
      description:
        "Track impressions, leads, and vCard downloads per rep from one team dashboard.",
      accent: "from-brand-midnight/10 to-brand-navy/10",
    },
  ],
} as const;

export const agenciesHowItWorksCopy = {
  title: "Roll out your",
  accent: "team in days",
  description: "Standardize branding, onboard at scale, and measure networking performance — without IT overhead.",
  steps: [
    {
      step: "01",
      title: "Configure",
      description:
        "Define firm colors, logos, required fields, and approved templates. Every new card inherits your standards.",
      image: howItWorksCopy.steps[0].image,
      imageAlt: "Team configuring brand settings on a laptop",
    },
    {
      step: "02",
      title: "Onboard",
      description:
        "Upload a CSV with names, titles, and contact details. Agents receive ready-to-share cards without design work.",
      image: howItWorksCopy.steps[1].image,
      imageAlt: "Team members receiving digital business cards on their phones",
    },
    {
      step: "03",
      title: "Measure",
      description:
        "Monitor views, lead forms, and saves per agent. Spot top performers and coach the rest with real data.",
      image: howItWorksCopy.steps[2].image,
      imageAlt: "Team reviewing analytics and engagement metrics",
    },
  ],
} as const;

export const agenciesFeaturesCopy = {
  title: "Enterprise features,",
  accent: "out of the box",
  lead: "Everything agencies need to protect brand integrity, onboard fast, and prove ROI from networking.",
  features: [
    {
      icon: "lock" as SolutionFeatureIconKey,
      title: "Brand Lock",
      description: "Apply firm branding across every agent card simultaneously.",
    },
    {
      icon: "upload" as SolutionFeatureIconKey,
      title: "Bulk User Import",
      description: "Onboard 10 to 10,000 team members via CSV in minutes.",
    },
    {
      icon: "barChart3" as SolutionFeatureIconKey,
      title: "Team Analytics",
      description: "Track impressions, leads, and vCard downloads per agent.",
    },
    {
      icon: "users" as SolutionFeatureIconKey,
      title: "Role-Based Access",
      description: "Give admins control while reps manage only their own profiles.",
    },
    {
      icon: "palette" as SolutionFeatureIconKey,
      title: "Template Library",
      description: "Deploy approved layouts so every card looks on-brand from day one.",
    },
    {
      icon: "inbox" as SolutionFeatureIconKey,
      title: "Centralized Leads",
      description: "Route inquiries to the right rep or CRM without manual forwarding.",
    },
  ],
} as const;

export const agenciesTeamSplitCopy = {
  badge: "At scale",
  title: "One brand.",
  accent: "Every rep.",
  lead: "Whether you manage 20 agents or 2,000, OneTap keeps every card consistent, compliant, and ready to share — while giving each teammate a profile that still feels personal.",
  cta: "Book a demo",
  imageUrl:
    "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779393898/onetap/static/marketing/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2026-05-13_%D7%91-20.56.31_gtx3y5.png",
  imageAlt: "OneTap team dashboard with branded cards for multiple agents",
} as const;

export const agenciesSocialProofCopy = {
  title: "Teams that scale",
  accent: "trust OneTap.",
  lead: "From brokerages to enterprise sales teams — organizations worldwide standardize networking with OneTap.",
  audiences: audienceMarqueeItems,
  testimonials: [
    {
      name: "James Okonkwo",
      role: "Founder, Nova Labs",
      content:
        "Our team shares one brand system across 40 cards. Onboarding a new hire is now a link and a tap.",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    },
    {
      name: "Sarah Kim",
      role: "Operations Director, Meridian Group",
      content:
        "Brand Lock alone saved our legal team weeks of compliance headaches. Every agent card looks exactly how we need it.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "David Ortiz",
      role: "Managing Partner, Park & Associates",
      content:
        "We rolled out 120 cards in a week. Legal approved the templates once, and every rep stayed on brand from day one.",
      avatar: "https://randomuser.me/api/portraits/men/71.jpg",
    },
  ],
} as const;

export const agenciesPricingHeader = {
  title: "Plans for teams",
  accent: "that scale.",
  lead: "Compare team seats, Brand Lock, and analytics. Start with a plan that fits your roster — upgrade as you grow.",
} as const;
