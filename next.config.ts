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
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'donishyob.com',
        pathname: '**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
