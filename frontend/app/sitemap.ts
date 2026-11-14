import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { serviceDetails } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * /sitemap.xml: every page of the site, so search engines find them all.
 * Services and articles are read from the data files, so new ones are
 * added automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/careers", priority: 0.7, changeFrequency: "weekly" },
    { path: "/faqs", priority: 0.6, changeFrequency: "monthly" },
    { path: "/solutions", priority: 0.5, changeFrequency: "monthly" },
  ];

  return [
    ...pages.map((page) => ({ url: absoluteUrl(page.path), changeFrequency: page.changeFrequency, priority: page.priority })),
    ...serviceDetails.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date.length === 7 ? `${post.date}-01` : post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
