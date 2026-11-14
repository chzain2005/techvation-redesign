"use client"; // Opens the consultation pop-up.

import Glyph from "@/components/Icon/Glyph";
import { usePopups } from "@/components/Popups/PopupProvider";
import { trackCtaClick } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/**
 * A small text link with an arrow ("Discuss this →") that opens the free
 * consultation pop-up.
 */
export default function DiscussLink({ label, className }: { label: string; className?: string }) {
  const { openConsultation } = usePopups();
  return (
    <button
      type="button"
      onClick={() => {
        trackCtaClick(label, "popup:consultation");
        openConsultation();
      }}
      className={cn(
        "group inline-flex cursor-pointer items-center gap-1.5 text-label font-semibold text-primary",
        className,
      )}
    >
      {label}
      <Glyph
        name="arrow-right"
        size={14}
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </button>
  );
}
