import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', "lh3.googleusercontent.com", "avatars.githubusercontent.com"]
  },
  // Move from experimental to root level
  serverExternalPackages: ['@prisma/client', 'prisma'],
};

export default nextConfig;