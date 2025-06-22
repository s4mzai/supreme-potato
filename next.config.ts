import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', "lh3.googleusercontent.com", "avatars.githubusercontent.com"]
  },
  // Move from experimental to root level
  serverExternalPackages: ['@prisma/client', 'prisma'],
  eslint: {
    ignoreDuringBuilds: false, // Keep this false to catch real issues
    dirs: ['app', 'components', 'lib', 'utils'], // Only lint your source directories
  },
};

export default nextConfig;