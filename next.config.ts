import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.clerk.com","images.clerk.dev"], // Add this line
  },
};

export default nextConfig;