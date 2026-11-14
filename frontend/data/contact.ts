/*
 * ---------------------------------------------------------------------------
 * CONTACT US PAGE CONTENT  (Figma "09 · Contact Us" + "12 · Mobile · Contact Us")
 * ---------------------------------------------------------------------------
 * Every "Let's Talk" button on the site leads here (cta.letsTalk in
 * homepage.ts points to /contact).
 *
 * "short" values are the shorter versions the phone design uses.
 */

import type { GlyphName } from "@/components/Icon/Glyph";
import type { HighlightedHeading } from "./homepage";

export const contactPage = {
  hero: {
    breadcrumb: "Contact Us",
    eyebrow: "Contact us",
    heading: { lead: "Let’s talk about ", highlight: "your project" } as HighlightedHeading,
    description:
      "Tell us what you’re building. A solution architect will get back to you within 24 hours, free consultation, no obligation.",
    descriptionShort: "A solution architect replies within 24 hours.",
    image: "/assets/images/contact/hero.jpg",
  },

  /** The four cards under the hero. "#schedule-a-call" opens the booking pop-up. */
  quickContact: [
    { icon: "phone" as GlyphName, title: "Call", detail: "+1 (307) 855-0572", href: "tel:+13078550572" },
    { icon: "message" as GlyphName, title: "WhatsApp", detail: "+92 344 5450666", href: "https://wa.me/923445450666" },
    { icon: "mail" as GlyphName, title: "Email", detail: "info@thetechvation.com", href: "mailto:info@thetechvation.com" },
    { icon: "calendar" as GlyphName, title: "Book a meeting", short: "Book a call", detail: "Pick a 30-min slot", href: "#schedule-a-call" },
  ],

  form: {
    title: "Let’s talk, tell us about your project",
    titleShort: "Tell us about your project",
    fields: {
      name: { label: "Full name *", placeholder: "John Smith" },
      company: { label: "Company", placeholder: "Acme Inc." },
      email: { label: "Work email *", placeholder: "john@company.com" },
      phone: { label: "Phone / WhatsApp", placeholder: "+1 (555) 000-0000" },
      budget: { label: "Estimated budget", placeholder: "Select a budget" },
      timeline: { label: "Timeline", placeholder: "Select a timeline" },
      details: {
        label: "Project details",
        placeholder: "Tell us about your goals, current systems and challenges…",
      },
    },
    servicesLabel: "What do you need help with?",
    /** Chips; several can be picked. */
    services: [
      { label: "MS Dynamics 365", short: "Dynamics 365" },
      { label: "ERP Implementation", short: "ERP" },
      { label: "Odoo ERP", short: "Odoo" },
      { label: "Power BI", short: "Power BI" },
      { label: "Web Development", short: "Web" },
      { label: "Mobile App", short: "Mobile" },
      { label: "Agentic AI", short: "AI" },
      { label: "AI Marketing", short: "AI Marketing" },
      { label: "Other", short: "Other" },
    ],
    budgets: ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+", "Not sure yet"],
    timelines: ["As soon as possible", "1 – 3 months", "3 – 6 months", "6+ months", "Just exploring"],
    /** "I agree to the [Privacy Policy] and to be contacted about my request." */
    consent: {
      before: "I agree to the ",
      link: { label: "Privacy Policy", href: "/privacy-policy" },
      after: " and to be contacted about my request.",
    },
    submitLabel: "Send Request, It’s Free",
    notes: [
      { icon: "/assets/icons/shield-green-14.svg", label: "Your data is secure" },
      { icon: "/assets/icons/clock-green-14.svg", label: "Reply within 24h" },
      { icon: "/assets/icons/check-green-14.svg", label: "No obligation" },
    ],
  },

  offices: [
    {
      name: "USA Office",
      location: "Wyoming, United States",
      phone: { label: "+1 (307) 855-0572", href: "tel:+13078550572" },
      email: "info@thetechvation.com",
      photo: "/assets/images/contact/office-usa.jpg",
    },
    {
      name: "Pakistan Office",
      location: "Islamabad, Pakistan",
      phone: { label: "+92 344 5450666", href: "tel:+923445450666" },
      email: "info@thetechvation.com",
      photo: "/assets/images/about/story-main.jpg",
    },
  ],

  hours: {
    title: "Business hours",
    lines: ["Mon – Fri · 9:00 – 18:00 (EST & PKT)", "Critical support for SLA clients 24/7"],
  },
};
