"use client"; // Forms need the browser: we handle the submit event here.

import { useState, type FormEvent } from "react";
import Button from "@/components/Button/Button";
import Glyph from "@/components/Icon/Glyph";
import { solutionsPage } from "@/data/solutions";

/**
 * "Notify me" email form. After sending, a short thank-you replaces it.
 *
 * - Phones: the field and the button are stacked, both full width.
 * - Tablets and up: one glass pill with the button inside on the right.
 */
export default function NotifyForm() {
  const { notify } = solutionsPage;
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();
    // TODO: send the email to the backend once the newsletter endpoint exists, e.g.
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/solutions/notify`, { method: "POST", ... })
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
      <Button type="submit" className="w-full md:w-auto">
        {notify.submitLabel}
      </Button>
    </form>
  );
}
