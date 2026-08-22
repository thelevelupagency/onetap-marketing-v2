# Environment variables

Do **not** commit `.env`, `.env.local`, `.env.development`, or `.env.production` (gitignored). **`.env.example`** is committed as a template only — copy it to `.env.local` and uncomment values from the tables below.

## Development / preview

```bash
NEXT_PUBLIC_SITE_URL=https://onetap-card.com
NEXT_PUBLIC_CARD_BASE_URL=https://card-dev.onetap-card.com
NEXT_PUBLIC_MAIN_APP_URL=https://app-dev.onetap-card.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dudwjf2pu
NEXT_PUBLIC_META_PIXEL_ID=28011734695135178
```

For local `next dev` overrides:

```bash
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
# NEXT_PUBLIC_MAIN_APP_URL=http://localhost:3001
```

## Production

```bash
NEXT_PUBLIC_SITE_URL=https://onetap-card.com
NEXT_PUBLIC_CARD_BASE_URL=https://card.onetap-card.com
NEXT_PUBLIC_MAIN_APP_URL=https://app.onetap-card.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dudwjf2pu
NEXT_PUBLIC_META_PIXEL_ID=28011734695135178
```

Local `next dev` / `next start` also read gitignored `.env.development` and `.env.production` for the pixel ID. Quality gates do not set this variable. Add `NEXT_PUBLIC_META_PIXEL_ID` in the Vercel dashboard **for Production only** (it is not committed). Preview deploys must omit it (or the pixel is ignored unless `NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD=true`). Rebuild after changing it — `NEXT_PUBLIC_*` is inlined at build time.

The pixel ID is public (it ships in the browser snippet). Do not put Conversion API tokens or app secrets in `NEXT_PUBLIC_*`.

Partner-facing loop: [meta-conversion-loop.md](../guides/meta-conversion-loop.md). Short marketing brief: [meta-conversion-loop-for-amit.md](../guides/meta-conversion-loop-for-amit.md).

## CI

GitHub Actions sets the same public values in `.github/workflows/quality-gates.yml` (except Meta Pixel). Vercel project env should mirror production for the production deployment, including `NEXT_PUBLIC_META_PIXEL_ID` when ads tracking is enabled.

## Future API routes

When `src/app/api/**` is added, see commented placeholders in workflow `env` and `AGENTS.md` → Future Backend.
