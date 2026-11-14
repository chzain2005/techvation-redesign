/*
 * ---------------------------------------------------------------------------
 * SOLUTIONS PAGE CONTENT  (Figma "10 · Solutions (Coming soon)")
 * ---------------------------------------------------------------------------
 * The Solutions page is a "coming soon" page with a live countdown, a
 * "notify me" form and a sneak peek of the first industry suites.
 *
 * NOTE: the labels of the three buttons were not in the Figma export and
 * were chosen to fit; please check them against the design.
 */

import type { HighlightedHeading } from "./homepage";

const image = (path: string) => `/assets/images/${path}.png`;
const icon = (name: string) => `/assets/icons/${name}.svg`;

export const solutionsPage = {
  hero: {
    eyebrow: "Coming soon",
    heading: { lead: "Industry Solutions are ", highlight: "on their way" } as HighlightedHeading,
    description:
      "Ready-made, pre-configured packages built on Dynamics 365, Odoo, Power BI and AI, designed for specific industries so you can go live faster.",
  },

  /**
   * When the countdown reaches zero. Change this to move the launch.
   * (The time zone offset is part of the date, here Pakistan time.)
   */
  launchDate: "2026-12-08T09:00:00+05:00",
  countdownLabels: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },

  notify: {
    label: "Work email",
    placeholder: "Enter your work email to get notified",
    submitLabel: "Notify Me",
    note: "Be the first to know · early-access pricing for subscribers",
    /** Shown in place of the form once an email was sent. */
    successTitle: "You’re on the list!",
    successText: "We’ll email you as soon as Industry Solutions launch.",
  },

  sneakPeek: {
    title: "A sneak peek at what’s coming",
    badge: "Soon",
    suites: [
      {
        title: "Manufacturing Suite",
        text: "Production, MRP & quality on Odoo + Power BI",
        icon: icon("factory-white-18"),
        image: image("industries/manufacturing"),
      },
      {
        title: "Retail & POS Suite",
        text: "Omnichannel retail with ERP-connected POS",
        icon: icon("cart-white-18"),
        image: image("industries/retail-wholesale"),
      },
      {
        title: "Healthcare Suite",
        text: "Patient, billing & compliance workflows",
        icon: icon("heart-white-18"),
        image: image("industries/healthcare"),
      },
    ],
    /** "Explore current services" goes to the Services page. */
    primaryAction: { label: "Explore Current Services", href: "/services" },
  },
};
