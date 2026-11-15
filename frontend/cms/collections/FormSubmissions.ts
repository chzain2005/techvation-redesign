/*
 * The inbox: every form sent on the website (contact, consultations,
 * bookings, job applications, newsletter sign-ups…). Visitors cannot read
 * or change these; the forms save through a server action
 * (lib/forms/actions.ts) and only signed-in users see them here.
 */
import type { CollectionConfig } from "payload";
import { signedIn } from "../access";

/** The forms on the website, with the name editors see. */
export const FORM_KINDS = [
  { value: "contact", label: "Contact page" },
  { value: "consultation", label: "Free consultation (pop-up)" },
  { value: "home-consultation", label: "Free consultation (homepage)" },
  { value: "service-consultation", label: "Free consultation (service page)" },
  { value: "article-consultation", label: "Consultation (blog article)" },
  { value: "booking", label: "Schedule a call" },
  { value: "job-application", label: "Job application" },
  { value: "newsletter", label: "Newsletter sign-up" },
  { value: "solutions-notify", label: "Solutions: notify me" },
] as const;

export type FormKind = (typeof FORM_KINDS)[number]["value"];

const readOnly = { readOnly: true };

export const FormSubmissions: CollectionConfig = {
  slug: "form-submissions",
  labels: { singular: "Form submission", plural: "Form submissions" },
  admin: {
    group: "Inbox",
    useAsTitle: "name",
    defaultColumns: ["name", "form", "email", "status", "createdAt"],
    description:
      'Everything sent through the forms on the website, newest first. Open one to read it, then set its status to "In progress" or "Done".',
    listSearchableFields: ["name", "email", "company", "message"],
  },
  defaultSort: "-createdAt",
  access: {
    // Only the website's server action creates submissions (it bypasses this).
    create: () => false,
    read: signedIn,
    update: signedIn,
    delete: signedIn,
  },
  fields: [
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "In progress", value: "in-progress" },
        { label: "Done", value: "done" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "notes",
      label: "Internal notes",
      type: "textarea",
      admin: { position: "sidebar", description: "Only your team sees this, e.g. who is following up." },
    },
    {
      name: "form",
      label: "Form",
      type: "select",
      required: true,
      options: FORM_KINDS.map(({ value, label }) => ({ value, label })),
      admin: { ...readOnly, position: "sidebar" },
    },
    {
      name: "page",
      label: "Sent from page",
      type: "text",
      admin: { ...readOnly, position: "sidebar" },
    },
    {
      type: "row",
      fields: [
        { name: "name", type: "text", admin: { ...readOnly, width: "50%" } },
        { name: "email", type: "email", admin: { ...readOnly, width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "phone", label: "Phone / WhatsApp", type: "text", admin: { ...readOnly, width: "50%" } },
        { name: "company", type: "text", admin: { ...readOnly, width: "50%" } },
      ],
    },
    {
      name: "service",
      label: "Service / role",
      type: "text",
      admin: { ...readOnly, description: "The service they asked about, or the job they applied for." },
    },
    { name: "message", type: "textarea", admin: readOnly },
    {
      name: "details",
      label: "Other answers",
      type: "json",
      admin: { ...readOnly, description: "Everything else they filled in (budget, timeline, chosen time…)." },
    },
    {
      name: "cv",
      label: "CV",
      type: "upload",
      relationTo: "cv-uploads",
      admin: { ...readOnly, description: "Click the file to open it." },
    },
  ],
};
