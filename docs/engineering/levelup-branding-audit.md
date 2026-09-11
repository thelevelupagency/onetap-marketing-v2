# LevelUp → OneTap branding audit (marketing v2)

**Date:** 2026-09-11  
**Trello:** [Branding](https://trello.com/c/VTYYRsjk), [Support email](https://trello.com/c/CXIUWkq4)

## Verdict

**No user-facing LevelUp Agency / `thelevelupagency.com` product copy or contact emails remain** in this marketing site. Public UI, content (EN + HE), logos, metadata, and env defaults already use OneTap / `onetap-card.com`.

## Repo grep (patterns covered)

- `thelevelupagency.com`, `@thelevelupagency.com`
- `Level Up Agency`, `LevelUp Agency`, user-facing `LevelUp`
- `levelup-logo`
- `mailto:`, `support@`, `contact@`, `privacy@`, `noreply@`

## Already OneTap (verified)

| Area | Status |
|------|--------|
| Footer copyright | `© … OneTap Card` |
| Logos under `public/logos/` | `onetap_logo*.png` only |
| Site / app / card origins | `.env.example`, `src/lib/constants.ts`, `src/lib/site-url.ts` → `*.onetap-card.com` |
| EN + HE marketing copy | OneTap-branded; no LevelUp agency name |
| Privacy / Terms links | App canonical URLs via `PRIVACY_URL` / `TERMS_URL` (no LevelUp mailto in this repo) |

## Intentionally left unchanged

| Location | Why |
|----------|-----|
| `next.config.ts` → `nfc.thelevelupagency.com/gal-medic1` | Legacy NFC redirect (product-owned; do not change unless redirect target moves) |
| `README.md` GitHub org link `github.com/thelevelupagency` | Org ownership, not product branding |
| Package / repo URLs under the GitHub org | Ownership metadata |
| `docs/plans/2026-08-31-marketing-i18n-en-he.md` local path mentioning `LevelUp/` | Internal plan note / local filesystem path only |

## Support email note

This marketing repo has **no** `mailto:` or `*@thelevelupagency.com` / `*@onetap-card.com` contact addresses in source. Product support/privacy contact emails (if any) live on **onetap-app** legal pages linked from the footer — audit that repo separately for the support-email card.
