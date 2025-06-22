import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'https://aggie-finals.fly.dev/api/:path*',
      },
    ];
  },
};

export default nextConfig;