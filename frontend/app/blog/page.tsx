import type { Metadata } from "next";
import JsonLd from "@/components/Seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import AllArticles from "@/components/BlogPage/AllArticles";
import BlogHero from "@/components/BlogPage/BlogHero";
import BlogNewsletter from "@/components/BlogPage/BlogNewsletter";
import { BlogSearchProvider } from "@/components/BlogPage/BlogSearch";
import FeaturedArticle from "@/components/BlogPage/FeaturedArticle";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = pageMetadata({
  title: "Blog: Dynamics 365, ERP, Power BI & AI Insights",
  description:
    "Practical guides on Microsoft Dynamics 365, Odoo ERP, Power BI, software development and agentic AI, written by Techvation consultants.",
  path: "/blog",
});

/**
 * The Blog page ("07 · Blogs" in Figma). Articles live in /data/blog.ts.
 * The navbar, footer and pop-ups come from app/layout.tsx.
 */
export default function BlogPage() {
  const featured = blogPosts.find((post) => post.featured);

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Blog", path: "/blog" }])} />
      {/* The search bar in the hero filters the article grid below it. */}
      <BlogSearchProvider>
        <BlogHero />
        {featured && <FeaturedArticle post={featured} />}
        <AllArticles />
      </BlogSearchProvider>
      <BlogNewsletter />
    </main>
  );
}
