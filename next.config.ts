import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable static optimization for dynamic content
  trailingSlash: false,
  
  // Force fresh builds
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
  
  // Disable caching for development
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
