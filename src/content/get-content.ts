import type { Locale } from "@/lib/i18n/config";
import { isNonDefaultLocale } from "@/lib/i18n/config";
import type { ChromeCopy } from "@/content/en/chrome";
import { enChrome } from "@/content/en/chrome";
import { heChrome } from "@/content/he/chrome";
import * as enHomepage from "@/content/en/homepage";
import * as heHomepage from "@/content/he/homepage";
import * as enFaqs from "@/content/en/faqs";
import * as heFaqs from "@/content/he/faqs";
import * as enPricing from "@/content/en/pricing";
import * as hePricing from "@/content/he/pricing";
import * as enSolutions from "@/content/en/solutions";
import * as heSolutions from "@/content/he/solutions";
import * as enFinalCta from "@/content/en/final-cta";
import * as heFinalCta from "@/content/he/final-cta";
import * as enSite from "@/content/en/site";
import * as heSite from "@/content/he/site";
import { posts as enPosts, categoryLabels as enCategoryLabels } from "@/content/en/blog/posts";
import { posts as hePosts, categoryLabels as heCategoryLabels } from "@/content/he/blog/posts";
import type { BlogCategory, BlogPost } from "@/content/blog/types";
import type { FinalCtaVariant } from "@/content/en/final-cta";

export function getChrome(locale: Locale): ChromeCopy {
  return isNonDefaultLocale(locale) ? heChrome : enChrome;
}

export function getHomepage(locale: Locale) {
  return isNonDefaultLocale(locale) ? heHomepage : enHomepage;
}

export function getFaqs(locale: Locale) {
  return isNonDefaultLocale(locale) ? heFaqs : enFaqs;
}

export function getPricing(locale: Locale) {
  return isNonDefaultLocale(locale) ? hePricing : enPricing;
}

export function getSolutions(locale: Locale) {
  return isNonDefaultLocale(locale) ? heSolutions : enSolutions;
}

export function getFinalCta(locale: Locale, variant: FinalCtaVariant = "default") {
  const mod = isNonDefaultLocale(locale) ? heFinalCta : enFinalCta;
  return mod.getFinalCtaCopy(variant);
}

export function getSite(locale: Locale) {
  return isNonDefaultLocale(locale) ? heSite : enSite;
}

export function getBlogPosts(locale: Locale): BlogPost[] {
  return isNonDefaultLocale(locale) ? hePosts : enPosts;
}

export function getBlogCategoryLabels(locale: Locale): Record<BlogCategory, string> {
  return isNonDefaultLocale(locale) ? heCategoryLabels : enCategoryLabels;
}

/** Re-export types for convenience */
export type { FinalCtaVariant } from "@/content/en/final-cta";
export type { ChromeCopy } from "@/content/en/chrome";
