import type { NextConfig } from "next";

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
