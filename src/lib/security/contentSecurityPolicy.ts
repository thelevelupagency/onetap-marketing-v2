/**
 * Marketing-site CSP — static Next.js pages, Cloudinary/Unsplash images.
 * Meta Pixel (`connect.facebook.net` / `www.facebook.com`) is an explicit exception.
 */
export function buildContentSecurityPolicy(): string {
  const isDev = process.env.NODE_ENV !== "production";

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "form-action 'self'",
    "img-src 'self' data: blob: https://images.unsplash.com https://res.cloudinary.com https://*.cloudinary.com https://www.facebook.com",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    // Next.js App Router & React DevTools require 'unsafe-eval' in development mode for HMR & stack traces.
    // In production, 'unsafe-eval' is omitted for strict security.
    isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net"
      : "script-src 'self' 'unsafe-inline' https://connect.facebook.net",
    "connect-src 'self' https://www.facebook.com https://connect.facebook.net",
    "worker-src 'self' blob:",
  ];

  return directives.join("; ");
}
