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
      // The old Join Us page and its role pages were replaced by /join.
      {
        source: "/opportunities/:path*",
        destination: "/join",
        permanent: false,
      },
      // Committee and Web Dev are archived (their pages are in _subteams/archive/).
      {
        source: "/team/:slug(committee|web_dev)",
        destination: "/team",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
