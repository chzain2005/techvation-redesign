"use client"; // Watches the scroll position and animates in the browser.

import { useEffect, useRef, useState } from "react";

/** How long the count takes, in milliseconds. */
const DURATION = 1600;

/** Starts fast and slows down towards the end. */
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Shows a figure such as "50+" and counts it up from 0 every time it scrolls
 * into view (also right after the page loads, if it is already visible).
 * When it leaves the screen it resets, so it counts again next time.
 *
 * The text around the number stays as it is: "50+" counts 0+ → 50+,
 * "99.9%" is not a whole number, so it is shown as-is without counting.
 *
 * Screen readers always hear the final value, and people who ask for
 * reduced motion see the final value straight away.
 */
export default function CountUp({ value }: { value: string }) {
  // Split "50+" into "", 50 and "+".
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const target = match ? Number(match[2]) : 0;

  // Start on the final value, so the page shows correct figures before
  // JavaScript runs (and for search engines).
  const [current, setCurrent] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!match || !element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    function run() {
      cancelAnimationFrame(frame);
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / DURATION, 1);
        setCurrent(Math.round(easeOutCubic(progress) * target));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
        } else {
          // Off screen: back to 0, ready to count again.
          cancelAnimationFrame(frame);
          setCurrent(0);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // `match` is derived from `value`, so `value` and `target` cover it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, target]);

  if (!match) return <>{value}</>;

  return (
    <span ref={ref} aria-label={value}>
      {/* "tabular-nums" gives every digit the same width, so the figure does not wobble while counting. */}
      <span aria-hidden className="tabular-nums">
        {match[1]}
        {current}
        {match[3]}
      </span>
    </span>
  );
}
