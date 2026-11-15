/*
 * ---------------------------------------------------------------------------
 * SITE CONTENT FROM THE CMS
 * ---------------------------------------------------------------------------
 * Every page reads its text, lists and images through these functions. They
 * return the same shapes as the original files in /data (which still hold
 * the types, the small interface labels and the defaults), so the
 * components did not have to change much.
 *
 * Each function is cached ("use cache") under the tags of the collections
 * and globals it reads. Cached data must be plain (no functions), so the
 * few label functions of the /data files (e.g. "3 results for …") are put
 * back by a small wrapper outside the cache. Saving in the admin invalidates those tags (see
 * cms/hooks.ts), so changes appear on the next page view, without a rebuild.
 */
import "server-only";
import config from "@payload-config";
import { cacheLife, cacheTag } from "next/cache";
import { getPayload, type CollectionSlug, type GlobalSlug } from "payload";
import { aboutPage as aboutDefaults } from "@/data/about";
import { defaultArticleCta, type ArticleBlock, type ArticleContent } from "@/data/blog-articles";
import { blogPage as blogDefaults, formatLongDate, type BlogCategory, type BlogPost } from "@/data/blog";
import { careersPage as careersDefaults, type Department, type Position } from "@/data/careers";
import { contactPage as contactDefaults } from "@/data/contact";
import { faqPage as faqDefaults, type FaqCategory } from "@/data/faqs";
import * as home from "@/data/homepage";
import {
  megaMenu as megaMenuDefaults,
  serviceDetailPage as serviceDetailDefaults,
  servicesPage as servicesPageDefaults,
  type ServiceCategory,
  type ServiceDetail,
} from "@/data/services";
import { solutionsPage as solutionsDefaults } from "@/data/solutions";
import type { GlyphName } from "@/components/Icon/Glyph";
import { clientSafe, mediaUrl, mergeContent, normalize, withDefaults } from "./normalize";
import type { SiteContent } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any -- CMS documents are mapped field by field below. */
type Doc = Record<string, any>;

const cms = () => getPayload({ config });

/** Marks the current cached function as depending on these collections/globals. */
function tags(...slugs: Array<CollectionSlug | GlobalSlug>) {
  cacheLife("hours"); // safety net; saving in the admin refreshes immediately
  cacheTag(...slugs, "media");
}

async function all(collection: CollectionSlug, extra: { where?: any; sort?: string; depth?: number } = {}) {
  const payload = await cms();
  const { docs } = await payload.find({
    collection,
    limit: 0, // no limit
    pagination: false,
    sort: extra.sort ?? "_order",
    depth: extra.depth ?? 1,
    where: extra.where,
  });
  return docs as Doc[];
}

async function global(slug: GlobalSlug, depth = 1) {
  const payload = await cms();
  return (await payload.findGlobal({ slug, depth })) as Doc;
}

const idOf = (value: unknown) => String(typeof value === "object" && value !== null ? (value as Doc).id : value);

/* -------------------------------- Services ------------------------------- */

function toService(doc: Doc): ServiceDetail {
  const n = normalize(doc) as Doc;
  return {
    slug: doc.slug,
    title: doc.title,
    categoryId: idOf(doc.category),
    icon: doc.icon as GlyphName,
    image: mediaUrl(doc.image),
    menuDescription: doc.menuDescription,
    cardDescription: doc.cardDescription,
    hero: n.hero,
    outcomes: n.outcomes ?? [],
    overview: { ...n.overview, points: n.overview?.points ?? [] },
    capabilities: { ...n.capabilities, items: n.capabilities?.items ?? [] },
    tools: n.tools ?? [],
    faqs: n.faqs ?? [],
    related: ((doc.related ?? []) as unknown[])
      .map((related) => (typeof related === "object" && related ? (related as Doc).slug : undefined))
      .filter(Boolean),
  };
}

/** Line icons that also exist as a white 20px file (/assets/icons/<name>-white-20.svg). */
const WHITE_ICON_FILES = new Set([
  "bar-chart", "bot", "code", "cpu", "database", "headset", "layers", "megaphone", "rocket",
  "search", "sliders", "smartphone", "sparkles", "users", "wrench",
]);

/**
 * The card of a service (the shape of homepage.ts `Service`). `icon` is the
 * white icon file when one exists, otherwise the glyph name (see ServiceCard).
 */
function toHomeCard(doc: Doc): home.Service {
  return {
    title: doc.title,
    category: doc.homeCard?.tag ?? "",
    description: doc.homeCard?.description || doc.cardDescription,
    descriptionShort: doc.homeCard?.descriptionShort || doc.menuDescription,
    icon: WHITE_ICON_FILES.has(doc.icon) ? `/assets/icons/${doc.icon}-white-20.svg` : doc.icon,
    image: mediaUrl(doc.image),
    href: `/services/${doc.slug}`,
  };
}

/** All services and practice areas, in their admin order. */
export async function getServices() {
  "use cache";
  tags("services", "service-categories");
  const [serviceDocs, categoryDocs] = await Promise.all([all("services"), all("service-categories", { depth: 0 })]);
  // A service without a web address has no page to link to, so leave it out.
  const services = serviceDocs.filter((doc) => doc.slug).map(toService);
  /** Card of each service for the Services page, by slug. */
  const cards: Record<string, home.Service> = Object.fromEntries(
    serviceDocs.map((doc) => [doc.slug, { ...toHomeCard(doc), description: doc.cardDescription }]),
  );
  const categories: ServiceCategory[] = categoryDocs.map((doc) => ({
    id: String(doc.id),
    anchor: doc.anchor,
    name: doc.name,
    icon: doc.icon,
    description: doc.description,
    expertLabel: doc.expertLabel,
    services: services.filter((service) => service.categoryId === String(doc.id)).map((service) => service.slug),
    promo: doc.promo?.title ? { title: doc.promo.title, text: doc.promo.text ?? "" } : undefined,
  }));
  return { services, categories, cards };
}

export async function getService(slug: string) {
  const { services, categories } = await getServices();
  const service = services.find((s) => s.slug === slug);
  return service ? { service, category: categories.find((c) => c.id === service.categoryId), services } : undefined;
}

async function loadServicesPageContent() {
  "use cache";
  tags("services-page");
  const doc = await global("services-page");
  const servicesPage = withDefaults(servicesPageDefaults, { hero: doc.hero, engagement: doc.engagement });
  const megaMenu = withDefaults(megaMenuDefaults, {
    ...doc.megaMenu,
    columns: (doc.megaMenu?.columns ?? []).map((column: Doc) => (column.categories ?? []).map(idOf)),
  });
  const serviceDetailPage = withDefaults(serviceDetailDefaults, doc.detail);
  return clientSafe({ servicesPage, megaMenu, serviceDetailPage });
}

/** Text of the Services page, the mega menu and the shared service-page text. */
export async function getServicesPageContent() {
  return mergeContent(
    { servicesPage: servicesPageDefaults, megaMenu: megaMenuDefaults, serviceDetailPage: serviceDetailDefaults },
    await loadServicesPageContent(),
  );
}

/* ------------------------------ Site-wide -------------------------------- */

/** The navbar, footer and menus shown on every page. */
export async function getSiteContent(): Promise<SiteContent> {
  "use cache";
  tags("site-settings", "homepage", "services", "service-categories", "services-page");
  const [settings, homepage, { services, categories }, { megaMenu }] = await Promise.all([
    global("site-settings", 0),
    global("homepage", 1),
    getServices(),
    getServicesPageContent(),
  ]);

  const footer = withDefaults(home.footer, settings.footer);
  footer.social = footer.social.map((item) => ({
    ...item,
    icon: `/assets/icons/social/${item.name === "X" ? "x" : item.name.toLowerCase()}.svg`,
  }));

  const homeServices = ((homepage.services?.items ?? []) as Doc[]).filter((s) => typeof s === "object");
  return {
    navbar: withDefaults(home.navbar, settings.navbar),
    footer,
    megaMenu,
    serviceCategories: categories,
    services: services.map(({ slug, title, icon, menuDescription, categoryId }) => ({
      slug,
      title,
      icon,
      menuDescription,
      categoryId,
    })),
    serviceOptions: (homeServices.length ? homeServices : services).map((service) => service.title),
  };
}

/** Search-engine defaults set in the admin (Navbar & footer → SEO). */
export async function getSeoSettings() {
  "use cache";
  tags("site-settings");
  const settings = await global("site-settings", 0);
  return normalize(settings.seo) as { title?: string; description?: string; keywords?: string[] } | undefined;
}

/* ---------------------------------- Blog --------------------------------- */

const isoDay = (date: string) => date.slice(0, 10);

function toPost(doc: Doc): BlogPost {
  const day = isoDay(doc.publishedAt ?? new Date().toISOString());
  return {
    slug: doc.slug,
    title: doc.title,
    titleHighlight: doc.titleHighlight || undefined,
    excerpt: doc.excerpt,
    category: (typeof doc.category === "object" ? doc.category?.name : "") as BlogCategory,
    date: doc.showDay === false ? day.slice(0, 7) : day,
    readMinutes: doc.readMinutes,
    cover: mediaUrl(doc.cover),
    author: {
      name: doc.author?.name || "Techvation Team",
      avatar: mediaUrl(doc.author?.avatar) || "/assets/logos/techvation-icon.png",
    },
    featured: Boolean(doc.featured),
  };
}

function toArticle(doc: Doc, fallbackCta: { title: string; buttonLabel: string }): ArticleContent {
  const blocks = ((doc.content ?? []) as Doc[]).map((block): ArticleBlock => {
    switch (block.blockType) {
      case "list":
        return { type: "list", items: ((block.items ?? []) as Doc[]).map((item) => item.text) };
      case "image":
        return { type: "image", src: mediaUrl(block.image), caption: block.caption ?? "" };
      default:
        return { type: block.blockType, text: block.text ?? "" } as ArticleBlock;
    }
  });
  return {
    blocks,
    authorBio: doc.authorBio ?? "",
    cta: doc.cta?.title ? { title: doc.cta.title, buttonLabel: doc.cta.buttonLabel || fallbackCta.buttonLabel } : fallbackCta,
  };
}

async function loadBlog() {
  "use cache";
  tags("posts", "blog-categories", "blog-page");
  const [docs, categoryDocs, page] = await Promise.all([
    all("posts", { sort: "-publishedAt", where: { _status: { equals: "published" } } }),
    all("blog-categories", { depth: 0 }),
    global("blog-page"),
  ]);
  const blogPage = withDefaults(blogDefaults, { hero: page.hero, newsletter: page.newsletter });
  blogPage.categories = categoryDocs.map((doc) => doc.name as BlogCategory);
  const articleCta = withDefaults(defaultArticleCta, page.articleDefaults?.cta);
  const posts = docs.map(toPost);
  const articles: Record<string, ArticleContent> = Object.fromEntries(
    docs.map((doc) => [doc.slug, toArticle(doc, articleCta)]),
  );
  return { blogPage: clientSafe(blogPage), posts, articles };
}

/** The Blog page text, every published post (newest first) and the categories. */
export async function getBlog() {
  const data = await loadBlog();
  return { ...data, blogPage: mergeContent(blogDefaults, data.blogPage) };
}

/* -------------------------------- Homepage ------------------------------- */

const readTime = (minutes: number) => `${minutes} min read`;

export async function getHomepage() {
  "use cache";
  tags("homepage", "services", "clients", "industries", "posts", "blog-categories");
  const [doc, clientDocs, industryDocs, { posts }] = await Promise.all([
    global("homepage", 2), // depth 2: the picked services and their photos
    all("clients"),
    all("industries"),
    getBlog(),
  ]);

  const { services: _services, trustedLogos: _logos, industries: _industries, blog: _blog, ...rest } = doc;
  const merged = withDefaults(
    {
      hero: home.hero,
      uniqueValue: home.uniqueValue,
      whyTechvation: home.whyTechvation,
      howWeWork: home.howWeWork,
      strategyCall: home.strategyCall,
    },
    rest,
  );

  const services = {
    ...withDefaults(home.services, { eyebrow: _services?.eyebrow, heading: _services?.heading, description: _services?.description }),
    items: ((_services?.items ?? []) as Doc[]).filter((s) => typeof s === "object").map(toHomeCard),
  };

  const trustedLogos = {
    ...withDefaults(home.trustedLogos, _logos),
    logos: clientDocs.map((client) => ({ name: client.name, src: mediaUrl(client.logo) })),
  };

  const industries = {
    ...withDefaults(home.industries, _industries),
    items: industryDocs.map(
      (industry): home.Industry => ({
        name: industry.name,
        description: industry.description,
        tags: ((industry.tags ?? []) as Doc[]).map((tag) => tag.text),
        exploreLabel: industry.exploreLabel,
        href: industry.href,
        image: mediaUrl(industry.image),
        iconLarge: `/assets/icons/${industry.icon}-white-20.svg`,
        iconSmall: `/assets/icons/${industry.icon}-white-16.svg`,
        iconCard: `/assets/icons/${industry.icon}-white-18.svg`,
      }),
    ),
  };

  // Insights: the newest featured post, then the three newest others.
  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const latest = posts.filter((post) => post !== featuredPost).slice(0, 3);
  const blogSection = withDefaults(home.blog, _blog);
  const blog = {
    ...blogSection,
    // Only the categories of the posts on show, so no chip is empty.
    categories: [...new Set(latest.map((post) => post.category))],
    featured: featuredPost
      ? {
          ...blogSection.featured,
          title: featuredPost.title,
          excerpt: featuredPost.excerpt,
          category: featuredPost.category,
          author: featuredPost.author,
          date: formatLongDate(featuredPost.date),
          readTime: readTime(featuredPost.readMinutes),
          image: featuredPost.cover,
          href: `/blog/${featuredPost.slug}`,
        }
      : undefined,
    posts: latest.map(
      (post): home.BlogPost => ({
        title: post.title,
        category: post.category,
        date: formatLongDate(post.date),
        readTime: readTime(post.readMinutes),
        image: post.cover,
        href: `/blog/${post.slug}`,
      }),
    ),
  };

  return { ...merged, services, trustedLogos, industries, blog };
}

/* ------------------------------ Inner pages ------------------------------ */

export async function getAboutPage() {
  "use cache";
  tags("about-page", "team-members");
  const [doc, members] = await Promise.all([global("about-page"), all("team-members")]);
  const aboutPage = withDefaults(aboutDefaults, doc);
  aboutPage.leadership.members = members.map((member) => ({
    name: member.name,
    role: member.role,
    photo: mediaUrl(member.photo),
    linkedin: member.linkedin ?? "",
    email: member.email ?? "",
  }));
  return aboutPage;
}

async function loadCareersPage() {
  "use cache";
  tags("careers-page", "jobs");
  const [doc, jobs] = await Promise.all([
    global("careers-page"),
    all("jobs", { depth: 0, where: { open: { equals: true } } }),
  ]);
  const { galleryTab, ...rest } = doc;
  const careersPage = withDefaults(careersDefaults, rest);
  const gallery = ((galleryTab?.images ?? []) as Doc[]).map((row) => mediaUrl(row.image)).filter(Boolean);
  if (gallery.length) careersPage.gallery = gallery;
  careersPage.positions.list = jobs.map(
    (job): Position => ({
      title: job.title,
      department: job.department as Department,
      location: job.location,
      type: job.type,
    }),
  );
  return clientSafe(careersPage);
}

export async function getCareersPage() {
  return mergeContent(careersDefaults, await loadCareersPage());
}

async function loadFaqPage() {
  "use cache";
  tags("faqs-page", "faq-categories");
  const [doc, categoryDocs] = await Promise.all([global("faqs-page"), all("faq-categories", { depth: 0 })]);
  const faqPage = withDefaults(faqDefaults, doc);
  faqPage.categories = categoryDocs.map(
    (category): FaqCategory => ({
      id: category.anchor,
      name: category.name,
      icon: category.icon,
      questions: ((category.questions ?? []) as Doc[]).map(({ question, answer }) => ({ question, answer })),
    }),
  );
  return clientSafe(faqPage);
}

export async function getFaqPage() {
  return mergeContent(faqDefaults, await loadFaqPage());
}

export async function getContactPage() {
  "use cache";
  tags("contact-page");
  const doc = await global("contact-page");
  return withDefaults(contactDefaults, {
    hero: doc.hero,
    quickContact: doc.quick?.quickContact,
    form: doc.form,
    offices: doc.offices?.offices,
    hours: doc.offices?.hours,
  });
}

export async function getSolutionsPage() {
  "use cache";
  tags("solutions-page", "solutions");
  const [doc, suites] = await Promise.all([global("solutions-page"), all("solutions")]);
  const solutionsPage = withDefaults(solutionsDefaults, {
    hero: doc.hero,
    launchDate: doc.launch?.launchDate,
    notify: doc.notify,
    sneakPeek: doc.sneakPeek,
  });
  solutionsPage.sneakPeek.suites = suites.map((suite) => ({
    title: suite.title,
    text: suite.text,
    icon: `/assets/icons/${suite.icon}-white-18.svg`,
    image: mediaUrl(suite.image),
  }));
  return solutionsPage;
}
