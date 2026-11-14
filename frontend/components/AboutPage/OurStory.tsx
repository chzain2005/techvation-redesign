import Image from "next/image";
import CountUp from "@/components/CountUp/CountUp";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Glyph from "@/components/Icon/Glyph";
import { aboutPage } from "@/data/about";

/**
 * "Our story": two paragraphs and four counting figures, next to a photo
 * collage.
 *
 * - Phones: text, figures in a 2 x 2 grid, then the collage.
 * - Tablets: the same, with the figures in one row.
 * - Desktop (xl and up): text on the left, collage on the right.
 */
export default function OurStory() {
  const { story } = aboutPage;

  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-page flex-col gap-12 page-x section-y xl:flex-row xl:items-center xl:gap-20">
        <div className="flex min-w-0 flex-col items-start gap-4 xl:flex-1">
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <h2 className="font-heading text-h2-sm font-bold text-heading md:text-h2-md xl:max-w-145 xl:text-h2">
            {story.heading.lead}
            <span className="text-gradient-brand">{story.heading.highlight}</span>
          </h2>
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-body-sm text-body md:text-body-base xl:max-w-145 xl:text-body-lg">
              {paragraph}
            </p>
          ))}

          <dl className="mt-2 grid w-full grid-cols-2 gap-3 md:grid-cols-4 xl:max-w-145">
            {story.stats.map((stat) => (
              // flex-col-reverse: the number shows above its label, while the
              // HTML keeps the label first for screen readers.
              <div key={stat.label} className="flex flex-col-reverse gap-1 rounded-float border border-border bg-surface px-5 py-4.5">
                <dt className="text-caption font-medium text-body">{stat.label}</dt>
                <dd className="font-heading text-h2-sm font-bold text-gradient-brand">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Collage: a large photo top-left, a smaller one overlapping it at
            the bottom-right, and a purple "4 regions" card on the top-right.
            Everything is placed in percentages, so it scales with the width. */}
        <div className="relative aspect-[580/560] w-full max-w-145 self-center xl:w-145 xl:shrink-0">
          <div className="absolute top-0 left-0 h-[72%] w-[64%] overflow-hidden rounded-feature shadow-card">
            <Image src={story.collage.main} alt="" fill sizes="(min-width: 1280px) 372px, 64vw" className="object-cover" />
          </div>
          <div className="absolute right-0 bottom-0 h-[52%] w-[54%] overflow-hidden rounded-card border-4 border-white shadow-calendar md:border-6">
            <Image src={story.collage.inset} alt="" fill sizes="(min-width: 1280px) 313px, 54vw" className="object-cover" />
          </div>
          <div className="absolute top-[8%] right-[2%] flex items-center gap-2.5 rounded-chip bg-brand px-3.5 py-2.5 text-white shadow-brand-md md:gap-3 md:px-4 md:py-3">
            <Glyph name="globe" size={20} />
            <span className="flex flex-col">
              <span className="text-label font-semibold">{story.collage.badge.title}</span>
              <span className="text-caption font-medium text-white/80">{story.collage.badge.text}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
