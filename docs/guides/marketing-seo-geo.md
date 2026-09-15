# Marketing SEO and GEO

Canonical host for production: **`https://www.onetap-card.com`**.

The apex (`https://onetap-card.com`) must keep redirecting to www. Sitemap, canonical tags, Open Graph, JSON-LD, and `robots.txt` must advertise the **final** www URLs only.

Agent laws: [`.cursor/rules/seo-geo-standard.mdc`](../../.cursor/rules/seo-geo-standard.mdc).  
Workflow: [`.cursor/skills/seo-page-setup/SKILL.md`](../../.cursor/skills/seo-page-setup/SKILL.md).  
Checklist: [`docs/engineering/seo-checklist.md`](../engineering/seo-checklist.md).

## SEO vs GEO

| | SEO (legacy search) | GEO (AI search / answer engines) |
|---|---|---|
| Goal | Rank and get clicked in Google/Bing | Be cited accurately in ChatGPT, Perplexity, Gemini, AI Overviews |
| Needs | Canonical www, sitemap, unique titles, hreflang, crawlable HTML | Same plus clear entity JSON-LD, `/llms.txt`, explicit allow for AI crawlers |
| Failure mode | “Page with redirect”, duplicate hosts, orphans | Product missing from answers or attributed to the wrong URL |

Skipping this layer is not “shipping faster.” It trains crawlers on the wrong host or on no structured facts.

## Discovery files (dynamic)

| Public URL | Source | Notes |
|---|---|---|
| `/sitemap.xml` | [`src/app/sitemap.ts`](../../src/app/sitemap.ts) | EN + HE static routes + blog slugs; hreflang alternates |
| `/robots.txt` | [`src/app/robots.ts`](../../src/app/robots.ts) | Allow `/` + AI crawlers; Sitemap line; preview Disallow |
| `/llms.txt` | [`src/app/llms.txt/route.ts`](../../src/app/llms.txt/route.ts) | Short brand brief + primary www URLs |

Do **not** commit hand-maintained `public/sitemap.xml` or `public/robots.txt` — they go stale.

## Schema map

Helpers live in [`src/lib/seo/json-ld.ts`](../../src/lib/seo/json-ld.ts); render with `<JsonLd />`.

| Surface | Schema |
|---|---|
| Locale layout | `Organization` + `WebSite` |
| Home | `SoftwareApplication` |
| `/faq` only | `FAQPage` |
| Blog posts | `BlogPosting` |
| Nested landings / blog | `BreadcrumbList` |

JSON-LD must match **visible** copy. Do not put FAQPage on the homepage FAQ section.

## Bilingual

- English: unprefixed (`/pricing`)
- Hebrew: `/he/...`
- `alternates.languages` via `getLocaleAlternates` (includes `x-default` → English)

Shipping only one locale for a new public page is incomplete.

## Preview vs production

- Production / local prod-like: indexable; robots Allow; sitemap listed.
- Vercel preview (`VERCEL_ENV === "preview"`): root metadata `noindex`, robots `Disallow: /`, no sitemap. Do not weaken this to “test SEO.”

## Do not regress

1. Hardcoding apex `https://onetap-card.com` in metadata, sitemap, or JSON-LD.
2. Adding static discovery files under `public/` that replace metadata routes.
3. Leaving a new public route out of the sitemap (static routes) or out of both locales.
4. Inventing marketing sitemap entries for app dashboard/billing/login.
5. Letting `/llms.txt` advertise removed landings.
6. Making preview deployments indexable.

## Ops after deploy

1. Set Vercel Production `NEXT_PUBLIC_SITE_URL=https://www.onetap-card.com` (env overrides code default).
2. Resubmit `https://www.onetap-card.com/sitemap.xml` in Google Search Console.
3. URL Inspection on the www homepage.

## Later ranking work (after this foundation)

Comparison landings, more verticals, author bios (E-E-A-T), Bing Webmaster + IndexNow, Organization `sameAs` when social URLs exist, optional `llms-full.txt`. Update this guide when those land.
