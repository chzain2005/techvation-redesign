/*
 * Who can read and change what, through the real CMS and its access rules
 * (overrideAccess: false = exactly as a request from the website or admin).
 */
import type { Payload } from "payload";
import { beforeAll, describe, expect, it } from "vitest";
import { createImage, createUser, getTestPayload, unique } from "./helpers";

let payload: Payload;
let admin: Awaited<ReturnType<typeof createUser>>;
let editor: Awaited<ReturnType<typeof createUser>>;
let otherEditor: Awaited<ReturnType<typeof createUser>>;

beforeAll(async () => {
  payload = await getTestPayload();
  admin = await createUser(payload, "admin");
  editor = await createUser(payload, "editor");
  otherEditor = await createUser(payload, "editor");
});

const asVisitor = { overrideAccess: false } as const;
const as = (user: unknown) => ({ overrideAccess: false, user }) as const;

describe("visitors (not signed in)", () => {
  it("cannot create an account, even an admin one", async () => {
    await expect(
      payload.create({
        collection: "users",
        data: { email: `${unique("anon")}@example.com`, password: "Anonymous-123456", roles: ["admin"] },
        ...asVisitor,
      }),
    ).rejects.toThrow(/not allowed/i);
  });

  it("cannot read accounts, the inbox, CVs or the email-alert settings", async () => {
    await expect(payload.find({ collection: "users", ...asVisitor })).rejects.toThrow(/not allowed/i);
    await expect(payload.find({ collection: "form-submissions", ...asVisitor })).rejects.toThrow(/not allowed/i);
    await expect(payload.find({ collection: "cv-uploads", ...asVisitor })).rejects.toThrow(/not allowed/i);
    await expect(payload.findGlobal({ slug: "notifications", ...asVisitor })).rejects.toThrow(/not allowed/i);
  });

  it("cannot write to the inbox directly (only the website's form handler can)", async () => {
    await expect(
      payload.create({ collection: "form-submissions", data: { form: "contact", email: "x@example.com" } as never, ...asVisitor }),
    ).rejects.toThrow(/not allowed/i);
  });

  it("cannot change website content", async () => {
    await expect(
      payload.create({ collection: "blog-categories", data: { name: unique("Hack") }, ...asVisitor }),
    ).rejects.toThrow(/not allowed/i);
    await expect(
      payload.updateGlobal({ slug: "homepage", data: {}, ...asVisitor }),
    ).rejects.toThrow(/not allowed/i);
  });

  it("can read public content", async () => {
    const category = await payload.create({ collection: "blog-categories", data: { name: unique("Public") }, overrideAccess: true });
    const { docs } = await payload.find({ collection: "blog-categories", where: { id: { equals: category.id } }, ...asVisitor });
    expect(docs).toHaveLength(1);
  });
});

describe("blog drafts", () => {
  it("are hidden from visitors until published, but visible to editors", async () => {
    const image = await createImage(payload);
    const category = await payload.create({ collection: "blog-categories", data: { name: unique("Drafts") }, overrideAccess: true });
    const draft = await payload.create({
      collection: "posts",
      draft: true,
      data: {
        _status: "draft",
        title: unique("Secret draft"),
        excerpt: "Not ready",
        category: category.id,
        readMinutes: 3,
        cover: image.id,
        content: [{ blockType: "p", text: "Draft body" }],
      },
      overrideAccess: true,
    });

    const visitorView = await payload.find({ collection: "posts", where: { id: { equals: draft.id } }, ...asVisitor });
    expect(visitorView.docs).toHaveLength(0);

    const editorView = await payload.find({ collection: "posts", where: { id: { equals: draft.id } }, draft: true, ...as(editor) });
    expect(editorView.docs).toHaveLength(1);
  });
});

describe("editors", () => {
  it("see only their own account", async () => {
    const { docs } = await payload.find({ collection: "users", ...as(editor) });
    expect(docs.map((u) => u.id)).toEqual([editor.id]);
  });

  it("cannot edit or delete someone else's account", async () => {
    await expect(
      payload.update({ collection: "users", id: otherEditor.id, data: { name: "Hacked" }, ...as(editor) }),
    ).rejects.toThrow(/not allowed|not found/i);
    await expect(payload.delete({ collection: "users", id: otherEditor.id, ...as(editor) })).rejects.toThrow(
      /not allowed|not found/i,
    );
  });

  it("cannot create accounts", async () => {
    await expect(
      payload.create({
        collection: "users",
        data: { email: `${unique("by-editor")}@example.com`, password: "Editor-made-12345" } as never,
        ...as(editor),
      }),
    ).rejects.toThrow(/not allowed/i);
  });

  it("cannot make themselves admin", async () => {
    await payload.update({ collection: "users", id: editor.id, data: { roles: ["admin"] }, ...as(editor) });
    const after = await payload.findByID({ collection: "users", id: editor.id, overrideAccess: true });
    expect(after.roles).toEqual(["editor"]);
  });

  it("can work the inbox (read and set the status) but not create submissions", async () => {
    const submission = await payload.create({
      collection: "form-submissions",
      data: { form: "contact", email: "lead@example.com", status: "new" },
      overrideAccess: true,
    });
    const read = await payload.findByID({ collection: "form-submissions", id: submission.id, ...as(editor) });
    expect(read.email).toBe("lead@example.com");
    const updated = await payload.update({ collection: "form-submissions", id: submission.id, data: { status: "done" }, ...as(editor) });
    expect(updated.status).toBe("done");
    await expect(
      payload.create({ collection: "form-submissions", data: { form: "contact", email: "x@example.com" } as never, ...as(editor) }),
    ).rejects.toThrow(/not allowed/i);
  });
});

describe("admins", () => {
  it("can create accounts and give access levels", async () => {
    const created = await payload.create({
      collection: "users",
      data: { email: `${unique("new-editor")}@example.com`, password: "Admin-made-123456", roles: ["editor"] },
      ...as(admin),
    });
    expect(created.roles).toEqual(["editor"]);
  });

  it("see every account", async () => {
    const { totalDocs } = await payload.find({ collection: "users", ...as(admin) });
    expect(totalDocs).toBeGreaterThanOrEqual(3);
  });
});

describe("passwords", () => {
  it("must be at least 12 characters", async () => {
    const error = await payload
      .create({
        collection: "users",
        data: { email: `${unique("short")}@example.com`, password: "short-pw", roles: ["editor"] },
        overrideAccess: true,
      })
      .then(() => null, (e: { data?: { errors?: Array<{ message: string; path: string }> } }) => e);
    expect(error?.data?.errors).toEqual([
      expect.objectContaining({ path: "password", message: expect.stringMatching(/12 characters/) }),
    ]);
  });

  it("are stored hashed, never as plain text", async () => {
    const user = await payload.find({
      collection: "users",
      where: { id: { equals: admin.id } },
      showHiddenFields: true,
      overrideAccess: true,
    });
    const stored = user.docs[0] as unknown as { hash?: string; salt?: string; password?: string };
    expect(stored.password).toBeUndefined();
    expect(stored.hash).toBeTruthy();
    expect(stored.hash).not.toContain("Test-password-123");
    expect(stored.salt).toBeTruthy();
  });

  it("log in only with the right password", async () => {
    const ok = await payload.login({ collection: "users", data: { email: admin.email, password: "Test-password-123" } });
    expect(ok.token).toBeTruthy();
    await expect(
      payload.login({ collection: "users", data: { email: admin.email, password: "Wrong-password-123" } }),
    ).rejects.toThrow();
  });
});
