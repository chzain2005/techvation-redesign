/*
 * ---------------------------------------------------------------------------
 * BLOG CONTENT  (Figma "07 · Blogs")
 * ---------------------------------------------------------------------------
 * The list of articles shown on /blog. Add an article by adding an object
 * to `posts`; the newest article marked `featured` gets the big card.
 * Later these can come from the CMS with the same shape.
 */

import type { HighlightedHeading } from "./homepage";

const image = (name: string) => `/assets/images/blog/${name}`;

export type BlogCategory = "Dynamics 365" | "ERP & Odoo" | "Power BI" | "Development" | "AI & ML" | "Company News";

export type BlogPost = {
  slug: string;
  title: string;
  /** For the featured card: part of the title shown in gradient. */
  titleHighlight?: string;
  excerpt: string;
  category: BlogCategory;
  /**
   * "2026-10" or "2026-11-10" (used for sorting). Cards show "Oct 2026";
   * the article page shows the full date when the day is known.
   */
  date: string;
  readMinutes: number;
  cover: string;
  author: { name: string; avatar: string };
  featured?: boolean;
};

const team = (avatar: number) => ({ name: "Techvation Team", avatar: image(`avatar-${avatar}.png`) });

export const blogPage = {
  hero: {
    eyebrow: "Techvation insights",
    heading: { lead: "Ideas, guides and news ", highlight: "on business technology" } as HighlightedHeading,
    description:
      "Practical articles on Dynamics 365, ERP, Power BI, development and AI, written by our consultants.",
    search: {
      label: "Search articles",
      placeholder: "Search articles…",
      submitLabel: "Search",
      resultLabel: (count: number, query: string) =>
        `${count} ${count === 1 ? "article" : "articles"} for “${query}”`,
      clearLabel: "Clear search",
    },
  },
  featuredBadge: "Featured",
  readLabel: "Read Article",
  allLabel: "All",
  categories: ["Dynamics 365", "ERP & Odoo", "Power BI", "Development", "AI & ML", "Company News"] as BlogCategory[],
  sort: { label: "Sort", newest: "Newest", oldest: "Oldest" },
  /** Articles per page; the page buttons appear when there are more. */
  pageSize: 9,
  emptyText: "No articles match yet. Try another category or search word.",
  /** "8 min read" on the featured card, "8 min" on the small cards. */
  readTime: (minutes: number, long = false) => `${minutes} min${long ? " read" : ""}`,
  newsletter: {
    title: "Get our monthly tech digest",
    text: "One email a month. Practical insights, no spam.",
    placeholder: "Your work email",
    label: "Work email",
    submitLabel: "Subscribe",
    successText: "You’re subscribed! Look out for our next digest.",
  },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "agentic-ai-back-office-operations",
    title: "How agentic AI is changing back-office operations in 2026",
    titleHighlight: "operations in 2026",
    excerpt:
      "From invoice processing to customer follow-ups, AI agents now complete multi-step work across ERP and CRM systems. Here’s where they deliver ROI first, and how to deploy them safely.",
    category: "AI & ML",
    date: "2026-11-10",
    readMinutes: 8,
    cover: image("cover-agentic-ai-back-office.jpg"),
    author: { name: "Techvation AI Team", avatar: image("author-ai-team-64.png") },
    featured: true,
  },
  {
    slug: "power-bi-dashboards-operations",
    title: "10 Power BI dashboards every operations leader should have",
    excerpt: "Templates and KPIs that turn ERP data into daily decisions.",
    category: "Power BI",
    date: "2026-10",
    readMinutes: 6,
    cover: image("cover-power-bi-dashboards-operations.jpg"),
    author: team(1),
  },
  {
    slug: "dynamics-365-vs-odoo",
    title: "Dynamics 365 vs Odoo: choosing the right ERP for a growing business",
    excerpt: "A side-by-side look at cost, flexibility and time-to-value.",
    category: "ERP & Odoo",
    date: "2026-10",
    readMinutes: 10,
    cover: image("cover-dynamics-365-vs-odoo.jpg"),
    author: team(2),
  },
  {
    slug: "outgrown-spreadsheets",
    title: "5 signs your business has outgrown spreadsheets",
    excerpt: "When manual processes start costing you more than an ERP.",
    category: "Dynamics 365",
    date: "2026-09",
    readMinutes: 5,
    cover: image("cover-outgrown-spreadsheets.jpg"),
    author: team(3),
  },
  {
    slug: "react-native-vs-flutter",
    title: "React Native vs Flutter in 2026: what we recommend",
    excerpt: "Lessons from shipping cross-platform apps for clients.",
    category: "Development",
    date: "2026-09",
    readMinutes: 7,
    cover: image("cover-react-native-vs-flutter.jpg"),
    author: team(1),
  },
  {
    slug: "web-app-security-checklist",
    title: "A practical security checklist for business web apps",
    excerpt: "The controls we put in every project by default.",
    category: "Development",
    date: "2026-08",
    readMinutes: 6,
    cover: image("cover-web-app-security-checklist.jpg"),
    author: team(2),
  },
  {
    slug: "rag-explained",
    title: "RAG explained: grounding AI in your company’s knowledge",
    excerpt: "How retrieval keeps AI answers accurate and up to date.",
    category: "AI & ML",
    date: "2026-08",
    readMinutes: 9,
    cover: image("cover-rag-explained.jpg"),
    author: team(3),
  },
  {
    slug: "online-store-erp-integration",
    title: "Connecting your online store to ERP without the headaches",
    excerpt: "Inventory, orders and accounting, finally in sync.",
    category: "ERP & Odoo",
    date: "2026-07",
    readMinutes: 6,
    cover: image("cover-online-store-erp-integration.jpg"),
    author: team(1),
  },
  {
    slug: "business-central-cloud-migration",
    title: "Business Central in the cloud: migration roadmap",
    excerpt: "A step-by-step plan for moving from on-premise.",
    category: "Dynamics 365",
    date: "2026-07",
    readMinutes: 8,
    cover: image("cover-business-central-cloud-migration.jpg"),
    author: team(2),
  },
  {
    slug: "delivery-framework",
    title: "Inside our delivery framework: how we ship on time",
    excerpt: "Sprints, demos and the rituals that keep projects predictable.",
    category: "Company News",
    date: "2026-06",
    readMinutes: 4,
    cover: image("cover-delivery-framework.jpg"),
    author: team(3),
  },
];

/* --------------------------------- Helpers ------------------------------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-10" or "2026-10-14" -> "Oct 2026" (cards) */
export function formatPostDate(date: string) {
  const [year, month] = date.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "2026-11-10" -> "Nov 10, 2026"; without a day -> "Nov 2026" (article page) */
export function formatLongDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return day ? `${MONTHS[month - 1]} ${day}, ${year}` : `${MONTHS[month - 1]} ${year}`;
}

/**
 * Three articles to suggest under an article: the same category first,
 * then the newest of the rest. (The posts come from the CMS; the list above
 * is what the CMS was first filled with.)
 */
export function relatedPosts(post: BlogPost, posts: BlogPost[], count = 3) {
  const others = posts
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => b.date.localeCompare(a.date));
  return [
    ...others.filter((other) => other.category === post.category),
    ...others.filter((other) => other.category !== post.category),
  ].slice(0, count);
}

/** The address of an article, e.g. "/blog/rag-explained". */
export const postHref = (slug: string) => `/blog/${slug}`;
