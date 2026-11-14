"use client"; // Forms need the browser: we handle the submit event here.

import { useState, type FormEvent } from "react";
import Button from "@/components/Button/Button";
import Glyph from "@/components/Icon/Glyph";
import { blogPage } from "@/data/blog";
import { trackFormSubmit } from "@/lib/analytics";

/**
 * "Get our monthly tech digest": mail icon and text on the left, an email
 * field with a "Subscribe" button on the right (stacked below xl).
 */
export default function BlogNewsletter() {
  const { newsletter } = blogPage;
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Record the sent form in Google Analytics (no personal details).
    trackFormSubmit("blog_newsletter", "sign_up");
    // TODO: send the email to the newsletter service once it is connected.
    setIsSent(true);
  }

  return (
    <section aria-label="Newsletter" className="bg-white">
      <div className="mx-auto w-full max-w-page page-x pb-16 md:pb-20 xl:pb-section">
        <div className="flex flex-col gap-6 rounded-post border border-border bg-surface p-6 md:rounded-feature md:p-10 xl:flex-row xl:items-center xl:justify-between xl:px-14 xl:py-12">
          <div className="flex items-center gap-4 md:gap-5">
            <span className="shrink-0 rounded-float bg-brand p-3.5 text-white md:p-4">
              <Glyph name="mail" size={28} />
            </span>
            <span className="flex flex-col gap-1.5">
              <span className="font-heading text-popup-title-sm font-semibold text-heading md:text-popup-title">
                {newsletter.title}
              </span>
              <span className="text-small text-body md:text-body-base">{newsletter.text}</span>
            </span>
          </div>

          {isSent ? (
            <p role="status" className="flex items-center gap-2.5 text-label font-semibold text-primary-dark">
              <span className="rounded-full bg-brand p-1.5 text-white">
                <Glyph name="check" size={14} />
              </span>
              {newsletter.successText}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full items-center gap-2 rounded-full border border-border bg-white py-1.5 pr-1.5 pl-5 xl:w-115"
            >
              <label className="min-w-0 flex-1">
                <span className="sr-only">{newsletter.label}</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder={newsletter.placeholder}
                  className="w-full bg-transparent text-body-sm text-heading outline-none placeholder:text-muted md:text-body-base"
                />
              </label>
              <Button type="submit" size="md">
                {newsletter.submitLabel}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
