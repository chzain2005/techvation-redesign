import type { ServiceDetail } from "@/data/services";

/**
 * The three result figures under the hero ("40% faster sales cycles").
 *
 * - Phones: small cards in a row that you swipe sideways.
 * - Tablets and up: three equal cards, figure and label side by side.
 */
export default function ServiceOutcomes({ outcomes }: { outcomes: ServiceDetail["outcomes"] }) {
  return (
    <section aria-label="Results" className="border-b border-border bg-white">
      <ul className="scrollbar-none mx-auto flex w-full max-w-page snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto page-x py-5 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible xl:py-10">
        {outcomes.map((outcome) => (
          <li
            key={outcome.value}
            className="flex w-36 shrink-0 snap-start flex-col gap-1 rounded-float bg-surface px-4 py-3.5 md:w-auto md:flex-row md:items-center md:gap-4 md:px-6 md:py-5"
          >
            <span className="font-heading text-title font-bold whitespace-nowrap text-gradient-brand md:text-h2-sm xl:text-h2-md">
              {outcome.value}
            </span>
            <span className="text-caption font-medium text-body md:text-small xl:max-w-45 xl:text-body-base xl:font-normal">
              {outcome.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
