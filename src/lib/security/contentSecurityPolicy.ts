/**
 * Marketing-site CSP — static Next.js pages, Cloudinary/Unsplash images.
 * Meta Pixel (`connect.facebook.net` / `www.facebook.com`) is an explicit exception.
 * PostHog origins are allowed when NEXT_PUBLIC_POSTHOG_HOST is set (cookieless measurement).
 */

/** PostHog ingestion + assets CDN origins required by posthog-js. */
export function getPostHogCspOrigins(posthogHost: string): string[] {
  if (!posthogHost) return [];

  const origins = [posthogHost.replace(/\/$/, "")];
  try {
    const { hostname } = new URL(posthogHost);
    const regionMatch = hostname.match(/^([a-z]+)\.i\.posthog\.com$/i);
    if (regionMatch) {
      origins.push(`https://${regionMatch[1]}-assets.i.posthog.com`);
    }
  } catch {
    // Malformed host — ingestion origin only.
  }

  return origins;
}

export function buildContentSecurityPolicy(): string {
  const isDev = process.env.NODE_ENV !== "production";
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() ?? "";
  const posthogOrigins = getPostHogCspOrigins(posthogHost);
  const posthogConnect = posthogOrigins.length > 0 ? ` ${posthogOrigins.join(" ")}` : "";

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "frame-src 'self' https://www.facebook.com https://connect.facebook.net",
    "form-action 'self'",
    "img-src 'self' data: blob: https://images.unsplash.com https://res.cloudinary.com https://*.cloudinary.com https://www.facebook.com https://*.facebook.com",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    // Next.js App Router & React DevTools require 'unsafe-eval' in development mode for HMR & stack traces.
    // In production, 'unsafe-eval' is omitted for strict security.
    isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net"
      : "script-src 'self' 'unsafe-inline' https://connect.facebook.net",
    `connect-src 'self' https://www.facebook.com https://*.facebook.com https://connect.facebook.net https://*.facebook.net${posthogConnect}`,
    "worker-src 'self' blob:",
  ];

  return directives.join("; ");
}
