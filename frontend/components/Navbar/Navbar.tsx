"use client"; // Needed because the mobile menu opens/closes with React state.

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import { navbar } from "@/data/homepage";
import { cn } from "@/lib/cn";
import { usePopups } from "@/components/Popups/PopupProvider";
import MobileMenu from "./MobileMenu";

/** The small gradient tag next to a link, e.g. "SOON". */
function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-accent-gradient px-1.75 py-0.5 text-micro font-medium tracking-badge text-ink">
      {children}
    </span>
  );
}

/**
 * The menu button for phones and tablets. Its three bars morph into an "X"
 * when the menu opens, and back again when it closes:
 *
 *   closed            open
 *   ─────  top     →  slides to the middle and turns  45°   ╲
 *   ─────  middle  →  shrinks and fades away
 *   ─────  bottom  →  slides to the middle and turns -45°   ╱
 *
 * All three bars are placed in the exact centre of the button (each bar is
 * 2px tall, so "-translate-y-px" centres it). While the menu is closed the
 * top and bottom bars are shifted 6px up and down from there.
 * "ease-spring" (see globals.css) makes the bars overshoot slightly and
 * settle, which gives the animation a little bounce.
 */
function MenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  /* Shared look and animation of the three bars. */
  const bar =
    "absolute top-1/2 left-1/2 h-0.5 w-4.5 -translate-x-1/2 rounded-full bg-white transition duration-500 ease-spring motion-reduce:transition-none";

  return (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      onClick={onClick}
      className={cn(
        "relative size-10.5 cursor-pointer rounded-xl border transition duration-300 active:scale-90",
        // The tile lights up a little while the menu is open.
        isOpen ? "border-white/30 bg-white/16" : "border-white/18 bg-white/10",
      )}
    >
      {/* Top bar */}
      <span className={cn(bar, isOpen ? "-translate-y-px rotate-45" : "-translate-y-1.75")} />
      {/* Middle bar */}
      <span
        className={cn(
          bar,
          "-translate-y-px",
          isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
        )}
      />
      {/* Bottom bar */}
      <span className={cn(bar, isOpen ? "-translate-y-px -rotate-45" : "translate-y-1.25")} />
    </button>
  );
}

/**
 * The top navigation bar.
 *
 * - Phones and tablets ("Navbar / Compact" in Figma): a 68px frosted bar with
 *   the logo and a menu button. Tablets also show the main button. Tapping the
 *   menu button opens the full-screen menu.
 * - Desktop (xl and up): an 88px see-through bar with logo, links and buttons.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // The "Free Consultation" buttons open the consultation pop-up.
  const { openConsultation } = usePopups();

  // While the menu is open: close it with the Escape key, and stop the page
  // behind it from scrolling.
  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    // Undo both again when the menu closes.
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "inset-x-0 top-0 z-20 border-b border-white/10 xl:absolute xl:bg-transparent xl:backdrop-blur-none",
          // Normally the bar sits at the top of the page and scrolls away with
          // it. While the menu is open it is pinned to the screen, on top of
          // the menu, so the logo and the close button stay visible.
          isMenuOpen ? "fixed bg-ink" : "absolute bg-ink/60 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-navbar-compact w-full max-w-page items-center justify-between page-x xl:h-navbar">
          {/* Logo: 136 x 32 on small screens, 176 x 42 on desktop */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="relative h-8 w-34 shrink-0 xl:h-10.5 xl:w-44"
          >
            <Image
              src={navbar.logo.src}
              alt={navbar.logo.alt}
              fill
              sizes="176px"
              className="object-contain"
              preload
            />
          </Link>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden items-center gap-7.5 xl:flex">
            {navbar.links.map((link) => {
              const isActive = link.href === navbar.activeHref;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-1.5 text-nav font-semibold transition-colors hover:text-white",
                    isActive ? "text-white" : "text-white/75",
                  )}
                >
                  {link.label}
                  {/* Small arrow for links that will open a dropdown. */}
                  {link.hasDropdown && (
                    <Icon src="/assets/icons/chevron-down-white-16.svg" size={16} />
                  )}
                  {link.badge && <Badge>{link.badge}</Badge>}
                  {/* Gradient underline under the current page. */}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-3 h-0.75 rounded-xs bg-accent-gradient" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop buttons */}
          <div className="hidden items-center gap-3 xl:flex">
            <Button
              href={navbar.secondaryAction.href}
              variant="outlineLight"
              size="md"
              showIcon={false}
            >
              {navbar.secondaryAction.label}
            </Button>
            <Button onClick={openConsultation} size="md">
              {navbar.primaryAction.label}
            </Button>
          </div>

          {/* Phones and tablets: main button (tablet only) + menu button */}
          <div className="flex items-center gap-2.5 xl:hidden">
            {/* A click on the main button also closes the menu if it is open. */}
            <div className="hidden md:block" onClick={() => setIsMenuOpen(false)}>
              <Button onClick={openConsultation} size="md" showIcon={false}>
                {navbar.primaryAction.label}
              </Button>
            </div>
            <MenuButton
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            />
          </div>
        </div>
      </header>

      {/* Full-screen menu for phones and tablets. It is deliberately placed
          OUTSIDE the <header>: see the note at the top of MobileMenu.tsx. */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onFreeConsultation={openConsultation}
      />
    </>
  );
}
