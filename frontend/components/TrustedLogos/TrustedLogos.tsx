import Image from "next/image";
import { trustedLogos } from "@/data/homepage";

/**
 * The strip of client logos under the hero. The logos slide to the left in
 * an endless loop (a "marquee").
 *
 * - Phones and tablets: a centred one-line title above smaller logos.
 * - Desktop (xl and up): a two-line title on the left, larger logos beside it.
 *
 * How the loop works: the logo list is rendered twice in one long row, and
 * the row slides left by exactly half its width (see `animate-marquee` in
 * globals.css). When the first copy has left the screen the second copy is in
 * the same place, so the jump back to the start is invisible.
 */
export default function TrustedLogos() {
  const { title, titleLines, logos } = trustedLogos;

  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto flex w-full max-w-page flex-col items-center gap-3.5 pt-7 pb-6 xl:h-43 xl:flex-row xl:gap-14 xl:py-0 xl:pl-gutter">
        {/* Title: one line on small screens */}
        <p className="page-x text-center text-small font-medium text-body xl:hidden">
          {title}
        </p>
        {/* Title: two lines on desktop */}
        <p className="hidden w-62.5 shrink-0 text-lead font-medium text-body xl:block">
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        {/* Window that hides the logos outside of it */}
        <div className="relative h-16 w-full min-w-0 overflow-hidden xl:h-auto xl:flex-1 xl:self-stretch">
          <div className="flex h-full w-max animate-marquee items-center">
            {/* Two copies of the list; the second is hidden from screen readers. */}
            {[false, true].map((isCopy) => (
              <ul key={String(isCopy)} aria-hidden={isCopy} className="flex items-center">
                {logos.map((logo) => (
                  // Margin (not gap) so both copies are exactly the same width.
                  // Logo box: 96 x 56 on small screens, 130 x 78 on desktop.
                  <li
                    key={logo.name}
                    className="relative mr-10 h-14 w-24 shrink-0 xl:mr-16 xl:h-19.5 xl:w-32.5"
                  >
                    <Image
                      src={logo.src}
                      alt={isCopy ? "" : logo.name}
                      fill
                      sizes="130px"
                      className="object-contain"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>

          {/* White fades on both edges so logos appear and disappear softly */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-17.5 bg-linear-to-r from-white to-white/0 xl:w-35" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-17.5 bg-linear-to-r from-white/0 to-white xl:w-35" />
        </div>
      </div>
    </section>
  );
}
