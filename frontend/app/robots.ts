import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/seo";

/** /robots.txt: lets every search engine crawl the site and points to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
