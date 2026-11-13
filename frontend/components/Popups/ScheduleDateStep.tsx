"use client"; // The calendar reacts to clicks and remembers the month on screen.

import { useState } from "react";
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
  zoneOffsetMinutes,
} from "@/lib/schedule";
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
 * start time on the right. On phones the times move below the calendar.
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
  const hasTime = booking.minutes !== null;

  /* Look of the two small arrow buttons next to the month name. */
  const monthButton =
    "cursor-pointer rounded-cell border border-border p-1.75 transition-colors hover:bg-surface disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <>
      <div className="flex flex-col gap-7 md:flex-row md:items-start">
        {/* ------------------------------ Calendar ------------------------------ */}
        <div className="flex min-w-0 flex-1 flex-col gap-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-heading text-subtitle-lg font-semibold text-heading">
              {dateStep.title}
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous month"
                disabled={monthOffset === 0}
                onClick={() => setMonthOffset((offset) => offset - 1)}
                className={monthButton}
              >
                <Icon src="/assets/icons/chevron-left-dark-16.svg" size={16} />
              </button>
              {/* "aria-live" lets screen readers announce the new month. */}
              <p aria-live="polite" className="min-w-28 text-center text-label font-semibold text-heading">
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

          {/* Weekday names */}
          <div className="grid grid-cols-7 gap-1.5">
            {dateStep.weekdays.map((weekday) => (
              <span key={weekday} className="h-6 text-center text-caption font-medium text-muted">
                {weekday}
              </span>
            ))}
          </div>

          {/* Days: seven per row, with empty cells before the 1st */}
          <div className="grid grid-cols-7 gap-1.5">
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
                    "h-12 rounded-xl text-label font-semibold transition duration-200",
                    isSelected
                      ? "bg-brand text-white"
                      : isAvailable
                        ? "cursor-pointer border border-border bg-surface text-primary-dark hover:border-primary/50 hover:bg-surface-tint"
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
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-caption font-medium text-body">
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
        <div className="flex flex-col gap-2.5 md:w-50 md:shrink-0">
          <h3 className="font-heading text-h5 font-semibold text-heading">
            {formatShortDate(booking.day)}
          </h3>

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

          {/* Two columns on phones, one column next to the calendar */}
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-1">
            {slots.map((slot) => {
              const isSelected = slot.minutes === booking.minutes;
              return (
                <button
                  key={slot.minutes}
                  type="button"
                  disabled={slot.booked}
                  aria-pressed={isSelected}
                  onClick={() => onChange({ minutes: slot.minutes })}
                  className={cn(
                    "rounded-xl border px-3.5 py-2.75 text-label font-semibold whitespace-nowrap transition duration-200",
                    slot.booked
                      ? "border-transparent bg-surface text-faint"
                      : isSelected
                        ? "cursor-pointer border-transparent bg-brand text-white"
                        : "cursor-pointer border-primary/35 bg-white text-primary hover:border-primary hover:bg-surface",
                  )}
                >
                  {formatTime(slot.minutes)}
                  {slot.booked && dateStep.bookedSuffix}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer: the chosen date and time on the left, the button on the right */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-small text-heading">
          <Icon src="/assets/icons/calendar-brand.svg" size={16} scale />
          {hasTime
            ? `${formatShortDate(booking.day, true)} · ${formatTimeRange(booking.minutes!, durationMinutes)} (${zone.short})`
            : dateStep.emptySummary}
        </p>
        <Button onClick={onNext} disabled={!hasTime} className="w-full sm:w-auto">
          {dateStep.nextLabel}
        </Button>
      </div>
    </>
  );
}
