/*
 * The website form handler (lib/forms/actions.ts) end to end against the
 * real CMS: validation, spam trap, rate limiting, call bookings, CVs and
 * the email alert. Only Next.js's request helpers are stood in for: the
 * visitor's IP (headers) and "run after the response" (after).
 */
import type { Payload } from "payload";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { getTestPayload, validPdf } from "./helpers";

const request = vi.hoisted(() => ({ ip: "203.0.113.1", afterQueue: [] as Array<() => unknown> }));

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": `${request.ip}, 10.0.0.1` }),
}));
vi.mock("next/server", () => ({
  after: (task: () => unknown) => {
    request.afterQueue.push(task);
  },
}));

const { getBookedTimes, submitForm } = await import("@/lib/forms/actions");

let payload: Payload;
let ipCounter = 0;

beforeAll(async () => {
  payload = await getTestPayload();
});

beforeEach(() => {
  // Every test is a new visitor, so earlier tests don't count toward its rate limit.
  request.ip = `203.0.113.${++ipCounter}`;
  request.afterQueue = [];
});

const form = (fields: Record<string, string | File>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.append(key, value);
  return data;
};

const latest = async () => {
  const { docs } = await payload.find({
    collection: "form-submissions",
    sort: "-createdAt",
    limit: 1,
    depth: 0, // linked records (the CV) as plain ids
    overrideAccess: true,
  });
  return docs[0];
};

/** A weekday at 11:30 Karachi time, about two weeks ahead. */
const futureSlot = (extraMinutes = 0) => {
  const day = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  day.setUTCHours(6, 30 + extraMinutes, 0, 0);
  return day;
};

describe("contact and consultation forms", () => {
  it("save a valid request with every detail", async () => {
    const result = await submitForm(
      form({
        form: "contact",
        page: "/contact",
        name: "  Ayesha Khan  ",
        email: "ayesha@example.com",
        phone: "+92 300 0000000",
        company: "Acme",
        details: "We need an ERP.",
        budget: "$10k – $25k",
        services: "Odoo ERP",
      }),
    );
    expect(result).toEqual({ ok: true });
    const saved = await latest();
    expect(saved).toMatchObject({
      form: "contact",
      status: "new",
      page: "/contact",
      name: "Ayesha Khan",
      email: "ayesha@example.com",
      company: "Acme",
      message: "We need an ERP.",
      details: { budget: "$10k – $25k", services: "Odoo ERP" },
    });
  });

  it("store a one-way fingerprint of the visitor, never the IP itself", async () => {
    await submitForm(form({ form: "contact", email: "fingerprint@example.com" }));
    const saved = await latest();
    expect(saved.visitor).toMatch(/^[0-9a-f]{32}$/);
    expect(JSON.stringify(saved)).not.toContain(request.ip);
  });

  it("reject an invalid email or an unknown form", async () => {
    expect(await submitForm(form({ form: "contact", email: "not-an-email" }))).toEqual({
      ok: false,
      error: expect.stringMatching(/valid email/),
    });
    expect(await submitForm(form({ form: "something-else", email: "a@example.com" }))).toEqual({
      ok: false,
      error: "Unknown form.",
    });
  });

  it("quietly drop spam bots that fill in the hidden field", async () => {
    const before = await payload.count({ collection: "form-submissions", overrideAccess: true });
    expect(await submitForm(form({ form: "contact", email: "bot@example.com", website: "http://spam" }))).toEqual({ ok: true });
    const after = await payload.count({ collection: "form-submissions", overrideAccess: true });
    expect(after.totalDocs).toBe(before.totalDocs);
  });

  it("cut overly long values", async () => {
    await submitForm(form({ form: "contact", email: "long@example.com", name: "x".repeat(5000), details: "y".repeat(20000) }));
    const saved = await latest();
    expect(saved.name).toHaveLength(200);
    expect(saved.message).toHaveLength(5000);
  });

  it("keep HTML as plain text, and escape it in the email alert", async () => {
    const sendEmail = vi.spyOn(payload, "sendEmail").mockResolvedValue(undefined as never);
    await submitForm(
      form({ form: "contact", email: "xss@example.com", name: "<img src=x onerror=alert(1)>", details: "<script>alert(1)</script>" }),
    );
    expect((await latest()).message).toBe("<script>alert(1)</script>"); // stored as text, shown escaped by React
    for (const task of request.afterQueue) await task();
    const email = sendEmail.mock.calls.at(-1)?.[0] as { html: string; replyTo: string; to: string[]; subject: string };
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(email.html).not.toContain("<img src=x");
    expect(email.replyTo).toBe("xss@example.com");
    expect(email.to).toEqual(["info@thetechvation.com"]); // no recipients set yet -> fallback
    sendEmail.mockRestore();
  });
});

describe("rate limiting", () => {
  it("allows 5 requests per visitor in 10 minutes, then refuses", async () => {
    const results = [];
    for (let i = 0; i < 6; i++) results.push((await submitForm(form({ form: "newsletter", email: `rl${i}@example.com` }))).ok);
    expect(results).toEqual([true, true, true, true, true, false]);
    expect(await submitForm(form({ form: "newsletter", email: "rl6@example.com" }))).toEqual({
      ok: false,
      error: expect.stringMatching(/Too many requests/),
    });
  });

  it("does not affect other visitors", async () => {
    for (let i = 0; i < 6; i++) await submitForm(form({ form: "newsletter", email: `busy${i}@example.com` }));
    request.ip = "198.51.100.77";
    expect((await submitForm(form({ form: "newsletter", email: "someone-else@example.com" }))).ok).toBe(true);
  });
});

describe("call bookings", () => {
  it("save the exact call time", async () => {
    const slot = futureSlot();
    expect(await submitForm(form({ form: "booking", email: "first@example.com", name: "First", slotStart: slot.toISOString() }))).toEqual({ ok: true });
    const saved = await latest();
    expect(new Date(saved.bookingStart!).toISOString()).toBe(slot.toISOString());
  });

  it("show booked times to the calendar (times only, no names)", async () => {
    const slot = futureSlot();
    const times = await getBookedTimes(new Date(slot.getTime() - 3600_000).toISOString(), new Date(slot.getTime() + 3600_000).toISOString());
    expect(times).toContain(slot.getTime());
    expect(times.every((t) => typeof t === "number")).toBe(true);
  });

  it("refuse a second booking for the same time", async () => {
    const result = await submitForm(form({ form: "booking", email: "second@example.com", slotStart: futureSlot().toISOString() }));
    expect(result).toEqual({ ok: false, error: expect.stringMatching(/just booked/) });
  });

  it("refuse a booking that overlaps (15 minutes later)", async () => {
    const result = await submitForm(form({ form: "booking", email: "overlap@example.com", slotStart: futureSlot(15).toISOString() }));
    expect(result).toEqual({ ok: false, error: expect.stringMatching(/just booked/) });
  });

  it("accept the next free slot (30 minutes later)", async () => {
    expect(await submitForm(form({ form: "booking", email: "next@example.com", slotStart: futureSlot(30).toISOString() }))).toEqual({ ok: true });
  });

  it("free the time again when a booking is cancelled", async () => {
    const { docs } = await payload.find({
      collection: "form-submissions",
      where: { email: { equals: "first@example.com" } },
      overrideAccess: true,
    });
    await payload.update({ collection: "form-submissions", id: docs[0].id, data: { status: "cancelled" }, overrideAccess: true });
    expect(await submitForm(form({ form: "booking", email: "after-cancel@example.com", slotStart: futureSlot().toISOString() }))).toEqual({ ok: true });
  });

  it("refuse times in the past or without a time", async () => {
    expect((await submitForm(form({ form: "booking", email: "past@example.com", slotStart: "2020-01-01T10:00:00Z" }))).ok).toBe(false);
    expect((await submitForm(form({ form: "booking", email: "none@example.com" }))).ok).toBe(false);
  });

  it("give the team the call time in Pakistan time in the alert", async () => {
    const sendEmail = vi.spyOn(payload, "sendEmail").mockResolvedValue(undefined as never);
    const slot = futureSlot(90);
    await submitForm(form({ form: "booking", email: "alert@example.com", name: "Alert", slotStart: slot.toISOString() }));
    for (const task of request.afterQueue) await task();
    const email = sendEmail.mock.calls.at(-1)?.[0] as { html: string };
    expect(email.html).toContain("Call time");
    expect(email.html).toMatch(/1:00 pm \(PKT\)/i); // 06:30 + 90 min UTC = 13:00 in Karachi
    sendEmail.mockRestore();
  });
});

describe("job applications", () => {
  it("store the CV privately under a random name", async () => {
    const cv = new File([validPdf()], "My CV.pdf", { type: "application/pdf" });
    expect(await submitForm(form({ form: "job-application", email: "applicant@example.com", name: "Applicant", cv }))).toEqual({ ok: true });
    const saved = await latest();
    const upload = await payload.findByID({ collection: "cv-uploads", id: saved.cv as number, overrideAccess: true });
    expect(upload.originalName).toBe("My CV.pdf");
    expect(upload.filename).toMatch(/^[0-9a-f-]{36}\.pdf$/);
    await expect(payload.findByID({ collection: "cv-uploads", id: upload.id, overrideAccess: false })).rejects.toThrow(/not allowed/i);
  });

  it("refuse files that are not PDFs", async () => {
    const cv = new File(["just text"], "cv.txt", { type: "text/plain" });
    expect(await submitForm(form({ form: "job-application", email: "txt@example.com", cv }))).toEqual({
      ok: false,
      error: expect.stringMatching(/PDF/),
    });
  });

  it("refuse fake PDFs", async () => {
    const cv = new File(["%PDF-1.4 not really a pdf"], "fake.pdf", { type: "application/pdf" });
    expect((await submitForm(form({ form: "job-application", email: "fake@example.com", cv }))).ok).toBe(false);
  });

  it("refuse CVs over 4 MB", async () => {
    const cv = new File([new Uint8Array(4 * 1024 * 1024 + 1)], "huge.pdf", { type: "application/pdf" });
    expect(await submitForm(form({ form: "job-application", email: "huge@example.com", cv }))).toEqual({
      ok: false,
      error: expect.stringMatching(/4 MB/),
    });
  });
});

describe("email alerts", () => {
  it("go to the recipients set in the CMS, and job applications to HR when set", async () => {
    await payload.updateGlobal({
      slug: "notifications",
      data: { recipients: [{ email: "sales@example.com" }], jobRecipients: [{ email: "hr@example.com" }] },
      overrideAccess: true,
    });
    const sendEmail = vi.spyOn(payload, "sendEmail").mockResolvedValue(undefined as never);

    await submitForm(form({ form: "contact", email: "lead@example.com" }));
    await submitForm(form({ form: "job-application", email: "job@example.com" }));
    for (const task of request.afterQueue) await task();

    const recipients = sendEmail.mock.calls.map((call) => (call[0] as { to: string[] }).to);
    expect(recipients).toEqual([["sales@example.com"], ["hr@example.com"]]);
    sendEmail.mockRestore();
  });

  it("are not sent for newsletter sign-ups unless switched on", async () => {
    const sendEmail = vi.spyOn(payload, "sendEmail").mockResolvedValue(undefined as never);
    await submitForm(form({ form: "newsletter", email: "reader@example.com" }));
    for (const task of request.afterQueue) await task();
    expect(sendEmail).not.toHaveBeenCalled();
    sendEmail.mockRestore();
  });

  it("can be switched off", async () => {
    await payload.updateGlobal({ slug: "notifications", data: { enabled: false }, overrideAccess: true });
    const sendEmail = vi.spyOn(payload, "sendEmail").mockResolvedValue(undefined as never);
    await submitForm(form({ form: "contact", email: "quiet@example.com" }));
    for (const task of request.afterQueue) await task();
    expect(sendEmail).not.toHaveBeenCalled();
    sendEmail.mockRestore();
    await payload.updateGlobal({ slug: "notifications", data: { enabled: true }, overrideAccess: true });
  });
});
