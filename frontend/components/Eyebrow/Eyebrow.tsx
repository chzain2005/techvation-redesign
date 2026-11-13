import Icon from "@/components/Icon/Icon";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: string;
  /** "light" for light sections, "dark" for dark sections (hero, industries). */
  theme?: "light" | "dark";
};

/**
 * The small uppercase label with a dot that sits above section headings,
 * e.g. "• OUR SERVICES".
 */
export default function Eyebrow({ children, theme = "light" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border py-1.75 pr-3.5 pl-3 text-eyebrow font-semibold uppercase",
        theme === "light"
          ? "border-primary/15 bg-surface-tint text-primary"
          : "border-white/18 bg-white/8 text-white",
      )}
    >
      <Icon src="/assets/icons/dot-eyebrow.svg" size={8} />
      {children}
    </p>
  );
}
