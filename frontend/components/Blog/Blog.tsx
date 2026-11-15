"use client"; // The category filter uses React state.

import { useState } from "react";
import Button from "@/components/Button/Button";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import type { blog as blogContent, BlogPost } from "@/data/homepage";
import { cn } from "@/lib/cn";
import FeaturedPost from "./FeaturedPost";
import PostCard from "./PostCard";

/**
 * "Insights & news" section. The chips filter the list of latest articles
 * by category.
 *
 * - Phones and tablets: heading, chips, featured article, the list, and a
 *   full-width "View all articles" button at the bottom.
 * - Desktop (xl and up): chips and the button sit in the header row, with
 *   the featured article on the left and the list on the right.
 */
/** The section's text and posts, as getHomepage() returns them. */
type BlogSection = Omit<typeof blogContent, "featured" | "posts" | "categories"> & {
  categories: string[];
  featured?: (typeof blogContent)["featured"];
  posts: BlogPost[];
};

export default function Blog({ blog }: { blog: BlogSection }) {
  // null means "All" (no filter).
  const [category, setCategory] = useState<string | null>(null);

  const posts = category
    ? blog.posts.filter((post) => post.category === category)
    : blog.posts;

  // "All" first, then the categories from the data file.
  const filters = [
    { label: blog.allLabel, value: null },
    ...blog.categories.map((name) => ({ label: name, value: name as string | null })),
  ];

  return (
    <section id="insights" className="scroll-mt-navbar bg-surface">
      <div className="mx-auto flex w-full max-w-page flex-col section-gap page-x section-y">
        <SectionHeader eyebrow={blog.eyebrow} heading={blog.heading}>
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter chips */}
            {filters.map((filter) => {
              const isActive = filter.value === category;
              return (
                <button
                  key={filter.label}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setCategory(filter.value)}
                  className={cn(
                    "cursor-pointer rounded-full border px-3.5 py-2 text-label-sm font-semibold transition-colors",
                    isActive
                      ? "border-transparent bg-brand bg-origin-border text-white"
                      : "border-border bg-white text-primary-dark hover:border-primary",
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
            {/* "View all articles" in the header (desktop only) */}
            <div className="hidden xl:block">
              <Button href={blog.viewAll.href} variant="outlineDark">
                {blog.viewAll.label}
              </Button>
            </div>
          </div>
        </SectionHeader>

        <div className="flex flex-col gap-3.5 xl:flex-row xl:gap-6">
          {blog.featured && <FeaturedPost featured={blog.featured} />}

          {/* Latest articles (filtered) */}
          <div className="flex min-w-0 flex-1 flex-col gap-3 xl:gap-4">
            {posts.map((post) => (
              <PostCard key={post.title} post={post} />
            ))}
            {posts.length === 0 && (
              <p className="rounded-post border border-border bg-white p-6 text-small text-body">
                {blog.emptyMessage}
              </p>
            )}
          </div>
        </div>

        {/* "View all articles" as a full-width button (phones and tablets) */}
        <div className="xl:hidden">
          <Button href={blog.viewAll.href} variant="outlineDark" className="w-full">
            {blog.viewAll.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
