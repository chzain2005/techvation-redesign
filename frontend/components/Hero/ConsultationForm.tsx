"use client"; // Forms need the browser: we handle the submit event here.

import type { FormEvent } from "react";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import { usePopups } from "@/components/Popups/PopupProvider";
import { hero, services } from "@/data/homepage";

/* Shared look of the three inputs (glass style on the dark card). */
const fieldClasses =
  "w-full rounded-xl border border-white/18 bg-white/8 px-4 py-3.5 text-small font-normal text-white outline-none placeholder:text-white/55 focus:border-accent";

const labelClasses = "flex flex-col gap-2 text-label-sm font-semibold text-white";

/**
 * The "Free Consultation" card in the hero.
 * The service dropdown lists the same services as the Services section.
 * Sending it opens the thank-you pop-up, from where the visitor can book a call.
 *
 * - Phones: a compact full-width card with the fields stacked.
 * - Tablets: full width, with name and email side by side.
 * - Desktop (xl and up): a 440px card next to the headline, with a larger
 *   header and an extra reassurance line under the button.
 */
export default function ConsultationForm() {
  const { form } = hero;
  const { showConsultationSuccess } = usePopups();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    // TODO: send the form to the backend once the API endpoint exists, e.g.
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations`, { method: "POST", ... })

    // Same next step as the consultation pop-up: the thank-you pop-up, which
    // offers to book a call right away (name and email are carried over).
    showConsultationSuccess({ name: text("name"), email: text("email") });
    formElement.reset();
  }

  return (
    <form
      id="free-consultation"
      onSubmit={handleSubmit}
      className="flex w-full scroll-mt-navbar flex-col gap-3 rounded-post border border-white/14 bg-ink-card/80 p-5 backdrop-blur-md md:p-7 xl:max-w-110 xl:shrink-0 xl:gap-3.5 xl:rounded-card xl:bg-ink-card/75 xl:p-7.5 xl:shadow-form"
    >
      {/* Card header: icon tile + title */}
      <div className="flex items-center gap-2.5 xl:gap-3">
        <span className="rounded-cell bg-brand p-2 xl:rounded-xl xl:p-2.5">
          {/* The icon is 18px on small screens and 20px on desktop. */}
          <span className="block xl:hidden">
            <Icon src="/assets/icons/sparkles-white-18.svg" size={18} />
          </span>
          <span className="hidden xl:block">
            <Icon src="/assets/icons/sparkles-white-20.svg" size={20} />
          </span>
        </span>
        <div className="flex flex-col xl:gap-0.5">
          <h2 className="font-heading text-title-sm font-semibold text-white xl:text-title-lg">
            {form.title}
          </h2>
          {/* Short subtitle on small screens, full one on desktop */}
          <p className="text-caption font-medium text-white/65 xl:hidden">
            {form.subtitleShort}
          </p>
          <p className="hidden text-small text-white/65 xl:block">{form.subtitle}</p>
        </div>
      </div>

      {/* Name + email: stacked on phones, side by side on tablets, stacked on desktop */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 xl:gap-3.5">
        <label className={labelClasses}>
          {form.fields.name.label}
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder={form.fields.name.placeholder}
            className={fieldClasses}
          />
        </label>
        <label className={labelClasses}>
          {form.fields.email.label}
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={form.fields.email.placeholder}
            className={fieldClasses}
          />
        </label>
      </div>

      {/* Service dropdown: a normal <select> with our own arrow icon on top */}
      <label className={labelClasses}>
        {form.fields.service.label}
        <span className="relative">
          <select
            name="service"
            required
            defaultValue=""
            className={`${fieldClasses} cursor-pointer appearance-none pr-11 invalid:text-white/55`}
          >
            <option value="" disabled>
              {form.fields.service.placeholder}
            </option>
            {services.items.map((service) => (
              <option key={service.title} value={service.title} className="text-heading">
                {service.title}
              </option>
            ))}
          </select>
          <Icon
            src="/assets/icons/chevron-down-field-18.svg"
            size={18}
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
          />
        </span>
      </label>

      <Button type="submit" className="w-full">
        {form.submitLabel}
      </Button>

      {/* Reassurance line under the button (desktop only) */}
      <p className="hidden items-center justify-center gap-2 text-caption font-medium text-white/60 xl:flex">
        <Icon src="/assets/icons/shield-muted-14.svg" size={14} />
        {form.note}
      </p>
    </form>
  );
}
