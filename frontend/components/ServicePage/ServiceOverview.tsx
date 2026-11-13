import Image from "next/image";
import ActionButton from "@/components/Button/ActionButton";
import Button from "@/components/Button/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Glyph from "@/components/Icon/Glyph";
import { cta } from "@/data/homepage";
import { serviceDetailPage, type ServiceDetail } from "@/data/services";
import { cn } from "@/lib/cn";

const photo = "/assets/images/service-page/office.jpg";

/** The team photo with the small white "Certified … team" card on it. */
function OverviewPhoto({ service, className }: { service: ServiceDetail; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="relative aspect-16/10 overflow-hidden rounded-post md:aspect-16/9 xl:h-135 xl:w-140 xl:rounded-feature">
        <Image src={photo} alt="" fill sizes="(min-width: 1280px) 560px, 100vw" className="object-cover" />
      </div>
      {/* Phones and tablets: inside the photo. Desktop: hanging off its left edge. */}
      <div className="absolute bottom-4 left-4 hidden items-center gap-3 rounded-float bg-white px-5 py-4 shadow-slots md:flex xl:bottom-auto xl:top-110 xl:-left-10">
        <span className="rounded-xl bg-brand p-2.5 text-white">
          <Glyph name={service.icon} size={20} />
        </span>
        <span className="flex flex-col gap-0.5 whitespace-nowrap">
          <span className="font-heading text-subtitle-sm font-semibold text-heading">
            {service.overview.badge}
          </span>
          <span className="text-caption font-medium text-body">
            {serviceDetailPage.overviewBadgeSubtitle}
          </span>
        </span>
      </div>
    </div>
  );
}

/**
 * "Overview": what the service is, four key points and two buttons, next to
 * a team photo.
 *
 * - Phones: label, heading, photo, paragraph (as in the mobile design; the
 *   points and buttons are left out).
 * - Tablets: the same order, plus the points and buttons.
 * - Desktop (xl and up): text on the left, photo on the right.
 */
export default function ServiceOverview({ service }: { service: ServiceDetail }) {
  const { overview } = serviceDetailPage;

  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-page flex-col gap-10 page-x section-y xl:flex-row xl:items-center xl:gap-20">
        <div className="flex min-w-0 flex-col items-start gap-4 xl:flex-1">
          <Eyebrow>{overview.eyebrow}</Eyebrow>
          <h2 className="font-heading text-h2-sm font-bold text-heading md:text-h2-md xl:max-w-145 xl:text-h2">
            {service.overview.heading.lead}
            <span className="text-gradient-brand">{service.overview.heading.highlight}</span>
          </h2>

          {/* Below desktop the photo sits between the heading and the paragraph. */}
          <OverviewPhoto service={service} className="my-2 w-full xl:hidden" />

          <p className="text-body-sm text-body md:text-body-base xl:max-w-145 xl:text-body-lg">
            {service.overview.description}
          </p>

          <ul className="hidden gap-3.5 md:grid md:grid-cols-2 xl:w-150">
            {service.overview.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-label font-semibold text-heading">
                <span className="rounded-full bg-brand p-1 text-white">
                  <Glyph name="check" size={13} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="hidden flex-wrap gap-3 pt-2 md:flex">
            <ActionButton href={cta.freeConsultation.href}>{overview.primaryLabel}</ActionButton>
            <Button href={overview.brochure.href} variant="outlineDark" showIcon={false}>
              {overview.brochure.label}
            </Button>
          </div>
        </div>

        <OverviewPhoto service={service} className="hidden shrink-0 xl:block" />
      </div>
    </section>
  );
}
