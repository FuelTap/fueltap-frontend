import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // One 5 MB file plus multipart metadata.
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
