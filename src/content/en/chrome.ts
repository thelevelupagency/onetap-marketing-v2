export type ChromeNavItem = {
  title: string;
  url: string;
  description?: string;
};

export type ChromeCopy = {
  nav: {
    home: string;
    solutions: string;
    freelancers: string;
    freelancersDescription: string;
    agencies: string;
    agenciesDescription: string;
    learn: string;
    blog: string;
    blogDescription: string;
    successStories: string;
    successStoriesDescription: string;
    faq: string;
    faqDescription: string;
    pricing: string;
    signIn: string;
    getYourCard: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    product: string;
    company: string;
    resources: string;
    home: string;
    freelancers: string;
    agencies: string;
    pricing: string;
    faq: string;
    blog: string;
    helpCenter: string;
    terms: string;
    privacy: string;
    cookieSettings: string;
    rightsReserved: string;
  };
  cookie: {
    title: string;
    body: string;
    reject: string;
    accept: string;
  };
  notFound: {
    message: string;
    backHome: string;
  };
  process: {
    defaultCtaLabel: string;
    badge: string;
  };
  faqSection: {
    title: string;
    accent: string;
    viewAll: string;
  };
  pricingUi: {
    monthly: string;
    annually: string;
    saveBadgeTemplate: string;
    perMonth: string;
    mostPopular: string;
    wasNowSr: string;
    featureTitle: string;
    featureAccent: string;
    featureColumn: string;
    included: string;
    notIncluded: string;
    viewFullPricing: string;
  };
  blogUi: {
    relatedTitle: string;
    relatedAccent: string;
    copyLink: string;
    copied: string;
    onThisPage: string;
    shareOn: string;
    categoriesAria: string;
  };
  aria: {
    testimonialsRow1: string;
    testimonialsRow2: string;
    whatsIncluded: string;
    audienceMarquee: string;
    digitalCardCarousel: string;
    carouselPrevious: string;
    carouselNext: string;
    featurePrevious: string;
    featureNext: string;
    pricingHelp: string;
    faqCategories: string;
  };
  slugClaim: {
    submitLabel: string;
    placeholder: string;
    ariaLabelSuffix: string;
    asciiHintPrefix: string;
    asciiHintChars: string;
    asciiHintSuffix: string;
    errors: {
      tooShort: string;
      tooLong: string;
      reserved: string;
    };
  };
  hero: {
    title: string;
    titleAccent: string;
    titleRest: string;
    seeHowItWorks: string;
  };
  metadata: {
    siteTitle: string;
    siteDescription: string;
    homeTitle: string;
    pricingTitle: string;
    pricingDescription: string;
    pricingHeroTitle: string;
    pricingHeroAccent: string;
    pricingHeroLead: string;
    faqTitle: string;
    faqDescription: string;
    faqHeroTitle: string;
    faqHeroAccent: string;
    faqHeroLead: string;
    blogTitle: string;
    blogDescription: string;
    blogHeroTitle: string;
    blogHeroAccent: string;
    blogHeroLead: string;
    freelancersTitle: string;
    freelancersDescription: string;
    agenciesTitle: string;
    agenciesDescription: string;
    postNotFound: string;
  };
  blog: {
    backToBlog: string;
    shareLabel: string;
    minRead: string;
    searchPlaceholder: string;
    allCategories: string;
    emptySearchAndCategory: string;
    emptySearch: string;
    emptyCategory: string;
    empty: string;
  };
  faqPage: {
    searchPlaceholder: string;
    allCategories: string;
    emptyFiltered: string;
    empty: string;
    comparePlans: string;
    billingFaqOnPricing: string;
  };
  language: {
    switchTo: string;
  };
  search: {
    defaultPlaceholder: string;
  };
  pricingFaq: {
    title: string;
    accent: string;
  };
  cta: {
    getCardFree: string;
  };
};

export const enChrome: ChromeCopy = {
  nav: {
    home: "Home",
    solutions: "Solutions",
    freelancers: "Freelancers",
    freelancersDescription: "Stand out and capture leads on the go",
    agencies: "Agencies",
    agenciesDescription: "Brand-locked cards for every team member",
    learn: "Learn",
    blog: "Blog",
    blogDescription: "Tips, guides, and product updates",
    successStories: "Success Stories",
    successStoriesDescription: "See how professionals grow with OneTap",
    faq: "FAQ",
    faqDescription: "Answers to common questions",
    pricing: "Pricing",
    signIn: "Sign in",
    getYourCard: "Get your card",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  footer: {
    product: "product",
    company: "company",
    resources: "resources",
    home: "Home",
    freelancers: "Freelancers",
    agencies: "Agencies",
    pricing: "Pricing",
    faq: "FAQ",
    blog: "Blog",
    helpCenter: "Help Center",
    terms: "Terms",
    privacy: "Privacy",
    cookieSettings: "Cookie settings",
    rightsReserved: "All rights reserved.",
  },
  cookie: {
    title: "Marketing cookies",
    body: "We use Meta Pixel to measure ads on Facebook and Instagram after you click through to OneTap. Accept to allow this. Essential site cookies are not affected.",
    reject: "Reject",
    accept: "Accept",
  },
  notFound: {
    message: "This page doesn't exist - but your next great connection is one tap away.",
    backHome: "Back to Home",
  },
  process: {
    defaultCtaLabel: "Get your card free",
    badge: "The Process",
  },
  faqSection: {
    title: "Frequently asked",
    accent: "questions",
    viewAll: "View all FAQs",
  },
  pricingUi: {
    monthly: "Monthly",
    annually: "Annually",
    saveBadgeTemplate: "Save {n}%",
    perMonth: "/month",
    mostPopular: "Most Popular",
    wasNowSr: "Was ${previous}, now ${current}",
    featureTitle: "Feature",
    featureAccent: "comparison",
    featureColumn: "Feature",
    included: "Included",
    notIncluded: "Not included",
    viewFullPricing: "View full pricing & comparison →",
  },
  blogUi: {
    relatedTitle: "Related",
    relatedAccent: "posts",
    copyLink: "Copy Link",
    copied: "Copied!",
    onThisPage: "On this page",
    shareOn: "Share on",
    categoriesAria: "Blog categories",
  },
  aria: {
    testimonialsRow1: "Testimonials row 1",
    testimonialsRow2: "Testimonials row 2",
    whatsIncluded: "What's included",
    audienceMarquee: "Professionals who use OneTap",
    digitalCardCarousel: "Digital card examples carousel",
    carouselPrevious: "Previous slide",
    carouselNext: "Next slide",
    featurePrevious: "Previous feature",
    featureNext: "Next feature",
    pricingHelp: "Pricing help",
    faqCategories: "FAQ categories",
  },
  slugClaim: {
    submitLabel: "Get your card",
    placeholder: "your-name",
    ariaLabelSuffix: "Your name after",
    asciiHintPrefix: "Use English letters for your public link (",
    asciiHintChars: "a-z, 0-9, hyphens",
    asciiHintSuffix: ").",
    errors: {
      tooShort: "Card name needs at least 3 characters.",
      tooLong: "Card name cannot exceed 50 characters.",
      reserved: "This name is reserved and cannot be used.",
    },
  },
  hero: {
    title: "Your Digital Business Card in",
    titleAccent: "ONETAP.",
    titleRest: "Appear Everywhere.",
    seeHowItWorks: "See how it works",
  },
  metadata: {
    siteTitle: "OneTap-Card | Your professional identity, one tap away",
    siteDescription: "A premium, web-first digital business card platform.",
    homeTitle: "OneTap-Card | Your professional identity, one tap away",
    pricingTitle: "Pricing | OneTap-Card",
    pricingDescription: "Simple and transparent pricing for individuals and teams.",
    pricingHeroTitle: "Simple &",
    pricingHeroAccent: "transparent.",
    pricingHeroLead:
      "Whether you're a solo freelancer or an enterprise team, we have a plan that scales with you.",
    faqTitle: "FAQ | OneTap-Card",
    faqDescription:
      "Answers to common questions about OneTap digital business cards, features, and billing.",
    faqHeroTitle: "Got",
    faqHeroAccent: "questions?",
    faqHeroLead: "Everything you need to know about OneTap digital business cards.",
    blogTitle: "Blog | OneTap-Card",
    blogDescription: "Networking tips, success stories, and product updates from the OneTap team.",
    blogHeroTitle: "The OneTap",
    blogHeroAccent: "Blog",
    blogHeroLead: "Best practices, success stories, how-tos, and news for modern professionals.",
    freelancersTitle: "Digital Business Cards for Freelancers & Creators | OneTap-Card",
    freelancersDescription:
      "Create a stunning, fully branded digital business card in 60 seconds. Share your portfolio, links, and contact details with one tap via NFC or QR code.",
    agenciesTitle: "Digital Business Cards for Agencies & Teams | OneTap-Card",
    agenciesDescription:
      "Unified branding and centralized control for your organization. Manage team cards, lock brand templates, track leads, and export data from one admin dashboard.",
    postNotFound: "Post Not Found",
  },
  blog: {
    backToBlog: "Back to Blog",
    shareLabel: "Share this article",
    minRead: "min read",
    searchPlaceholder: "Search posts…",
    allCategories: "All",
    emptySearchAndCategory: "No posts match your search or category.",
    emptySearch: "No posts match your search.",
    emptyCategory: "No posts in this category.",
    empty: "No posts available.",
  },
  faqPage: {
    searchPlaceholder: "Search FAQs...",
    allCategories: "All",
    emptyFiltered: "No FAQs match your search or category.",
    empty: "No FAQs available.",
    comparePlans: "Compare plans",
    billingFaqOnPricing: "Billing FAQ on pricing",
  },
  language: {
    switchTo: "Language",
  },
  search: {
    defaultPlaceholder: "Search…",
  },
  pricingFaq: {
    title: "Billing",
    accent: "FAQ",
  },
  cta: {
    getCardFree: "Get your card free",
  },
};
