"use client"; // Watches the scroll position to highlight the current group.

import { useEffect, useState } from "react";
import Glyph, { type GlyphName } from "@/components/Icon/Glyph";
import { serviceCategories, servicesPage } from "@/data/services";
import { cn } from "@/lib/cn";

/** The id of the first group; "All services" jumps to it. */
const ALL = "all-services";

const tabs: Array<{ anchor: string; label: string; icon: GlyphName }> = [
  { anchor: ALL, label: servicesPage.allTab, icon: "sparkles" },
  ...serviceCategories.map((category) => ({
    anchor: category.anchor,
    label: category.name,
    icon: category.icon,
  })),
];

/**
 * The row of practice-area tabs under the hero ("Category bar" in Figma).
 * It sticks to the top of the screen while you scroll through the groups,
 * and the tab of the group you are reading is highlighted. On small
 * screens the row scrolls sideways.
 */
export default function CategoryBar() {
  const [current, setCurrent] = useState(ALL);

  useEffect(() => {
    const groups = serviceCategories
      .map((category) => document.getElementById(category.anchor))
      .filter((element): element is HTMLElement => Boolean(element));

    // A group counts as "current" once it crosses the upper part of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    groups.forEach((group) => observer.observe(group));

    // Above the first group, "All services" is highlighted.
    function handleScroll() {
      if (groups[0] && groups[0].getBoundingClientRect().top > window.innerHeight * 0.3) {
        setCurrent(ALL);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Practice areas"
      // Sticks just below the navbar, and moves up when the navbar slides away.
      className="sticky top-(--nav-offset) z-10 border-b border-border bg-white/92 backdrop-blur-md transition-[top] duration-300 ease-out"
    >
      <ul className="scrollbar-none mx-auto flex w-full max-w-page gap-2.5 overflow-x-auto page-x py-6">
        {tabs.map((tab) => {
          const isCurrent = tab.anchor === current;
          return (
            <li key={tab.anchor} className="shrink-0">
              <a
                href={`#${tab.anchor === ALL ? serviceCategories[0].anchor : tab.anchor}`}
                aria-current={isCurrent ? "true" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2.5 text-label font-semibold whitespace-nowrap transition-colors duration-200",
                  isCurrent
                    ? "border-transparent bg-brand text-white"
                    : "border-border bg-white text-heading hover:border-primary/40 hover:text-primary",
                )}
              >
                <Glyph name={tab.icon} size={15} className={isCurrent ? "text-white" : "text-primary"} />
                {tab.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
