import Link from "next/link";
import ActionButton from "@/components/Button/ActionButton";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import HeroBackground from "@/components/Hero/HeroBackground";
import Glyph from "@/components/Icon/Glyph";
import Breadcrumb from "@/components/ServicePage/Breadcrumb";
import { cta } from "@/data/homepage";
import type { ServiceCategory, servicesPage } from "@/data/services";
import { getServices, getServicesPageContent } from "@/lib/cms/content";

/**
 * The "Service finder" card on the right of the hero: one row per practice
 * area that jumps down to its group, plus the free consultation button.
 */
function ServiceFinder({
  finder,
  serviceCategories,
}: {
  finder: (typeof servicesPage)["hero"]["finder"];
  serviceCategories: ServiceCategory[];
}) {

  return (
    <div className="flex w-full flex-col gap-3 rounded-post border border-white/14 bg-ink-card/75 p-5 shadow-form backdrop-blur-md md:p-7 xl:w-110 xl:shrink-0 xl:rounded-card">
      <div className="mb-1 flex items-center gap-3">
        <span className="rounded-xl bg-brand p-2.5 text-white">
          <Glyph name="search" size={20} />
        </span>
        <span className="flex flex-col">
          <span className="font-heading text-title-sm font-semibold text-white">{finder.title}</span>
          <span className="text-caption font-medium text-white/60">{finder.subtitle}</span>
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {serviceCategories.map((category) => (
          <li key={category.id}>
            <Link
              href={`#${category.anchor}`}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/6 px-3.5 py-3 transition-colors duration-200 hover:border-white/25 hover:bg-white/12"
            >
              <span className="rounded-lg bg-white/10 p-1.75 text-accent">
                <Glyph name={category.icon} size={16} />
              </span>
              <span className="flex-1 text-label font-semibold text-white">{category.name}</span>
              <span className="rounded-md bg-white/10 px-2 py-0.5 text-caption font-medium text-white/80">
                {category.services.length}
              </span>
              <Glyph
                name="chevron-right"
                size={16}
                className="text-white/60 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>

      <ActionButton href={cta.freeConsultation.href} className="mt-1 w-full">
        {cta.freeConsultation.label}
      </ActionButton>
    </div>
  );
}

/**
 * The dark top section of the Services page ("Hero · Services" in Figma):
 * the same moving tech background as the homepage, headline and buttons on
 * the left, the service finder on the right (below the text on smaller screens).
 */
export default async function ServicesHero() {
  const [{ servicesPage }, { categories }] = await Promise.all([getServicesPageContent(), getServices()]);
  const { hero } = servicesPage;

  return (
    <section className="relative isolate flex flex-col bg-ink pt-navbar-compact xl:min-h-180 xl:pt-navbar">
      <HeroBackground />

      <div className="relative mx-auto flex w-full max-w-page flex-1 flex-col gap-8 page-x pt-8 pb-10 md:pt-12 md:pb-14 xl:flex-row xl:items-center xl:gap-16">
        <div className="flex min-w-0 flex-col items-start gap-4 xl:flex-1">
          <Breadcrumb trail={[{ label: "Home", href: "/" }]} current={hero.breadcrumb} />
          <Eyebrow theme="dark">{hero.eyebrow}</Eyebrow>
          <h1 className="font-heading text-page-title-sm font-bold text-white md:text-display-md xl:max-w-165 xl:text-page-title">
            {hero.heading.lead}
            <span className="text-gradient-accent">{hero.heading.highlight}</span>
          </h1>
          <p className="text-body-sm text-white/82 md:text-body-md xl:max-w-145 xl:text-body-lg">
            {hero.description}
          </p>

          {/* Buttons: full width and stacked on phones */}
          <div className="flex w-full flex-col gap-2.5 pt-2 md:w-auto md:flex-row md:gap-3">
            <ActionButton href={cta.letsTalk.href} variant="secondary" className="w-full md:w-auto">
              {cta.letsTalk.label}
            </ActionButton>
            <ActionButton href={cta.scheduleCall.href} variant="outlineLight" className="w-full md:w-auto">
              {cta.scheduleCall.label}
            </ActionButton>
          </div>
        </div>

        <ServiceFinder finder={hero.finder} serviceCategories={categories} />
      </div>
    </section>
  );
}
