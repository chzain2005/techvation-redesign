import type { Block, CollectionConfig } from "payload";
import { publishedOrSignedIn, signedIn } from "../access";
import { imageField, slugField, stringList } from "../fields";
import { revalidateCollection } from "../hooks";

/*
 * The building blocks of an article body. Each matches one style in the
 * article design (components/ArticlePage/ArticleContent.tsx).
 */
const blocks: Block[] = [
  {
    slug: "lead",
    labels: { singular: "Intro paragraph (large)", plural: "Intro paragraphs" },
    fields: [{ name: "text", type: "textarea", required: true }],
  },
  {
    slug: "h2",
    labels: { singular: "Section heading", plural: "Section headings" },
    admin: { disableBlockName: true },
    fields: [
      {
        name: "text",
        type: "text",
        required: true,
        admin: { description: 'Also listed under "On this page".' },
      },
    ],
  },
  {
    slug: "p",
    labels: { singular: "Paragraph", plural: "Paragraphs" },
    fields: [{ name: "text", type: "textarea", required: true }],
  },
  {
    slug: "quote",
    labels: { singular: "Quote", plural: "Quotes" },
    fields: [{ name: "text", type: "textarea", required: true }],
  },
  {
    slug: "list",
    labels: { singular: "Check-mark list", plural: "Check-mark lists" },
    fields: [stringList("items", "Items", { minRows: 1 })],
  },
  {
    slug: "image",
    labels: { singular: "Image", plural: "Images" },
    fields: [imageField("image"), { name: "caption", type: "text" }],
  },
];

/** Blog articles, shown on /blog, /blog/<slug> and in the homepage "Insights" section. */
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    group: "Blog",
    description: 'Articles on the blog. Use "Save draft" while writing, and "Publish changes" when it is ready to go live.',
    preview: (doc) => `/blog/${doc.slug}`,
  },
  versions: { drafts: true, maxPerDoc: 20 },
  defaultSort: "-publishedAt",
  access: { read: publishedOrSignedIn, create: signedIn, update: signedIn, delete: signedIn },
  hooks: revalidateCollection("posts"),
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title", "/blog"),
    {
      name: "titleHighlight",
      label: "Coloured part of the title (optional)",
      type: "text",
      admin: { description: "Only used when the post is featured: copy the last words of the title here to show them in colour." },
    },
    { name: "excerpt", label: "Summary", type: "textarea", required: true, admin: { description: "One or two sentences shown on the article card." } },
    {
      name: "category",
      type: "relationship",
      relationTo: "blog-categories",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      label: "Publish date",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly", displayFormat: "MMM d, yyyy" } },
    },
    {
      name: "showDay",
      label: "Show the exact day",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: 'Off shows "Oct 2026" instead of "Oct 14, 2026".' },
    },
    { name: "readMinutes", label: "Reading time (minutes)", type: "number", required: true, min: 1, defaultValue: 5, admin: { position: "sidebar" } },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Feature this post",
      admin: { position: "sidebar", description: "The newest featured post is shown as the big card at the top of the blog." },
    },
    imageField("cover", "Cover image"),
    {
      name: "author",
      type: "group",
      fields: [
        { name: "name", type: "text", required: true, defaultValue: "Techvation Team" },
        imageField("avatar", "Photo (optional)", false),
      ],
    },
    {
      name: "content",
      label: "Article text",
      admin: { description: 'Build the article from blocks: press "Add" and pick paragraph, heading, list, quote or image.' },
      type: "blocks",
      required: true,
      blocks,
    },
    { name: "authorBio", label: "About the author (shown at the end)", type: "textarea" },
    {
      name: "cta",
      label: "Consultation box next to the article (optional)",
      type: "group",
      admin: { description: "Leave empty to use the standard text from Pages → Blog page." },
      fields: [
        { name: "title", type: "text" },
        { name: "buttonLabel", type: "text" },
      ],
    },
  ],
};
