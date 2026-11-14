import Image from "next/image";
import Glyph from "@/components/Icon/Glyph";
import { contactPage } from "@/data/contact";

/**
 * The column next to the form: the two offices and the business hours.
 *
 * - Phones: compact office cards (small photo, name and city), no hours
 *   card, as in the mobile design.
 * - Tablets: the two full office cards side by side, hours below.
 * - Desktop (xl and up): one column of 440px next to the form.
 */
export default function ContactInfo() {
  const { offices, hours } = contactPage;

  return (
    <div className="flex flex-col gap-5 xl:w-110 xl:shrink-0">
      <ul className="grid gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-1">
        {offices.map((office) => (
          <li key={office.name} className="overflow-hidden rounded-post border border-border bg-white">
            {/* Phones: small photo on the left */}
            <div className="flex items-center gap-4 p-3 md:hidden">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={office.photo} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-heading text-subtitle-sm font-semibold text-heading">{office.name}</h3>
                <p className="text-caption font-medium text-body">{office.location}</p>
              </div>
            </div>

            {/* Tablets and up: photo with a pin on top, details below */}
            <div className="max-md:hidden">
              <div className="relative h-42.5">
                <Image src={office.photo} alt="" fill sizes="(min-width: 1280px) 440px, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-linear-160 from-primary-dark/35 to-secondary/25" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2.5 text-primary shadow-tag">
                  <Glyph name="map-pin" size={20} />
                </span>
              </div>
              <div className="flex flex-col gap-2 p-5.5">
                <h3 className="font-heading text-title font-semibold text-heading">{office.name}</h3>
                <p className="flex items-center gap-2 text-small text-body">
                  <Glyph name="map-pin" size={15} className="text-primary" />
                  {office.location}
                </p>
                <a href={office.phone.href} className="flex items-center gap-2 text-small text-body transition-colors hover:text-primary">
                  <Glyph name="phone" size={15} className="text-primary" />
                  {office.phone.label}
                </a>
                <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-small text-body transition-colors hover:text-primary">
                  <Glyph name="mail" size={15} className="text-primary" />
                  {office.email}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2.5 rounded-post bg-linear-160 from-ink-soft to-ink-violet p-6 max-md:hidden">
        <p className="flex items-center gap-2.5 font-heading text-subtitle font-semibold text-white">
          <Glyph name="clock" size={20} className="text-accent" />
          {hours.title}
        </p>
        {hours.lines.map((line) => (
          <p key={line} className="text-small text-on-dark">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
