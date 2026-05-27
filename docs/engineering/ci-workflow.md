# CI workflow (marketing v2)

## Branch flow

| Target branch | Allowed source |
|---------------|----------------|
| `dev` | Side branches only (`feature/*`, not `main` / `dev` / protected env branches) |
| `main` | `dev` only |

Enforced by `.github/workflows/branch-flow-guard.yml`.

## Required PR checks

On PRs to `dev` or `main`:

- **Branch Flow Guard / Promotion Path**
- **Quality Gates / Lint** — `npm run lint`
- **Quality Gates / Typecheck** — `npm run typecheck`
- **Quality Gates / Build** — `npm run build`

## Local pre-flight

Before opening a PR:

```bash
npm run typecheck
npm run lint
npm run build
```

In Cursor, say **Ship it** to run the same sequence and get a PR-ready summary (see `.cursorrules`).

## Environment variables (CI)

Quality gates set minimal public env vars so `next build` succeeds. See `.github/workflows/quality-gates.yml`, `.env.example`, and `docs/engineering/environment-variables.md`.

When API routes are added, extend the workflow `env` block with Supabase, Turnstile, and Redis placeholders (commented template in the workflow file).

## Plans

Substantial work plans live in `docs/plans/<date>-<topic>.md` after approval.
