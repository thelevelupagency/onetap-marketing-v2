# Blog content bank refresh

**Status:** Implemented 2026-06-04

## Summary

Replaced 6 placeholder blog posts with 6 editorial articles on non-overlapping topics. Kept 7 copywriter articles from the May 2026 docx zip as canonical prose (structure QA only). Blog now has **18 posts** via `copywriter-posts.ts` + `editorial-posts.ts` merged in `posts.ts` (includes 3 success stories and 3 news posts in editorial).

## Final post inventory

### Copywriter (7) — `src/content/blog/copywriter-posts.ts`

| Slug | Category |
|------|----------|
| `what-is-a-digital-business-card` | how-to |
| `digital-business-card-vs-paper-business-card` | best-practice |
| `how-to-create-a-digital-business-card` | how-to |
| `digital-business-card-for-small-business` | best-practice |
| `digital-business-card-for-real-estate-agents` | how-to |
| `nfc-business-card-explained` | how-to |
| `digital-business-card-examples` | best-practice |

### Editorial (6) — `src/content/blog/editorial-posts.ts`

| Slug | Category |
|------|----------|
| `where-to-share-digital-business-card` | how-to |
| `networking-follow-up-with-digital-card` | best-practice |
| `digital-card-lead-capture-best-practices` | how-to |
| `how-to-read-digital-card-analytics` | best-practice |
| `agency-team-digital-card-rollout` | how-to |
| `consultant-discovery-calls-case-study` | success-stories |
| `realtor-open-house-leads-case-study` | success-stories |
| `photographer-booking-requests-case-study` | success-stories |
| `onetap-lead-center-update-june-2026` | news |
| `onetap-agency-brand-templates-may-2026` | news |
| `onetap-card-editor-templates-april-2026` | news |

## Removed legacy slugs (404, no redirects)

- `digital-business-card-best-practices`
- `freelancer-80-percent-more-inquiries`
- `how-to-set-up-onetap-card`
- `agency-brand-lock-case-study`
- `nfc-business-cards-guide`
- `onetap-product-update-may-2026`

## Verification

- `npm run typecheck` — pass
- `npm run lint` — pass (pre-existing avatar warning)
- `npm run build` — 18 `/blog/[slug]` static routes

## Notes

- FAQ sections from docx omitted (no FAQ renderer on blog post page).
- Copywriter posts cross-link to editorial siblings at CTA/footer only.
- Shared types live in `src/content/blog/types.ts`.
- Category labels in `src/content/blog/categories.ts`; `posts.ts` validates unique slugs at module load.
- Blog body renders `\n\n` as separate paragraphs; `/blog/<slug>` strings in content become titled internal links.
- Sitemap `lastModified` uses each post's `date` field.
