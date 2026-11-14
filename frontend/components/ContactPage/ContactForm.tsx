"use client"; // Chips, form and submit need the browser.

import { useState, type FormEvent } from "react";
import Button from "@/components/Button/Button";
import Glyph from "@/components/Icon/Glyph";
import Icon from "@/components/Icon/Icon";
import { usePopups } from "@/components/Popups/PopupProvider";
import { contactPage } from "@/data/contact";
import { cn } from "@/lib/cn";

const fieldClasses =
  "w-full rounded-xl border border-border bg-white px-4 py-3.5 text-small text-heading outline-none transition-colors placeholder:text-muted focus:border-primary";
const labelClasses = "flex min-w-0 flex-col gap-2 text-label-sm font-semibold text-heading";

/** A dropdown with our own arrow, starting on a grey placeholder. */
function Select({ name, label, placeholder, options }: { name: string; label: string; placeholder: string; options: string[] }) {
  const [value, setValue] = useState("");
  return (
    <label className={labelClasses}>
      {label}
      <span className="relative">
        <select
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className={cn(fieldClasses, "cursor-pointer appearance-none pr-11", !value && "text-muted")}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-heading">
              {option}
            </option>
          ))}
        </select>
        <Icon
          src="/assets/icons/chevron-down-body-18.svg"
          size={18}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
        />
      </span>
    </label>
  );
}

/**
 * The "Let's talk" form card (anchor #form).
 *
 * - Phones: one column, a shorter title and chip labels, and no company
 *   or timeline field, as in the mobile design.
 * - Tablets and up: name/company, email/phone and budget/timeline in pairs.
 *
 * Sending it shows the thank-you pop-up, which offers to book a call
 * straight away with the details filled in.
 */
export default function ContactForm() {
  const { form } = contactPage;
  const { showConsultationSuccess } = usePopups();
  const [services, setServices] = useState<string[]>([]);

  function toggle(service: string) {
    setServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    // TODO: send the request to the backend once the contact endpoint exists,
    // including `services`, budget, timeline and details.

    showConsultationSuccess({
      name: text("name"),
      email: text("email"),
      phone: text("phone"),
      company: text("company"),
    });
    formElement.reset();
    setServices([]);
  }

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="flex min-w-0 scroll-mt-navbar flex-col gap-5 rounded-post border border-border bg-white p-5 shadow-feature md:rounded-feature md:p-10 xl:flex-1"
    >
      <h2 className="font-heading text-popup-title-sm font-semibold text-heading md:text-popup-title-lg">
        <span className="md:hidden">{form.titleShort}</span>
        <span className="max-md:hidden">{form.title}</span>
      </h2>

      <div className="grid gap-5 md:grid-cols-2 md:gap-4">
        <label className={labelClasses}>
          {form.fields.name.label}
          <input type="text" name="name" required autoComplete="name" placeholder={form.fields.name.placeholder} className={fieldClasses} />
        </label>
        <label className={cn(labelClasses, "max-md:hidden")}>
          {form.fields.company.label}
          <input type="text" name="company" autoComplete="organization" placeholder={form.fields.company.placeholder} className={fieldClasses} />
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2 md:gap-4">
        <label className={labelClasses}>
          {form.fields.email.label}
          <input type="email" name="email" required autoComplete="email" placeholder={form.fields.email.placeholder} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          {form.fields.phone.label}
          <input type="tel" name="phone" autoComplete="tel" placeholder={form.fields.phone.placeholder} className={fieldClasses} />
        </label>
      </div>

      {/* Services: tap to pick one or more */}
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-label-sm font-semibold text-heading">{form.servicesLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {form.services.map((service) => {
            const isPicked = services.includes(service.label);
            return (
              <button
                key={service.label}
                type="button"
                aria-pressed={isPicked}
                onClick={() => toggle(service.label)}
                className={cn(
                  "flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-label-sm font-medium transition-colors duration-200",
                  isPicked
                    ? "border-transparent bg-brand text-white"
                    : "border-border bg-surface text-primary-dark hover:border-primary/40",
                )}
              >
                {isPicked && <Glyph name="check" size={14} />}
                <span className="md:hidden">{service.short}</span>
                <span className="max-md:hidden">{service.label}</span>
              </button>
            );
          })}
        </div>
        {services.map((service) => (
          <input key={service} type="hidden" name="services" value={service} />
        ))}
      </fieldset>

      <div className="grid gap-5 md:grid-cols-2 md:gap-4">
        <Select name="budget" label={form.fields.budget.label} placeholder={form.fields.budget.placeholder} options={form.budgets} />
        <div className="max-md:hidden">
          <Select name="timeline" label={form.fields.timeline.label} placeholder={form.fields.timeline.placeholder} options={form.timelines} />
        </div>
      </div>

      <label className={labelClasses}>
        {form.fields.details.label}
        <textarea name="details" rows={4} placeholder={form.fields.details.placeholder} className={cn(fieldClasses, "h-27.5 resize-none")} />
      </label>

      <label className="flex cursor-pointer items-start gap-2.5 text-small text-body">
        <input type="checkbox" name="consent" required className="peer sr-only" />
        <span
          aria-hidden
          className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-[5px] border border-border bg-white text-transparent transition-colors peer-checked:border-transparent peer-checked:bg-brand peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40"
        >
          <Glyph name="check" size={12} />
        </span>
        <span>
          {form.consent.before}
          <a
            href={form.consent.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            {form.consent.link.label}
          </a>
          {form.consent.after}
        </span>
      </label>

      <Button type="submit" className="w-full">
        {form.submitLabel}
      </Button>

      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {form.notes.map((note) => (
          <li key={note.label} className="flex items-center gap-1.5 text-caption font-medium text-body">
            <Icon src={note.icon} size={14} />
            {note.label}
          </li>
        ))}
      </ul>
    </form>
  );
}
