/*
 * Who gets an email when someone sends a form on the website
 * (sent by lib/forms/alerts.ts). Edited under Settings → Email alerts.
 */
import type { ArrayField, GlobalConfig } from "payload";
import { signedIn } from "../access";

const emailList = (name: string, label: string, description: string): ArrayField => ({
  name,
  label,
  type: "array",
  labels: { singular: "Email address", plural: "Email addresses" },
  admin: { description, initCollapsed: false },
  fields: [{ name: "email", label: "Email address", type: "email", required: true }],
});

export const Notifications: GlobalConfig = {
  slug: "notifications",
  label: "Email alerts",
  admin: {
    group: "Settings",
    description:
      "Get an email whenever someone sends a form on the website. Press Reply in that email to answer the visitor directly.",
  },
  access: { read: signedIn, update: signedIn },
  fields: [
    {
      name: "enabled",
      label: "Send email alerts",
      type: "checkbox",
      defaultValue: true,
    },
    emailList(
      "recipients",
      "Send alerts to",
      "Everyone here gets an email for each new request. If the list is empty, alerts go to info@thetechvation.com.",
    ),
    emailList(
      "jobRecipients",
      "Job applications go to (optional)",
      "If you add addresses here, job applications go to them instead of the list above, e.g. your HR team.",
    ),
    {
      name: "newsletterAlerts",
      label: "Also email for newsletter and notify-me sign-ups",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Off by default: sign-ups are still saved in the inbox." },
    },
  ],
};
