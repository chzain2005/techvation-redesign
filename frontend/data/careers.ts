/*
 * ---------------------------------------------------------------------------
 * CAREERS PAGE CONTENT  (Figma "05 · Careers")
 * ---------------------------------------------------------------------------
 * To add or remove a job, edit `positions` below. The department chips,
 * the location dropdown and the "6 open roles" count all follow the list.
 */

import type { GlyphName } from "@/components/Icon/Glyph";
import type { HighlightedHeading } from "./homepage";

const image = (name: string) => `/assets/images/careers/${name}`;

export type Department = "Consulting" | "Engineering" | "Data & AI" | "Sales";

export type Position = {
  title: string;
  department: Department;
  /** Shown as written. "Islamabad / Remote" matches both location filters. */
  location: string;
  type: string;
};

export const careersPage = {
  hero: {
    breadcrumb: "Careers",
    eyebrow: "We’re hiring",
    heading: { lead: "Build the future of business ", highlight: "technology with us" } as HighlightedHeading,
    description:
      "Work on global Microsoft, ERP and AI projects with a team that invests in your growth, certifications and well-being.",
    primaryAction: { label: "View Open Roles", href: "#open-positions" },
    secondaryAction: { label: "Life at Techvation", href: "#life-at-techvation" },
    image: image("hero.jpg"),
  },

  perks: {
    eyebrow: "Why Techvation",
    heading: { lead: "Perks that help you do ", highlight: "your best work" } as HighlightedHeading,
    items: [
      { icon: "globe" as GlyphName, title: "Global projects", text: "Work with clients across 4 regions and many industries." },
      { icon: "award" as GlyphName, title: "Paid certifications", text: "Microsoft, Odoo and cloud certifications on us." },
      { icon: "trending-up" as GlyphName, title: "Clear growth paths", text: "Transparent levels, reviews and mentorship." },
      { icon: "monitor" as GlyphName, title: "Hybrid & remote", text: "Flexible hours and remote-friendly roles." },
      { icon: "heart" as GlyphName, title: "Health coverage", text: "Medical cover for you and your family." },
      { icon: "sparkles" as GlyphName, title: "Learning budget", text: "Courses, conferences and AI tools every year." },
    ],
  },

  /** Six photos in two rows: wide, narrow, narrow / narrow, narrow, wide. */
  gallery: [1, 2, 3, 4, 5, 6].map((n) => image(`culture-${n}.jpg`)),

  positions: {
    eyebrow: "Open positions",
    heading: { lead: "Find your ", highlight: "next role" } as HighlightedHeading,
    /** "6 open roles" / "1 open role" */
    countLabel: (count: number) => `${count} open ${count === 1 ? "role" : "roles"}`,
    allLabel: "All",
    departments: ["Consulting", "Engineering", "Data & AI", "Sales"] as Department[],
    locationLabel: "Location",
    allLocations: "All locations",
    locations: ["Islamabad", "Remote"],
    applyLabel: "Apply now",
    emptyText: "No open roles match these filters right now. Send a general application below.",
    list: [
      { title: "Senior Dynamics 365 Functional Consultant", department: "Consulting", location: "Islamabad / Remote", type: "Full-time" },
      { title: "Odoo Developer (Python)", department: "Engineering", location: "Islamabad", type: "Full-time" },
      { title: "Full-Stack Developer (React / Node.js)", department: "Engineering", location: "Remote", type: "Full-time" },
      { title: "Power BI Developer", department: "Data & AI", location: "Islamabad / Remote", type: "Full-time" },
      { title: "AI Engineer (LLM & RAG)", department: "Data & AI", location: "Remote", type: "Full-time" },
      { title: "Business Development Executive", department: "Sales", location: "Islamabad", type: "Full-time" },
    ] as Position[],
  },

  process: {
    eyebrow: "Hiring process",
    heading: { lead: "Simple, respectful ", highlight: "and quick" } as HighlightedHeading,
    steps: [
      { title: "Apply", text: "Send your CV for an open role or a general application." },
      { title: "Intro call", text: "A 20-minute chat about you and the role." },
      { title: "Skills interview", text: "A practical, real-world technical conversation." },
      { title: "Offer", text: "A clear offer, usually within 2 weeks of applying." },
    ],
  },

  application: {
    eyebrow: "General application",
    heading: { lead: "Don’t see the right role? Send ", highlight: "us your CV", tail: "." } as HighlightedHeading,
    description:
      "We’re always looking for talented consultants, engineers and AI specialists. We’ll reach out when a matching role opens.",
    fields: {
      name: { label: "Full name", placeholder: "John Smith" },
      email: { label: "Email", placeholder: "john@email.com" },
      area: { label: "Area of interest", placeholder: "Select a department", other: "Other" },
    },
    /** Shown above the form after "Apply now" was clicked on a role. */
    applyingFor: "Applying for",
    upload: {
      title: "Upload CV (PDF, max 5 MB)",
      hint: "Drag & drop or browse",
      maxBytes: 5 * 1024 * 1024,
      wrongType: "Please choose a PDF file.",
      tooBig: "That file is larger than 5 MB.",
      remove: "Remove",
    },
    submitLabel: "Submit Application",
    successTitle: "Application received!",
    successText: "Thanks for your interest. Our team will be in touch if there’s a match.",
  },
};
