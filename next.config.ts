import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // disables Next.js image optimization for static export
  },
  trailingSlash: true, // 👈 makes Next export about/index.html instead of about.html
};

export default nextConfig;
