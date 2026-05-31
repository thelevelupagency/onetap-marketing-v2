import { CREATE_BASICS_URL } from "@/lib/constants";

export const audienceMarqueeItems = [
  "Lawyer",
  "Designer",
  "Singer",
  "Real Estate Agent",
  "Consultant",
  "Photographer",
  "Coach",
  "Developer",
  "Marketer",
  "Artist",
  "Accountant",
  "Creator",
  "Sales Rep",
  "Insurance Agent",
  "Event Planner",
  "Entrepreneur",
] as const;

export const heroCopy = {
  badge: "Digital business cards, reimagined",
  subheadline:
    "Create a beautiful, app-free digital business card that helps people contact you, save your details, view your work, and become real leads — from one simple link or QR code.",
  microcopy: "No app required · Free to start · Share in minutes",
  trustLine:
    "Built for freelancers, small businesses, creators, sales teams, agencies, and professionals worldwide.",
} as const;

export type PainPointIconKey =
  | "filePenLine"
  | "inbox"
  | "lineChart"
  | "contactRound"
  | "link2"
  | "palette"
  | "users";

export const painPointsCopy = {
  title: "No more",
  accent: "settling.",
  lead: "Stale cards, missed follow-ups, and guesswork are over. OneTap keeps your profile live, your pipeline full, and your results visible.",
  points: [
    {
      icon: "filePenLine" as const,
      title: "No more outdated details",
      description:
        "Update your phone, links, services, or offers anytime — your card updates instantly.",
      accent: "from-brand-navy/10 to-brand-turquoise/10",
    },
    {
      icon: "inbox" as const,
      title: "No more missed follow-ups",
      description:
        "Let visitors save your contact, message you, book a meeting, or submit a lead form in one tap.",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
    },
    {
      icon: "lineChart" as const,
      title: "No more guessing",
      description: "Track views, clicks, saves, and leads from your dashboard.",
      accent: "from-brand-midnight/10 to-brand-navy/10",
    },
  ],
} as const;

export const howItWorksCopy = {
  title: "How it",
  accent: "works",
  description: "Create once. Share everywhere. Grow faster.",
  steps: [
    {
      step: "01",
      title: "Create",
      description:
        "Build your card in 60 seconds. Add your photo, logo, bio, contact buttons, social links, services, gallery, videos, testimonials, and lead form — no coding or design skills needed.",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779391976/onetap/static/marketing/202_jd25sb.jpg",
      imageAlt: "Professional building a digital business card on a laptop",
    },
    {
      step: "02",
      title: "Share",
      description:
        "Share with one link or QR code. Use your OneTap card in meetings, events, WhatsApp, Instagram bio, LinkedIn, email signature, NFC cards, printed materials, or anywhere your audience is.",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779391975/onetap/static/marketing/8718_xmgnm1.jpg",
      imageAlt: "People sharing and viewing content on their phones",
    },
    {
      step: "03",
      title: "Connect",
      description:
        "Turn every interaction into a real opportunity. People can call, email, message, navigate, follow, book, save your contact, or send their details directly from your card.",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779391975/onetap/static/marketing/13239_k1he5m.jpg",
      imageAlt: "Group celebrating a successful connection",
    },
  ],
} as const;

export type CardUxIconKey =
  | "zap"
  | "contactRound"
  | "userPlus"
  | "barChart3"
  | "image"
  | "refreshCw"
  | "smartphone"
  | "globe";

export const cardUxCopy = {
  title: "More than a card.",
  accent: "A professional microsite.",
  lead: "A mobile-first profile built to impress visitors and turn attention into action.",
  features: [
    {
      icon: "zap" as const,
      label: "One-Tap Contact Actions",
      description: "Call, email, WhatsApp, SMS, navigate, or visit your site in one tap.",
    },
    {
      icon: "contactRound" as const,
      label: "Save to Contacts",
      description: "Let visitors save your details straight to their phone.",
    },
    {
      icon: "userPlus" as const,
      label: "Lead Capture Form",
      description: "Collect names, emails, phone numbers, and messages from prospects.",
    },
    {
      icon: "barChart3" as const,
      label: "Analytics & Insights",
      description: "Track views, clicks, saves, and form submissions from your dashboard.",
    },
    {
      icon: "image" as const,
      label: "Rich Media & Portfolio",
      description: "Show photos, videos, services, testimonials, menus, or case studies.",
    },
    {
      icon: "refreshCw" as const,
      label: "Always Up to Date",
      description: "Edit once — every future visitor sees your latest version.",
    },
    {
      icon: "smartphone" as const,
      label: "NFC & QR Code Ready",
      description: "Share instantly with a tap or scan — no app required on either side.",
    },
    {
      icon: "globe" as const,
      label: "Global & Multi-Language",
      description: "Built for professionals across markets, languages, and locations.",
    },
  ],
} as const;

export type SolutionIconKey =
  | "briefcase"
  | "home"
  | "sparkles"
  | "building2"
  | "users"
  | "scale";

export const solutionsCopy = {
  title: "Built for",
  accent: "every professional",
  lead: "Whether you sell, create, consult, teach, serve, or manage a team — OneTap helps you present yourself professionally and make it easier for people to act.",
  cards: [
    {
      icon: "briefcase" as const,
      title: "Freelancers & Consultants",
      description:
        "Services, portfolio, testimonials, and contact options in one polished profile.",
      ctaLabel: "Build your personal profile",
      href: "/solutions/freelancers",
      accent: "from-brand-navy/10 to-brand-turquoise/10",
      image: howItWorksCopy.steps[0].image,
      imageAlt: "Freelancer working on a digital business card",
    },
    {
      icon: "home" as const,
      title: "Agents",
      description:
        "Listings, tours, invitation forms, WhatsApp, and booking links in one card.",
      ctaLabel: "Create your real estate card",
      href: CREATE_BASICS_URL,
      accent: "from-brand-turquoise/15 to-brand-navy/10",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1757706607/NFC/screenshots/home-interior_full_dvc_oyw2mr.png",
      imageAlt: "Real estate agent digital card on a phone",
    },
    {
      icon: "sparkles" as const,
      title: "Creators & Influencers",
      description:
        "Socials, media kit, portfolio, collaborations, and booking links in one place.",
      ctaLabel: "Launch your creator card",
      href: "/solutions/freelancers#creators",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1757706588/NFC/screenshots/fitness_full_dvc_gxcheq.png",
      imageAlt: "Creator profile card on a phone",
    },
    {
      icon: "building2" as const,
      title: "Small Businesses",
      description:
        "Hours, location, menu, services, reviews, and offers on a mobile mini-site.",
      ctaLabel: "Build your business card",
      href: CREATE_BASICS_URL,
      accent: "from-brand-midnight/10 to-brand-navy/10",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1757706625/NFC/screenshots/barber_full_dvc_e9fmqv.png",
      imageAlt: "Small business digital card on a phone",
    },
    {
      icon: "users" as const,
      title: "Teams & Agencies",
      description:
        "On-brand cards for every teammate, lead capture, and networking insights.",
      ctaLabel: "Explore team cards",
      href: "/solutions/agencies",
      accent: "from-brand-navy/15 to-brand-midnight/10",
      image: howItWorksCopy.steps[2].image,
      imageAlt: "Team collaborating with digital business cards",
    },
    {
      icon: "scale" as const,
      title: "Lawyers & Financial Professionals",
      description:
        "Credentials, services, and contact channels in a profile that builds trust.",
      ctaLabel: "Create a trusted profile",
      href: CREATE_BASICS_URL,
      accent: "from-brand-midnight/5 to-brand-turquoise/15",
      image: howItWorksCopy.steps[1].image,
      imageAlt: "Professional sharing contact details from a digital card",
    },
  ],
} as const;

export type DashboardIconKey = "edit3" | "barChart3" | "inbox" | "palette" | "users";

export const dashboardCopy = {
  title: "Your professional",
  accent: "command center.",
  subheadline:
    "Manage your card, update your content, track engagement, and capture leads from one powerful dashboard.",
  imageUrl:
    "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779393898/onetap/static/marketing/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2026-05-13_%D7%91-20.56.31_gtx3y5.png",
  imageAlt: "OneTap dashboard with card overview, analytics, and live phone preview",
  features: [
    {
      icon: "edit3" as const,
      title: "Real-Time Editing",
      description: "Update your profile, links, services, or branding anytime.",
    },
    {
      icon: "barChart3" as const,
      title: "Smart Analytics",
      description:
        "Understand what people click, where interest comes from, and which actions drive leads.",
    },
    {
      icon: "inbox" as const,
      title: "Lead Management",
      description: "Collect inquiries directly from your card and follow up faster.",
    },
    {
      icon: "palette" as const,
      title: "Brand Control",
      description: "Keep your colors, logo, style, and message consistent across every card.",
    },
    {
      icon: "users" as const,
      title: "Team Ready",
      description:
        "Create cards for multiple people, standardize branding, and manage users as your business grows.",
    },
  ],
} as const;

export const socialProofCopy = {
  title: "Join thousands of professionals",
  accent: "growing with OneTap.",
  lead: "Trusted by freelancers, creators, and agencies worldwide.",
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
      role: "Real Estate Agent",
      content:
        "One link for listings, tours, and WhatsApp. Prospects reach me faster after every open house.",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
      name: "James Okonkwo",
      role: "Founder, Nova Labs",
      content:
        "Our team shares one brand system across 40 cards. Onboarding a new hire is now a link and a tap.",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    },
    {
      name: "Priya Shah",
      role: "Marketing Consultant",
      content:
        "I replaced three link-in-bio tools with one card. New leads hit my inbox the same day I meet someone at an event.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Sarah Kim",
      role: "VP Sales, Brightpath",
      content:
        "Lead forms and analytics finally show which events actually convert. My reps stopped guessing what works.",
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

export const homepagePricingHeader = {
  title: "Simple pricing.",
  accent: "Best value.",
  lead: "Start free and upgrade when you grow. No hidden fees, no surprises.",
} as const;

