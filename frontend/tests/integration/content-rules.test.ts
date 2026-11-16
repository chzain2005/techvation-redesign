/*
 * Content rules enforced by the CMS itself: web addresses (slugs), safe
 * links, image uploads and section links.
 */
import path from "node:path";
import type { Payload } from "payload";
import { beforeAll, describe, expect, it } from "vitest";
import { mediaUrl } from "@/lib/cms/normalize";
import { createImage, getTestPayload, unique } from "./helpers";

let payload: Payload;
let imageId: number;
let categoryId: number;

beforeAll(async () => {
  payload = await getTestPayload();
  imageId = (await createImage(payload)).id;
  categoryId = (await payload.create({ collection: "blog-categories", data: { name: unique("Rules") }, overrideAccess: true })).id;
});

const post = (data: Record<string, unknown>) =>
  payload.create({
    collection: "posts",
    data: {
      _status: "published",
      excerpt: "Excerpt",
      category: categoryId,
      readMinutes: 4,
      cover: imageId,
      content: [{ blockType: "p", text: "Body" }],
      ...data,
    } as never,
    overrideAccess: true,
  });

describe("web addresses (slugs)", () => {
  it("are made from the title when left empty", async () => {
    const created = await post({ title: `Hello World: ERP & AI ${unique("x")}` });
    expect(created.slug).toMatch(/^hello-world-erp-ai-x-\d+-\d+$/);
  });

  it("are cleaned up when typed with capitals and spaces", async () => {
    const created = await post({ title: "Any", slug: `My New Post ${unique("Y")}` });
    expect(created.slug).toMatch(/^my-new-post-y-\d+-\d+$/);
  });

  it("must be unique", async () => {
    const slug = unique("same-address");
    await post({ title: "First", slug });
    await expect(post({ title: "Second", slug })).rejects.toThrow(/invalid|unique/i);
  });
});

describe("links entered by editors", () => {
  const member = (linkedin: string) =>
    payload.create({
      collection: "team-members",
      data: { name: "Test Person", role: "Tester", photo: imageId, linkedin },
      overrideAccess: true,
    });

  it("accept real web addresses", async () => {
    await expect(member("https://www.linkedin.com/in/someone")).resolves.toMatchObject({ name: "Test Person" });
  });

  it("refuse javascript: links (stored XSS)", async () => {
    await expect(member("javascript:alert(document.cookie)")).rejects.toThrow(/invalid/i);
  });

  it("refuse unsafe links in page settings too", async () => {
    await expect(
      payload.create({
        collection: "industries",
        data: {
          name: "Test industry",
          description: "x",
          exploreLabel: "Explore",
          href: "javascript:alert(1)",
          image: imageId,
          icon: "factory",
        },
        overrideAccess: true,
      }),
    ).rejects.toThrow(/invalid/i);
  });
});

describe("image uploads", () => {
  it("accept photos, and the site uses them by path (full addresses broke next/image before)", async () => {
    const image = await createImage(payload);
    expect(image.mimeType).toBe("image/png");
    expect(image.url).toBe(`https://www.thetechvation.com/api/media/file/${image.filename}`);
    expect(mediaUrl(image)).toBe(`/api/media/file/${image.filename}`);
  });

  it("refuse SVG files (they can contain scripts)", async () => {
    await expect(
      payload.create({
        collection: "media",
        data: { alt: "Icon" },
        filePath: path.join(process.cwd(), "public/assets/icons/glyph/award.svg"),
        overrideAccess: true,
      }),
    ).rejects.toThrow();
  });
});

describe("section links (anchors)", () => {
  it("are made from the name automatically", async () => {
    const created = await payload.create({
      collection: "faq-categories",
      data: { name: `Support & Maintenance ${unique("z")}`, icon: "headset", questions: [{ question: "Q?", answer: "A." }] },
      overrideAccess: true,
    });
    expect(created.anchor).toMatch(/^support-and-maintenance-z-\d+-\d+$/);
  });
});
