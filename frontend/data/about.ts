/*
 * ---------------------------------------------------------------------------
 * ABOUT US PAGE CONTENT  (Figma "04 · About Us")
 * ---------------------------------------------------------------------------
 * The team members are placeholders in the design too: replace the names,
 * photos (square, at least 600 x 600) and links with the real people.
 */

import type { GlyphName } from "@/components/Icon/Glyph";
import type { HighlightedHeading } from "./homepage";

export const aboutPage = {
  hero: {
    breadcrumb: "About Us",
    eyebrow: "About Techvation",
    heading: { lead: "We turn technology into your ", highlight: "competitive advantage" } as HighlightedHeading,
    description:
      "Techvation is a technology partner helping businesses across North America, the Middle East, Africa and Asia Pacific grow with Microsoft, ERP, custom software and AI.",
    /** "Work With Us" opens the free consultation pop-up. */
    primaryLabel: "Work With Us",
    /** "Meet the Team" scrolls down to the Leadership section. */
    secondaryAction: { label: "Meet the Team", href: "#leadership" },
    image: "/assets/images/service-page/office.jpg",
  },

  story: {
    eyebrow: "Our story",
    heading: { lead: "Built on innovation, quality ", highlight: "and customer success" } as HighlightedHeading,
    paragraphs: [
      "What sets Techvation apart is our commitment to technology innovation, quality and customer satisfaction. Our team of highly skilled professionals uses the latest technologies to deliver superior results.",
      "Our customised approach ensures every client receives solutions that are not only effective but also scalable and future-proof, and we stay by their side long after go-live.",
    ],
    /** These count up from 0 when they scroll into view. */
    stats: [
      { value: "50+", label: "Projects" },
      { value: "10+", label: "Countries" },
      { value: "15+", label: "Active clients" },
      { value: "10+", label: "Years" },
    ],
    // TODO: the design's second photo (hands stacked together) is not in the
    // project yet; the office photo stands in for it.
    collage: {
      main: "/assets/images/process/discover.png",
      inset: "/assets/images/service-page/office.jpg",
      badge: { title: "4 regions", text: "One delivery standard" },
    },
  },

  mission: {
    title: "Our mission",
    icon: "target" as GlyphName,
    text: "To empower businesses through innovative technology solutions, understanding each client’s unique challenges and delivering high-quality services that drive efficiency, enhance security and bring growth.",
  },
  vision: {
    title: "Our vision",
    icon: "rocket" as GlyphName,
    text: "To be the most trusted technology partner for growing businesses worldwide, known for solutions that are intelligent, scalable and built to last.",
  },

  values: {
    eyebrow: "Our values",
    heading: { lead: "The principles behind ", highlight: "every project" } as HighlightedHeading,
    items: [
      { icon: "sparkles" as GlyphName, title: "Innovation", text: "We adopt the latest technologies, and use them responsibly." },
      { icon: "award" as GlyphName, title: "Quality", text: "Clean code, rigorous testing and documented delivery." },
      { icon: "heart" as GlyphName, title: "Customer first", text: "Your outcomes define our success, not the hours we bill." },
      { icon: "shield" as GlyphName, title: "Integrity", text: "Transparent pricing, honest advice and secure practices." },
    ],
  },

  leadership: {
    eyebrow: "Leadership",
    heading: { lead: "The people behind ", highlight: "Techvation" } as HighlightedHeading,
    action: { label: "Join our team", href: "/careers" },
    // TODO: replace with the real team (name, photo, LinkedIn and email).
    members: [
      { name: "[Team member name]", role: "Chief Executive Officer", photo: "/assets/images/popup/consultant.png", linkedin: "https://www.linkedin.com", email: "info@thetechvation.com" },
      { name: "[Team member name]", role: "Head of Delivery", photo: "/assets/images/cta/consultant-1.png", linkedin: "https://www.linkedin.com", email: "info@thetechvation.com" },
      { name: "[Team member name]", role: "Lead Solution Architect", photo: "/assets/images/cta/consultant-2.png", linkedin: "https://www.linkedin.com", email: "info@thetechvation.com" },
      { name: "[Team member name]", role: "Head of Client Success", photo: "/assets/images/cta/consultant-3.png", linkedin: "https://www.linkedin.com", email: "info@thetechvation.com" },
    ],
  },

  presence: {
    eyebrow: "Global presence",
    heading: { lead: "Serving clients across ", highlight: "four regions" } as HighlightedHeading,
    description:
      "Distributed delivery teams mean overlapping hours with your business, wherever you are.",
    image: "/assets/images/about/globe.png",
    regions: [
      { name: "North America", detail: "Wyoming, USA · +1 (307) 855-0572", phone: "tel:+13078550572" },
      { name: "Asia Pacific", detail: "Islamabad, Pakistan · +92 344 5450666", phone: "tel:+923445450666" },
      { name: "Middle East", detail: "Remote delivery & on-site visits" },
      { name: "Africa", detail: "Remote delivery & on-site visits" },
    ],
  },
};
