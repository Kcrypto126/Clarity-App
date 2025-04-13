import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Creates a standalone build that can run independently without the need for the entire Next.js installation
  output: 'standalone'
};

export default nextConfig;
