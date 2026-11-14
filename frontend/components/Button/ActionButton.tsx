"use client"; // Opens pop-ups, which live in the browser.

import { useOptionalPopups } from "@/components/Popups/PopupProvider";
import { cta } from "@/data/homepage";
import { trackCtaClick } from "@/lib/analytics";
import Button, { type ButtonProps } from "./Button";

type ActionButtonProps = Omit<ButtonProps, "href" | "onClick"> & {
  /** Where the button leads. Two targets open a pop-up instead (see below). */
  href: string;
  /** Runs after the click, e.g. to close the mobile menu. */
  onClick?: () => void;
};

/**
 * A Button for the call-to-action links in the data files.
 *
 * Two targets open a pop-up instead of following the link:
 *   "Schedule a Call"                       -> the Schedule a Call pop-up
 *   "Free Consultation" / "Talk to an Expert" -> the consultation pop-up
 *
 * Everything else (e.g. "Let’s Talk" -> /contact) stays a normal link. On a
 * page without pop-ups the two targets also stay normal links.
 */
export default function ActionButton({ href, onClick, ...props }: ActionButtonProps) {
  const popups = useOptionalPopups();

  const openPopup =
    href === cta.scheduleCall.href
      ? popups?.openScheduleCall
      : href === cta.freeConsultation.href
        ? popups?.openConsultation
        : undefined;

  // Every call-to-action click is sent to Google Analytics.
  const label = typeof props.children === "string" ? props.children : href;
  const destination =
    href === cta.scheduleCall.href ? "popup:schedule_call" : href === cta.freeConsultation.href ? "popup:consultation" : href;

  if (openPopup) {
    return (
      <Button
        {...props}
        onClick={() => {
          trackCtaClick(label, destination);
          onClick?.();
          openPopup();
        }}
      />
    );
  }

  return <Button {...props} href={href} onClick={() => trackCtaClick(label, destination)} />;
}
