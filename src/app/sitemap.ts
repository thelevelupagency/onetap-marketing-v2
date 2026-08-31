import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/content/get-content";
import { LOCALES, getLocaleAlternates, localizePath, type Locale } from "@/lib/i18n/config";
import { getSiteUrl } from "@/lib/site-url";

const BASE_URL = getSiteUrl();

function absoluteLocalizedUrl(path: string, locale: Locale): string {
  const localized = localizePath(path, locale);
  return `${BASE_URL}${localized === "/" ? "" : localized}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/blog",
    "/faq",
    "/pricing",
    "/solutions",
    "/solutions/freelancers",
    "/solutions/agencies",
  ];

  const staticEntries = staticRoutes.flatMap((route) =>
    LOCALES.map((locale) => {
      const changeFrequency =
        route === "/" || route === "/blog"
          ? ("weekly" as const)
          : ("monthly" as const);
      return {
        url: absoluteLocalizedUrl(route, locale),
        lastModified: new Date(),
        changeFrequency,
        priority:
          route === "/"
            ? 1
            : route === "/blog" || route === "/pricing"
              ? 0.9
              : 0.8,
        alternates: {
          languages: getLocaleAlternates(route, BASE_URL),
        },
      };
    }),
  );

  const blogEntries = LOCALES.flatMap((locale: Locale) =>
    getBlogPosts(locale).map((post) => {
      const path = `/blog/${post.slug}`;
      return {
        url: absoluteLocalizedUrl(path, locale),
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: getLocaleAlternates(path, BASE_URL),
        },
      };
    }),
  );

  return [...staticEntries, ...blogEntries];
}
