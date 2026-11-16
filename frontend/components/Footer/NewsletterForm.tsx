"use client"; // Forms need the browser: we handle the submit event here.

import { useState, type FormEvent } from "react";
import Button from "@/components/Button/Button";
import type { footer } from "@/data/homepage";
import { trackFormSubmit } from "@/lib/analytics";
import { Honeypot } from "@/components/Forms/FormExtras";
import { sendForm } from "@/lib/forms/send";

/**
 * The email field + "Subscribe" button in the footer, styled as one pill.
 * It is full width on phones and tablets and 460px wide on desktop.
 */
export default function NewsletterForm({
  newsletter,
}: {
  newsletter: (typeof footer)["newsletter"];
}) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();
    const formElement = event.currentTarget;
    // Save it to the CMS inbox (Inbox → Form submissions).
    setIsSending(true);
    setError("");
    const result = await sendForm("newsletter", formElement, {
      source: "Footer",
    });
    setIsSending(false);
    if (!result.ok) return setError(result.error);
    // Record the sent form in Google Analytics (no personal details).
    trackFormSubmit("footer_newsletter", "sign_up");
    setIsSent(true);
    formElement.reset();
  }

  return (
    // The error message sits under the field, so the pill layout stays intact.
    <div className="flex w-full flex-col gap-2 xl:w-115">
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-2 rounded-full border border-white/14 bg-white/6 py-1.5 pr-1.5 pl-4.5 xl:w-115 xl:gap-2.5 xl:pl-5.5"
      >
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          aria-label={newsletter.placeholder}
          placeholder={newsletter.placeholder}
          className="min-w-0 flex-1 bg-transparent text-small text-white outline-none placeholder:text-white/45 xl:text-body-sm"
        />
        <Honeypot />
        <Button
          type="submit"
          size="md"
          showIcon={false}
          disabled={isSending || isSent}
        >
          {isSent ? "Subscribed ✓" : newsletter.submitLabel}
        </Button>
      </form>
      {error && (
        <p role="alert" className="text-caption font-medium text-white/85">
          {error}
        </p>
      )}
    </div>
  );
}
