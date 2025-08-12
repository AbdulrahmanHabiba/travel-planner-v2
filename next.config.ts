import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns : [
      {
        hostname : "80go3ynwmd.ufs.sh"
      }
    ]
  },
    typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  /* config options here */
};

export default withFlowbiteReact(nextConfig);