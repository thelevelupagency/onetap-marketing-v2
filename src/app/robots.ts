import type { MetadataRoute } from "next";
import { getSiteUrl, isNonProductionDeployment } from "@/lib/site-url";

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
  if (isNonProductionDeployment()) {
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
