"use client"; // Holds what the visitor typed in the search bar.

import { createContext, useContext, useState, type ReactNode } from "react";
import HeroSearchBar from "@/components/HeroSearch/HeroSearchBar";
import { faqPage } from "@/data/faqs";

type FaqSearch = { query: string; setQuery: (query: string) => void };

const FaqSearchContext = createContext<FaqSearch>({ query: "", setQuery: () => {} });

/** The search text, shared by the hero's search bar and the question list. */
export function useFaqSearch() {
  return useContext(FaqSearchContext);
}

/** Wraps the FAQ page so the search bar and the question list share the search. */
export function FaqSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  return <FaqSearchContext.Provider value={{ query, setQuery }}>{children}</FaqSearchContext.Provider>;
}

/**
 * The search pill in the FAQ hero. Typing filters the questions straight
 * away; "Search" (or Enter) also scrolls down to the results.
 */
export function FaqSearchBar() {
  const { search } = faqPage.hero;
  const { query, setQuery } = useFaqSearch();

  return (
    <HeroSearchBar
      value={query}
      onChange={setQuery}
      onSubmit={() =>
        document.getElementById("faq-results")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      label={search.label}
      placeholder={search.placeholder}
      submitLabel={search.submitLabel}
      className="max-w-155"
    />
  );
}
