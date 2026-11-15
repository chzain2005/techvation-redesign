"use client"; // Category, sort, search and page change what is shown.

import { useState } from "react";
import Glyph from "@/components/Icon/Glyph";
import { blogPage, type BlogCategory, type BlogPost } from "@/data/blog";
import { cn } from "@/lib/cn";
import ArticleCard from "./ArticleCard";
import { useBlogSearch } from "./BlogSearch";

/** Lower-case text without accents, so "ERP" finds "erp". */
const normalise = (text: string) => text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

/**
 * "All articles": category chips, a Newest/Oldest sort, the grid of
 * articles and the page buttons.
 *
 * - Phones: chips scroll sideways, one card per row.
 * - Tablets: two cards per row. Desktop: three.
 *
 * The featured article has its own card above, so it is left out here
 * unless the visitor is searching or filtering.
 */
export default function AllArticles({ posts: allPosts, categories }: { posts: BlogPost[]; categories: BlogCategory[] }) {
  const { query, setQuery } = useBlogSearch();
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);

  const words = normalise(query).split(/\s+/).filter(Boolean);
  const isFiltering = words.length > 0 || category !== null;

  const posts = allPosts
    .filter((post) => isFiltering || !post.featured)
    .filter((post) => !category || post.category === category)
    .filter((post) => {
      const text = normalise(`${post.title} ${post.excerpt} ${post.category}`);
      return words.every((word) => text.includes(word));
    })
    .sort((a, b) => (sort === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));

  const pageCount = Math.max(1, Math.ceil(posts.length / blogPage.pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = posts.slice((currentPage - 1) * blogPage.pageSize, currentPage * blogPage.pageSize);

  /** Changing a filter starts again from page 1. */
  function pick(next: BlogCategory | null) {
    setCategory(next);
    setPage(1);
  }

  function goTo(next: number) {
    setPage(next);
    document.getElementById("all-articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const chips: Array<{ label: string; value: BlogCategory | null }> = [
    { label: blogPage.allLabel, value: null },
    ...categories.map((value) => ({ label: value, value })),
  ];

  const pageButton =
    "grid size-11 cursor-pointer place-items-center rounded-xl text-label font-semibold transition-colors disabled:cursor-default disabled:opacity-40";

  return (
    <section id="all-articles" aria-label="All articles" className="scroll-mt-navbar bg-white">
      <div className="mx-auto flex w-full max-w-page flex-col gap-8 page-x section-y xl:gap-12">
        {/* Chips and sort */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Category" className="scrollbar-none -mx-5 flex gap-2.5 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
            {chips.map((chip) => {
              const isCurrent = chip.value === category;
              return (
                <button
                  key={chip.label}
                  type="button"
                  aria-pressed={isCurrent}
                  onClick={() => pick(chip.value)}
                  className={cn(
                    "shrink-0 cursor-pointer rounded-full border px-4 py-2.25 text-label font-semibold whitespace-nowrap transition-colors duration-200",
                    isCurrent
                      ? "border-transparent bg-brand text-white"
                      : "border-border bg-surface text-primary-dark hover:border-primary/40",
                  )}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
          <label className="flex shrink-0 items-center gap-1 self-end text-label font-semibold text-heading md:self-auto">
            {blogPage.sort.label}:
            <span className="relative">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as "newest" | "oldest")}
                className="cursor-pointer appearance-none bg-transparent py-1 pr-6 pl-1 font-semibold text-heading outline-none"
              >
                <option value="newest">{blogPage.sort.newest}</option>
                <option value="oldest">{blogPage.sort.oldest}</option>
              </select>
              <Glyph name="chevron-down" size={16} className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2" />
            </span>
          </label>
        </div>

        {words.length > 0 && (
          <p aria-live="polite" className="-mt-2 flex flex-wrap items-center gap-3 text-small text-body">
            {blogPage.hero.search.resultLabel(posts.length, query.trim())}
            <button
              type="button"
              onClick={() => setQuery("")}
              className="cursor-pointer font-semibold text-primary underline-offset-4 hover:underline"
            >
              {blogPage.hero.search.clearLabel}
            </button>
          </p>
        )}

        {/* Grid */}
        {visible.length ? (
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((post) => (
              <li key={post.slug}>
                <ArticleCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-reason border border-dashed border-primary/30 bg-surface p-8 text-center text-body-base text-body">
            {blogPage.emptyText}
          </p>
        )}

        {/* Page buttons (only when there is more than one page) */}
        {pageCount > 1 && (
          <nav aria-label="Pages" className="flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => goTo(currentPage - 1)}
              className={cn(pageButton, "border border-border bg-white text-heading hover:bg-surface")}
            >
              ‹
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                type="button"
                aria-current={number === currentPage ? "page" : undefined}
                onClick={() => goTo(number)}
                className={cn(
                  pageButton,
                  number === currentPage
                    ? "bg-brand text-white"
                    : "border border-border bg-white text-heading hover:bg-surface",
                )}
              >
                {number}
              </button>
            ))}
            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage === pageCount}
              onClick={() => goTo(currentPage + 1)}
              className={cn(pageButton, "border border-border bg-white text-heading hover:bg-surface")}
            >
              ›
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
