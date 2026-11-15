/*
 * ---------------------------------------------------------------------------
 * PLAIN-ENGLISH ADMIN
 * ---------------------------------------------------------------------------
 * Applied to every collection and global in payload.config.ts, so the admin
 * speaks the editor's language without repeating labels everywhere:
 *
 *   - fields without a label get a plain-English one (e.g. "eyebrow" ->
 *     "Small label above the heading")
 *   - list rows are named after their content and start folded
 *   - the developer-only "API" tab is hidden
 */
import type { Block, CollectionConfig, Field, GlobalConfig, Tab } from "payload";

/** Plain-English labels for the field names used across the site. */
const LABELS: Record<string, string> = {
  eyebrow: "Small label above the heading",
  eyebrowShort: "Small label (short version for phones)",
  heading: "Heading",
  title: "Title",
  titleShort: "Title (short version for phones)",
  subtitle: "Subtitle",
  subtitleShort: "Subtitle (short version for phones)",
  description: "Text",
  descriptionShort: "Text (short version for phones)",
  text: "Text",
  label: "Text",
  href: "Link",
  badge: "Small tag",
  note: "Small note",
  hint: "Hint text",
  breadcrumb: "Page name in the breadcrumb",
  image: "Photo",
  photo: "Photo",
  submitLabel: "Button text",
  actionLabel: "Button text",
  primaryLabel: "Main button text",
  primaryAction: "Main button",
  secondaryAction: "Second button",
  action: "Button",
  placeholder: "Hint text inside the box",
  successTitle: "Thank-you title",
  successText: "Thank-you message",
  emptyText: "Text when nothing matches",
  points: "Bullet points",
  steps: "Steps",
  stats: "Numbers",
  value: "Number",
  items: "Items",
  outcome: "Result",
  deliverables: "What you get",
  tags: "Tags",
  icon: "Icon",
  name: "Name",
  role: "Job title",
  location: "Location",
  email: "Email",
  phone: "Phone",
  question: "Question",
  answer: "Answer",
  bestFor: "Best for",
  popular: "Mark as most popular",
  outlineWord: "Big outlined word",
  pills: "Floating labels",
  regions: "Regions",
  paragraphs: "Paragraphs",
  lines: "Lines",
  cards: "Cards",
  models: "Engagement models",
  reasons: "Reasons",
  columns: "Columns",
  links: "Links",
  categories: "Practice areas",
};

/** "outcomeLabel" -> "Outcome label" (fallback when a name is not in LABELS). */
const humanise = (name: string) =>
  name.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase()).toLowerCase().replace(/^./, (c) => c.toUpperCase());

function friendlyFields(fields: Field[]): Field[] {
  return fields.map((field) => {
    const f = { ...field } as Field & Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

    if ("name" in f && f.name && f.label === undefined && f.type !== "ui") {
      f.label = LABELS[f.name] ?? humanise(f.name);
    }

    if (f.type === "array") {
      f.admin = {
        initCollapsed: true,
        ...f.admin,
        components: {
          RowLabel: {
            path: "/cms/components/RowLabel#ItemRowLabel",
            clientProps: { fallback: f.labels?.singular ?? "Item" },
          },
          ...f.admin?.components,
        },
      };
    }

    if ("fields" in f && Array.isArray(f.fields)) f.fields = friendlyFields(f.fields);
    if (f.type === "tabs") {
      f.tabs = f.tabs.map((tab: Tab) => ({ ...tab, fields: friendlyFields(tab.fields) }));
    }
    if (f.type === "blocks") {
      f.blocks = f.blocks.map((block: Block) => ({ ...block, fields: friendlyFields(block.fields) }));
    }
    return f;
  });
}

export function friendlyCollection(config: CollectionConfig): CollectionConfig {
  return { ...config, admin: { hideAPIURL: true, ...config.admin }, fields: friendlyFields(config.fields) };
}

export function friendlyGlobal(config: GlobalConfig): GlobalConfig {
  return { ...config, admin: { hideAPIURL: true, ...config.admin }, fields: friendlyFields(config.fields) };
}
