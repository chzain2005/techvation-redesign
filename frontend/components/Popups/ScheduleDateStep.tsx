"use client"; // The calendar reacts to clicks and remembers the month on screen.

import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import { scheduleCall } from "@/data/popups";
import { cn } from "@/lib/cn";
import {
  formatMonth,
  formatOffset,
  formatShortDate,
  formatTime,
  formatTimeRange,
  isAvailableDay,
  isSameDay,
  monthCells,
  startOfToday,
  zonedMoment,
  zoneOffsetMinutes,
} from "@/lib/schedule";
import { getBookedTimes } from "@/lib/forms/actions";
import { PopupSelect } from "./PopupField";
import type { Booking } from "./PopupProvider";

type ScheduleDateStepProps = {
  booking: Booking;
  /** Called with the parts of the booking that changed. */
  onChange: (changes: Partial<Booking>) => void;
  /** "Next: Your Details" was clicked. */
  onNext: () => void;
};

/**
 * Step 1 of "Schedule a Call": pick a day in the calendar on the left and a
 * start time on the right. On phones the times move below the calendar
 * (Figma "12 · Mobile · Pop-up · Schedule a Call").
 *
 * Days can be booked from tomorrow on, Monday to Friday. Today has a purple
 * outline, the chosen day is filled with the gradient.
 */
export default function ScheduleDateStep({ booking, onChange, onNext }: ScheduleDateStepProps) {
  const { dateStep, slots, timeZones, durationMinutes, monthsAhead } = scheduleCall;
  const today = startOfToday();

  // The month shown in the calendar: counted from the current month
  // (0 = this month, 1 = next month ...). It opens on the chosen day's month.
  const [monthOffset, setMonthOffset] = useState(
    () =>
      (booking.day.getFullYear() - today.getFullYear()) * 12 +
      booking.day.getMonth() -
      today.getMonth(),
  );
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const cells = monthCells(firstOfMonth.getFullYear(), firstOfMonth.getMonth());

  const zone = timeZones.find((item) => item.id === booking.timeZone) ?? timeZones[0];

  // Calls other visitors already booked in the month on screen (start times
  // in ms). A time is "booked" when it would overlap one of them.
  const [bookedTimes, setBookedTimes] = useState<number[]>([]);
  const monthKey = `${firstOfMonth.getFullYear()}-${firstOfMonth.getMonth()}`;
  useEffect(() => {
    let current = true;
    const [year, month] = monthKey.split("-").map(Number);
    // A day either side, so every time zone's view of the month is covered.
    const from = new Date(year, month, 0);
    const to = new Date(year, month + 1, 2);
    getBookedTimes(from.toISOString(), to.toISOString())
      .then((times) => current && setBookedTimes(times))
      .catch(() => current && setBookedTimes([]));
    return () => {
      current = false;
    };
  }, [monthKey]);

  const callMs = durationMinutes * 60 * 1000;
  const isBooked = (minutes: number) => {
    const start = zonedMoment(booking.day, minutes, booking.timeZone).getTime();
    return bookedTimes.some((other) => Math.abs(other - start) < callMs);
  };

  // If the chosen time turns out to be booked (e.g. after changing the time
  // zone, or someone just took it), clear it so another one is picked.
  const chosenIsBooked = booking.minutes !== null && isBooked(booking.minutes);
  useEffect(() => {
    if (chosenIsBooked) onChange({ minutes: null });
  }, [chosenIsBooked, onChange]);

  const hasTime = booking.minutes !== null && !chosenIsBooked;

  /* Look of the two small arrow buttons next to the month name. */
  const monthButton =
    "cursor-pointer rounded-lg border border-border p-1.25 transition-colors hover:bg-surface disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent md:rounded-cell md:p-1.75";

  return (
    <>
      <div className="flex flex-col gap-3.5 md:flex-row md:items-start md:gap-7">
        {/* ------------------------------ Calendar ------------------------------ */}
        <div className="flex min-w-0 flex-1 flex-col gap-3.5">
          {/* Phones: the month is the title, with both arrows on the right.
              Larger screens: "Select a date", then  <  month  >  */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="hidden font-heading text-subtitle-lg font-semibold text-heading md:block">
              {dateStep.title}
            </h3>
            {/* "aria-live" lets screen readers announce the new month. */}
            <h3 aria-live="polite" className="font-heading text-h5 font-semibold text-heading md:hidden">
              {formatMonth(firstOfMonth)}
            </h3>
            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                type="button"
                aria-label="Previous month"
                disabled={monthOffset === 0}
                onClick={() => setMonthOffset((offset) => offset - 1)}
                className={monthButton}
              >
                <Icon src="/assets/icons/chevron-left-dark-16.svg" size={16} />
              </button>
              <p
                aria-live="polite"
                className="hidden min-w-28 text-center text-label font-semibold text-heading md:block"
              >
                {formatMonth(firstOfMonth)}
              </p>
              <button
                type="button"
                aria-label="Next month"
                disabled={monthOffset >= monthsAhead}
                onClick={() => setMonthOffset((offset) => offset + 1)}
                className={monthButton}
              >
                <Icon src="/assets/icons/chevron-right-dark-16.svg" size={16} />
              </button>
            </div>
          </div>

          {/* Weekday names: one letter on phones ("S M T ..."), three from tablets up */}
          <div className="grid grid-cols-7 gap-1 md:gap-1.5">
            {dateStep.weekdays.map((weekday) => (
              <span key={weekday} className="text-center text-caption font-medium text-muted md:h-6">
                <span className="md:hidden">{weekday[0]}</span>
                <span className="hidden md:inline">{weekday}</span>
              </span>
            ))}
          </div>

          {/* Days: seven per row, with empty cells before the 1st */}
          <div className="grid grid-cols-7 gap-x-1 gap-y-3.5 md:gap-1.5">
            {cells.map((day, i) => {
              if (!day) return <span key={`empty-${i}`} />;

              const isAvailable = isAvailableDay(day, today);
              const isSelected = isSameDay(day, booking.day);
              const isToday = isSameDay(day, today);
              return (
                <button
                  key={day.getDate()}
                  type="button"
                  disabled={!isAvailable}
                  aria-pressed={isSelected}
                  aria-label={formatShortDate(day, true)}
                  // A new day starts without a time, so one is always chosen for that day.
                  onClick={() => onChange({ day, minutes: null })}
                  className={cn(
                    // Phones: smaller cells without a border, as in the bottom sheet design.
                    "h-10 rounded-cell text-label-sm font-semibold transition duration-200 md:h-12 md:rounded-xl md:text-label",
                    isSelected
                      ? "bg-brand text-white"
                      : isAvailable
                        ? "cursor-pointer border-border bg-surface text-primary-dark hover:border-primary/50 hover:bg-surface-tint md:border"
                        : "text-faint",
                    isToday && !isSelected && "border-button border-primary",
                  )}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          {/* What the three looks of a day mean */}
          <ul className="hidden flex-wrap items-center gap-x-4 gap-y-1 text-caption font-medium text-body md:flex">
            <li className="flex items-center gap-1.5">
              <span className="size-3 rounded-sm bg-surface" />
              {dateStep.legend.available}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-3 rounded-sm bg-brand" />
              {dateStep.legend.selected}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-3 rounded-sm border border-border" />
              {dateStep.legend.unavailable}
            </li>
          </ul>
        </div>

        {/* ----------------------------- Time slots ----------------------------- */}
        <div className="flex flex-col gap-3.5 md:w-50 md:shrink-0 md:gap-2.5">
          {/* Phones: one line, e.g. "Available times · Wed, Nov 18 (PKT)" */}
          <h3 className="text-label-sm font-semibold text-heading md:hidden">
            {dateStep.timesLabel} · {formatShortDate(booking.day)} ({zone.short})
          </h3>
          <h3 className="hidden font-heading text-h5 font-semibold text-heading md:block">
            {formatShortDate(booking.day)}
          </h3>

          {/* The time zone dropdown is left out of the phone design: phones
              use the visitor's own time zone (or the default one). */}
          <div className="hidden md:grid">
            <PopupSelect
              name="timeZone"
              label={dateStep.timeZoneLabel}
              hideLabel
              value={booking.timeZone}
              onChange={(timeZone) => onChange({ timeZone })}
            >
              {timeZones.map((item) => (
                <option key={item.id} value={item.id}>
                  {/* e.g. "(GMT+5) Karachi", worked out for the chosen day */}
                  ({formatOffset(zoneOffsetMinutes(booking.day, item.id))}) {item.city}
                </option>
              ))}
            </PopupSelect>
          </div>

          {/* Three columns on phones (booked times left out), one column next
              to the calendar */}
          <div className="grid grid-cols-3 gap-2 md:grid-cols-1 md:gap-2.5">
            {slots.map((slot) => {
              const isSelected = slot.minutes === booking.minutes;
              const booked = isBooked(slot.minutes);
              return (
                <button
                  key={slot.minutes}
                  type="button"
                  disabled={booked}
                  aria-pressed={isSelected}
                  onClick={() => onChange({ minutes: slot.minutes })}
                  className={cn(
                    "rounded-cell border py-2.25 text-label-sm font-semibold whitespace-nowrap transition duration-200 md:rounded-xl md:px-3.5 md:py-2.75 md:text-label",
                    booked
                      ? "hidden border-transparent bg-surface text-faint md:block"
                      : isSelected
                        ? "cursor-pointer border-transparent bg-brand text-white"
                        : "cursor-pointer border-primary/35 bg-white text-primary hover:border-primary hover:bg-surface",
                  )}
                >
                  {formatTime(slot.minutes)}
                  {booked && dateStep.bookedSuffix}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer: the chosen date and time on the left, the button on the
          right. Phones show only the full-width button. */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
        <p className="hidden items-center gap-2 text-small text-heading md:flex">
          <Icon src="/assets/icons/calendar-brand.svg" size={16} scale />
          {hasTime
            ? `${formatShortDate(booking.day, true)} · ${formatTimeRange(booking.minutes!, durationMinutes)} (${zone.short})`
            : dateStep.emptySummary}
        </p>
        <Button onClick={onNext} disabled={!hasTime} className="w-full md:w-auto">
          {dateStep.nextLabel}
        </Button>
      </div>
    </>
  );
}
