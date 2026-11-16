/*
 * Security rules that run without a database: who may do what (cms/access.ts),
 * which links editors may enter (cms/friendly.ts), the password rule
 * (Users collection) and the in-memory lookup limiter.
 */
import type { Field, PayloadRequest } from "payload";
import { describe, expect, it } from "vitest";
import { adminsOnly, adminsOrSelf, anyone, isAdminUser, publishedOrSignedIn, signedIn } from "@/cms/access";
import { Users } from "@/cms/collections/Users";
import { friendlyCollection } from "@/cms/friendly";
import { overLookupLimit } from "@/lib/forms/rate-limit";

type AccessFn = (args: { req: PayloadRequest }) => unknown;
const req = (user: unknown) => ({ req: { user } as PayloadRequest });
const admin = { id: 1, roles: ["admin" as const] };
const editor = { id: 2, roles: ["editor" as const] };

describe("access rules", () => {
  it("recognises admins", () => {
    expect(isAdminUser(admin)).toBe(true);
    expect(isAdminUser(editor)).toBe(false);
    expect(isAdminUser(null)).toBe(false);
    expect(isAdminUser({ roles: null })).toBe(false);
  });

  it("anyone / signedIn / adminsOnly", () => {
    expect((anyone as AccessFn)(req(null))).toBe(true);
    expect((signedIn as AccessFn)(req(null))).toBe(false);
    expect((signedIn as AccessFn)(req(editor))).toBe(true);
    expect((adminsOnly as AccessFn)(req(editor))).toBe(false);
    expect((adminsOnly as AccessFn)(req(admin))).toBe(true);
    expect((adminsOnly as AccessFn)(req(null))).toBe(false);
  });

  it("adminsOrSelf: admins see everyone, others only themselves, visitors nothing", () => {
    expect((adminsOrSelf as AccessFn)(req(admin))).toBe(true);
    expect((adminsOrSelf as AccessFn)(req(editor))).toEqual({ id: { equals: 2 } });
    expect((adminsOrSelf as AccessFn)(req(null))).toBe(false);
  });

  it("publishedOrSignedIn: visitors only see published posts", () => {
    expect((publishedOrSignedIn as AccessFn)(req(null))).toEqual({ _status: { equals: "published" } });
    expect((publishedOrSignedIn as AccessFn)(req(editor))).toBe(true);
  });

  it("only admins may create accounts (no open sign-up)", () => {
    const create = Users.access!.create as AccessFn;
    expect(create(req(null))).toBe(false);
    expect(create(req(editor))).toBe(false);
    expect(create(req(admin))).toBe(true);
  });

  it("only admins may change access levels, also when creating", () => {
    const roles = Users.fields.find((f) => (f as { name?: string }).name === "roles") as Field & {
      access: { create: AccessFn; update: AccessFn };
    };
    expect(roles.access.create(req(editor))).toBe(false);
    expect(roles.access.update(req(editor))).toBe(false);
    expect(roles.access.update(req(admin))).toBe(true);
  });
});

describe("password rule", () => {
  const hook = Users.hooks!.beforeValidate![0] as (args: { data: unknown }) => unknown;
  const attempt = (data: unknown) => {
    try {
      hook({ data });
      return "accepted";
    } catch {
      return "rejected";
    }
  };

  it("rejects passwords shorter than 12 characters", () => {
    expect(attempt({ password: "short123" })).toBe("rejected");
    expect(attempt({ password: "elevenchars" })).toBe("rejected");
  });

  it("accepts 12+ characters and saves without a password change", () => {
    expect(attempt({ password: "twelve-chars" })).toBe("accepted");
    expect(attempt({ name: "Just a name change" })).toBe("accepted");
  });
});

describe("safe links in the CMS", () => {
  const config = friendlyCollection({
    slug: "test",
    fields: [
      { name: "href", type: "text", required: true },
      { name: "linkedin", type: "text" },
    ],
  });
  const validate = (name: string) =>
    (config.fields.find((f) => (f as { name?: string }).name === name) as { validate: (v: unknown) => unknown })
      .validate;
  const href = validate("href");

  it.each(["/contact", "#free-consultation", "https://wa.me/923445450666", "http://example.com", "mailto:info@thetechvation.com", "tel:+13078550572"])(
    "accepts %s",
    (value) => expect(href(value)).toBe(true),
  );

  it.each(["javascript:alert(1)", " JavaScript:alert(document.cookie)", "data:text/html,<script>alert(1)</script>", "vbscript:msgbox", "//evil.example", "ftp://x"])(
    "rejects %s",
    (value) => expect(href(value)).toEqual(expect.any(String)),
  );

  it("requires required links and allows empty optional ones", () => {
    expect(href("")).toEqual(expect.any(String));
    expect(validate("linkedin")("")).toBe(true);
  });

  it("gives every field a plain-English label", () => {
    const labelled = friendlyCollection({ slug: "t", fields: [{ name: "eyebrow", type: "text" }] });
    expect((labelled.fields[0] as { label: string }).label).toBe("Small label above the heading");
  });
});

describe("calendar lookup limiter", () => {
  it("allows normal use and blocks floods", () => {
    const visitor = `test-${Math.random()}`;
    const results = Array.from({ length: 5 }, () => overLookupLimit(visitor, 3, 60_000));
    expect(results).toEqual([false, false, false, true, true]);
  });

  it("never limits unknown visitors (no IP)", () => {
    expect(overLookupLimit("", 0)).toBe(false);
  });
});
