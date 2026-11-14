"use client"; // Needed because the mobile menu opens/closes with React state.

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import { navbar } from "@/data/homepage";
import { isActiveLink } from "@/lib/active-link";
import { trackCtaClick } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { usePopups } from "@/components/Popups/PopupProvider";
import HomeLink from "@/components/HomeLink/HomeLink";
import MobileMenu from "./MobileMenu";
import ServicesMegaMenu from "./ServicesMegaMenu";
import { useHideOnScroll } from "./useHideOnScroll";

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
 *   Hovering "Services" drops down the services mega menu.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // The "Free Consultation" buttons open the consultation pop-up.
  const { openConsultation } = usePopups();
  // ...and the click is recorded in Google Analytics.
  const openNavbarConsultation = () => {
    trackCtaClick(navbar.primaryAction.label, "popup:consultation", "navbar");
    openConsultation();
  };
  // The page we are on: decides which link gets the underline.
  const pathname = usePathname();

  /* ---------------- Services mega menu (desktop only) ---------------- */
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  // Where the little arrow on top of the panel sits (under "Services").
  const [caretLeft, setCaretLeft] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const openMega = useCallback(() => {
    clearTimeout(closeTimer.current);
    // Measure where "Services" is, so the arrow points at it.
    const bar = barRef.current?.getBoundingClientRect();
    const link = megaRef.current?.getBoundingClientRect();
    if (bar && link) setCaretLeft(link.left - bar.left + link.width / 2);
    setIsMegaOpen(true);
  }, []);
  const closeMega = useCallback(() => {
    clearTimeout(closeTimer.current);
    setIsMegaOpen(false);
  }, []);
  // Leaving the link or the panel closes the menu after a short pause, so
  // the pointer can travel from the link down into the panel.
  const scheduleMegaClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIsMegaOpen(false), 150);
  }, []);

  // Escape closes the mega menu; a pending close is cancelled on unmount.
  useEffect(() => {
    if (!isMegaOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMega();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMegaOpen, closeMega]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

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

  /* ---------------- Hide while scrolling down ---------------- */
  const { isScrolled, isHidden: scrolledAway } = useHideOnScroll();
  // Never hide it while one of its menus is open.
  const isHidden = scrolledAway && !isMenuOpen && !isMegaOpen;
  const headerRef = useRef<HTMLElement>(null);

  // Tell the rest of the page how much of the top the navbar covers, so
  // sticky bars (Services tabs, FAQ categories, article sidebar) sit just
  // below it and move up when it slides away.
  // The height changes between phone (68px) and desktop (88px), so it is
  // measured again whenever the bar resizes.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () =>
      document.documentElement.style.setProperty(
        "--nav-offset",
        isHidden ? "0px" : `${header.offsetHeight}px`,
      );
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, [isHidden]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          // Always pinned to the top of the screen, floating over the hero.
          "fixed inset-x-0 top-0 z-20 border-b border-white/10 transition-[translate,background-color] duration-300 ease-out motion-reduce:transition-none",
          // Scrolling down slides it up out of view. Keyboard focus inside it
          // (Tab key) brings it back. Only keyboard focus counts: a clicked
          // link keeps focus after the new page opens, and must not pin it.
          isHidden ? "-translate-y-full has-focus-visible:translate-y-0" : "translate-y-0",
          isMenuOpen
            ? "bg-ink"
            : isScrolled
              ? // Over page content it gets a solid, frosted backdrop.
                "bg-ink/90 backdrop-blur-md"
              : // At the very top it lets the dark hero show through.
                "bg-ink/60 backdrop-blur-md xl:bg-transparent xl:backdrop-blur-none",
        )}
      >
        <div
          ref={barRef}
          className="relative mx-auto flex h-navbar-compact w-full max-w-page items-center justify-between page-x xl:h-navbar"
        >
          {/* Logo: 136 x 32 on small screens, 176 x 42 on desktop. It always
              goes to the top of the homepage. */}
          <HomeLink
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
          </HomeLink>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden items-center gap-7.5 xl:flex">
            {navbar.links.map((link) => {
              const isActive = isActiveLink(link.href, pathname);
              const linkElement = (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  {...(link.hasDropdown && {
                    "aria-haspopup": true,
                    "aria-expanded": isMegaOpen,
                    onClick: closeMega,
                  })}
                  className={cn(
                    "relative flex items-center gap-1.5 text-nav font-semibold transition-colors hover:text-white",
                    isActive || (link.hasDropdown && isMegaOpen) ? "text-white" : "text-white/75",
                  )}
                >
                  {link.label}
                  {/* Small arrow for the link with the mega menu; it flips while open. */}
                  {link.hasDropdown && (
                    <Icon
                      src="/assets/icons/chevron-down-white-16.svg"
                      size={16}
                      className={cn("transition-transform duration-200", isMegaOpen && "rotate-180")}
                    />
                  )}
                  {link.badge && <Badge>{link.badge}</Badge>}
                  {/* Gradient underline under the current page. */}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-3 h-0.75 rounded-xs bg-accent-gradient" />
                  )}
                </Link>
              );

              if (!link.hasDropdown) return linkElement;

              // "Services": hovering it (or moving the keyboard focus onto it)
              // opens the mega menu; clicking it still goes to the Services page.
              // The panel comes right after the link in the page, so the Tab
              // key moves into it. It is positioned against the whole bar
              // (this wrapper is not "relative"), so it spans the page width.
              return (
                <div
                  key={link.label}
                  ref={megaRef}
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleMegaClose}
                  onFocus={openMega}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) closeMega();
                  }}
                >
                  {linkElement}
                  {isMegaOpen && (
                    <div className="absolute inset-x-0 top-full animate-menu-in px-gutter pt-4">
                      {/* Little white arrow pointing up at "Services" */}
                      <span
                        aria-hidden
                        className="absolute top-2.5 size-3.5 -translate-x-1/2 rotate-45 rounded-xs bg-white"
                        style={{ left: caretLeft }}
                      />
                      <ServicesMegaMenu pathname={pathname} onNavigate={closeMega} />
                    </div>
                  )}
                </div>
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
              onClick={() => trackCtaClick(navbar.secondaryAction.label, navbar.secondaryAction.href, "navbar")}
            >
              {navbar.secondaryAction.label}
            </Button>
            <Button onClick={openNavbarConsultation} size="md">
              {navbar.primaryAction.label}
            </Button>
          </div>

          {/* Phones and tablets: main button (tablet only) + menu button */}
          <div className="flex items-center gap-2.5 xl:hidden">
            {/* A click on the main button also closes the menu if it is open. */}
            <div className="hidden md:block" onClick={() => setIsMenuOpen(false)}>
              <Button onClick={openNavbarConsultation} size="md" showIcon={false}>
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
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
