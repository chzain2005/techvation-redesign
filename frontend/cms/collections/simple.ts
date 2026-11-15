/*
 * The smaller collections: blog categories, FAQ groups, jobs, team members,
 * client logos, industries and solution suites. In each list you can drag
 * the rows to change the order they appear on the site.
 */
import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";
import { anchorField, glyphField, imageField, industryIconField, stringList } from "../fields";
import { revalidateCollection } from "../hooks";

const editable = { read: anyone, create: signedIn, update: signedIn, delete: signedIn };

export const BlogCategories: CollectionConfig = {
  slug: "blog-categories",
  labels: { singular: "Blog category", plural: "Blog categories" },
  orderable: true,
  admin: { useAsTitle: "name", group: "Blog", description: "The category buttons on the blog. Drag the ⠿ handle to change the order." },
  access: editable,
  hooks: revalidateCollection("blog-categories"),
  fields: [{ name: "name", type: "text", required: true, unique: true }],
};

export const FaqCategories: CollectionConfig = {
  slug: "faq-categories",
  labels: { singular: "FAQ topic", plural: "FAQs" },
  orderable: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name"],
    group: "Company info",
    description: 'Questions are grouped by topic (e.g. "General", "Pricing"). Open a topic to edit its questions.',
  },
  access: editable,
  hooks: revalidateCollection("faq-categories"),
  fields: [
    { name: "name", label: "Topic name", type: "text", required: true },
    anchorField(),
    glyphField(),
    {
      name: "questions",
      type: "array",
      labels: { singular: "Question", plural: "Questions" },
      minRows: 1,
      admin: {
        initCollapsed: true,
        description: "Click a question to open it. Drag the ⠿ handle to change the order.",
        components: { RowLabel: "/cms/components/RowLabel#QuestionRowLabel" },
      },
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
  ],
};

export const Jobs: CollectionConfig = {
  slug: "jobs",
  labels: { singular: "Job opening", plural: "Job openings" },
  orderable: true,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "department", "location", "open"],
    group: "Careers",
    description: 'Open roles on the Careers page. To hide a filled role without deleting it, untick "Show on the website".',
  },
  access: editable,
  hooks: revalidateCollection("jobs"),
  fields: [
    { name: "title", label: "Job title", type: "text", required: true },
    {
      type: "row",
      fields: [
        {
          name: "department",
          type: "text",
          required: true,
          admin: {
            width: "50%",
            description: "To add a department, go to Website pages → Careers page → Open positions.",
            components: { Field: "/cms/components/DepartmentSelect#DepartmentSelect" },
          },
          validate: async (value: string | null | undefined, { req }: { req: import("payload").PayloadRequest }) => {
            if (!value) return "Required";
            const careers = (await req.payload.findGlobal({ slug: "careers-page", depth: 0, req })) as {
              positions?: { departments?: Array<{ text: string }> };
            };
            const names = careers.positions?.departments?.map((d) => d.text) ?? [];
            return names.length === 0 || names.includes(value) || `Please choose one of the departments: ${names.join(", ")}`;
          },
        },
        {
          name: "location",
          type: "text",
          required: true,
          admin: { width: "50%", description: 'e.g. "Islamabad", "Remote" or "Islamabad / Remote".' },
        },
      ],
    },
    {
      name: "type",
      label: "Job type",
      type: "select",
      required: true,
      defaultValue: "Full-time",
      options: ["Full-time", "Part-time", "Contract", "Internship"],
    },
    {
      name: "open",
      label: "Show on the website",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Untick to hide this role without deleting it." },
    },
  ],
};

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  labels: { singular: "Team member", plural: "Team" },
  orderable: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role"],
    group: "Company info",
    description: 'People in the "Leadership" section of the About Us page. Drag the ⠿ handle to change the order.',
  },
  access: editable,
  hooks: revalidateCollection("team-members"),
  fields: [
    { type: "row", fields: [
      { name: "name", type: "text", required: true, admin: { width: "50%" } },
      { name: "role", type: "text", required: true, admin: { width: "50%" } },
    ] },
    imageField("photo"),
    { type: "row", fields: [
      { name: "linkedin", label: "LinkedIn profile link", type: "text", admin: { width: "50%" } },
      { name: "email", type: "email", admin: { width: "50%" } },
    ] },
  ],
};

export const Clients: CollectionConfig = {
  slug: "clients",
  labels: { singular: "Client logo", plural: "Client logos" },
  orderable: true,
  admin: {
    useAsTitle: "name",
    group: "Company info",
    description: 'The scrolling "Trusted by" logos on the homepage and About page. Drag the ⠿ handle to change the order.',
  },
  access: editable,
  hooks: revalidateCollection("clients"),
  fields: [
    { name: "name", label: "Client name", type: "text", required: true },
    { name: "logo", label: "Logo", type: "upload", relationTo: "media", required: true, admin: { description: "A PNG with a transparent background works best." } },
  ],
};

const industryIcon = industryIconField();

export const Industries: CollectionConfig = {
  slug: "industries",
  labels: { singular: "Industry", plural: "Industries" },
  orderable: true,
  admin: { useAsTitle: "name", group: "Company info", description: 'The "Industries we serve" section of the homepage. Drag the ⠿ handle to change the order.' },
  access: editable,
  hooks: revalidateCollection("industries"),
  fields: [
    { name: "name", type: "text", required: true },
    { name: "description", type: "text", required: true },
    stringList("tags", "Tags"),
    { name: "exploreLabel", label: "Link text", type: "text", required: true },
    {
      name: "href",
      label: "Link goes to",
      type: "text",
      required: true,
      defaultValue: "/contact",
    },
    imageField("image"),
    industryIcon,
  ],
};

export const Solutions: CollectionConfig = {
  slug: "solutions",
  labels: { singular: "Solution suite", plural: "Solution suites" },
  orderable: true,
  admin: { useAsTitle: "title", group: "Company info", description: 'The "sneak peek" cards on the Solutions (coming soon) page.' },
  access: editable,
  hooks: revalidateCollection("solutions"),
  fields: [
    { name: "title", type: "text", required: true },
    { name: "text", type: "text", required: true },
    industryIcon,
    imageField("image"),
  ],
};
