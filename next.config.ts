import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  transpilePackages: ['next-intl'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'e-kitobxona.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'donishyob.com',
      },
      {
        protocol: 'https',
        hostname: 'mtmu-97.vercel.app',
        // pathname: '**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
