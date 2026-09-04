# Marketing image swap + laptop consistency

Date: 2026-09-04
Branch: `feature/marketing-image-swap`

## Defaults (locked)

- **How it works** Create/Share/Connect photos: leave unchanged.
- **Solutions carousel**: give each card its own lifestyle URL (stop reusing How-it-works images for Freelancers / Agencies / Lawyers).
- **Desktop dashboard** (`dashboard_my08ev.png`): home command center, agencies workspace MacBook, and agencies Leads Center MacBook.
- **Mobile My Cards** (`Screenshot_..._vgvsom.png`): agencies “Share your brand” **phone** mockup (brand-lock row).
- Hebrew: same image URLs; keep HE alt copy, tweak EN alts where the subject changed.

## Image map

| Cloudinary asset | Target |
|---|---|
| `dashboard_my08ev.png` | Home command center + agencies laptop screens |
| `Screenshot_..._vgvsom.png` | Agencies governance phone (brand kit row) |
| `freelance_p1fva5.jpg` | Carousel: Freelancers |
| `agent_t3e5gu.jpg` | Carousel: Agents |
| `creator_v2msay.jpg` | Carousel: Creators |
| `small-buisiness_wcplly.jpg` | Carousel: Small Businesses |
| `agency_obybv9.jpg` | Carousel: Teams & Agencies |
| `lawyer_thfufm.jpg` | Carousel: Lawyers |

## Implementation

1. [`src/lib/marketing-images.ts`](../../src/lib/marketing-images.ts) — dashboard + My Cards constants
2. [`src/content/en/homepage.ts`](../../src/content/en/homepage.ts) + [`src/content/he/homepage.ts`](../../src/content/he/homepage.ts) — carousel + dashboard URLs
3. [`src/components/marketing/sections/dashboard-section.tsx`](../../src/components/marketing/sections/dashboard-section.tsx) — MacBook frame via `MarketingLaptopPreview`
4. Agencies workspace/governance pick up constants automatically

## Verification

- `npm run typecheck` · `npm run lint` · `npm run build`
