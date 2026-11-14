import { sendGAEvent } from "@next/third-parties/google";

/**
 * Google Analytics 4 events.
 *
 * GA is only loaded when NEXT_PUBLIC_GA_ID is set (see app/layout.tsx).
 * Without it these helpers do nothing, so local development stays quiet.
 *
 * Never pass personal data (names, emails, phone numbers, messages):
 * Google Analytics does not allow it. Send what happened, not who did it.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

/** Sends one GA4 event, e.g. trackEvent("cta_click", { cta_label: "Let's Talk" }). */
export function trackEvent(name: string, params: EventParams = {}) {
  if (!process.env.NEXT_PUBLIC_GA_ID || typeof window === "undefined") return;
  sendGAEvent("event", name, { page_path: window.location.pathname, ...params });
}

/**
 * A click on a call-to-action button ("Let's Talk", "Free Consultation",
 * "Schedule a Call"…).
 *   label:       the button text
 *   destination: where it leads ("/contact") or the pop-up it opens
 *   location:    where on the site the button is ("navbar", "footer"…), if known
 */
export function trackCtaClick(label: string, destination: string, location?: string) {
  trackEvent("cta_click", { cta_label: label, cta_destination: destination, cta_location: location });
}

/**
 * A form that was sent. Enquiry forms use GA4's recommended "generate_lead"
 * event (it can be marked as a key event in GA); newsletters use "sign_up";
 * job applications use "job_application".
 */
export function trackFormSubmit(
  form: string,
  event: "generate_lead" | "sign_up" | "job_application" = "generate_lead",
  params: EventParams = {},
) {
  trackEvent(event, { form_name: form, ...params });
}
