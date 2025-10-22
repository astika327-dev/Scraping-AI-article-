import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // For development, we allow all remote patterns.
    // In production, this should be restricted to known domains.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
