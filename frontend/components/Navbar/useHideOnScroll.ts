"use client";

import { useEffect, useState } from "react";

/** How long scrolling must pause before the navbar comes back (ms). */
const STOP_DELAY = 250;
/** Never hide the navbar this close to the top of the page (px). */
const HIDE_AFTER = 120;

/**
 * Tracks the page scroll for the navbar:
 *   - `isScrolled`: the page is no longer at the very top
 *   - `isHidden`:   the visitor is scrolling down, so the navbar slides away.
 *                   It comes back as soon as they scroll up or stop scrolling.
 */
export function useHideOnScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let stopTimer: ReturnType<typeof setTimeout> | undefined;

    function handleScroll() {
      const y = window.scrollY;
      setIsScrolled(y > 10);
      if (y > lastY && y > HIDE_AFTER) setIsHidden(true);
      else if (y < lastY) setIsHidden(false);
      lastY = y;

      // Show it again once the scrolling stops.
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => setIsHidden(false), STOP_DELAY);
    }

    // A page can open part-way down (e.g. a "#section" link), so read the
    // starting position once, a moment after mounting.
    const startTimer = setTimeout(() => setIsScrolled(window.scrollY > 10), 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, []);

  return { isScrolled, isHidden };
}
