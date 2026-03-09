import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporary for FileZilla/static hosting. Remove after moving to Vercel.
  output: "export",
  images: {
    unoptimized: true, // disables Next.js image optimization for static export
  },
  // Temporary workaround for current ESLint config incompatibility during CI/build.
  // Remove once eslint config is updated.
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true, // 👈 makes Next export about/index.html instead of about.html
};

export default nextConfig;
