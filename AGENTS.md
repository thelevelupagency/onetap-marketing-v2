<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI Operating Guide

Canonical host: **onetap-marketing-v2** — public marketing site for OneTap (static content, App Router, no dashboard).

This repository uses layered AI guidance:

- **Rules** in [`.cursor/rules/`](.cursor/rules/) — persistent laws and defaults.
- **Skills** in [`.cursor/skills/`](.cursor/skills/) — repeatable workflows.
- **Agents** in [`.cursor/agents/`](.cursor/agents/) — specialist reviews (no implementation).
- **Templates** in [`.cursor/templates/`](.cursor/templates/) — consistent starting points.

Delivery follows **`feature/*` → `dev` → `main`** (never direct merge of protected branches; see CI-First Delivery Flow).

## Architecture Baseline (static marketing)

- **Stack:** Next.js 16 App Router, TypeScript, Tailwind v4, shadcn/ui v4, Framer Motion for marketing motion.
- **No Redux, no slices, no CMS** — content lives in `src/content/` (blog, FAQ, pricing).
- **Pages:** `export const metadata` + thin `page.tsx` + domain sections. Prefer `PageShell` + `PageHero` + `MarketingSection` per [`docs/component-system.md`](docs/component-system.md). Do not hand-roll section padding or brand accent spans on route files.
- **Components:**
  - `src/components/marketing/primitives/` — layout shells, headers, CTAs, FAQ accordion.
  - `src/components/marketing/sections|pricing|blog|solutions|phones/` — domain UI.
  - `src/components/layout/` — navigation, footer.
  - `src/components/ui/` — shadcn primitives only; extend marketing via primitives, not forks.
- **Lib:** `src/lib/*` — blog helpers, typography, constants, search. Keep helpers pure and typed.
- **Cross-app links:** Dashboard CTAs use `APP_ORIGIN`, `LOGIN_URL`, `SIGNUP_URL` from [`src/lib/constants.ts`](src/lib/constants.ts) (`NEXT_PUBLIC_MAIN_APP_URL`). Card host uses `NEXT_PUBLIC_CARD_BASE_URL` via `getCardHostPrefix()` / `buildCreateBasicsUrl()`. Local env: [`.env.example`](.env.example) + [`docs/engineering/environment-variables.md`](docs/engineering/environment-variables.md) (never commit `.env.local` / `.env.development` / `.env.production`). Use `GetCardCta` and `SlugClaimCta` — do not hardcode origins in new UI.
- **Brand alignment:** Design tokens in `src/app/globals.css` are aligned with `onetap-app`. When changing brand colors or spacing tokens, note whether `onetap-app` needs the same update.
- **SEO:** Per-route `metadata`; site map in `src/app/sitemap.ts` via `getSiteUrl()` from [`src/lib/site-url.ts`](src/lib/site-url.ts) (default `https://onetap-card.com`). Update sitemap when adding/removing public routes.

## Default Daily Workflow

Use the main chat agent for most requests end-to-end:

1. Plan the task,
2. Implement the change,
3. Run required checks,
4. Summarize risks and verification.

Suggested prompt:

`Plan then implement using project rules/skills. Run typecheck, lint, and build; note SEO/routes touched for page changes.`

For substantial tasks, require this sequence:

1. Critical questions only,
2. Plan proposal,
3. Explicit approval,
4. Implementation in small slices.

Persist substantial-task plans under `docs/plans/` (for example `docs/plans/2026-05-27-new-solutions-page.md`).

## CI-First Delivery Flow

1. Develop on `feature/*`.
2. Open PR to `dev`.
3. Ensure required CI checks pass.
4. Merge `dev` to `main` via PR after checks pass again.

Required CI checks (GitHub Actions):

- `Branch Flow Guard / Promotion Path`
- `Quality Gates / Lint`
- `Quality Gates / Typecheck`
- `Quality Gates / Build`

Reference: [`docs/engineering/ci-workflow.md`](docs/engineering/ci-workflow.md).

Local pre-flight (or say **Ship it** — see [`.cursorrules`](.cursorrules)):

- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Which Agent When

- **`architect-reviewer`:** new routes, component-system impact, content vs UI boundaries, future API shape.
- **`qa-reviewer`:** regression risk, broken slugs/routes, metadata/sitemap drift, build verification gaps.
- **`security-reviewer`:** env exposure, future public endpoints, CTA URL safety, form/PII handling.

Invoke from [`.cursor/agents/`](.cursor/agents/) (for example `@architect-reviewer`). Review-only — not required for every task.

## Task Playbooks

### New marketing / solutions page

1. Add `src/app/<route>/page.tsx` with `metadata`.
2. Compose with `PageShell` / primitives or existing section components per `docs/component-system.md`.
3. Add domain sections under `src/components/marketing/` if needed.
4. Update `src/app/sitemap.ts` for new public URLs.
5. Run typecheck, lint, build.

Skill: `.cursor/skills/marketing-page-delivery/SKILL.md`

### New blog post

1. Add entry to `src/content/blog/posts.ts` (slug, headings, content blocks).
2. Confirm slug appears via `getAllSlugs()` / `generateStaticParams`.
3. Set post-specific metadata patterns in `src/app/blog/[slug]/page.tsx` if needed.
4. Sitemap includes blog slugs automatically via `getAllSlugs()`.

Skill: `.cursor/skills/blog-content-authoring/SKILL.md`

### SEO / metadata change

1. Update route `metadata` (title, description, openGraph).
2. Align canonical host with `sitemap.ts` base URL.
3. Check [`docs/engineering/seo-checklist.md`](docs/engineering/seo-checklist.md) for robots.txt / JSON-LD gaps.

Skill: `.cursor/skills/seo-page-setup/SKILL.md`

### UI section or primitive change

1. Follow `docs/component-system.md` spacing and CTA rules.
2. Prefer extending primitives over duplicating section shells.
3. Use `@/lib/typography` for type scales in TSX.

Skill: `.cursor/skills/ui-component-delivery/SKILL.md`

### Bug fix

1. Reproduce and isolate.
2. Minimal safe fix.
3. Run typecheck, lint, build.
4. Summarize root cause.

## Future Backend (not active until `src/app/api/**` exists)

When adding leads, analytics, or Supabase-backed config (patterns from `onetap-marketing` v1):

- Activate rules: `marketing-api-future.mdc`, `supabase-backend-future.mdc`.
- Skill: `.cursor/skills/marketing-api-delivery/SKILL.md`.
- Template: `.cursor/templates/route-handler.ts`.
- Require: Zod validation, rate limits, Turnstile on public forms, safe client errors, no secrets in client bundles.

Do not introduce API routes or Supabase dependencies until explicitly requested.

## Legal & Privacy Defaults (marketing)

- Do **not** add third-party analytics SDKs (GA4, Meta Pixel, Vercel Analytics, Segment, etc.) unless explicitly approved by the team.
- If adding public forms that collect personal data: visible Privacy Policy link before/at submit; no extra tracking fields without stated legal basis.
- Avoid logging emails, phone numbers, or names in server logs.
- CTA or copy changes that affect signup/login flows may need coordination with `onetap-app` — call this out in PRs.

## Phase 1 Principles

- Ship quickly and safely; keep the codebase easy to follow.
- Prefer static generation and in-repo content over new infrastructure.
- Avoid importing patterns from `onetap-app` that assume slices, Redux, or dashboard shell.
- Reuse marketing primitives and `src/content/` patterns before inventing new abstractions.

## Marketing UI

Follow [`docs/component-system.md`](docs/component-system.md) for layout primitives, spacing, CTAs, and typography. Use `src/components/marketing/primitives/` for new pages and sections — do not duplicate section shells, FAQ accordion styles, or brand accent spans.

### Spacing governance

- **Single source:** change `--marketing-*` tokens in `src/app/globals.css`, then update primitives — not individual pages.
- **Forbidden on routes:** raw `container`, `py-*`, `pt-*`, `pb-*`, or inline `max-w-*` in `src/app/**/page.tsx`.
- **Allowed exception:** fold heroes via `MarketingSection spacing="hero"` or `MarketingPageHero` only.
- **Cross-repo:** brand **color** token changes may need `onetap-app` sync; marketing **layout** tokens stay in this repo unless product requests parity.
