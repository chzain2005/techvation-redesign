import Image from "next/image";
import ActionButton from "@/components/Button/ActionButton";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { strategyCall } from "@/data/homepage";
import CalendarCollage from "./CalendarCollage";

/**
 * "Book a strategy call" call-to-action.
 *
 * - Phones and tablets: the calendar illustration on top, the text below.
 *   On phones the three steps and the two buttons are stacked full width.
 * - Desktop (xl and up): text on the left, illustration on the right.
 *
 * The text comes first in the HTML; "flex-col-reverse" flips the visual
 * order on small screens.
 */
export default function StrategyCall() {
  return (
    <section
      id="schedule-a-call"
      className="relative isolate scroll-mt-navbar overflow-hidden bg-linear-to-r from-surface to-surface-sky"
    >
      {/* Soft colour blobs in two corners */}
      <Image
        src="/assets/images/cta/blob-1.svg"
        alt=""
        width={700}
        height={700}
        className="pointer-events-none absolute -top-62.5 -left-62.5 -z-10 h-auto w-auto max-w-none"
      />
      <Image
        src="/assets/images/cta/blob-2.svg"
        alt=""
        width={700}
        height={700}
        className="pointer-events-none absolute top-37.5 -right-62.5 -z-10 h-auto w-auto max-w-none"
      />

      <div className="mx-auto flex w-full max-w-page flex-col-reverse items-center gap-8 page-x section-y xl:flex-row xl:gap-16">
        {/* Text */}
        <div className="flex w-full min-w-0 flex-col items-start gap-6 xl:flex-1">
          <div className="flex flex-col items-start gap-4">
            <Eyebrow>{strategyCall.eyebrow}</Eyebrow>
            <h2 className="font-heading text-h2-sm font-bold text-heading md:text-h2-md xl:max-w-140 xl:text-h2">
              {strategyCall.heading.lead}
              <span className="text-gradient-brand">{strategyCall.heading.highlight}</span>
            </h2>
          </div>
          <p className="text-body-base text-body xl:max-w-130 xl:text-body-lg">
            {strategyCall.description}
          </p>

          {/* Three numbered steps: stacked on phones, in a row from tablets up */}
          <ol className="flex w-full flex-col gap-2.5 md:w-auto md:flex-row md:flex-wrap md:gap-3">
            {strategyCall.steps.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-2.5 rounded-chip border border-border bg-white px-3.5 py-2.5 text-label font-semibold text-heading shadow-chip"
              >
                <span className="grid size-6.5 place-items-center rounded-full bg-brand text-caption font-medium text-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          {/* Buttons: full width and stacked on phones */}
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <ActionButton href={strategyCall.primaryAction.href} className="w-full md:w-auto">
              {strategyCall.primaryAction.label}
            </ActionButton>
            <ActionButton
              href={strategyCall.secondaryAction.href}
              variant="outlineDark"
              showIcon={false}
              className="w-full md:w-auto"
            >
              {strategyCall.secondaryAction.label}
            </ActionButton>
          </div>
        </div>

        {/* Illustration */}
        <CalendarCollage />
      </div>
    </section>
  );
}
