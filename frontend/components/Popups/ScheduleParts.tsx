import { Fragment } from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import { scheduleCall } from "@/data/popups";
import { cn } from "@/lib/cn";

/**
 * The three numbered steps at the top of the "Schedule a Call" pop-ups:
 *
 *   (1) Date & time  ──  (2) Your details  ──  (3) Confirmed
 *
 * Steps before the current one show a tick, the current one shows its
 * number on the gradient, later ones are grey. On phones only the name of
 * the current step is shown, so the row fits.
 */
export function ScheduleSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="flex items-center gap-2.5">
      {scheduleCall.steps.map((label, i) => {
        const number = i + 1;
        const isDone = number < current;
        const isReached = number <= current;
        return (
          <Fragment key={label}>
            <li
              aria-current={number === current ? "step" : undefined}
              className="flex items-center gap-2.5"
            >
              <span
                className={cn(
                  "grid size-6.5 shrink-0 place-items-center rounded-full text-caption font-medium",
                  isReached ? "bg-brand text-white" : "bg-surface-tint text-muted",
                )}
              >
                {isDone ? <Icon src="/assets/icons/check-white-13.svg" size={13} /> : number}
              </span>
              <span
                className={cn(
                  "text-label-sm font-semibold whitespace-nowrap",
                  isReached ? "text-heading" : "text-muted",
                  number !== current && "hidden sm:block",
                )}
              >
                {label}
              </span>
            </li>
            {/* Short line between two steps: gradient once the step is done */}
            {number < scheduleCall.steps.length && (
              <li
                aria-hidden
                className={cn("h-0.5 w-7 shrink-0 rounded-xs", isDone ? "bg-brand" : "bg-border")}
              />
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}

/**
 * Phones only: the header of the "Schedule a Call" bottom sheet, which
 * stands in for the dark panel: photo, title and the call's length and tool.
 */
export function ScheduleMobileHeader() {
  const { info, mobileHeader } = scheduleCall;
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Image src={info.photo} alt="" width={40} height={40} className="size-10 rounded-full" />
      <div className="min-w-0">
        <h2 className="font-heading text-subtitle-lg font-semibold text-heading">
          {mobileHeader.title}
        </h2>
        <p className="text-caption font-medium text-body">{mobileHeader.subtitle}</p>
      </div>
    </div>
  );
}

/**
 * Phones only: a slim progress bar instead of the numbered steps.
 *
 *   ━━━━━━ ━━━ ━━━  Step 1 of 3
 *
 * The current step has the long gradient bar, steps already done a short
 * gradient bar, later steps a short grey bar.
 */
export function ScheduleProgress({ current }: { current: 1 | 2 | 3 }) {
  const total = scheduleCall.steps.length;
  return (
    <div className="flex items-center gap-1.5">
      {scheduleCall.steps.map((label, i) => {
        const number = i + 1;
        return (
          <span
            key={label}
            aria-hidden
            className={cn(
              "h-1 shrink-0 rounded-sm",
              number === current ? "w-20" : "w-10",
              number <= current ? "bg-brand" : "bg-border",
            )}
          />
        );
      })}
      <p className="text-caption font-medium text-body">
        Step {current} of {total}
      </p>
    </div>
  );
}

/**
 * The dark purple panel on the left of the "Schedule a Call" pop-up: who the
 * call is with, the key facts and what will be covered.
 * It is only shown on large screens; smaller screens go straight to the form.
 */
export function ScheduleInfoPanel() {
  const { info } = scheduleCall;

  return (
    <aside className="hidden w-85 shrink-0 flex-col items-start gap-5 bg-linear-118 from-ink-soft to-primary-dark p-9 lg:flex">
      <Image
        src={info.photo}
        alt=""
        width={56}
        height={56}
        className="size-14 rounded-full"
      />
      <p className="text-caption font-medium text-on-dark">{info.team}</p>
      <h2 className="max-w-67.5 font-heading text-popup-title font-semibold text-white">
        {info.title}
      </h2>

      <ul className="flex flex-col gap-5">
        {info.facts.map((fact) => (
          <li key={fact.label} className="flex items-center gap-2.5 text-small text-white/85">
            <Icon src={fact.icon} size={16} />
            {fact.label}
          </li>
        ))}
      </ul>

      <h3 className="pt-7 text-eyebrow-sm font-semibold text-accent uppercase">
        {info.coverTitle}
      </h3>
      <ul className="flex flex-col gap-5">
        {info.cover.map((item) => (
          <li key={item} className="flex items-center gap-2 text-small text-white/85">
            <Icon src="/assets/icons/check-accent-14.svg" size={14} />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
