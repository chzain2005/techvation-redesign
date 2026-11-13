"use client"; // The dots follow the scroll position, which needs React state.

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Icon from "@/components/Icon/Icon";
import { industries } from "@/data/homepage";
import { cn } from "@/lib/cn";

/**
 * Phones and tablets: the industries as a row of photo cards that you swipe
 * sideways ("Industry cards (swipe)" in Figma). The dots underneath show
 * which card is first in view.
 *
 * On desktop this is replaced by the expanding panels (IndustryPanels.tsx).
 *
 * Each card is a link to the industry page.
 */
export default function IndustrySwiper() {
  const trackRef = useRef<HTMLUListElement>(null);
  // Index of the first visible card.
  const [index, setIndex] = useState(0);
  const total = industries.items.length;

  /** Runs while the row scrolls: work out which card is first. */
  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const [first, second] = Array.from(track.children) as HTMLElement[];
    // Distance from the start of one card to the start of the next.
    const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    setIndex(atEnd ? total - 1 : Math.round(track.scrollLeft / step));
  }

  return (
    <div className="flex w-full flex-col section-gap xl:hidden">
      {/* Scrolling row. It starts at the page padding and runs off the right edge. */}
      <ul
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory scroll-px-5 gap-3.5 overflow-x-auto page-x scrollbar-none md:scroll-px-10"
      >
        {industries.items.map((industry) => (
          // Card: 270 x 360 on phones, 300 x 380 on tablets.
          <li key={industry.name} className="shrink-0 snap-start">
            <Link
              href={industry.href}
              className="relative isolate flex h-90 w-67.5 flex-col items-start justify-end gap-2.5 overflow-hidden rounded-post p-5 md:h-95 md:w-75"
            >
              {/* Photo + dark fade so the white text stays readable */}
              <Image
                src={industry.image}
                alt=""
                fill
                sizes="300px"
                className="-z-10 object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink/5 to-ink/95" />

              <span className="rounded-cell bg-white/14 p-2">
                <Icon src={industry.iconCard} size={18} />
              </span>
              <h3 className="font-heading text-title font-semibold text-white">
                {industry.name}
              </h3>
              <p className="text-small text-white/85">{industry.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Dots: the active one is a wider gradient pill */}
      <div aria-hidden className="flex gap-1.5 page-x">
        {industries.items.map((industry, i) => (
          <span
            key={industry.name}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index ? "w-6 bg-brand" : "w-2 bg-white/25",
            )}
          />
        ))}
      </div>
    </div>
  );
}
