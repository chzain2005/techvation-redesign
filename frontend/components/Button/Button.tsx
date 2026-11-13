import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/Icon/Icon";
import { cn } from "@/lib/cn";

/** The four button styles used in the design. */
type Variant = "primary" | "secondary" | "outlineLight" | "outlineDark";
/** lg = big buttons in sections, md = smaller buttons (navbar, cards). */
type Size = "lg" | "md";

type ButtonProps = {
  children: ReactNode;
  /** If set, the button is rendered as a link. Otherwise it is a <button>. */
  href?: string;
  variant?: Variant;
  size?: Size;
  /** Show the small arrow after the label. */
  showIcon?: boolean;
  type?: "button" | "submit";
  className?: string;
};

/* Colours for each variant. */
const variantClasses: Record<Variant, string> = {
  // Purple -> blue gradient with a soft purple shadow.
  primary: "bg-brand text-white drop-shadow-button",
  // Solid white, used on dark backgrounds.
  secondary: "bg-white text-primary-dark",
  // See-through with a white border, used on dark backgrounds.
  outlineLight: "border-button border-white/35 bg-white/6 text-white",
  // See-through with a purple border, used on light backgrounds.
  outlineDark: "border-button border-primary text-primary-dark",
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
  className,
}: ButtonProps) {
  const classes = cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-opacity hover:opacity-90",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const content = (
    <>
      {children}
      {showIcon && <Icon src={arrowIcon[variant][size]} size={iconSize[size]} />}
    </>
  );

  // With an href we render a link, otherwise a real <button> (e.g. in forms).
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {content}
    </button>
  );
}
