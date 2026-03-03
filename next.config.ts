import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "encrypted-tbn0.gstatic.com",
        protocol: "https",
      },
      {
        hostname: "tse1.mm.bing.net",
        protocol: "https",
      },
      {
        hostname: "tse2.mm.bing.net",
        protocol: "https",
      },
      {
        hostname: "tse3.mm.bing.net",
        protocol: "https",
      },
      {
        hostname: "tse4.mm.bing.net",
        protocol: "https",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
