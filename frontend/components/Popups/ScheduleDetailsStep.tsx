"use client"; // Forms need the browser: we handle the submit event here.

import { useState, type FormEvent } from "react";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import { scheduleCall } from "@/data/popups";
import { PopupInput, PopupTextarea } from "./PopupField";
import type { Contact } from "./PopupProvider";
import { trackFormSubmit } from "@/lib/analytics";
import { FormError, Honeypot } from "@/components/Forms/FormExtras";
import { sendForm } from "@/lib/forms/send";

type ScheduleDetailsStepProps = {
  /** The chosen slot as text, e.g. "Wed, Nov 18 · 11:30 AM – 12:00 PM (PKT)". */
  summary: string;
  /** The exact start of the call (ISO), so the server can check it is still free. */
  slotStart: string;
  /** Details we already know (from the consultation form), filled in for the visitor. */
  contact: Contact;
  /** "Change" or "Back" was clicked: return to the date and time step. */
  onBack: () => void;
  /** Called with the visitor's details once the booking has been sent. */
  onConfirmed: (contact: Contact) => void;
};

/**
 * Step 2 of "Schedule a Call": the chosen slot at the top, then the
 * visitor's details. The fields sit side by side from tablets up.
 */
export default function ScheduleDetailsStep({
  summary,
  slotStart,
  contact,
  onBack,
  onConfirmed,
}: ScheduleDetailsStepProps) {
  const { fields, changeLabel, backLabel, submitLabel } = scheduleCall.detailsStep;
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    // Save the booking, with the chosen slot, to the CMS inbox. The team sends
    // the calendar invite promised in step 3 from there.
    setIsSending(true);
    setError("");
    const result = await sendForm("booking", data, { slot: summary, slotStart });
    setIsSending(false);
    if (!result.ok) return setError(result.error);

    // Record the sent form in Google Analytics (no personal details).
    trackFormSubmit("schedule_call_popup");

    onConfirmed({
      name: text("name"),
      email: text("email"),
      phone: text("phone"),
      company: text("company"),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3.5 md:gap-4">
      {/* The chosen slot, with a link back to step 1 */}
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 self-start rounded-chip border border-primary/25 bg-surface px-4 py-3">
        <Icon src="/assets/icons/calendar-brand.svg" size={18} scale />
        <p className="text-label font-semibold text-primary-dark">{summary}</p>
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer text-label font-semibold text-primary underline-offset-4 hover:underline sm:ml-4"
        >
          {changeLabel}
        </button>
      </div>

      <div className="grid gap-3.5 md:grid-cols-2">
        <PopupInput
          name="name"
          required
          autoComplete="name"
          defaultValue={contact.name}
          {...fields.name}
        />
        <PopupInput
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={contact.email}
          {...fields.email}
        />
      </div>
      <div className="grid gap-3.5 md:grid-cols-2">
        <PopupInput
          name="phone"
          type="tel"
          autoComplete="tel"
          defaultValue={contact.phone}
          {...fields.phone}
        />
        <PopupInput
          name="company"
          autoComplete="organization"
          defaultValue={contact.company}
          {...fields.company}
        />
      </div>

      <PopupTextarea name="topic" {...fields.topic} />

      {/* Footer: back link on the left, the button on the right.
          Phones: a full-width button with the back link under it. */}
      <div className="mt-auto flex flex-col-reverse items-center justify-between gap-3.5 md:flex-row md:gap-4">
        <button
          type="button"
          onClick={onBack}
          className="group flex cursor-pointer items-center gap-1.5 text-label font-semibold text-primary"
        >
          <Icon
            src="/assets/icons/arrow-left-brand.svg"
            size={16}
            scale
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          {backLabel}
        </button>
        <Honeypot />
        <Button type="submit" className="w-full md:w-auto" disabled={isSending}>
          {submitLabel}
        </Button>
      </div>
      <FormError message={error} />
    </form>
  );
}
