"use client"; // Forms need the browser: we handle the submit event here.

import { useState, type FormEvent } from "react";
import Button from "@/components/Button/Button";
import Glyph from "@/components/Icon/Glyph";
import type { solutionsPage } from "@/data/solutions";
import { trackFormSubmit } from "@/lib/analytics";
import { Honeypot } from "@/components/Forms/FormExtras";
import { sendForm } from "@/lib/forms/send";

/**
 * "Notify me" email form. After sending, a short thank-you replaces it.
 *
 * - Phones: the field and the button are stacked, both full width.
 * - Tablets and up: one glass pill with the button inside on the right.
 */
type NotifyText = Pick<
  (typeof solutionsPage)["notify"],
  "label" | "placeholder" | "submitLabel" | "successTitle" | "successText"
>;

export default function NotifyForm({ notify }: { notify: NotifyText }) {
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();
    // Save it to the CMS inbox (Inbox → Form submissions).
    setIsSending(true);
    setError("");
    const result = await sendForm("solutions-notify", event.currentTarget);
    setIsSending(false);
    if (!result.ok) return setError(result.error);
    // Record the sent form in Google Analytics (no personal details).
    trackFormSubmit("solutions_notify", "sign_up");
    setIsSent(true);
  }

  if (isSent) {
    return (
      <div
        role="status"
        className="flex w-full max-w-140 items-center gap-3.5 rounded-float border border-white/14 bg-white/8 px-5 py-4 text-left backdrop-blur-md"
      >
        <span className="rounded-full bg-brand p-2 text-white">
          <Glyph name="check" size={18} />
        </span>
        <span className="flex flex-col">
          <span className="font-heading text-subtitle font-semibold text-white">{notify.successTitle}</span>
          <span className="text-small text-white/70">{notify.successText}</span>
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-140 flex-col gap-2.5 md:flex-row md:items-center md:gap-3 md:rounded-full md:border md:border-white/18 md:bg-white/8 md:p-2 md:pl-5.5 md:backdrop-blur-md"
    >
      <label className="flex flex-1 items-center gap-2.5 rounded-full border border-white/18 bg-white/8 px-5 py-3.5 backdrop-blur-md md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <span className="sr-only">{notify.label}</span>
        <Glyph name="bell" size={18} className="text-accent" />
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={notify.placeholder}
          className="w-full min-w-0 bg-transparent text-body-base text-white outline-none placeholder:text-white/55"
        />
      </label>
      <Honeypot />
      <Button type="submit" className="w-full md:w-auto" disabled={isSending}>
        {notify.submitLabel}
      </Button>
      {error && (
        <p role="alert" className="text-small font-medium text-white md:sr-only">
          {error}
        </p>
      )}
    </form>
  );
}
