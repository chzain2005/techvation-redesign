import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/Icon/Icon";
import { cn } from "@/lib/cn";

/** The four button styles used in the design. */
type Variant = "primary" | "secondary" | "outlineLight" | "outlineDark";
/** lg = big buttons in sections, md = smaller buttons (navbar, cards). */
type Size = "lg" | "md";

export type ButtonProps = {
  children: ReactNode;
  /** If set, the button is rendered as a link. Otherwise it is a <button>. */
  href?: string;
  variant?: Variant;
  size?: Size;
  /** Show the small arrow after the label. */
  showIcon?: boolean;
  type?: "button" | "submit";
  /** Runs on click: opens a pop-up on a button, or e.g. records an analytics event on a link. */
  onClick?: () => void;
  /** Greys the button out and ignores clicks. */
  disabled?: boolean;
  /** For links: open the page in a new browser tab. */
  newTab?: boolean;
  className?: string;
};

/* Colours for each variant. */
const variantClasses: Record<Variant, string> = {
  // Purple -> blue gradient with a soft purple shadow.
  primary: "bg-brand text-white drop-shadow-button hover:drop-shadow-button-hover",
  // Solid white, used on dark backgrounds.
  secondary: "bg-white text-primary-dark hover:shadow-brand-lg",
  // See-through with a white border, used on dark backgrounds.
  outlineLight:
    "border-button border-white/35 bg-white/6 text-white hover:border-white/70 hover:bg-white/14",
  // See-through with a purple border, used on light backgrounds.
  outlineDark:
    "border-button border-primary text-primary-dark hover:bg-surface-tint hover:shadow-brand-sm",
};

/* Colour of the streak of light that sweeps across the button on hover:
   white on coloured and dark buttons, purple on white and light ones. */
const sheenClasses: Record<Variant, string> = {
  primary: "via-white/45",
  outlineLight: "via-white/30",
  secondary: "via-primary/25",
  outlineDark: "via-primary/25",
};

/* Padding and text size for each size. */
const sizeClasses: Record<Size, string> = {
  lg: "px-7 py-4.25 text-button",
  md: "px-5 py-3 text-button-sm",
};

/* Light buttons get a dark arrow, dark buttons get a white arrow. */
const arrowIcon: Record<Variant, Record<Size, string>> = {
  primary: {
    lg: "/assets/icons/arrow-right-white-18.svg",
    md: "/assets/icons/arrow-right-white-16.svg",
  },
  outlineLight: {
    lg: "/assets/icons/arrow-right-white-18.svg",
    md: "/assets/icons/arrow-right-white-16.svg",
  },
  secondary: {
    lg: "/assets/icons/arrow-right-dark-18.svg",
    md: "/assets/icons/arrow-right-dark-16.svg",
  },
  outlineDark: {
    lg: "/assets/icons/arrow-right-dark-18.svg",
    md: "/assets/icons/arrow-right-dark-16.svg",
  },
};

const iconSize: Record<Size, number> = { lg: 18, md: 16 };

/**
 * The pill-shaped button used across the site.
 *
 *   <Button href="/contact">Let’s Talk</Button>
 *   <Button variant="outlineDark" showIcon={false}>About</Button>
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "lg",
  showIcon = true,
  type = "button",
  onClick,
  disabled = false,
  newTab = false,
  className,
}: ButtonProps) {
  const classes = cn(
    // Hover: the button lifts a little; pressing it pushes it back down.
    // "group/button" lets the sheen and the arrow react to the button's hover.
    "group/button relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold whitespace-nowrap transition duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-97 active:duration-100 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const content = (
    <>
      {/* Sheen: a slanted streak of light parked just outside the left edge.
          On hover it sweeps across to the right; when the pointer leaves it
          jumps straight back (duration-0), ready for the next hover. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-20 bg-linear-to-r from-transparent to-transparent transition-transform duration-0 ease-out group-hover/button:translate-x-[300%] group-hover/button:duration-700 motion-reduce:hidden",
          sheenClasses[variant],
        )}
      />
      {children}
      {/* Arrow: on hover it shoots out to the right and flies back in from the left. */}
      {showIcon && (
        <Icon
          src={arrowIcon[variant][size]}
          size={iconSize[size]}
          className="group-hover/button:animate-arrow-launch"
        />
      )}
    </>
  );

  // With an href we render a link, otherwise a real <button> (e.g. in forms).
  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={classes}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
