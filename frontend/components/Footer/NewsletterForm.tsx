"use client"; // Forms need the browser: we handle the submit event here.

import type { FormEvent } from "react";
import Button from "@/components/Button/Button";
import type { footer } from "@/data/homepage";
import { trackFormSubmit } from "@/lib/analytics";

/**
 * The email field + "Subscribe" button in the footer, styled as one pill.
 * It is full width on phones and tablets and 460px wide on desktop.
 */
export default function NewsletterForm({ newsletter }: { newsletter: (typeof footer)["newsletter"] }) {

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();
    // Record the sent form in Google Analytics (no personal details).
    trackFormSubmit("footer_newsletter", "sign_up");
    // TODO: send the email to the backend once the API endpoint exists.
  }

  return (
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
      <Button type="submit" size="md" showIcon={false}>
        {newsletter.submitLabel}
      </Button>
    </form>
  );
}
