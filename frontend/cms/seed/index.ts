/*
 * ---------------------------------------------------------------------------
 * SEED: copy the site's current content into the CMS
 * ---------------------------------------------------------------------------
 * Reads the original content files in /data and the images in /public, and
 * creates the matching CMS documents, globals and media library entries.
 *
 *   npm run seed            fill an empty CMS (stops if content exists)
 *   SEED_RESET=1 npm run seed   delete all CMS content first, then fill it
 *
 * Users are never touched: create the first admin at /admin.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CollectionSlug, GlobalSlug, Payload } from "payload";
import { getPayload } from "payload";
import config from "@payload-config";
import { aboutPage } from "@/data/about";
import { articleContent, defaultArticleCta, type ArticleBlock } from "@/data/blog-articles";
import { blogPage, blogPosts } from "@/data/blog";
import { careersPage } from "@/data/careers";
import { contactPage } from "@/data/contact";
import { faqPage } from "@/data/faqs";
import {
  blog as homeBlog,
  footer,
  hero,
  howWeWork,
  industries,
  navbar,
  services as homeServices,
  strategyCall,
  trustedLogos,
  uniqueValue,
  whyTechvation,
} from "@/data/homepage";
import { megaMenu, serviceCategories, serviceDetailPage, serviceDetails, servicesPage } from "@/data/services";
import { solutionsPage } from "@/data/solutions";

const context = { skipRevalidate: true };
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

/** ["a", "b"] -> [{ text: "a" }, { text: "b" }] (the CMS shape of a string list). */
const list = (items: readonly string[]) => items.map((text) => ({ text }));

/** "/assets/icons/factory-white-18.svg" -> "factory" */
const industryIconName = (iconPath: string) =>
  path.basename(iconPath, ".svg").replace(/-white-\d+$/, "");

const CONTENT_COLLECTIONS: CollectionSlug[] = [
  "posts",
  "blog-categories",
  "services",
  "service-categories",
  "faq-categories",
  "jobs",
  "team-members",
  "clients",
  "industries",
  "solutions",
];

/** Deletes one document, with a few tries (remote database connections can drop for a moment). */
async function deleteWithRetry(payload: Payload, collection: CollectionSlug, id: number | string) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await payload.delete({ collection, id, context: { ...context }, overrideAccess: true });
      return true;
    } catch {
      // try again
    }
  }
  return false;
}

/**
 * Deletes the content the seed creates, one document at a time. Images are
 * removed at the end of the seed instead (see removeOldMedia), because the
 * pages still use them until they are re-seeded.
 */
async function reset(payload: Payload) {
  for (const collection of CONTENT_COLLECTIONS) {
    const { docs } = await payload.find({ collection, limit: 0, pagination: false, depth: 0, overrideAccess: true });
    let failed = 0;
    for (const doc of docs) {
      if (!(await deleteWithRetry(payload, collection, doc.id))) failed++;
    }
    payload.logger.info(`Cleared ${collection}${failed ? ` (${failed} could not be deleted)` : ""}`);
  }
}

/** After a reset: deletes the images of earlier runs, which nothing uses any more. */
async function removeOldMedia(payload: Payload, keep: Set<number | string>) {
  const { docs } = await payload.find({ collection: "media", limit: 0, pagination: false, depth: 0, overrideAccess: true });
  const old = docs.filter((doc) => !keep.has(doc.id));
  let failed = 0;
  for (const doc of old) {
    if (!(await deleteWithRetry(payload, "media", doc.id))) failed++;
  }
  payload.logger.info(`Removed ${old.length - failed} old images${failed ? ` (${failed} are still in use)` : ""}`);
}

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

/**
 * Uploads a file from /public once and returns its media id.
 *
 * Files are stored as "<folder>-<name>" (e.g. "careers-hero.jpg"), since
 * several folders have a "hero.jpg" and names must be unique. Uploads run
 * one at a time, so two uploads never pick the same name at once.
 */
function mediaLibrary(payload: Payload) {
  const uploaded = new Map<string, Promise<number | string>>();
  let queue: Promise<unknown> = Promise.resolve();

  const upload = async (publicPath: string, alt?: string) => {
    const fullPath = path.join(PUBLIC_DIR, publicPath);
    const base = path.basename(publicPath);
    const name = `${path.basename(path.dirname(publicPath))}-${base}`;
    const data = await readFile(fullPath);
    const doc = await payload.create({
      collection: "media",
      data: { alt: alt ?? path.basename(publicPath, path.extname(publicPath)).replace(/[-_]/g, " ") },
      file: {
        data,
        name,
        mimetype: MIME_TYPES[path.extname(base).toLowerCase()] ?? "application/octet-stream",
        size: data.length,
      },
      context: { ...context },
      overrideAccess: true,
    });
    return doc.id;
  };

  const media = (publicPath: string, alt?: string) => {
    let id = uploaded.get(publicPath);
    if (!id) {
      id = queue.then(() => upload(publicPath, alt));
      queue = id.catch(() => undefined);
      uploaded.set(publicPath, id);
    }
    return id;
  };
  /** The ids of every image uploaded in this run. */
  media.ids = async () => new Set(await Promise.all(uploaded.values()));
  return media;
}

async function seed() {
  const payload = await getPayload({ config });
  // `payload run` may not pass extra arguments on, so SEED_RESET=1 works too.
  const reseed = process.argv.includes("--reset") || process.env.SEED_RESET === "1";

  const { totalDocs } = await payload.count({ collection: "services", overrideAccess: true });
  if (totalDocs > 0 && !reseed) {
    payload.logger.warn("The CMS already has content. Run the seed again with SEED_RESET=1 to replace it.");
    process.exit(0);
  }
  if (reseed) await reset(payload);

  const media = mediaLibrary(payload);
  const create = <T extends CollectionSlug>(collection: T, data: Record<string, unknown>) =>
    payload.create({ collection, data: data as never, context: { ...context }, overrideAccess: true });
  const setGlobal = (slug: GlobalSlug, data: Record<string, unknown>) =>
    payload.updateGlobal({ slug, data: data as never, context: { ...context }, overrideAccess: true });

  /* ------------------------------ Services ------------------------------ */

  const categoryIds = new Map<string, number | string>();
  for (const category of serviceCategories) {
    const doc = await create("service-categories", {
      name: category.name,
      anchor: category.anchor,
      icon: category.icon,
      description: category.description,
      expertLabel: category.expertLabel,
      promo: category.promo ?? {},
    });
    categoryIds.set(category.id, doc.id);
  }

  // Services in the order of their category, then their order inside it.
  const orderedSlugs = serviceCategories.flatMap((category) => category.services);
  const serviceIds = new Map<string, number | string>();
  for (const slug of orderedSlugs) {
    const service = serviceDetails.find((s) => s.slug === slug)!;
    const card = homeServices.items.find((item) => item.href === `/services/${slug}`);
    const doc = await create("services", {
      title: service.title,
      slug: service.slug,
      category: categoryIds.get(service.categoryId),
      icon: service.icon,
      image: await media(service.image, service.title),
      menuDescription: service.menuDescription,
      cardDescription: service.cardDescription,
      homeCard: {
        tag: card?.category ?? "",
        description: card?.description ?? service.cardDescription,
        descriptionShort: card?.descriptionShort ?? service.menuDescription,
      },
      hero: service.hero,
      outcomes: service.outcomes,
      overview: { ...service.overview, points: list(service.overview.points) },
      capabilities: service.capabilities,
      tools: list(service.tools),
      faqs: service.faqs,
    });
    serviceIds.set(slug, doc.id);
  }
  for (const service of serviceDetails) {
    await payload.update({
      collection: "services",
      id: serviceIds.get(service.slug)!,
      data: { related: service.related.map((slug) => serviceIds.get(slug)!) } as never,
      context: { ...context },
      overrideAccess: true,
    });
  }
  payload.logger.info(`Seeded ${serviceIds.size} services in ${categoryIds.size} practice areas`);

  /* -------------------------------- Blog -------------------------------- */

  const blogCategoryIds = new Map<string, number | string>();
  for (const name of blogPage.categories) {
    const doc = await create("blog-categories", { name });
    blogCategoryIds.set(name, doc.id);
  }

  const toBlock = async (block: ArticleBlock) => {
    switch (block.type) {
      case "list":
        return { blockType: "list", items: list(block.items) };
      case "image":
        return { blockType: "image", image: await media(block.src, block.caption), caption: block.caption };
      default:
        return { blockType: block.type, text: block.text };
    }
  };

  for (const post of blogPosts) {
    const body = articleContent[post.slug];
    const hasDay = post.date.length > 7;
    await create("posts", {
      _status: "published",
      title: post.title,
      slug: post.slug,
      titleHighlight: post.titleHighlight,
      excerpt: post.excerpt,
      category: blogCategoryIds.get(post.category),
      publishedAt: new Date(`${hasDay ? post.date : `${post.date}-01`}T12:00:00Z`).toISOString(),
      showDay: hasDay,
      readMinutes: post.readMinutes,
      featured: Boolean(post.featured),
      cover: await media(post.cover, post.title),
      author: { name: post.author.name, avatar: await media(post.author.avatar, post.author.name) },
      content: body ? await Promise.all(body.blocks.map(toBlock)) : [],
      authorBio: body?.authorBio,
      cta: body && body.cta !== defaultArticleCta ? body.cta : {},
    });
  }
  payload.logger.info(`Seeded ${blogPosts.length} blog posts`);

  /* ------------------------- FAQs, jobs, team… -------------------------- */

  for (const category of faqPage.categories) {
    await create("faq-categories", {
      name: category.name,
      anchor: category.id,
      icon: category.icon,
      questions: category.questions,
    });
  }

  // Seed the careers page first: jobs check their department against it.
  await setGlobal("careers-page", {
    hero: {
      breadcrumb: careersPage.hero.breadcrumb,
      eyebrow: careersPage.hero.eyebrow,
      heading: careersPage.hero.heading,
      description: careersPage.hero.description,
      primaryAction: careersPage.hero.primaryAction,
      secondaryAction: careersPage.hero.secondaryAction,
      image: await media(careersPage.hero.image, "The Techvation team"),
    },
    perks: careersPage.perks,
    galleryTab: {
      images: await Promise.all(
        careersPage.gallery.map(async (src) => ({ image: await media(src, "Life at Techvation") })),
      ),
    },
    positions: {
      eyebrow: careersPage.positions.eyebrow,
      heading: careersPage.positions.heading,
      departments: list(careersPage.positions.departments),
      locations: list(careersPage.positions.locations),
      emptyText: careersPage.positions.emptyText,
    },
    process: careersPage.process,
    application: {
      eyebrow: careersPage.application.eyebrow,
      heading: careersPage.application.heading,
      description: careersPage.application.description,
      submitLabel: careersPage.application.submitLabel,
      successTitle: careersPage.application.successTitle,
      successText: careersPage.application.successText,
    },
  });

  for (const job of careersPage.positions.list) await create("jobs", { ...job, open: true });

  for (const member of aboutPage.leadership.members) {
    await create("team-members", {
      name: member.name,
      role: member.role,
      photo: await media(member.photo, member.role),
      linkedin: member.linkedin,
      email: member.email,
    });
  }

  for (const logo of trustedLogos.logos) {
    await create("clients", { name: logo.name, logo: await media(logo.src, `${logo.name} logo`) });
  }

  for (const industry of industries.items) {
    await create("industries", {
      name: industry.name,
      description: industry.description,
      tags: list(industry.tags),
      exploreLabel: industry.exploreLabel,
      href: industry.href,
      image: await media(industry.image, industry.name),
      icon: industryIconName(industry.iconCard),
    });
  }

  for (const suite of solutionsPage.sneakPeek.suites) {
    await create("solutions", {
      title: suite.title,
      text: suite.text,
      icon: industryIconName(suite.icon),
      image: await media(suite.image, suite.title),
    });
  }
  payload.logger.info("Seeded FAQs, jobs, team, client logos, industries and solution suites");

  /* ------------------------------- Globals ------------------------------ */

  await setGlobal("homepage", {
    hero: {
      eyebrow: hero.eyebrow,
      eyebrowShort: hero.eyebrowShort,
      heading: hero.heading,
      description: hero.description,
      descriptionShort: hero.descriptionShort,
      primaryAction: hero.primaryAction,
      secondaryAction: hero.secondaryAction,
      form: {
        title: hero.form.title,
        subtitle: hero.form.subtitle,
        subtitleShort: hero.form.subtitleShort,
        submitLabel: hero.form.submitLabel,
        note: hero.form.note,
      },
    },
    trustedLogos: { titleLines: list(trustedLogos.titleLines), title: trustedLogos.title },
    uniqueValue: {
      eyebrow: uniqueValue.eyebrow,
      title: uniqueValue.title,
      description: uniqueValue.description,
      values: uniqueValue.values,
      action: uniqueValue.action,
      visual: {
        outlineWord: uniqueValue.visual.outlineWord,
        stat: uniqueValue.visual.stat,
        pills: uniqueValue.visual.pills,
      },
    },
    services: {
      eyebrow: homeServices.eyebrow,
      heading: homeServices.heading,
      description: homeServices.description,
    },
    whyTechvation: {
      eyebrow: whyTechvation.eyebrow,
      heading: whyTechvation.heading,
      description: whyTechvation.description,
      hub: { badge: whyTechvation.hub.badge },
      reasons: whyTechvation.reasons,
      stats: whyTechvation.stats,
      primaryAction: whyTechvation.primaryAction,
      secondaryAction: whyTechvation.secondaryAction,
    },
    howWeWork: {
      eyebrow: howWeWork.eyebrow,
      heading: howWeWork.heading,
      description: howWeWork.description,
      outcomeLabel: howWeWork.outcomeLabel,
      steps: await Promise.all(
        howWeWork.steps.map(async (step) => ({
          title: step.title,
          description: step.description,
          deliverables: list(step.deliverables),
          outcome: step.outcome,
          icon: step.icon,
          image: await media(step.image, step.title),
        })),
      ),
    },
    industries: {
      eyebrow: industries.eyebrow,
      heading: industries.heading,
      description: industries.description,
      hint: industries.hint,
    },
    strategyCall: {
      eyebrow: strategyCall.eyebrow,
      heading: strategyCall.heading,
      description: strategyCall.description,
      steps: list(strategyCall.steps),
    },
    blog: { eyebrow: homeBlog.eyebrow, heading: homeBlog.heading, viewAll: homeBlog.viewAll },
  });

  await setGlobal("site-settings", {
    navbar: { links: navbar.links },
    footer: {
      cta: { heading: footer.cta.heading, description: footer.cta.description },
      about: footer.about,
      aboutShort: footer.aboutShort,
      social: footer.social.map(({ name, href }) => ({ name, href })),
      columns: footer.columns,
      columnsCompact: footer.columnsCompact,
      contact: footer.contact,
      newsletter: footer.newsletter,
      copyright: footer.copyright,
      legalLinks: footer.legalLinks,
    },
    seo: {},
  });

  await setGlobal("services-page", {
    hero: servicesPage.hero,
    engagement: {
      eyebrow: servicesPage.engagement.eyebrow,
      heading: servicesPage.engagement.heading,
      description: servicesPage.engagement.description,
      models: servicesPage.engagement.models.map((model) => ({ ...model, points: list(model.points) })),
    },
    megaMenu: {
      columns: megaMenu.columns.map((ids) => ({ categories: ids.map((id) => categoryIds.get(id)!) })),
      promo: {
        eyebrow: megaMenu.promo.eyebrow,
        title: megaMenu.promo.title,
        text: megaMenu.promo.text,
        actionLabel: megaMenu.promo.actionLabel,
        image: await media(megaMenu.promo.image, "Techvation office"),
      },
      allServices: megaMenu.allServices,
      phone: megaMenu.phone,
    },
    detail: {
      heroForm: {
        subtitle: serviceDetailPage.heroForm.subtitle,
        submitLabel: serviceDetailPage.heroForm.submitLabel,
      },
      overviewBadgeSubtitle: serviceDetailPage.overviewBadgeSubtitle,
      process: {
        headingLead: serviceDetailPage.process.headingLead,
        steps: serviceDetailPage.process.steps,
      },
      tech: { title: serviceDetailPage.tech.title, reasons: serviceDetailPage.tech.reasons },
    },
  });

  await setGlobal("about-page", {
    hero: {
      ...aboutPage.hero,
      image: await media(aboutPage.hero.image, "The Techvation team at work"),
    },
    story: {
      eyebrow: aboutPage.story.eyebrow,
      heading: aboutPage.story.heading,
      paragraphs: list(aboutPage.story.paragraphs),
      stats: aboutPage.story.stats,
      collage: {
        main: await media(aboutPage.story.collage.main, "Techvation office"),
        inset: await media(aboutPage.story.collage.inset, "Techvation team"),
        badge: aboutPage.story.collage.badge,
      },
    },
    mission: aboutPage.mission,
    vision: aboutPage.vision,
    values: aboutPage.values,
    leadership: {
      eyebrow: aboutPage.leadership.eyebrow,
      heading: aboutPage.leadership.heading,
      action: aboutPage.leadership.action,
    },
    presence: {
      ...aboutPage.presence,
      image: await media(aboutPage.presence.image, "Globe"),
    },
  });

  await setGlobal("faqs-page", {
    hero: {
      breadcrumb: faqPage.hero.breadcrumb,
      eyebrow: faqPage.hero.eyebrow,
      heading: faqPage.hero.heading,
      description: faqPage.hero.description,
      image: await media(faqPage.hero.image, "Help center"),
    },
    sidebar: faqPage.sidebar,
    contact: faqPage.contact,
  });

  await setGlobal("blog-page", {
    hero: {
      eyebrow: blogPage.hero.eyebrow,
      heading: blogPage.hero.heading,
      description: blogPage.hero.description,
    },
    newsletter: {
      title: blogPage.newsletter.title,
      text: blogPage.newsletter.text,
      submitLabel: blogPage.newsletter.submitLabel,
      successText: blogPage.newsletter.successText,
    },
    articleDefaults: { cta: defaultArticleCta },
  });

  await setGlobal("contact-page", {
    hero: {
      ...contactPage.hero,
      image: await media(contactPage.hero.image, "Contact Techvation"),
    },
    quick: { quickContact: contactPage.quickContact },
    form: {
      title: contactPage.form.title,
      titleShort: contactPage.form.titleShort,
      servicesLabel: contactPage.form.servicesLabel,
      services: contactPage.form.services,
      budgets: list(contactPage.form.budgets),
      timelines: list(contactPage.form.timelines),
      submitLabel: contactPage.form.submitLabel,
    },
    offices: {
      offices: await Promise.all(
        contactPage.offices.map(async (office) => ({ ...office, photo: await media(office.photo, office.name) })),
      ),
      hours: { title: contactPage.hours.title, lines: list(contactPage.hours.lines) },
    },
  });

  await setGlobal("solutions-page", {
    hero: solutionsPage.hero,
    launch: { launchDate: new Date(solutionsPage.launchDate).toISOString() },
    notify: {
      placeholder: solutionsPage.notify.placeholder,
      submitLabel: solutionsPage.notify.submitLabel,
      note: solutionsPage.notify.note,
      successTitle: solutionsPage.notify.successTitle,
      successText: solutionsPage.notify.successText,
    },
    sneakPeek: {
      title: solutionsPage.sneakPeek.title,
      badge: solutionsPage.sneakPeek.badge,
      primaryAction: solutionsPage.sneakPeek.primaryAction,
    },
  });

  payload.logger.info("Seeded all page globals.");

  if (reseed) await removeOldMedia(payload, await media.ids());
  payload.logger.info("Done!");
  process.exit(0);
}

await seed();
