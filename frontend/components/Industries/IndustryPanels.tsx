"use client"; // The panels expand on hover/click, which needs React state.

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon/Icon";
import type { Industry } from "@/data/homepage";
import { cn } from "@/lib/cn";

/**
 * Desktop only (xl and up): eight photo panels side by side where only one
 * is open at a time. Closed panels are narrow strips with a vertical name;
 * the open one grows to fill the remaining width.
 *
 * Hovering, clicking or focusing a closed panel opens it.
 *
 * On phones and tablets this is replaced by swipe cards (IndustrySwiper.tsx).
 */
export default function IndustryPanels({ items }: { items: Industry[] }) {
  // Index of the open panel. The first one is open to start with.
  const [activeIndex, setActiveIndex] = useState(0);
  const total = items.length;

  return (
    <div className="hidden h-135 w-full gap-3 xl:flex">
      {items.map((industry, i) => {
        const isActive = i === activeIndex;
        const number = String(i + 1).padStart(2, "0");

        return (
          <div
            key={industry.name}
            onMouseEnter={() => setActiveIndex(i)}
            className={cn(
              // Every panel starts 92px wide; the open one takes all spare width.
              "relative h-full basis-23 overflow-hidden rounded-card transition-[flex-grow] duration-500",
              isActive ? "grow" : "grow-0",
            )}
          >
            {/* Background photo */}
            <Image
              src={industry.image}
              alt=""
              fill
              sizes="552px"
              className="object-cover"
            />
            {/* Dark overlay: lighter at the top when the panel is open */}
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-b transition-colors duration-500",
                isActive ? "from-ink/5 to-ink/95" : "from-ink/60 to-ink-soft/92",
              )}
            />

            {/* CLOSED state: icon, vertical name and number. It is a button so
                it can be opened with the keyboard too. */}
            <button
              type="button"
              aria-expanded={isActive}
              aria-label={`Show ${industry.name}`}
              tabIndex={isActive ? -1 : 0}
              onClick={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              className={cn(
                "absolute inset-0 flex cursor-pointer flex-col items-center pt-6 pb-5.75 transition-opacity duration-300",
                isActive && "pointer-events-none opacity-0",
              )}
            >
              <span className="rounded-xl border border-white/20 bg-white/12 p-2.5">
                <Icon src={industry.iconLarge} size={20} />
              </span>
              {/* The name is turned to read from bottom to top. */}
              <span className="mt-auto rotate-180 font-heading text-subtitle font-semibold whitespace-nowrap text-white writing-vertical">
                {industry.name}
              </span>
              <span className="mt-7.5 text-caption font-medium text-accent">
                {number}
              </span>
            </button>

            {/* OPEN state: tag, title, description, tags and a link */}
            <div
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 flex flex-col items-start justify-end gap-3.5 p-8 transition-opacity duration-300",
                // Fade in a little later, once the panel has grown.
                isActive ? "opacity-100 delay-300" : "pointer-events-none opacity-0",
              )}
            >
              <p className="flex items-center gap-2 rounded-full border border-white/25 bg-white/14 px-3 py-1.5 text-caption font-medium text-white">
                <Icon src={industry.iconSmall} size={16} />
                {number} / {String(total).padStart(2, "0")}
              </p>
              <h3 className="font-heading text-h3 font-bold text-white">
                {industry.name}
              </h3>
              <p className="max-w-120 text-body-lg text-white/85">
                {industry.description}
              </p>
              <ul className="flex flex-wrap gap-2">
                {industry.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-caption font-medium text-white"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <Link
                href={industry.href}
                // Closed panels must not be reachable with the Tab key.
                tabIndex={isActive ? 0 : -1}
                className="flex items-center gap-2 rounded-full bg-white px-4.5 py-3 text-label font-semibold text-primary-dark transition-opacity hover:opacity-90"
              >
                {industry.exploreLabel}
                <Icon src="/assets/icons/arrow-right-dark-16.svg" size={16} />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
