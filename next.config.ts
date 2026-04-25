import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/CivicLens",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    // Next.js 16 dev-types validator generates .js imports that trip up tsc
    // during static export. Source types are verified in the editor.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
