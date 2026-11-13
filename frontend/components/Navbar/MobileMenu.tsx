"use client"; // Remembers whether the Services list is unfolded.

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ActionButton from "@/components/Button/ActionButton";
import Glyph from "@/components/Icon/Glyph";
import Icon from "@/components/Icon/Icon";
import { footer, navbar } from "@/data/homepage";
import { serviceCategories, serviceHref, servicesIn } from "@/data/services";
import { isActiveLink } from "@/lib/active-link";
import { cn } from "@/lib/cn";

/**
 * The list under "Services" in the mobile menu: a link to the Services page,
 * then every service grouped by practice area. It unfolds smoothly by
 * animating the grid row from 0 to its natural height.
 */
function MobileServicesList({
  isOpen,
  pathname,
  onNavigate,
}: {
  isOpen: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div
      id="mobile-services"
      inert={!isOpen}
      className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="overflow-hidden">
        <div className="flex flex-col gap-5 px-1 pb-5">
          <Link
            href="/services"
            onClick={onNavigate}
            className="flex items-center gap-2 text-label font-semibold text-accent"
          >
            All services
            <Glyph name="arrow-right" size={16} />
          </Link>
          {serviceCategories.map((category) => (
            <div key={category.id} className="flex flex-col gap-1">
              <p className="text-eyebrow-sm font-semibold text-white/45 uppercase">{category.name}</p>
              <ul>
                {servicesIn(category).map((service) => {
                  const href = serviceHref(service.slug);
                  return (
                    <li key={service.slug}>
                      <Link
                        href={href}
                        onClick={onNavigate}
                        aria-current={pathname === href ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 py-2 text-body-sm font-medium transition-colors",
                          pathname === href ? "text-white" : "text-white/75 hover:text-white",
                        )}
                      >
                        <span className="rounded-lg bg-white/8 p-1.5 text-accent">
                          <Glyph name={service.icon} size={16} />
                        </span>
                        {service.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type MobileMenuProps = {
  /** Whether the menu is showing. */
  isOpen: boolean;
  /** Called when the menu should close (a link or button was tapped). */
  onClose: () => void;
};

/**
 * The full-screen menu for phones and tablets ("Mobile · Menu open" in Figma).
 *
 * It covers the whole screen BEHIND the navbar bar, so the logo and the
 * menu/close button of the navbar stay visible on top of it. Below the bar:
 *   1. the page links as large rows with an arrow on the right
 *   2. three full-width buttons
 *   3. a row of social icons
 *
 * The menu is always in the page (so it can animate out as well as in) and
 * is switched between two states with classes:
 *   closed -> invisible, fully transparent, shifted up a little
 *   open   -> visible, fully opaque, in place
 * The rows then slide up one after another ("stagger") using a small delay
 * that grows with each row.
 *
 * IMPORTANT: this component must NOT be placed inside the navbar <header>.
 * The header has a backdrop blur, and a blurred element traps "fixed"
 * children inside its own box, which would squash the menu into the bar.
 */
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  // Whether the "Services" row is unfolded. It folds again when the menu closes.
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);
    if (!isOpen) setIsServicesOpen(false);
  }

  /* Shared animation for each row: fade + slide up when the menu opens.
     "motion-reduce" switches the movement off for people who ask for less motion. */
  const rowAnimation = cn(
    "transition duration-500 ease-out motion-reduce:transition-none",
    isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
  );
  /** Later rows start a little later. No delay while closing. */
  const delay = (position: number) => ({
    transitionDelay: isOpen ? `${100 + position * 50}ms` : "0ms",
  });

  const linkCount = navbar.links.length;

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      // "inert" stops clicks, focus and screen readers while the menu is closed.
      inert={!isOpen}
      className={cn(
        // "fixed inset-0" pins the menu to the screen; it scrolls on its own
        // if the content is taller than the screen. The top padding leaves
        // room for the navbar bar that sits on top of it.
        "fixed inset-0 isolate z-10 flex flex-col overflow-x-hidden overflow-y-auto bg-ink pt-navbar-compact transition-[opacity,visibility,translate] duration-300 ease-out motion-reduce:transition-none xl:hidden",
        isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0",
      )}
    >
      {/* Soft purple glow in the lower left corner (decoration) */}
      <Image
        src="/assets/images/hero/glow-compact-1.svg"
        alt=""
        width={600}
        height={600}
        className="pointer-events-none absolute -bottom-50 -left-50 -z-10 h-auto w-auto max-w-none"
      />

      {/* 1. Page links */}
      <nav aria-label="Mobile" className="page-x pt-3">
        <ul>
          {navbar.links.map((link, i) =>
            link.hasDropdown ? (
              // "Services" opens a list of all services instead of leaving the menu.
              <li
                key={link.label}
                style={delay(i)}
                className={cn("border-b border-white/10", rowAnimation)}
              >
                <button
                  type="button"
                  aria-expanded={isServicesOpen}
                  aria-controls="mobile-services"
                  onClick={() => setIsServicesOpen((open) => !open)}
                  className="group flex w-full cursor-pointer items-center gap-2.5 px-1 py-4.25 text-left font-heading text-title font-semibold text-white"
                >
                  {link.label}
                  <span className="ml-auto">
                    <Icon
                      src="/assets/icons/chevron-down-white-16.svg"
                      size={16}
                      className={cn("transition-transform duration-300", isServicesOpen && "rotate-180")}
                    />
                  </span>
                </button>
                <MobileServicesList
                  isOpen={isServicesOpen}
                  pathname={pathname}
                  onNavigate={onClose}
                />
              </li>
            ) : (
            <li
              key={link.label}
              style={delay(i)}
              className={cn("border-b border-white/10", rowAnimation)}
            >
              <Link
                href={link.href}
                aria-current={isActiveLink(link.href, pathname) ? "page" : undefined}
                // Close the menu after choosing a link.
                onClick={onClose}
                className="group flex items-center gap-2.5 px-1 py-4.25 font-heading text-title font-semibold text-white"
              >
                {link.label}
                {link.badge && (
                  <span className="rounded-full bg-accent-gradient px-1.75 py-0.5 font-main text-micro font-medium tracking-badge text-ink">
                    {link.badge}
                  </span>
                )}
                {/* Arrow on the right (the down arrow, turned to point right).
                    It nudges to the right when the row is hovered or pressed. */}
                <span className="ml-auto transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1">
                  <Icon
                    src="/assets/icons/chevron-down-white-16.svg"
                    size={16}
                    className="-rotate-90"
                  />
                </span>
              </Link>
            </li>
            ),
          )}
        </ul>
      </nav>

      {/* 2. Buttons: the first is the gradient one, the last has no arrow.
          A click on any button bubbles up to this box, which closes the menu. */}
      <div
        onClick={onClose}
        style={delay(linkCount)}
        className={cn("flex flex-col gap-2.5 page-x pt-8", rowAnimation)}
      >
        {navbar.menuActions.map((action, i) => (
          // "Free Consultation" and "Schedule a Call" open their pop-ups;
          // "Let’s Talk" is a link.
          <ActionButton
            key={action.label}
            href={action.href}
            variant={i === 0 ? "primary" : "outlineLight"}
            showIcon={i < navbar.menuActions.length - 1}
            className="w-full"
          >
            {action.label}
          </ActionButton>
        ))}
      </div>

      {/* 3. Social icons (the first four from the footer list) */}
      <ul
        style={delay(linkCount + 1)}
        className={cn("flex justify-center gap-4.5 page-x pt-6 pb-8", rowAnimation)}
      >
        {footer.social.slice(0, 4).map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="block p-1 opacity-70 transition-opacity hover:opacity-100"
            >
              <Icon src={item.icon} size={18} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
