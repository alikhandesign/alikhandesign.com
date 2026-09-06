import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old Squarespace site: both of these were "all my work" index pages,
      // now consolidated into a single /work page.
      {
        source: '/projects',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/work',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
