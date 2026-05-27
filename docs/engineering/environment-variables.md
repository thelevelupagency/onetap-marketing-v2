# Environment variables

Do **not** commit `.env`, `.env.local`, `.env.development`, or `.env.production`. They are gitignored.

Create **`.env.local`** (or use Next.js `.env.development` / `.env.production` locally only) from the tables below.

## Development / preview

```bash
NEXT_PUBLIC_SITE_URL=https://onetap-card.com
NEXT_PUBLIC_CARD_BASE_URL=https://card-dev.onetap-card.com
NEXT_PUBLIC_MAIN_APP_URL=https://app-dev.onetap-card.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dudwjf2pu
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
```

## CI

GitHub Actions sets the same public values in `.github/workflows/quality-gates.yml`. Vercel project env should mirror production for the production deployment.

## Future API routes

When `src/app/api/**` is added, see commented placeholders in workflow `env` and `AGENTS.md` → Future Backend.
