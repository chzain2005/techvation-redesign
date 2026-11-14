"use client"; // Search, open/close and the highlighted category react to the visitor.

import { useEffect, useId, useState } from "react";
import ActionButton from "@/components/Button/ActionButton";
import Glyph from "@/components/Icon/Glyph";
import { cta } from "@/data/homepage";
import { faqPage, type FaqCategory } from "@/data/faqs";
import { cn } from "@/lib/cn";
import { useFaqSearch } from "./FaqSearch";

/** Lower-case text without accents, so "ERP" finds "erp". */
const normalise = (text: string) => text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

/**
 * The categories and questions that match the search (all of them when it
 * is empty). Questions containing every word come first choice; if there
 * are none, questions containing any of the words are shown instead, so
 * "ERP cost" still finds the cost and ERP questions.
 */
function filterCategories(query: string): FaqCategory[] {
  const words = normalise(query).split(/\s+/).filter(Boolean);
  if (!words.length) return faqPage.categories;

  const search = (matches: (text: string) => boolean) =>
    faqPage.categories
      .map((category) => ({
        ...category,
        questions: category.questions.filter((item) =>
          matches(normalise(`${item.question} ${item.answer} ${category.name}`)),
        ),
      }))
      .filter((category) => category.questions.length > 0);

  const strict = search((text) => words.every((word) => text.includes(word)));
  if (strict.length) return strict;
  // Ignore tiny words ("a", "of") in the looser search.
  const keywords = words.filter((word) => word.length > 2);
  return keywords.length ? search((text) => keywords.some((word) => text.includes(word))) : [];
}

/** One question with its answer, opening and closing on click. */
function FaqItem({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const answerId = useId();

  return (
    <li
      className={cn(
        "rounded-float border transition-colors duration-200",
        isOpen ? "border-primary/35 bg-surface" : "border-border bg-white hover:border-primary/25",
      )}
    >
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full cursor-pointer items-center gap-4 px-4 py-4 text-left font-heading text-label font-semibold text-heading md:px-6 md:py-5.5 md:text-subtitle"
        >
          <span className="flex-1">{question}</span>
          <span
            className={cn(
              "shrink-0 rounded-full p-1.5 transition-colors duration-200",
              isOpen ? "bg-brand text-white" : "bg-surface text-primary",
            )}
          >
            <Glyph name={isOpen ? "minus" : "plus"} size={16} />
          </span>
        </button>
      </h3>
      {/* The answer unfolds by animating its grid row from 0 to its natural height. */}
      <div
        id={answerId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-small text-body md:px-6 md:pb-5.5 md:text-body-base">{answer}</p>
        </div>
      </div>
    </li>
  );
}

/**
 * The main part of the FAQ page: the category list on the left and the
 * questions, grouped by category, on the right.
 *
 * - Phones and tablets: the categories become a row of chips that scrolls
 *   sideways, above the questions. The "Can't find an answer?" card moves
 *   below the questions.
 * - Desktop (xl and up): the category column sticks while you scroll and
 *   highlights the group you are reading.
 *
 * The first question of each group starts open, as in the design. While
 * searching, every matching question is open.
 */
export default function FaqBody() {
  const { sidebar, hero, countLabel } = faqPage;
  const { query, setQuery } = useFaqSearch();
  const categories = filterCategories(query);
  const isSearching = query.trim().length > 0;
  const total = categories.reduce((sum, category) => sum + category.questions.length, 0);
  const [current, setCurrent] = useState(faqPage.categories[0].id);

  // Highlight the category whose group is in the upper part of the screen.
  useEffect(() => {
    const groups = categories
      .map((category) => document.getElementById(`faq-${category.id}`))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setCurrent(visible[0].target.id.replace("faq-", ""));
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    groups.forEach((group) => observer.observe(group));
    return () => observer.disconnect();
    // Re-attach whenever the visible groups change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const helpCard = (
    <div className="flex flex-col items-start gap-3 rounded-reason bg-linear-145 from-ink-soft to-ink-violet p-6">
      <Glyph name="message" size={26} className="text-accent" />
      <p className="font-heading text-subtitle font-semibold text-white">{sidebar.help.title}</p>
      <p className="text-small text-on-dark">{sidebar.help.text}</p>
      <ActionButton href={cta.freeConsultation.href}>{sidebar.help.actionLabel}</ActionButton>
    </div>
  );

  return (
    <section id="faq-results" className="scroll-mt-navbar bg-white">
      <div className="mx-auto flex w-full max-w-page flex-col gap-8 page-x section-y xl:flex-row xl:items-start xl:gap-20">
        {/* ---------------------------- Categories ---------------------------- */}
        <nav aria-label="FAQ categories" className="flex flex-col gap-2 transition-[top] duration-300 ease-out xl:sticky xl:top-[calc(var(--nav-offset)+2rem)] xl:w-70 xl:shrink-0">
          <p className="text-label-sm font-semibold tracking-[1.5px] text-subtle uppercase max-xl:sr-only">
            {sidebar.title}
          </p>
          <ul className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 md:-mx-10 md:px-10 xl:mx-0 xl:mt-2 xl:flex-col xl:overflow-visible xl:px-0">
            {faqPage.categories.map((category) => {
              const shown = categories.find((item) => item.id === category.id);
              const isCurrent = category.id === current && Boolean(shown);
              return (
                <li key={category.id} className="shrink-0">
                  <a
                    href={`#faq-${category.id}`}
                    aria-current={isCurrent ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-chip px-3.5 py-3 text-label font-semibold whitespace-nowrap transition-colors duration-200 max-xl:border",
                      isCurrent
                        ? "bg-brand text-white max-xl:border-transparent"
                        : "bg-white text-heading hover:bg-surface max-xl:border-border",
                      !shown && "pointer-events-none opacity-40",
                    )}
                  >
                    <Glyph name={category.icon} size={18} className={isCurrent ? "text-white" : "text-primary"} />
                    <span className="xl:flex-1">{category.name}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-caption font-medium",
                        isCurrent ? "bg-white/20 text-white" : "bg-surface text-body",
                      )}
                    >
                      {shown?.questions.length ?? 0}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 max-xl:hidden">{helpCard}</div>
        </nav>

        {/* ----------------------------- Questions ----------------------------- */}
        <div className="flex min-w-0 flex-1 flex-col gap-10 xl:gap-14">
          {isSearching && (
            <div aria-live="polite" className="flex flex-wrap items-center gap-3 text-small text-body">
              <span>{hero.search.resultLabel(total, query.trim())}</span>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="cursor-pointer font-semibold text-primary underline-offset-4 hover:underline"
              >
                {hero.search.clearLabel}
              </button>
            </div>
          )}

          {categories.length === 0 && (
            <p className="rounded-reason border border-dashed border-primary/30 bg-surface p-8 text-center text-body-base text-body">
              {hero.search.emptyText}
            </p>
          )}

          {categories.map((category) => (
            <div key={category.id} id={`faq-${category.id}`} className="flex scroll-mt-8 flex-col gap-3.5">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-heading text-popup-title-sm font-semibold text-heading md:text-popup-title-lg">
                  {category.name}
                </h2>
                <span className="rounded-full bg-surface-tint px-2.5 py-1 text-caption font-medium text-primary">
                  {countLabel(category.questions.length)}
                </span>
              </div>
              {/* "key" restarts the open/closed state when the search changes. */}
              <ul key={query} className="flex flex-col gap-3.5">
                {category.questions.map((item, i) => (
                  <FaqItem
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                    defaultOpen={isSearching || i === 0}
                  />
                ))}
              </ul>
            </div>
          ))}

          <div className="xl:hidden">{helpCard}</div>
        </div>
      </div>
    </section>
  );
}
