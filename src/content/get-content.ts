import type { Locale } from "@/lib/i18n/config";
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
  return locale === "he" ? heChrome : enChrome;
}

export function getHomepage(locale: Locale) {
  return locale === "he" ? heHomepage : enHomepage;
}

export function getFaqs(locale: Locale) {
  return locale === "he" ? heFaqs : enFaqs;
}

export function getPricing(locale: Locale) {
  return locale === "he" ? hePricing : enPricing;
}

export function getSolutions(locale: Locale) {
  return locale === "he" ? heSolutions : enSolutions;
}

export function getFinalCta(locale: Locale, variant: FinalCtaVariant = "default") {
  const mod = locale === "he" ? heFinalCta : enFinalCta;
  return mod.getFinalCtaCopy(variant);
}

export function getSite(locale: Locale) {
  return locale === "he" ? heSite : enSite;
}

export function getBlogPosts(locale: Locale): BlogPost[] {
  return locale === "he" ? hePosts : enPosts;
}

export function getBlogCategoryLabels(locale: Locale): Record<BlogCategory, string> {
  return locale === "he" ? heCategoryLabels : enCategoryLabels;
}

/** Re-export types for convenience */
export type { FinalCtaVariant } from "@/content/en/final-cta";
export type { ChromeCopy } from "@/content/en/chrome";
