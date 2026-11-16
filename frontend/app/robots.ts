import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/seo";

/**
 * /robots.txt: lets every search engine crawl the website and points to the
 * sitemap, but keeps the content editor (/admin) and its API (/api) out of
 * search results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
