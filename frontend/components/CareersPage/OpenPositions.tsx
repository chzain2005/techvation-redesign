"use client"; // The filters change what is shown.

import { useState } from "react";
import Glyph from "@/components/Icon/Glyph";
import Icon from "@/components/Icon/Icon";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { careersPage, type Department, type Position } from "@/data/careers";
import { mergeContent } from "@/lib/cms/normalize";
import { cn } from "@/lib/cn";

/** The event "Apply now" sends, so the application form can fill in the role. */
export const APPLY_EVENT = "careers:apply";

/** Tells the application form which role was picked, then scrolls to it. */
function applyFor(position: Position) {
  window.dispatchEvent(new CustomEvent(APPLY_EVENT, { detail: position }));
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * "Find your next role": department chips and a location dropdown that
 * filter the list of open roles, and one row per role with "Apply now".
 *
 * - Phones: the chips scroll sideways, the dropdown sits below them, and
 *   each row stacks its title, details and a full-width button.
 * - Tablets and up: chips on the left, dropdown on the right, button at
 *   the end of each row.
 */
export default function OpenPositions({ content }: { content: Partial<(typeof careersPage)["positions"]> }) {
  // CMS content (jobs, departments, headings) over the built-in labels.
  const positions = mergeContent(careersPage.positions, content);
  const [department, setDepartment] = useState<Department | null>(null);
  const [location, setLocation] = useState("");

  const visible = positions.list.filter(
    (position) =>
      (!department || position.department === department) &&
      (!location || position.location.includes(location)),
  );

  const chips: Array<{ label: string; value: Department | null }> = [
    { label: positions.allLabel, value: null },
    ...positions.departments.map((value) => ({ label: value, value })),
  ];

  return (
    <section id="open-positions" className="scroll-mt-navbar bg-surface">
      <div className="mx-auto flex w-full max-w-page flex-col gap-8 page-x section-y xl:gap-12">
        <SectionHeader eyebrow={positions.eyebrow} heading={positions.heading} headingClassName="xl:max-w-180">
          {/* "aria-live" announces the new count when a filter changes. */}
          <p aria-live="polite" className="text-label-sm font-semibold text-primary">
            {positions.countLabel(visible.length)}
          </p>
        </SectionHeader>

        {/* Filters */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="scrollbar-none -mx-5 flex gap-2.5 overflow-x-auto px-5 md:mx-0 md:px-0" role="group" aria-label="Department">
            {chips.map((chip) => {
              const isCurrent = chip.value === department;
              return (
                <button
                  key={chip.label}
                  type="button"
                  aria-pressed={isCurrent}
                  onClick={() => setDepartment(chip.value)}
                  className={cn(
                    "shrink-0 cursor-pointer rounded-full border px-4 py-2.25 text-label font-semibold whitespace-nowrap transition-colors duration-200",
                    isCurrent
                      ? "border-transparent bg-brand text-white"
                      : "border-border bg-white text-primary-dark hover:border-primary/40",
                  )}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
          <label className="relative w-full md:w-80 md:shrink-0">
            <span className="sr-only">{positions.locationLabel}</span>
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-border bg-white px-4 py-3.5 pr-11 text-small text-heading outline-none focus:border-primary"
            >
              <option value="">{positions.allLocations}</option>
              {positions.locations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Icon
              src="/assets/icons/chevron-down-body-18.svg"
              size={18}
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
            />
          </label>
        </div>

        {/* Roles */}
        {visible.length ? (
          <ul className="flex flex-col gap-4 xl:gap-12">
            {visible.map((position) => (
              <li
                key={position.title}
                className="flex flex-col gap-4 rounded-reason border border-border bg-white p-5 md:flex-row md:items-center md:gap-6 md:px-7 md:py-5.5"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                  <h3 className="font-heading text-title-sm font-semibold text-heading md:text-title">{position.title}</h3>
                  <ul className="flex flex-wrap gap-x-4.5 gap-y-1.5 text-small text-body">
                    <li className="flex items-center gap-1.5">
                      <Glyph name="briefcase" size={15} />
                      {position.department}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Glyph name="map-pin" size={15} />
                      {position.location}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Glyph name="clock" size={15} />
                      {position.type}
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => applyFor(position)}
                  className="group/apply flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full border-button border-primary px-7 py-4.25 text-button font-semibold text-primary-dark transition-colors duration-300 hover:bg-surface-tint"
                >
                  {positions.applyLabel}
                  <Glyph
                    name="arrow-right"
                    size={18}
                    className="transition-transform duration-200 group-hover/apply:translate-x-1"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-reason border border-dashed border-primary/30 bg-white p-8 text-center text-body-base text-body">
            {positions.emptyText}
          </p>
        )}
      </div>
    </section>
  );
}
