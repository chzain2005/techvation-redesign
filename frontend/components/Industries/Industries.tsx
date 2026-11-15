import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { getHomepage } from "@/lib/cms/content";
import IndustryPanels from "./IndustryPanels";
import IndustrySwiper from "./IndustrySwiper";

/**
 * "Industries we serve" section on a dark background with two soft glows.
 *
 * The industries are shown in two different ways, following the Figma frames:
 * - Phones and tablets: a row of photo cards you swipe sideways.
 * - Desktop (xl and up): eight panels that expand on hover or click.
 * Each component hides itself on the screen sizes it is not meant for.
 */
export default async function Industries() {
  const { industries } = await getHomepage();
  return (
    // "isolate" + "overflow-hidden" keep the glows inside this section.
    <section
      id="industries"
      className="relative isolate scroll-mt-navbar overflow-hidden bg-ink"
    >
      {/* Decorative glows (top left and bottom right) */}
      <Image
        src="/assets/images/industries/glow-1.svg"
        alt=""
        width={800}
        height={700}
        className="pointer-events-none absolute -top-50 -left-62.5 -z-10 h-auto w-auto max-w-none"
      />
      <Image
        src="/assets/images/industries/glow-2.svg"
        alt=""
        width={700}
        height={600}
        className="pointer-events-none absolute top-75 -right-40 -z-10 h-auto w-auto max-w-none"
      />

      <div className="mx-auto flex w-full max-w-page flex-col items-start section-gap section-y">
        {/* The heading and the desktop panels keep the page padding; the swipe
            cards run to the right edge of the screen. */}
        <div className="w-full page-x">
          <SectionHeader
            theme="dark"
            eyebrow={industries.eyebrow}
            heading={industries.heading}
            headingClassName="xl:max-w-180"
          >
            <p className="text-body-sm text-on-dark md:text-body-base xl:max-w-100">
              {industries.description}
            </p>
          </SectionHeader>
        </div>

        {/* Phones and tablets */}
        <IndustrySwiper items={industries.items} />

        {/* Desktop */}
        <div className="hidden w-full page-x xl:block">
          <IndustryPanels items={industries.items} />
        </div>

        {/* Small hint under the panels (desktop only) */}
        <p className="hidden items-center gap-2 page-x text-caption font-medium text-on-dark xl:flex">
          <Icon src="/assets/icons/sparkles-accent-14.svg" size={14} />
          {industries.hint}
        </p>
      </div>
    </section>
  );
}
