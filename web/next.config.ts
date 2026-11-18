import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/what-we-do', destination: '/services', permanent: true },
      { source: '/how-we-work', destination: '/services#how-we-work', permanent: true },
      { source: '/expertise', destination: '/therapy-areas', permanent: true },
      { source: '/team', destination: '/about#band', permanent: true },
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
