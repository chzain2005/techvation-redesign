"use client"; // Scrolls the page when we are already on the homepage.

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type HomeLinkProps = {
  className?: string;
  /** Read by screen readers (the logo image already has alt text). */
  "aria-label"?: string;
  /** Runs on every click, e.g. to close the mobile menu. */
  onClick?: () => void;
  children: ReactNode;
};

/** Scrolls to the very top; instantly for people who ask for reduced motion. */
export function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

/**
 * A link to the top of the homepage, used by the Techvation logo in the
 * navbar and the footer.
 *
 * From another page it opens the homepage (which starts at the top). On
 * the homepage itself, wherever you have scrolled to, it glides back to
 * the top and removes any "#section" from the address.
 */
export default function HomeLink({ className, onClick, children, ...rest }: HomeLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.();
    // Let Ctrl/Cmd-click open the homepage in a new tab as usual.
    if (pathname !== "/" || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    if (window.location.hash) window.history.replaceState(null, "", "/");
    scrollToTop();
  }

  return (
    <Link href="/" onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
