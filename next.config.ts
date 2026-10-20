import type { NextConfig } from "next";
import { NOTION_HUB_URL } from "@/lib/constants";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Ensure markdown data is available to serverless/ISR at runtime
  outputFileTracingIncludes: {
    "/**/*": ["_events/**", "_sponsors/**"],
  },
  async redirects() {
    return [
      {
        source: "/notion-hub",
        destination: NOTION_HUB_URL,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
