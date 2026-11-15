import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { getHomepage } from "@/lib/cms/content";
import ServicesCarousel from "./ServicesCarousel";

/**
 * "Our services" section: heading + the scrolling carousel of 12 cards.
 * The paragraph next to the heading is only shown on desktop.
 */
export default async function Services() {
  const { services } = await getHomepage();
  return (
    <section id="services" className="scroll-mt-navbar bg-surface">
      <div className="mx-auto flex w-full max-w-page flex-col section-gap section-y">
        {/* The heading keeps the page padding; the carousel runs edge to edge. */}
        <div className="page-x">
          <SectionHeader
            eyebrow={services.eyebrow}
            heading={services.heading}
            headingClassName="xl:max-w-160"
          >
            <p className="hidden max-w-100 text-body-base text-body xl:block">
              {services.description}
            </p>
          </SectionHeader>
        </div>
        <ServicesCarousel items={services.items} />
      </div>
    </section>
  );
}
