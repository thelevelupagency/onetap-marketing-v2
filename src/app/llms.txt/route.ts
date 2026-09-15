import { getSiteUrl } from "@/lib/site-url";

export function GET() {
  const siteUrl = getSiteUrl();
  const body = `# OneTap

> Premium web-first digital business cards for professionals, freelancers, agencies, and teams.

OneTap (OneTap-Card) lets people create a branded digital business card, share it via NFC or QR, capture leads, and track engagement. The product app and card host live on separate origins; this site is the public marketing site.

## Canonical host

- Production marketing site: ${siteUrl}
- English URLs are unprefixed; Hebrew lives under /he/...
- Apex https://onetap-card.com redirects to the www canonical above.

## Primary pages

- Home: ${siteUrl}/
- Pricing: ${siteUrl}/pricing
- FAQ: ${siteUrl}/faq
- Solutions (freelancers): ${siteUrl}/solutions/freelancers
- Solutions (agencies): ${siteUrl}/solutions/agencies
- Blog: ${siteUrl}/blog

## Hebrew counterparts

- ${siteUrl}/he
- ${siteUrl}/he/pricing
- ${siteUrl}/he/faq
- ${siteUrl}/he/solutions/freelancers
- ${siteUrl}/he/solutions/agencies
- ${siteUrl}/he/blog

## Discovery

- Sitemap: ${siteUrl}/sitemap.xml
- Robots: ${siteUrl}/robots.txt

## Optional

- Full blog index: ${siteUrl}/blog (EN) and ${siteUrl}/he/blog (HE)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
