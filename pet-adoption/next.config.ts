import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },

  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/pet-list",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
