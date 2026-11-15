import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";
import { glyphField, headingField, imageField, slugField, stringList } from "../fields";
import { revalidateCollection } from "../hooks";

/**
 * One document per service. Each gets its own page at /services/<slug>, a
 * card on the Services page, an entry in the mega menu and (if picked on
 * the Homepage global) a card on the homepage.
 *
 * Drag the rows in the list view to change the order services appear in.
 */
export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "Service", plural: "Services" },
  orderable: true,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "updatedAt"],
    group: "Services",
    description: "Each service has its own page on the website. Drag the ⠿ handle to change the order.",
    preview: (doc) => `/services/${doc.slug}`,
  },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  hooks: revalidateCollection("services"),
  fields: [
    { name: "title", label: "Service name", type: "text", required: true, admin: { description: 'Full name, e.g. "MS Dynamics 365".' } },
    slugField("service name", "/services"),
    {
      name: "category",
      label: "Practice area",
      type: "relationship",
      relationTo: "service-categories",
      required: true,
      admin: { position: "sidebar" },
    },
    glyphField("icon", { admin: { position: "sidebar" } }),
    {
      type: "tabs",
      tabs: [
        {
          label: "Basics",
          description: "How the service appears in menus and on cards around the site.",
          fields: [
            imageField("image", "Photo"),
            { name: "menuDescription", label: "Short line for the menu", type: "text", required: true, admin: { description: 'Shown under the name in the "Services" drop-down menu.' } },
            { name: "cardDescription", label: "Short line for the Services page", type: "text", required: true, admin: { description: "Shown on the card on the Services page." } },
            {
              name: "homeCard",
              label: "Homepage card",
              type: "group",
              fields: [
                { name: "tag", label: "Small tag on the photo", type: "text", required: true, admin: { description: 'e.g. "Enterprise".' } },
                { name: "description", label: "Text", type: "text", required: true },
                { name: "descriptionShort", label: "Text (short version for phones)", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Top of page",
          name: "hero",
          description: "The dark section at the top of the service page.",
          fields: [
            headingField(),
            { name: "description", label: "Text", type: "textarea", required: true },
            { name: "formTitle", label: "Title of the form on the right", type: "text", required: true },
          ],
        },
        {
          label: "Results",
          description: 'The three big numbers under the top section, e.g. "40%" "faster sales cycles".',
          fields: [
            {
              name: "outcomes",
              label: "Results",
              type: "array",
              labels: { singular: "Result", plural: "Results" },
              maxRows: 3,
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", label: "Number", type: "text", required: true, admin: { width: "35%" } },
                    { name: "label", label: "What it means", type: "text", required: true, admin: { width: "65%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Overview",
          name: "overview",
          description: 'The "Overview" section: what the service is, with a photo.',
          fields: [
            headingField(),
            { name: "description", label: "Text", type: "textarea", required: true },
            stringList("points", "Bullet points (with check marks)"),
            { name: "badge", label: "Text on the white badge", type: "text", required: true, admin: { description: "Shown on the small white card over the photo." } },
          ],
        },
        {
          label: "What we deliver",
          name: "capabilities",
          description: 'The "What we deliver" cards.',
          fields: [
            headingField(),
            {
              name: "items",
              label: "Cards",
              type: "array",
              labels: { singular: "Card", plural: "Cards" },
              fields: [
                glyphField(),
                { name: "title", type: "text", required: true },
                { name: "text", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Tools, FAQs & related",
          fields: [
            stringList("tools", "Platforms & tools", { labels: { singular: "Tool", plural: "Tools" } }),
            {
              name: "faqs",
              label: "Questions & answers",
              type: "array",
              labels: { singular: "Question", plural: "Questions" },
              admin: { components: { RowLabel: "/cms/components/RowLabel#QuestionRowLabel" } },
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
            {
              name: "related",
              label: "Related services",
              type: "relationship",
              relationTo: "services",
              hasMany: true,
              maxRows: 3,
              admin: { description: 'Up to three services suggested at the bottom of the page.' },
              filterOptions: ({ id }) => ({ id: { not_equals: id } }),
            },
          ],
        },
      ],
    },
  ],
};
