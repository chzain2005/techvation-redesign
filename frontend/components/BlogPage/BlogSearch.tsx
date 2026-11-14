"use client"; // Holds what the visitor typed in the search bar.

import { createContext, useContext, useState, type ReactNode } from "react";
import HeroSearchBar from "@/components/HeroSearch/HeroSearchBar";
import { blogPage } from "@/data/blog";

type BlogSearch = { query: string; setQuery: (query: string) => void };

const BlogSearchContext = createContext<BlogSearch>({ query: "", setQuery: () => {} });

/** The search text, shared by the hero's search bar and the article list. */
export function useBlogSearch() {
  return useContext(BlogSearchContext);
}

/** Wraps the Blog page so the search bar and the article list share the search. */
export function BlogSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  return <BlogSearchContext.Provider value={{ query, setQuery }}>{children}</BlogSearchContext.Provider>;
}

/** The search pill in the Blog hero; "Search" also scrolls to the articles. */
export function BlogSearchBar() {
  const { search } = blogPage.hero;
  const { query, setQuery } = useBlogSearch();

  return (
    <HeroSearchBar
      value={query}
      onChange={setQuery}
      onSubmit={() =>
        document.getElementById("all-articles")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      label={search.label}
      placeholder={search.placeholder}
      submitLabel={search.submitLabel}
      className="max-w-140"
    />
  );
}
