import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import { strategyCall } from "@/data/homepage";
import { cn } from "@/lib/cn";

/**
 * The picture on the right of the "Book a strategy call" section: a calendar
 * card with a few smaller cards floating around it, each slightly tilted.
 *
 * It only ILLUSTRATES the booking flow (it is not a working date picker), so
 * the whole thing is hidden from screen readers with aria-hidden.
 *
 * It is drawn once as a fixed 560 x 520 picture. Each piece sits in an
 * absolutely positioned box that matches the Figma frame, and the card inside
 * the box is rotated.
 *
 * On phones the whole picture is scaled down to 62% (350px wide) so it fits
 * the screen; the outer box reserves the scaled size. Tablets and desktop
 * show it at full size.
 */
export default function CalendarCollage() {
  const { calendar } = strategyCall;

  // Build the list of day cells: empty cells first, then day 1..30.
  const days: Array<number | null> = [
    ...Array.from({ length: calendar.startOffset }, () => null),
    ...Array.from({ length: calendar.daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div aria-hidden className="h-81.25 w-87.5 shrink-0 md:h-130 md:w-140">
      <div className="relative h-130 w-140 origin-top-left scale-62 md:scale-100">
      {/* Pale circle behind the cards */}
      <Image
        src="/assets/images/cta/circle.svg"
        alt=""
        width={440}
        height={440}
        className="absolute top-7.5 left-15 h-auto w-auto max-w-none"
      />

      {/* Calendar card */}
      <div className="absolute top-17.5 left-11.25 flex h-94.5 w-91 items-center justify-center">
        <div className="flex w-85 shrink-0 rotate-4 flex-col gap-3 rounded-card border border-border bg-white p-5.5 shadow-calendar">
          {/* Month + previous/next arrows */}
          <div className="flex items-center justify-between">
            <p className="font-heading text-subtitle-sm font-semibold text-heading">
              {calendar.monthLabel}
            </p>
            <div className="flex gap-1.5">
              <span className="rounded-lg border border-border p-1.25">
                <Icon src="/assets/icons/chevron-left-13.svg" size={13} />
              </span>
              <span className="rounded-lg border border-border p-1.25">
                <Icon src="/assets/icons/chevron-right-13.svg" size={13} />
              </span>
            </div>
          </div>

          {/* Weekday letters */}
          <div className="grid grid-cols-7 gap-1 text-center text-caption font-medium text-muted">
            {calendar.weekdays.map((weekday, i) => (
              <span key={i}>{weekday}</span>
            ))}
          </div>

          {/* Days: 7 columns. Grey = not available, lavender = available,
              gradient = the selected day. */}
          <div className="grid grid-cols-7 gap-x-1 gap-y-3">
            {days.map((day, i) => {
              const isSelected = day === calendar.selectedDay;
              const isAvailable = day !== null && calendar.availableDays.includes(day);
              return (
                <span
                  key={i}
                  className={cn(
                    "grid h-9.75 place-items-center rounded-cell text-caption font-semibold",
                    isSelected
                      ? "bg-brand text-white"
                      : isAvailable
                        ? "bg-surface text-primary-dark"
                        : "text-faint",
                  )}
                >
                  {day}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time slots card (top right) */}
      <div className="absolute top-13.75 left-90 flex h-47.75 w-46.25 items-center justify-center">
        <div className="flex w-42.5 shrink-0 -rotate-5 flex-col gap-2 rounded-reason bg-white p-4 shadow-slots">
          <p className="text-label font-semibold text-heading">{calendar.slotsTitle}</p>
          {calendar.slots.map((slot) => (
            <span
              key={slot}
              className={cn(
                "rounded-cell px-2.5 py-2 text-center text-label-sm font-semibold",
                slot === calendar.selectedSlot
                  ? "bg-brand text-white"
                  : "border border-primary/30 bg-white text-primary",
              )}
            >
              {slot}
            </span>
          ))}
        </div>
      </div>

      {/* Consultants card (bottom left) */}
      <div className="absolute top-92.5 left-0.5 flex h-17.75 w-66.25 items-center justify-center">
        <div className="flex shrink-0 rotate-2 items-center gap-2.5 rounded-float bg-white px-4 py-3 shadow-float">
          {/* Overlapping round photos */}
          <div className="flex">
            {calendar.consultants.avatars.map((avatar, i) => (
              <Image
                key={avatar}
                src={avatar}
                alt=""
                width={38}
                height={38}
                className={cn("rounded-full", i > 0 && "-ml-2.5")}
              />
            ))}
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <span className="text-label font-semibold text-heading">
              {calendar.consultants.title}
            </span>
            <span className="text-caption font-medium text-body">
              {calendar.consultants.subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* "Call booked" toast (bottom right) */}
      <div className="absolute top-96.75 left-75 flex h-14.25 w-61 items-center justify-center">
        <p className="flex shrink-0 -rotate-3 items-center gap-2.5 rounded-full bg-brand px-4 py-3 text-label font-semibold whitespace-nowrap text-white shadow-brand-sm">
          <span className="rounded-full bg-white p-1">
            <Icon src="/assets/icons/check-brand.svg" size={12} scale />
          </span>
          {calendar.bookedToast}
        </p>
      </div>

      {/* "30 min" pill (top left) */}
      <div className="absolute top-5 left-4 flex h-13.25 w-44.25 items-center justify-center">
        <p className="flex shrink-0 rotate-6 items-center gap-1.5 rounded-full border border-border bg-white px-3 py-2 text-caption font-medium whitespace-nowrap text-heading shadow-tag">
          <Icon src="/assets/icons/video-brand.svg" size={14} scale />
          {calendar.meetingPill}
        </p>
      </div>
      </div>
    </div>
  );
}
