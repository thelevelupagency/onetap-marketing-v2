# Environment variables

Do **not** commit `.env`, `.env.local`, `.env.development`, or `.env.production` (gitignored). **`.env.example`** is committed as a template only — copy it to `.env.local` and uncomment values from the tables below.

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
