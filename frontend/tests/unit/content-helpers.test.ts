/*
 * Helpers in /data used by the pages: blog dates and related posts, article
 * headings, and the services/practice-area lookups.
 */
import { describe, expect, it } from "vitest";
import { articleHeadings, headingId } from "@/data/blog-articles";
import { blogPosts, formatLongDate, formatPostDate, postHref, relatedPosts, type BlogPost } from "@/data/blog";
import { getCategory, serviceCategories, serviceDetails, serviceHref, servicesIn } from "@/data/services";

describe("blog dates", () => {
  it("shows month and year on cards", () => {
    expect(formatPostDate("2026-10")).toBe("Oct 2026");
    expect(formatPostDate("2026-11-10")).toBe("Nov 2026");
  });

  it("shows the day on the article page only when it is known", () => {
    expect(formatLongDate("2026-11-10")).toBe("Nov 10, 2026");
    expect(formatLongDate("2026-10")).toBe("Oct 2026");
  });

  it("builds article addresses", () => {
    expect(postHref("rag-explained")).toBe("/blog/rag-explained");
  });
});

describe("related posts", () => {
  const post = (slug: string, category: BlogPost["category"], date: string): BlogPost => ({
    slug,
    title: slug,
    excerpt: "",
    category,
    date,
    readMinutes: 5,
    cover: "",
    author: { name: "", avatar: "" },
  });
  const all = [
    post("a", "ERP & Odoo", "2026-10-01"),
    post("b", "Power BI", "2026-11-01"),
    post("c", "ERP & Odoo", "2026-09-01"),
    post("d", "AI & ML", "2026-12-01"),
    post("e", "ERP & Odoo", "2026-08-01"),
  ];

  it("suggests the same category first, newest first, then the newest others", () => {
    expect(relatedPosts(all[0], all).map((p) => p.slug)).toEqual(["c", "e", "d"]);
  });

  it("never suggests the article itself and respects the count", () => {
    const related = relatedPosts(all[1], all, 2);
    expect(related).toHaveLength(2);
    expect(related.map((p) => p.slug)).not.toContain("b");
  });

  it("works on the real seed content", () => {
    const related = relatedPosts(blogPosts[0], blogPosts);
    expect(related).toHaveLength(3);
    expect(new Set(related.map((p) => p.slug)).size).toBe(3);
  });
});

describe("article headings", () => {
  it("makes stable, URL-safe anchor ids", () => {
    expect(headingId("What makes AI “agentic”?")).toBe("what-makes-ai-agentic");
    expect(headingId("Step 1: assess what you have")).toBe("step-1-assess-what-you-have");
  });

  it("lists only the section headings", () => {
    const headings = articleHeadings([
      { type: "lead", text: "Intro" },
      { type: "h2", text: "First part" },
      { type: "p", text: "Body" },
      { type: "h2", text: "Second part" },
    ]);
    expect(headings).toEqual([
      { text: "First part", id: "first-part" },
      { text: "Second part", id: "second-part" },
    ]);
  });
});

describe("services and practice areas", () => {
  it("builds service addresses", () => {
    expect(serviceHref("power-bi")).toBe("/services/power-bi");
  });

  it("finds a practice area by id", () => {
    expect(getCategory("erp", serviceCategories)?.name).toBe("Enterprise ERP");
    expect(getCategory("missing", serviceCategories)).toBeUndefined();
  });

  it("returns a practice area's services in order and skips unknown ones", () => {
    const erp = serviceCategories.find((c) => c.id === "erp")!;
    expect(servicesIn(erp, serviceDetails).map((s) => s.slug)).toEqual(erp.services);
    expect(servicesIn({ ...erp, services: ["odoo-erp", "deleted-service"] }, serviceDetails).map((s) => s.slug)).toEqual([
      "odoo-erp",
    ]);
  });

  it("has consistent seed content (every related service exists, slugs are unique)", () => {
    const slugs = new Set(serviceDetails.map((s) => s.slug));
    expect(slugs.size).toBe(serviceDetails.length);
    for (const service of serviceDetails) {
      for (const related of service.related) expect(slugs.has(related), `${service.slug} -> ${related}`).toBe(true);
    }
  });
});
