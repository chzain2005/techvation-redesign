"use client"; // The carousel reacts to clicks and scrolling, so it runs in the browser.

import { useRef, useState } from "react";
import Icon from "@/components/Icon/Icon";
import { services, type Service } from "@/data/homepage";
import { cn } from "@/lib/cn";
import ServiceCard from "./ServiceCard";

/** On desktop one "dot" stands for three cards (three cards are visible). */
const CARDS_PER_PAGE = 3;

/**
 * A horizontally scrolling row of service cards.
 *
 * The row is a normal scrollable element, so it works with touch, trackpad
 * and keyboard. The arrows and dots simply scroll it to a given card, and a
 * scroll listener keeps the dots and the counter in sync.
 *
 * The controls differ per screen size, following the Figma frames:
 * - Phones and tablets: one small dot per card on the left, two arrow
 *   buttons on the right, all under the cards.
 * - Desktop (xl and up): large arrows on the left and right edges of the
 *   row, four page dots and a counter ("01 / 12 services") underneath.
 */
export default function ServicesCarousel({ items }: { items: Service[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Index of the first visible card (0 = first card).
  const [index, setIndex] = useState(0);

  const total = items.length;
  const pageCount = Math.ceil(total / CARDS_PER_PAGE);
  const activePage = Math.floor(index / CARDS_PER_PAGE);
  const isAtStart = index === 0;
  const isAtEnd = index === total - 1;

  /** Distance between the start of one card and the start of the next. */
  function getStep(track: HTMLDivElement) {
    const [first, second] = Array.from(track.children) as HTMLElement[];
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  }

  /** Scroll so that the card at `target` is the first visible one. */
  function scrollToCard(target: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(target, total - 1));
    track.scrollTo({ left: clamped * getStep(track), behavior: "smooth" });
  }

  /**
   * Move one card back (-1) or forward (+1), for the arrow buttons.
   *
   * It starts from where the row REALLY is, not from the counter. At the very
   * end the counter says "12" although the row cannot scroll that far (the
   * last cards can never reach the left edge), so counting back from 12 would
   * ask for a position the row is already at, and nothing would move.
   */
  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    // The card nearest to the left edge right now.
    const current = Math.round(track.scrollLeft / getStep(track));
    scrollToCard(current + direction);
  }

  /** Runs while the row scrolls: work out which card is first. */
  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    // At the very end we count the last card, even if it cannot reach the left edge.
    setIndex(atEnd ? total - 1 : Math.round(track.scrollLeft / getStep(track)));
  }

  return (
    <div className="relative">
      {/* Scrolling row of cards. Padding leaves room for the card shadows. */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory scroll-px-5 items-start gap-3.5 overflow-x-auto page-x pt-2.5 pb-5 scrollbar-none md:scroll-px-10 xl:scroll-px-gutter xl:items-stretch xl:gap-6 xl:pt-5 xl:pb-8.5"
      >
        {items.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>

      {/* ---------- Phones and tablets: dots + small arrows ---------- */}
      <div className="flex items-center justify-between page-x pb-2 xl:hidden">
        {/* One dot per card. They are indicators only, so they are not buttons. */}
        <div aria-hidden className="flex items-center gap-1.25">
          {items.map((service, i) => (
            <span
              key={service.title}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-4.5 bg-brand" : "w-1.5 bg-dot",
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous service"
            onClick={() => scrollByCard(-1)}
            disabled={isAtStart}
            className="cursor-pointer rounded-full border border-primary/35 bg-white p-2.75 transition-opacity disabled:cursor-default disabled:opacity-50"
          >
            <Icon src="/assets/icons/arrow-left-brand-20.svg" size={16} scale />
          </button>
          <button
            type="button"
            aria-label="Next service"
            onClick={() => scrollByCard(1)}
            disabled={isAtEnd}
            className="cursor-pointer rounded-full bg-brand p-2.75 transition-opacity disabled:cursor-default disabled:opacity-50"
          >
            <Icon src="/assets/icons/arrow-right-white-16.svg" size={16} />
          </button>
        </div>
      </div>

      {/* ---------- Desktop: large arrows centred on the page gutter ---------- */}
      <button
        type="button"
        aria-label="Previous service"
        onClick={() => scrollByCard(-1)}
        disabled={isAtStart}
        className="absolute top-51.5 left-gutter hidden -translate-x-1/2 cursor-pointer rounded-full border border-primary/35 bg-white p-4 shadow-arrow transition-opacity disabled:cursor-default disabled:opacity-50 xl:block"
      >
        <Icon src="/assets/icons/arrow-left-brand-20.svg" size={20} scale />
      </button>
      <button
        type="button"
        aria-label="Next service"
        onClick={() => scrollByCard(1)}
        disabled={isAtEnd}
        className="absolute top-51.5 right-gutter hidden translate-x-1/2 cursor-pointer rounded-full bg-brand p-4 shadow-arrow transition-opacity disabled:cursor-default disabled:opacity-50 xl:block"
      >
        <Icon src="/assets/icons/arrow-right-white-20.svg" size={20} />
      </button>

      {/* ---------- Desktop: page dots on the left, counter on the right ---------- */}
      <div className="hidden items-center justify-between page-x pb-4.5 xl:flex">
        <div className="flex items-center gap-2">
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              key={page}
              type="button"
              aria-label={`Go to services page ${page + 1}`}
              aria-current={page === activePage}
              onClick={() => scrollToCard(page * CARDS_PER_PAGE)}
              className={cn(
                "h-2.5 cursor-pointer rounded-full transition-all",
                // The active dot is a wider gradient pill.
                page === activePage ? "w-8 bg-brand" : "w-2.5 bg-dot",
              )}
            />
          ))}
        </div>
        <p className="text-label font-semibold text-body">
          {String(index + 1).padStart(2, "0")} / {total} {services.counterSuffix}
        </p>
      </div>
    </div>
  );
}
