import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.clerk.com","images.clerk.dev","storage.googleapis.com","media.rawg.io"], // Add this line
  },
};

export default nextConfig;