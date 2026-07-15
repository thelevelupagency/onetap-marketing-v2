import type { NextConfig } from "next";
import { buildContentSecurityPolicy } from "./src/lib/security/contentSecurityPolicy";
import { getRequiredSecurityHeaderEntries } from "./src/lib/security/requiredSecurityHeaders";

const securityHeaders = [
  ...getRequiredSecurityHeaderEntries(),
  { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/gal-medic1",
        destination: "https://nfc.thelevelupagency.com/gal-medic1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
