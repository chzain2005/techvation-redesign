"use server";

/*
 * Saves a website form into the CMS inbox (Inbox → Form submissions).
 *
 * Every form calls this through sendForm() (lib/forms/send.ts). The fields
 * are untrusted, so everything is checked and trimmed here; anything that
 * is not one of the standard fields is kept under "Other answers".
 */
import config from "@payload-config";
import { after } from "next/server";
import { getPayload } from "payload";
import { FORM_KINDS, type FormKind } from "@/cms/collections/FormSubmissions";
import { sendAlert } from "./alerts";
import { bookedStarts, CALL_MS, clashes, MAX_AHEAD_MS } from "./booking-rules";
import { overFormLimit, overLookupLimit, TOO_MANY, visitorHash } from "./rate-limit";

export type FormResult = { ok: true } | { ok: false; error: string };

/** The largest CV accepted (Vercel caps a request at 4.5 MB). */
const MAX_CV_BYTES = 4 * 1024 * 1024;

/** Standard fields; every other field goes into `details`. */
const STANDARD = new Set(["form", "page", "name", "email", "phone", "company", "service", "message", "cv", "website", "slotStart"]);

const TAKEN = "Sorry, that time was just booked by someone else. Please go back and pick another time.";

/**
 * The start times (ms) of calls already booked between two moments, so the
 * calendar can show those times as booked. Only times are returned, never
 * who booked them.
 */
export async function getBookedTimes(fromIso: string, toIso: string): Promise<number[]> {
  const from = new Date(fromIso).getTime();
  const to = new Date(toIso).getTime();
  if (Number.isNaN(from) || Number.isNaN(to) || to < from || to - from > MAX_AHEAD_MS) return [];
  if (overLookupLimit(await visitorHash())) return [];
  try {
    const payload = await getPayload({ config });
    return await bookedStarts(payload, from, to);
  } catch (error) {
    console.error("[forms] could not read booked times:", error);
    return [];
  }
}

/** Free-text fields some forms use for their message. */
const MESSAGE_FIELDS = ["message", "goal", "details", "topic"];

const KINDS = new Set<string>(FORM_KINDS.map((kind) => kind.value));
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: FormDataEntryValue | null, max = 500) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function submitForm(data: FormData): Promise<FormResult> {
  // Spam trap: a hidden field people never see or fill in. Bots usually do;
  // pretend it worked so they don't try again.
  if (clean(data.get("website"))) return { ok: true };

  const form = clean(data.get("form"), 40);
  if (!KINDS.has(form)) return { ok: false, error: "Unknown form." };

  const email = clean(data.get("email"), 200);
  if (!EMAIL.test(email)) return { ok: false, error: "Please enter a valid email address." };

  // The message, from whichever field the form uses for it.
  const messageField = MESSAGE_FIELDS.find((field) => clean(data.get(field)));
  const message = messageField ? clean(data.get(messageField), 5000) : "";

  // Everything else (budget, timeline, chosen slot, area…), joined per field.
  const details: Record<string, string> = {};
  for (const key of new Set(data.keys())) {
    if (STANDARD.has(key) || key === messageField || key.startsWith("$ACTION")) continue;
    const values = data.getAll(key).map((value) => clean(value, 1000)).filter(Boolean);
    if (values.length) details[key] = values.join(", ");
  }

  // A call booking: its exact start time, which must be in the future.
  let bookingStart: number | undefined;
  if (form === "booking") {
    bookingStart = new Date(clean(data.get("slotStart"), 40)).getTime();
    const now = Date.now();
    if (Number.isNaN(bookingStart) || bookingStart < now || bookingStart > now + MAX_AHEAD_MS) {
      return { ok: false, error: "Please go back and pick a time for your call." };
    }
  }

  try {
    const payload = await getPayload({ config });

    // At most a few forms per visitor in a short time (stops spam floods).
    const visitor = await visitorHash();
    if (await overFormLimit(payload, visitor)) return { ok: false, error: TOO_MANY };

    // Two people can't book the same time.
    if (bookingStart !== undefined && (await clashes(payload, bookingStart))) {
      return { ok: false, error: TAKEN };
    }

    // The CV of a job application: a PDF of at most 4 MB.
    let cv: number | undefined;
    const file = data.get("cv");
    if (form === "job-application" && file instanceof File && file.size > 0) {
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      if (!isPdf) return { ok: false, error: "Please attach your CV as a PDF." };
      if (file.size > MAX_CV_BYTES) return { ok: false, error: "The CV is larger than 4 MB." };
      const upload = await payload.create({
        collection: "cv-uploads",
        data: { originalName: file.name.slice(0, 200) },
        file: {
          data: Buffer.from(await file.arrayBuffer()),
          name: file.name,
          mimetype: "application/pdf",
          size: file.size,
        },
        overrideAccess: true,
      });
      cv = upload.id as number;
    }

    const fields = {
      form: form as FormKind,
      page: clean(data.get("page"), 300),
      name: clean(data.get("name"), 200),
      email,
      phone: clean(data.get("phone"), 60),
      company: clean(data.get("company"), 200),
      service: clean(data.get("service"), 200),
      message,
      details: Object.keys(details).length ? details : undefined,
    };
    const submission = await payload.create({
      collection: "form-submissions",
      data: {
        ...fields,
        status: "new",
        cv,
        visitor,
        bookingStart: bookingStart !== undefined ? new Date(bookingStart).toISOString() : undefined,
      },
      overrideAccess: true,
    });

    // Two visitors confirming overlapping times at the same moment: the
    // earlier booking keeps the time, the later one is removed and asked to
    // pick again.
    if (bookingStart !== undefined) {
      const { docs: earlier } = await payload.find({
        collection: "form-submissions",
        where: {
          and: [
            { form: { equals: "booking" } },
            { status: { not_equals: "cancelled" } },
            { id: { less_than: submission.id } },
            { bookingStart: { greater_than: new Date(bookingStart - CALL_MS).toISOString() } },
            { bookingStart: { less_than: new Date(bookingStart + CALL_MS).toISOString() } },
          ],
        },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      });
      if (earlier.length) {
        await payload.delete({ collection: "form-submissions", id: submission.id, overrideAccess: true });
        return { ok: false, error: TAKEN };
      }
    }

    // Email the team (Settings → Email alerts) after the visitor already has
    // their answer, so a slow or failing email never affects the form.
    after(() => sendAlert(payload, { ...fields, id: submission.id, hasCv: Boolean(cv), bookingStart }));
    return { ok: true };
  } catch (error) {
    const details = (error as { data?: { errors?: unknown } }).data?.errors;
    console.error("[forms] could not save a submission:", error, details ? JSON.stringify(details) : "");
    return { ok: false, error: "Sorry, something went wrong. Please try again, or email info@thetechvation.com." };
  }
}
