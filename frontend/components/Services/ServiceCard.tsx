import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import { services, type Service } from "@/data/homepage";
import { cn } from "@/lib/cn";

/**
 * One card in the services carousel: photo with a category tag on top,
 * then icon + title, a short description and two actions.
 *
 * - Phones and tablets: a smaller card (300px wide, 160px photo) with a
 *   shorter description and a button without an arrow.
 * - Desktop (xl and up): the full 400px card.
 */
export default function ServiceCard({
  service,
  layout = "carousel",
}: {
  service: Service;
  /** "carousel": fixed width for the homepage slider. "grid": fills its grid cell (Services page). */
  layout?: "carousel" | "grid";
}) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-card border border-border bg-white shadow-card",
        layout === "carousel" ? "w-75 shrink-0 snap-start xl:w-100" : "h-full w-full",
      )}
    >
      {/* Photo. Tapping it also opens the service page (handy on phones).
          It repeats the "Learn more" link, so it is hidden from screen
          readers and skipped by the Tab key. */}
      <Link
        href={service.href}
        aria-hidden
        tabIndex={-1}
        className="group/photo relative block h-40 overflow-hidden xl:h-55"
      >
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(min-width: 768px) 400px, 100vw"
          className="object-cover transition-transform duration-500 group-hover/photo:scale-105"
        />
        {/* Slight dark fade at the bottom of the photo */}
        <div className="absolute inset-0 bg-linear-to-b from-ink/0 to-ink/35" />
        <span className="absolute top-4 left-4 rounded-full bg-white/92 px-3 py-1.5 text-caption font-medium text-primary">
          {service.category}
        </span>
      </Link>

      {/* Text */}
      <div className="flex flex-1 flex-col gap-2 p-4 xl:gap-3 xl:px-6 xl:pt-5.5 xl:pb-6">
        <div className="flex items-center gap-2.5 xl:gap-3">
          {/* Icon tile: 30px on small screens, 40px on desktop */}
          <span className="rounded-lg bg-brand p-1.75 xl:hidden">
            <Icon src={service.icon} size={16} scale />
          </span>
          <span className="hidden rounded-xl bg-brand p-2.5 xl:block">
            <Icon src={service.icon} size={20} />
          </span>
          <h3 className="font-heading text-title-xs font-semibold text-heading xl:text-title">
            {/* The title opens the service page too. */}
            <Link href={service.href} className="transition-colors hover:text-primary">
              {service.title}
            </Link>
          </h3>
        </div>

        {/* Short text on small screens, full text on desktop */}
        <p className="text-fine text-body xl:hidden">{service.descriptionShort}</p>
        <p className="hidden text-small text-body xl:block">{service.description}</p>

        {/* Actions, pushed to the bottom so all cards line up */}
        <div className="mt-auto flex items-center justify-between xl:pt-1.5">
          <Link
            href={service.href}
            // The vertical padding makes the link easier to tap on phones,
            // without changing how the card looks.
            className="-my-2.5 flex items-center gap-1 py-2.5 text-label-sm font-semibold text-primary hover:underline xl:gap-1.5 xl:text-label"
          >
            {services.learnMoreLabel}
            <span className="xl:hidden">
              <Icon src="/assets/icons/arrow-right-brand-16.svg" size={14} scale />
            </span>
            <span className="hidden xl:block">
              <Icon src="/assets/icons/arrow-right-brand-16.svg" size={16} scale />
            </span>
          </Link>
          {/* The button has no arrow on small screens */}
          <div className="xl:hidden">
            <Button href={services.cardAction.href} size="md" showIcon={false}>
              {services.cardAction.label}
            </Button>
          </div>
          <div className="hidden xl:block">
            <Button href={services.cardAction.href} size="md">
              {services.cardAction.label}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
