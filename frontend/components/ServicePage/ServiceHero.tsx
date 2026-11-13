import Image from "next/image";
import ActionButton from "@/components/Button/ActionButton";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { cta } from "@/data/homepage";
import { getCategory, serviceDetailPage, type ServiceDetail } from "@/data/services";
import Breadcrumb from "./Breadcrumb";
import ServiceHeroForm from "./ServiceHeroForm";

/**
 * The dark top section of a service page ("Page Hero" in Figma): photo
 * background, breadcrumb, practice-area label, headline, paragraph and two
 * buttons on the left, the consultation form on the right.
 *
 * - Phones and tablets: everything stacked, the form full width. Phones
 *   skip the two buttons (the form is right below).
 * - Desktop (xl and up): text and form side by side.
 */
export default function ServiceHero({ service }: { service: ServiceDetail }) {
  const { breadcrumb } = serviceDetailPage;
  const category = getCategory(service.categoryId);

  return (
    // The top padding leaves room for the navbar that floats above the hero.
    <section className="relative isolate overflow-hidden bg-ink pt-navbar-compact xl:pt-navbar">
      {/* Background: photo, two dark fades and two soft colour glows */}
      <Image
        src="/assets/images/service-page/hero.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(11 8 32 / 0.2) 0%, rgb(11 8 32 / 0.85) 100%), linear-gradient(90deg, rgb(11 8 32 / 0.95) 0%, rgb(28 22 69 / 0.6) 100%)",
        }}
      />
      <Image
        src="/assets/images/service-page/hero-glow-1.svg"
        alt=""
        width={700}
        height={700}
        className="pointer-events-none absolute -top-37.5 left-[59%] -z-10 max-w-none"
      />
      <Image
        src="/assets/images/service-page/hero-glow-2.svg"
        alt=""
        width={700}
        height={700}
        className="pointer-events-none absolute top-75 -left-62.5 -z-10 max-w-none"
      />

      <div className="mx-auto flex w-full max-w-page flex-col gap-8 page-x pt-8 pb-10 md:pt-12 md:pb-14 xl:min-h-158 xl:flex-row xl:items-center xl:gap-16 xl:pt-14 xl:pb-16">
        {/* Text */}
        <div className="flex min-w-0 flex-col items-start gap-4 xl:flex-1">
          <Breadcrumb
            trail={[
              { label: breadcrumb.home, href: "/" },
              { label: breadcrumb.services, href: "/services" },
            ]}
            current={service.title}
          />
          {category && <Eyebrow theme="dark">{category.name}</Eyebrow>}
          <h1 className="font-heading text-page-title-sm font-bold text-white md:text-h2-md xl:max-w-160 xl:text-page-title">
            {service.hero.heading.lead}
            <span className="text-gradient-accent">{service.hero.heading.highlight}</span>
          </h1>
          <p className="text-body-sm text-white/82 md:text-body-md xl:max-w-150 xl:text-body-lg">
            {service.hero.description}
          </p>
          <div className="hidden gap-3 pt-2 md:flex">
            <ActionButton href={cta.freeConsultation.href}>
              {serviceDetailPage.heroPrimaryLabel}
            </ActionButton>
            <ActionButton href={cta.scheduleCall.href} variant="outlineLight" showIcon={false}>
              {cta.scheduleCall.label}
            </ActionButton>
          </div>
        </div>

        <ServiceHeroForm title={service.hero.formTitle} />
      </div>
    </section>
  );
}
