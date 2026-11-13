import type { ReactNode } from "react";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import type { HighlightedHeading } from "@/data/homepage";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow: string;
  heading: HighlightedHeading;
  /** "light" = dark text on a light section, "dark" = white text on a dark section. */
  theme?: "light" | "dark";
  /** Extra classes for the heading, e.g. "xl:max-w-160" to limit its width on desktop. */
  headingClassName?: string;
  /** Centre the eyebrow and heading on phones and tablets (left-aligned on desktop). */
  centerOnCompact?: boolean;
  /** Whatever goes next to the heading: a paragraph, a button, filter chips... */
  children?: ReactNode;
};

/**
 * The top part of a section: eyebrow + big heading, plus optional extra
 * content. Part of the heading is shown in gradient colour.
 *
 * - Phones and tablets: everything is stacked.
 * - Desktop (xl and up): heading on the left, extra content on the right.
 *
 * The heading size follows the three Figma frames: 28px / 36px / 44px.
 */
export default function SectionHeader({
  eyebrow,
  heading,
  theme = "light",
  headingClassName,
  centerOnCompact = false,
  children,
}: SectionHeaderProps) {
  return (
    <div className="flex w-full flex-col gap-3.5 xl:flex-row xl:items-end xl:justify-between">
      <div
        className={cn(
          "flex flex-col gap-4",
          centerOnCompact
            ? "items-center text-center xl:items-start xl:text-left"
            : "items-start",
        )}
      >
        <Eyebrow theme={theme}>{eyebrow}</Eyebrow>
        <h2
          className={cn(
            "font-heading text-h2-sm font-bold md:text-h2-md xl:text-h2",
            theme === "light" ? "text-heading" : "text-white",
            headingClassName,
          )}
        >
          {heading.lead}
          <span
            className={
              theme === "light" ? "text-gradient-brand" : "text-gradient-accent"
            }
          >
            {heading.highlight}
          </span>
          {heading.tail}
        </h2>
      </div>
      {children}
    </div>
  );
}
