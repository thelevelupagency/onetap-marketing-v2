const DEFAULT_SITE_URL = "https://www.onetap-card.com";
export const PRODUCTION_CANONICAL_SITE_URL = DEFAULT_SITE_URL;

/** Canonical marketing site origin (no trailing slash). */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

/** True on Vercel previews or any non-canonical staging/custom domain. */
export function isNonProductionDeployment(): boolean {
  if (
    process.env.VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
  ) {
    return true;
  }
  return getSiteUrl() !== PRODUCTION_CANONICAL_SITE_URL;
}
