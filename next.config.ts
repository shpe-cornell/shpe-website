import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    devtoolSegmentExplorer: false,
  },
  // Temporary workaround for current ESLint config incompatibility during CI/build.
  // Remove once eslint config is updated.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
