import Image from "next/image";
import { careersPage } from "@/data/careers";
import { cn } from "@/lib/cn";

/* Which photos take two columns on desktop: the 1st and the last. */
const isWide = (i: number) => i === 0 || i === 5;

/**
 * "Life at Techvation": six team photos.
 *
 * - Phones: one photo per row.
 * - Tablets: two per row, the wide photos take the full row.
 * - Desktop (xl and up): two rows of four columns, as in the design:
 *   wide, narrow, narrow / narrow, narrow, wide.
 */
export default function CultureGallery() {
  return (
    // "id" lets the hero's "Life at Techvation" button scroll here.
    <section id="life-at-techvation" aria-label="Life at Techvation" className="scroll-mt-navbar bg-white">
      <ul className="mx-auto grid w-full max-w-page gap-4 page-x pb-16 md:grid-cols-2 md:gap-6 md:pb-20 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-12 xl:pb-section">
        {careersPage.gallery.map((src, i) => (
          <li
            key={src}
            className={cn(
              "relative h-56 overflow-hidden rounded-card md:h-65 xl:h-75",
              isWide(i) && "md:col-span-2",
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes={isWide(i) ? "(min-width: 768px) 640px, 100vw" : "(min-width: 1280px) 310px, (min-width: 768px) 50vw, 100vw"}
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
