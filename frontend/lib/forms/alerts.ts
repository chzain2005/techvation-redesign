/*
 * Emails the team when a form is sent on the website (called from
 * lib/forms/actions.ts after the submission is saved). Recipients are set
 * in the CMS under Settings → Email alerts; the email service is chosen by
 * environment variables in payload.config.ts (Resend or SMTP).
 *
 * An alert never blocks or fails the visitor's form: errors are only logged.
 */
import "server-only";
import type { Payload } from "payload";
import { FORM_KINDS, type FormKind } from "@/cms/collections/FormSubmissions";

const FALLBACK_RECIPIENT = "info@thetechvation.com";
const SIGN_UPS: FormKind[] = ["newsletter", "solutions-notify"];

export type AlertSubmission = {
  id: number | string;
  form: FormKind;
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  page?: string;
  details?: Record<string, string>;
  hasCv?: boolean;
  /** Start of a booked call (ms). */
  bookingStart?: number;
};

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** "budget" -> "Budget", "slot" -> "Slot" */
const fieldLabel = (key: string) => key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());

type Settings = {
  enabled?: boolean | null;
  recipients?: Array<{ email: string }> | null;
  jobRecipients?: Array<{ email: string }> | null;
  newsletterAlerts?: boolean | null;
};

export async function sendAlert(payload: Payload, submission: AlertSubmission) {
  try {
    const settings = (await payload.findGlobal({ slug: "notifications", depth: 0, overrideAccess: true })) as Settings;
    if (settings.enabled === false) return;
    if (SIGN_UPS.includes(submission.form) && !settings.newsletterAlerts) return;

    const list = (rows?: Array<{ email: string }> | null) => (rows ?? []).map((row) => row.email).filter(Boolean);
    const jobList = list(settings.jobRecipients);
    const to =
      submission.form === "job-application" && jobList.length
        ? jobList
        : list(settings.recipients).length
          ? list(settings.recipients)
          : [FALLBACK_RECIPIENT];

    const formName = FORM_KINDS.find((kind) => kind.value === submission.form)?.label ?? submission.form;
    const who = submission.name || submission.email;
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thetechvation.com").replace(/\/$/, "");
    const adminLink = `${siteUrl}/admin/collections/form-submissions/${submission.id}`;

    // The call time in Pakistan time for the team (the visitor's own time is in "Slot").
    const callTime = submission.bookingStart
      ? new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Karachi",
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date(submission.bookingStart)) + " (PKT)"
      : undefined;

    const rows: Array<[string, string | undefined]> = [
      ["Call time", callTime],
      ["Name", submission.name],
      ["Email", submission.email],
      ["Phone / WhatsApp", submission.phone],
      ["Company", submission.company],
      [submission.form === "job-application" ? "Role" : "Service", submission.service],
      ...Object.entries(submission.details ?? {}).map(([key, value]): [string, string] => [fieldLabel(key), value]),
      ["Sent from", submission.page ? `${siteUrl}${submission.page}` : undefined],
      ["CV", submission.hasCv ? "Attached: open the request in the inbox to view it" : undefined],
    ];
    const table = rows
      .filter(([, value]) => value)
      .map(
        ([label, value]) =>
          `<tr><td style="padding:6px 16px 6px 0;color:#6b6b80;vertical-align:top;white-space:nowrap">${escape(label)}</td><td style="padding:6px 0;color:#14112b">${escape(value!)}</td></tr>`,
      )
      .join("");
    const message = submission.message
      ? `<p style="margin:20px 0 6px;color:#6b6b80">Message</p><div style="padding:14px 16px;border-radius:10px;background:#f4f2ff;color:#14112b;white-space:pre-wrap">${escape(submission.message)}</div>`
      : "";

    const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;max-width:600px">
  <h2 style="margin:0 0 4px;color:#14112b">New request: ${escape(formName)}</h2>
  <p style="margin:0 0 18px;color:#6b6b80">From ${escape(who)}. Reply to this email to answer them directly.</p>
  <table style="border-collapse:collapse">${table}</table>
  ${message}
  <p style="margin:24px 0"><a href="${adminLink}" style="display:inline-block;padding:10px 18px;border-radius:999px;background:#5b3df5;color:#fff;text-decoration:none;font-weight:bold">Open in the inbox</a></p>
  <p style="color:#9a9aae;font-size:12px">Sent by the Techvation website. Change who gets these emails in the editor under Settings → Email alerts.</p>
</div>`;

    const text = [
      `New request: ${formName}`,
      ...rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
      submission.message ? `\nMessage:\n${submission.message}` : "",
      `\nOpen in the inbox: ${adminLink}`,
    ].join("\n");

    await payload.sendEmail({
      to,
      replyTo: submission.email,
      subject: `New ${formName.toLowerCase()} request from ${who}`,
      html,
      text,
    });
  } catch (error) {
    console.error("[forms] could not send the email alert:", error);
  }
}
