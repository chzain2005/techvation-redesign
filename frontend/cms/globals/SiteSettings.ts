import type { ArrayField, GlobalConfig } from "payload";
import { signedIn } from "../access";
import { headingField, iconFileField, linkField, stringList } from "../fields";
import { revalidateGlobal } from "../hooks";
import { optionalText, PAGES_GROUP, text, textarea } from "./helpers";

const linkColumns = (name: string, label: string, description: string): ArrayField => ({
  name,
  label,
  type: "array",
  admin: { description },
  fields: [
    text("title"),
    {
      name: "links",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", required: true, admin: { width: "35%" } },
            { name: "href", type: "text", required: true, admin: { width: "35%" } },
            { name: "badge", type: "text", admin: { width: "15%", description: 'e.g. "SOON"' } },
            { name: "arrow", type: "checkbox", admin: { width: "15%" } },
          ],
        },
      ],
    },
  ],
});

/** Navbar and footer: shown on every page. */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Menu & footer (every page)",
  admin: {
    group: PAGES_GROUP,
    description: "The top menu bar and the footer, shown on every page: links, contact details and social media.",
    preview: () => "/",
  },
  access: { read: () => true, update: signedIn },
  hooks: revalidateGlobal("site-settings"),
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "navbar",
          label: "Top menu",
          fields: [
            {
              name: "links",
              label: "Menu links",
              type: "array",
              labels: { singular: "Link", plural: "Links" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", label: "Text", type: "text", required: true, admin: { width: "30%" } },
                    { name: "href", label: "Goes to", type: "text", required: true, admin: { width: "30%", description: "e.g. /about" } },
                    { name: "badge", label: "Small tag", type: "text", admin: { width: "20%", description: 'Optional, e.g. "SOON"' } },
                    {
                      name: "hasDropdown",
                      label: "Opens the services menu",
                      type: "checkbox",
                      admin: { width: "20%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "footer",
          label: "Footer",
          fields: [
            {
              name: "cta",
              label: "Coloured band at the top of the footer",
              type: "group",
              fields: [headingField(), text("description")],
            },
            textarea("about", "Short company description"),
            textarea("aboutShort", "Short company description (short version for phones)"),
            {
              name: "social",
              label: "Social media links",
              type: "array",
              labels: { singular: "Social link", plural: "Social links" },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "name",
                      type: "select",
                      required: true,
                      admin: { width: "30%" },
                      options: ["LinkedIn", "Facebook", "Instagram", "X", "YouTube"],
                    },
                    { name: "href", label: "Profile link (https://…)", type: "text", required: true, admin: { width: "70%" } },
                  ],
                },
              ],
            },
            linkColumns("columns", "Link columns (computers)", "The columns of links in the footer on large screens."),
            linkColumns("columnsCompact", "Link columns (phones)", "The shorter columns of links on phones and tablets."),
            {
              name: "contact",
              label: "Contact details",
              type: "group",
              fields: [
                text("title"),
                {
                  name: "items",
                  label: "Lines",
                  type: "array",
                  labels: { singular: "Line", plural: "Lines" },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { ...iconFileField("icon", ["phone", "mail", "map-pin"], "16"), admin: { width: "20%" } },
                        { name: "label", type: "text", required: true, admin: { width: "40%" } },
                        {
                          name: "href",
                          type: "text",
                          label: "Goes to (optional)",
                          admin: { width: "40%", description: 'e.g. "tel:+13078550572" or "mailto:info@thetechvation.com"' },
                        },
                      ],
                    },
                  ],
                },
                linkField("link", "Contact link"),
              ],
            },
            {
              name: "newsletter",
              label: "Newsletter sign-up",
              type: "group",
              fields: [
                text("title"),
                text("titleShort", "Title (short version for phones)"),
                text("description"),
                text("placeholder"),
                text("submitLabel"),
              ],
            },
            text("copyright", "Copyright line"),
            {
              name: "legalLinks",
              label: "Links at the very bottom",
              type: "array",
              labels: { singular: "Link", plural: "Links" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", label: "Text", type: "text", required: true, admin: { width: "50%" } },
                    { name: "href", label: "Goes to", type: "text", required: true, admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "seo",
          label: "Google & sharing",
          fields: [
            optionalText("title", "Website title in Google"),
            { name: "description", label: "Website description in Google", type: "textarea" },
            stringList("keywords", "Search keywords", { labels: { singular: "Keyword", plural: "Keywords" } }),
          ],
          description: "How the website appears in Google and when shared. Leave empty to keep the built-in text.",
        },
      ],
    },
  ],
};
