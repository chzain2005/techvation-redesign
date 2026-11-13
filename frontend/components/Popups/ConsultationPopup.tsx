"use client"; // Forms need the browser: we handle the submit event here.

import type { FormEvent } from "react";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import { services } from "@/data/homepage";
import { consultationPopup } from "@/data/popups";
import { PopupInput, PopupSelect, PopupTextarea } from "./PopupField";
import { PopupCloseButton } from "./PopupShell";
import type { Contact } from "./PopupProvider";

type ConsultationPopupProps = {
  onClose: () => void;
  /** Called with the visitor's details once the form has been sent. */
  onSubmitted: (contact: Contact) => void;
};

/**
 * Pop-up 1: the "Get your free consultation" form.
 * Name and company (and email and phone) sit side by side from tablets up
 * and are stacked on phones.
 */
export default function ConsultationPopup({ onClose, onSubmitted }: ConsultationPopupProps) {
  const { fields } = consultationPopup;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    // TODO: send the form to the backend once the API endpoint exists, e.g.
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations`, { method: "POST", ... })

    onSubmitted({
      name: text("name"),
      email: text("email"),
      phone: text("phone"),
      company: text("company"),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 p-6 md:p-10">
      {/* Header: icon tile, title and subtitle on the left, close button on the right */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col items-start gap-1.5">
          <span className="rounded-xl bg-brand p-2.5">
            <Icon src="/assets/icons/sparkles-white-20.svg" size={20} />
          </span>
          <h2 className="font-heading text-popup-title font-semibold text-heading">
            {consultationPopup.title}
          </h2>
          <p className="max-w-110 text-small text-body">{consultationPopup.subtitle}</p>
        </div>
        <PopupCloseButton onClick={onClose} />
      </div>

      <div className="grid gap-4.5 md:grid-cols-2 md:gap-3.5">
        <PopupInput name="name" required autoComplete="name" {...fields.name} />
        <PopupInput name="company" autoComplete="organization" {...fields.company} />
      </div>
      <div className="grid gap-4.5 md:grid-cols-2 md:gap-3.5">
        <PopupInput name="email" type="email" required autoComplete="email" {...fields.email} />
        <PopupInput name="phone" type="tel" autoComplete="tel" {...fields.phone} />
      </div>

      {/* The same services as the Services section of the homepage */}
      <PopupSelect name="service" required {...fields.service}>
        {services.items.map((service) => (
          <option key={service.title} value={service.title} className="text-heading">
            {service.title}
          </option>
        ))}
      </PopupSelect>

      <PopupTextarea name="goal" {...fields.goal} />

      <Button type="submit" className="w-full">
        {consultationPopup.submitLabel}
      </Button>

      {/* Reassurance line under the button */}
      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {consultationPopup.notes.map((note) => (
          <li key={note.label} className="flex items-center gap-1.5 text-caption font-medium text-body">
            <Icon src={note.icon} size={14} />
            {note.label}
          </li>
        ))}
      </ul>
    </form>
  );
}
