import { DEFAULT_OG_IMAGE_URL } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";
import { getSiteUrl } from "@/lib/site-url";

export type JsonLdRecord = Record<string, unknown>;

function absolutePath(path: string, locale: Locale = "en"): string {
  const siteUrl = getSiteUrl();
  const localized = localizePath(path, locale);
  return `${siteUrl}${localized === "/" ? "" : localized}`;
}

export function buildOrganizationJsonLd(): JsonLdRecord {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "OneTap",
    url: siteUrl,
    logo: `${siteUrl}/logos/onetap_logo.png`,
    description:
      "A premium, web-first digital business card platform for professionals, freelancers, and teams.",
  };
}

export function buildWebSiteJsonLd(): JsonLdRecord {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "OneTap",
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: ["en", "he"],
  };
}

export function buildSoftwareApplicationJsonLd(locale: Locale): JsonLdRecord {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OneTap",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absolutePath("/", locale),
    description:
      "Create and share a premium digital business card with NFC, QR, analytics, and lead capture.",
    offers: {
      "@type": "Offer",
      url: absolutePath("/pricing", locale),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function buildFaqPageJsonLd(
  entries: { q: string; a: string }[],
): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function buildBlogPostingJsonLd(options: {
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage: string;
}): JsonLdRecord {
  const siteUrl = getSiteUrl();
  const url = absolutePath(`/blog/${options.slug}`, options.locale);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: options.title,
    description: options.excerpt,
    datePublished: `${options.date}T00:00:00.000Z`,
    dateModified: `${options.date}T00:00:00.000Z`,
    author: {
      "@type": "Person",
      name: options.author,
    },
    image: options.coverImage || DEFAULT_OG_IMAGE_URL,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: options.locale === "he" ? "he" : "en",
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbJsonLd(
  items: BreadcrumbItem[],
  locale: Locale,
): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolutePath(item.path, locale),
    })),
  };
}
