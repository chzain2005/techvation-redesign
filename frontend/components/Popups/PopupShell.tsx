"use client"; // Listens to the keyboard and moves the focus.

import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import Icon from "@/components/Icon/Icon";
import { cn } from "@/lib/cn";

type PopupShellProps = {
  /** Which step is showing. When it changes, the new window animates in
      and receives the focus. */
  step: string;
  /** Text read out by screen readers as the name of the pop-up. */
  label: string;
  /** Called when the pop-up should close (Escape key or a click outside). */
  onClose: () => void;
  /** Extra classes for the white window: its width, padding and layout. */
  className?: string;
  children: ReactNode;
};

/**
 * The frame every pop-up shares: a dark layer over the whole page with a
 * white, rounded window in the middle.
 *
 * It also takes care of the behaviour people expect from a pop-up:
 *   - Escape or a click on the dark layer closes it
 *   - the page behind it does not scroll
 *   - the Tab key stays inside the window
 *   - on a small screen the pop-up itself scrolls if it is taller than the screen
 */
export default function PopupShell({
  step,
  label,
  onClose,
  className,
  children,
}: PopupShellProps) {
  const windowRef = useRef<HTMLDivElement>(null);

  // Keep the newest onClose without restarting the effect below.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    // Remember what had the focus, so we can give it back when we close.
    const previousFocus = document.activeElement as HTMLElement | null;


    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, []);

  // Move the focus into the window when it opens and on every new step.
  useEffect(() => {
    // "preventScroll" keeps a tall pop-up at its top on small screens.
    windowRef.current?.focus({ preventScroll: true });
  }, [step]);

  /* Keep the Tab key inside the window: from the last control it jumps back
     to the first one, and the other way round with Shift + Tab. */
  function handleTab(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !windowRef.current) return;
    const controls = windowRef.current.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled]), input, select, textarea",
    );
    if (controls.length === 0) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    const current = document.activeElement;

    if (event.shiftKey && (current === first || current === windowRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && current === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    // Dark layer. It scrolls on its own when the window is taller than the screen.
    <div className="fixed inset-0 z-50 animate-fade-in overflow-y-auto bg-ink/72">
      <div
        // A click that lands on this box itself (not on the window) is a
        // click on the dark layer, so it closes the pop-up.
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        className="flex min-h-full items-center justify-center p-4 md:p-6"
      >
        <div
          // A new key makes React build a fresh window for every step, which
          // replays the entrance animation.
          key={step}
          ref={windowRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          tabIndex={-1}
          onKeyDown={handleTab}
          className={cn(
            "w-full animate-popup-in overflow-hidden rounded-feature bg-white shadow-modal outline-none",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** The round "X" button in the corner of a pop-up. */
export function PopupCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className="shrink-0 cursor-pointer rounded-full bg-surface p-2 transition duration-300 hover:rotate-90 hover:bg-surface-tint"
    >
      <Icon src="/assets/icons/x-dark-16.svg" size={16} />
    </button>
  );
}
