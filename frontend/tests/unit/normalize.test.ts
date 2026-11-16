/*
 * lib/cms/normalize.ts: turns CMS documents into the plain shapes the
 * components use, and lays them over the built-in defaults.
 */
import { describe, expect, it } from "vitest";
import { clientSafe, isMedia, mediaUrl, mergeContent, normalize, withDefaults } from "@/lib/cms/normalize";

const media = (url: string) => ({ id: 1, url, mimeType: "image/png", filename: "x.png" });

describe("mediaUrl / image addresses", () => {
  it("returns the path of a media document", () => {
    expect(mediaUrl(media("/api/media/file/a.png"))).toBe("/api/media/file/a.png");
  });

  it("turns the site's full image addresses into paths (next/image rejects them otherwise)", () => {
    expect(mediaUrl(media("https://www.thetechvation.com/api/media/file/a.png"))).toBe("/api/media/file/a.png");
    expect(mediaUrl(media("http://localhost:3000/api/media/file/a%20b.png?v=2"))).toBe("/api/media/file/a%20b.png?v=2");
  });

  it("leaves other full addresses alone", () => {
    expect(mediaUrl(media("https://cdn.example.com/img.png"))).toBe("https://cdn.example.com/img.png");
  });

  it("returns an empty string for a missing or unpopulated image", () => {
    expect(mediaUrl(undefined)).toBe("");
    expect(mediaUrl(null)).toBe("");
    expect(mediaUrl(42)).toBe(""); // only the id, not the document
  });

  it("recognises media documents", () => {
    expect(isMedia(media("/x.png"))).toBe(true);
    expect(isMedia({ url: "/x" })).toBe(false);
  });
});

describe("normalize", () => {
  it("drops CMS bookkeeping and empty values", () => {
    expect(
      normalize({ id: 3, title: "Hi", blockName: null, createdAt: "x", updatedAt: "y", _order: "a0", empty: null }),
    ).toEqual({ title: "Hi" });
  });

  it("flattens string lists ([{ text }] -> strings)", () => {
    expect(normalize([{ id: "a", text: "One" }, { id: "b", text: "Two" }])).toEqual(["One", "Two"]);
  });

  it("keeps lists of real objects", () => {
    expect(normalize([{ id: "a", title: "T", text: "X" }])).toEqual([{ title: "T", text: "X" }]);
  });

  it("keeps an emptied list empty (an editor removed every item)", () => {
    expect(normalize([])).toEqual([]);
  });

  it("replaces nested images with their path", () => {
    expect(normalize({ hero: { image: media("https://www.thetechvation.com/api/media/file/h.jpg") } })).toEqual({
      hero: { image: "/api/media/file/h.jpg" },
    });
  });
});

describe("mergeContent / withDefaults", () => {
  const defaults = {
    title: "Default title",
    hero: { heading: "Default heading", note: "Default note" },
    items: ["a", "b"],
    countLabel: (n: number) => `${n} items`,
  };

  it("uses CMS values and keeps defaults for what the CMS lacks", () => {
    const merged = mergeContent(defaults, { title: "From CMS", hero: { heading: "CMS heading" } });
    expect(merged.title).toBe("From CMS");
    expect(merged.hero).toEqual({ heading: "CMS heading", note: "Default note" });
    expect(merged.items).toEqual(["a", "b"]);
  });

  it("replaces lists as a whole", () => {
    expect(mergeContent(defaults, { items: ["x"] }).items).toEqual(["x"]);
  });

  it("keeps label functions from the defaults", () => {
    const merged = mergeContent(defaults, { countLabel: "not a function" });
    expect(merged.countLabel(3)).toBe("3 items");
  });

  it("falls back to the defaults when a CMS field is empty (null)", () => {
    expect(withDefaults(defaults, { title: null }).title).toBe("Default title");
  });

  it("returns the defaults when there is no CMS content at all", () => {
    expect(mergeContent(defaults, undefined)).toBe(defaults);
  });
});

describe("clientSafe", () => {
  it("removes functions so content can be sent to the browser", () => {
    const safe = clientSafe({ a: 1, fn: () => 1, nested: { b: "x", fn: () => 2 } });
    expect(safe).toEqual({ a: 1, nested: { b: "x" } });
  });
});
