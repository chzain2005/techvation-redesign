"use client"; // Watches the scroll position.

import { useEffect, useState } from "react";
import Glyph from "@/components/Icon/Glyph";
import { scrollToTop } from "@/components/HomeLink/HomeLink";
import { cn } from "@/lib/cn";

/** How far (in pixels) the visitor must scroll before the button appears. */
const SHOW_AFTER = 600;

/**
 * A round gradient arrow in the bottom-right corner that takes the visitor
 * back to the top of the current page. It fades in once they have scrolled
 * down a bit and fades out again near the top.
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const update = () => setIsVisible(window.scrollY > SHOW_AFTER);
    // Check once right after mounting too, for pages that open part-way down.
    const startTimer = setTimeout(update, 0);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      clearTimeout(startTimer);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      // Hidden from the keyboard and screen readers while it is invisible.
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={cn(
        "group fixed right-4 bottom-4 z-30 grid size-12 cursor-pointer place-items-center rounded-full bg-brand text-white shadow-brand-md transition duration-300 hover:-translate-y-1 hover:shadow-brand-lg md:right-6 md:bottom-6 md:size-13",
        isVisible ? "visible translate-y-0 opacity-100" : "invisible translate-y-4 opacity-0",
      )}
    >
      <Glyph
        name="arrow-right"
        size={20}
        className="-rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
