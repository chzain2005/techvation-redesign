import ActionButton from "@/components/Button/ActionButton";
import Glyph from "@/components/Icon/Glyph";
import ServiceCard from "@/components/Services/ServiceCard";
import DiscussLink from "@/components/ServicePage/DiscussLink";
import { cta, services as homepageServices, type Service } from "@/data/homepage";
import {
  serviceHref,
  servicesIn,
  servicesPage,
  type ServiceCategory,
  type ServiceDetail,
} from "@/data/services";
import { cn } from "@/lib/cn";

/** Turns a service into the shape the homepage ServiceCard expects. */
function toCard(service: ServiceDetail): Service | undefined {
  const href = serviceHref(service.slug);
  const card = homepageServices.items.find((item) => item.href === href);
  return card && { ...card, description: service.cardDescription };
}

/** The dark card that fills the empty column of a group with only two services. */
function PromoCard({ promo }: { promo: NonNullable<ServiceCategory["promo"]> }) {
  return (
    <div className="flex h-full min-h-70 flex-col items-start justify-end gap-4 rounded-card bg-linear-135 from-ink-soft to-primary-dark p-8">
      <span className="rounded-chip bg-white/10 p-3 text-accent">
        <Glyph name="sparkles" size={22} />
      </span>
      <h3 className="max-w-80 font-heading text-popup-title font-semibold text-white">{promo.title}</h3>
      <p className="max-w-80 text-small text-white/80">{promo.text}</p>
      <ActionButton href={cta.scheduleCall.href} size="md">
        {cta.scheduleCall.label}
      </ActionButton>
    </div>
  );
}

/**
 * One practice area on the Services page ("Group/…" in Figma): a big
 * number, the area name and a line of text, then its service cards.
 *
 * - Phones: one card per row. Tablets: two. Desktop (xl and up): three,
 *   with the promo card filling the third column when there are two services.
 */
export default function ServiceGroup({ category, index }: { category: ServiceCategory; index: number }) {
  const cards = servicesIn(category)
    .map(toCard)
    .filter((card): card is Service => Boolean(card));
  const count = category.services.length;

  return (
    <section
      id={category.anchor}
      aria-labelledby={`${category.anchor}-title`}
      // "scroll-mt" keeps the heading clear of the sticky category bar.
      className={cn("scroll-mt-24", index % 2 === 1 ? "bg-surface" : "bg-white")}
    >
      <div className="mx-auto flex w-full max-w-page flex-col gap-8 page-x section-y xl:gap-12">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex items-end gap-5 xl:gap-6">
            <span
              aria-hidden
              className="font-heading text-h2-md leading-none font-bold text-gradient-brand opacity-90 md:text-h1-md xl:text-h1"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col items-start gap-3">
              <span className="flex items-center gap-2 text-label-sm font-semibold text-primary">
                <span className="rounded-lg bg-brand p-1.75 text-white">
                  <Glyph name={category.icon} size={16} />
                </span>
                {count} {servicesPage.countSuffix}
              </span>
              <h2
                id={`${category.anchor}-title`}
                className="font-heading text-h2-sm font-bold text-heading md:text-h2-md xl:text-h2"
              >
                {category.name}
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3.5 xl:w-100">
            <p className="text-body-sm text-body md:text-body-base">{category.description}</p>
            <DiscussLink label={category.expertLabel} />
          </div>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <li key={card.href}>
              <ServiceCard service={card} layout="grid" />
            </li>
          ))}
          {category.promo && (
            <li className="md:col-span-2 xl:col-span-1">
              <PromoCard promo={category.promo} />
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
