import Image from "next/image";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Glyph from "@/components/Icon/Glyph";
import { aboutPage } from "@/data/about";

/**
 * The Earth-at-night photo from the design (600 x 480). The file already
 * has rounded corners; the rounded box keeps them crisp when it scales.
 */
function GlobeVisual() {
  return (
    <div className="relative aspect-[600/480] w-full overflow-hidden rounded-feature xl:w-150 xl:shrink-0">
      <Image
        src={aboutPage.presence.image}
        alt=""
        fill
        sizes="(min-width: 1280px) 600px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

/**
 * "Global presence": heading, paragraph and the four regions (with phone
 * numbers where there is an office), next to the globe.
 *
 * - Phones: regions in one column, globe below.
 * - Tablets: regions in two columns, globe below.
 * - Desktop (xl and up): text on the left, globe on the right.
 */
export default function GlobalPresence() {
  const { presence } = aboutPage;

  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-page flex-col gap-12 page-x section-y xl:flex-row xl:items-center xl:gap-20">
        <div className="flex min-w-0 flex-col items-start gap-4 xl:flex-1">
          <Eyebrow>{presence.eyebrow}</Eyebrow>
          <h2 className="font-heading text-h2-sm font-bold text-heading md:text-h2-md xl:max-w-130 xl:text-h2">
            {presence.heading.lead}
            <span className="text-gradient-brand">{presence.heading.highlight}</span>
          </h2>
          <p className="text-body-sm text-body md:text-body-base xl:max-w-130 xl:text-body-lg">{presence.description}</p>

          <ul className="mt-4 grid w-full gap-4 md:grid-cols-2">
            {presence.regions.map((region) => (
              <li key={region.name} className="flex items-start gap-3 rounded-float border border-border bg-surface p-4">
                <span className="rounded-lg bg-brand p-2 text-white">
                  <Glyph name="map-pin" size={16} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-label font-semibold text-heading">{region.name}</span>
                  {region.phone ? (
                    <a href={region.phone} className="text-caption font-medium text-body transition-colors hover:text-primary">
                      {region.detail}
                    </a>
                  ) : (
                    <span className="text-caption font-medium text-body">{region.detail}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <GlobeVisual />
      </div>
    </section>
  );
}
