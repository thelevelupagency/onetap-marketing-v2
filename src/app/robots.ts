import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** Citation / training crawlers commonly checked in GEO audits. */
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "ClaudeBot",
  "PerplexityBot",
  "Applebot-Extended",
] as const;

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";

  if (isPreview) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
