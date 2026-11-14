import type { Metadata } from "next";
import AllArticles from "@/components/BlogPage/AllArticles";
import BlogHero from "@/components/BlogPage/BlogHero";
import BlogNewsletter from "@/components/BlogPage/BlogNewsletter";
import { BlogSearchProvider } from "@/components/BlogPage/BlogSearch";
import FeaturedArticle from "@/components/BlogPage/FeaturedArticle";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog | Techvation",
  description:
    "Practical articles on Dynamics 365, ERP, Power BI, development and AI, written by Techvation consultants.",
};

/**
 * The Blog page ("07 · Blogs" in Figma). Articles live in /data/blog.ts.
 * The navbar, footer and pop-ups come from app/layout.tsx.
 */
export default function BlogPage() {
  const featured = blogPosts.find((post) => post.featured);

  return (
    <main>
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
