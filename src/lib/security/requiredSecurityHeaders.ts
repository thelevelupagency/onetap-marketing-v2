/** Baseline HTTP security headers for the static marketing site. */
export const REQUIRED_SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
} as const;

export function getRequiredSecurityHeaderEntries(): ReadonlyArray<{
  key: string;
  value: string;
}> {
  return Object.entries(REQUIRED_SECURITY_HEADERS).map(([key, value]) => ({
    key,
    value,
  }));
}
