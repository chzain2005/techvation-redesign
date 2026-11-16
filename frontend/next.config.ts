import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

/** Browser security headers, sent with every page and file. */
const securityHeaders = [
  // Other sites may not show these pages in a frame (stops click-jacking,
  // e.g. on the /admin login).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  // Browsers must not guess file types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Other sites only see the domain a visitor came from, not the full address.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site never uses the camera, microphone or location.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Don't advertise the frameworks the site runs on.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  experimental: {
    // Job applications send a CV (max 4 MB) through a server action; Vercel
    // accepts requests up to 4.5 MB.
    serverActions: { bodySizeLimit: "4.5mb" },
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Adds what the Payload CMS (/admin) needs to the Next.js config.
export default withPayload(nextConfig);
