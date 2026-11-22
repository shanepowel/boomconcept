import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
  async redirects() {
    return [
      { source: '/what-we-do', destination: '/services', permanent: true },
      { source: '/how-we-work', destination: '/services#how-we-work', permanent: true },
      { source: '/expertise', destination: '/therapy-areas', permanent: true },
      { source: '/team', destination: '/about#band', permanent: true },
      { source: '/how-we-do-it-22', destination: '/services#how-we-work', permanent: true },
      { source: '/expertise-22', destination: '/therapy-areas', permanent: true },
      { source: '/why-choose-boom-22', destination: '/about#why', permanent: true },
      { source: '/what-we-stand-for', destination: '/about#beliefs', permanent: true },
      { source: '/who-we-are-25', destination: '/about#band', permanent: true },
      { source: '/contact-1', destination: '/contact', permanent: true },
      { source: '/terms-1', destination: '/terms', permanent: true },
      { source: '/privacy-policy-1', destination: '/privacy', permanent: true },
    ]
  },
  /* config options here */
  // Off for now: next-sanity Live fetches are dynamic. Revisit when wiring "use cache" around Sanity queries.
  cacheComponents: false,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
