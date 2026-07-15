/**
 * Marketing-site CSP — static Next.js pages, Cloudinary/Unsplash images, no third-party trackers.
 */
export function buildContentSecurityPolicy(): string {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "form-action 'self'",
    "img-src 'self' data: blob: https://images.unsplash.com https://res.cloudinary.com https://*.cloudinary.com",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    // Next.js App Router hydration uses inline scripts in production builds.
    "script-src 'self' 'unsafe-inline'",
    "connect-src 'self'",
    "worker-src 'self' blob:",
  ];

  return directives.join("; ");
}
