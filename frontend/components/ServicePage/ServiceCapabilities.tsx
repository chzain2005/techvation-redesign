"use client"; // Phones can unfold the full list with a button.

import { useState } from "react";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Glyph from "@/components/Icon/Glyph";
import { serviceDetailPage, type ServiceDetail } from "@/data/services";
import { cn } from "@/lib/cn";
import DiscussLink from "./DiscussLink";

/**
 * "What we deliver": the six things this service covers.
 *
 * - Phones: compact rows (icon, title, short text). Only the first four
 *   show, with a "View all 6 capabilities" button for the rest.
 * - Tablets: two columns of full cards. Desktop: three columns.
 */
export default function ServiceCapabilities({
  capabilities,
}: {
  capabilities: ServiceDetail["capabilities"];
}) {
  const labels = serviceDetailPage.capabilities;
  const [showAll, setShowAll] = useState(false);
  const hasMore = capabilities.items.length > labels.compactCount;

  return (
    <section className="bg-surface">
      <div className="mx-auto flex w-full max-w-page flex-col gap-6 page-x section-y md:gap-8 xl:gap-12">
        <div className="flex flex-col items-start gap-4">
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h2 className="font-heading text-h2-sm font-bold text-heading md:text-h2-md xl:max-w-180 xl:text-h2">
            {capabilities.heading.lead}
            <span className="text-gradient-brand">{capabilities.heading.highlight}</span>
          </h2>
        </div>

        <ul id="capability-list" className="grid gap-3 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {capabilities.items.map((item, i) => (
            <li
              key={item.title}
              // On phones, cards after the first four wait for the button.
              className={cn(
                "flex items-center gap-3.5 rounded-float border border-border bg-white p-4 shadow-post md:flex-col md:items-start md:gap-4 md:rounded-post md:p-8",
                i >= labels.compactCount && !showAll && "max-md:hidden",
              )}
            >
              <span className="shrink-0 rounded-xl bg-brand p-2.5 text-white md:rounded-chip md:p-3">
                <span className="md:hidden">
                  <Glyph name={item.icon} size={20} />
                </span>
                <span className="max-md:hidden">
                  <Glyph name={item.icon} size={24} />
                </span>
              </span>
              <div className="flex min-w-0 flex-col gap-0.5 md:gap-4">
                <h3 className="font-heading text-subtitle-sm font-semibold text-heading md:text-title">
                  {item.title}
                </h3>
                <p className="text-caption font-medium text-body md:text-body-base md:font-normal">
                  {item.text}
                </p>
                {/* The phone design has no link here. */}
                <div className="max-md:hidden">
                  <DiscussLink label={labels.actionLabel} />
                </div>
              </div>
            </li>
          ))}
        </ul>

        {hasMore && (
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls="capability-list"
            onClick={() => setShowAll((value) => !value)}
            className="flex cursor-pointer items-center gap-1.5 self-start text-label font-semibold text-primary md:hidden"
          >
            {showAll ? labels.showLessLabel : labels.showAllLabel(capabilities.items.length)}
            <Glyph
              name="chevron-down"
              size={16}
              className={cn("transition-transform duration-200", showAll && "rotate-180")}
            />
          </button>
        )}
      </div>
    </section>
  );
}
