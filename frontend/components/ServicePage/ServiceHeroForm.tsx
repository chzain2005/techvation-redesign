"use client"; // Forms need the browser: we handle the submit event here.

import type { FormEvent } from "react";
import Button from "@/components/Button/Button";
import { usePopups } from "@/components/Popups/PopupProvider";
import { serviceDetailPage } from "@/data/services";
import { cn } from "@/lib/cn";
import { trackFormSubmit } from "@/lib/analytics";

/* Glass inputs on the dark card (same look as the homepage hero form). */
const fieldClasses =
  "w-full rounded-xl border border-white/18 bg-white/8 px-4 py-3.5 text-small font-normal text-white outline-none placeholder:text-white/55 focus:border-accent";
const labelClasses = "flex flex-col gap-2 text-label-sm font-semibold text-white";

/**
 * The consultation card on the right of a service hero.
 * Phones leave out the phone field, as in the mobile design.
 * Sending it shows the thank-you pop-up, which leads on to booking a call.
 */
export default function ServiceHeroForm({ title }: { title: string }) {
  const { heroForm } = serviceDetailPage;
  const { showConsultationSuccess } = usePopups();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    // TODO: send the form to the backend once the API endpoint exists.

    // Record the sent form in Google Analytics (no personal details).
    trackFormSubmit("service_hero_consultation", "generate_lead", { service: title });

    showConsultationSuccess({ name: text("name"), email: text("email"), phone: text("phone") });
    formElement.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3.5 rounded-post border border-white/14 bg-ink-card/75 p-5 shadow-form backdrop-blur-md md:p-7 xl:w-105 xl:shrink-0 xl:rounded-card"
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-title-sm font-semibold text-white xl:text-title">{title}</h2>
        <p className="hidden text-small text-white/60 md:block">{heroForm.subtitle}</p>
      </div>

      <label className={labelClasses}>
        {heroForm.fields.name.label}
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder={heroForm.fields.name.placeholder}
          className={fieldClasses}
        />
      </label>
      <label className={labelClasses}>
        {heroForm.fields.email.label}
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={heroForm.fields.email.placeholder}
          className={fieldClasses}
        />
      </label>
      <label className={cn(labelClasses, "max-md:hidden")}>
        {heroForm.fields.phone.label}
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder={heroForm.fields.phone.placeholder}
          className={fieldClasses}
        />
      </label>

      <Button type="submit" className="mt-1 w-full">
        {heroForm.submitLabel}
      </Button>
    </form>
  );
}
