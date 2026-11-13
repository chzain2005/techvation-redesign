/*
 * Small date and time helpers for the "Schedule a Call" pop-up.
 *
 * A calendar day is a normal Date at midnight. A time of day is a number of
 * minutes after midnight (11:30 AM = 690), which keeps the maths simple.
 */

const LOCALE = "en-US";

/** Today at midnight. */
export function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Calls can be booked on weekdays (Monday to Friday), starting tomorrow. */
export function isAvailableDay(day: Date, today: Date) {
  const weekday = day.getDay(); // 0 = Sunday, 6 = Saturday
  return day > today && weekday !== 0 && weekday !== 6;
}

/** The first day that can be booked. */
export function firstAvailableDay(today: Date) {
  const day = new Date(today);
  do {
    day.setDate(day.getDate() + 1);
  } while (!isAvailableDay(day, today));
  return day;
}

/**
 * The cells of one month for a calendar that starts on Sunday: empty cells
 * (null) before the 1st, then one Date per day.
 */
export function monthCells(year: number, month: number): Array<Date | null> {
  const blanks = new Date(year, month, 1).getDay();
  const dayCount = new Date(year, month + 1, 0).getDate();
  return [
    ...Array.from({ length: blanks }, () => null),
    ...Array.from({ length: dayCount }, (_, i) => new Date(year, month, i + 1)),
  ];
}

/** 690 -> "11:30 AM" */
export function formatTime(minutes: number) {
  const hours24 = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const suffix = hours24 < 12 ? "AM" : "PM";
  return `${String(hours12).padStart(2, "0")}:${String(mins).padStart(2, "0")} ${suffix}`;
}

/** "11:30 AM – 12:00 PM" */
export function formatTimeRange(startMinutes: number, durationMinutes: number) {
  return `${formatTime(startMinutes)} – ${formatTime(startMinutes + durationMinutes)}`;
}

/** "November 2026" */
export function formatMonth(day: Date) {
  return day.toLocaleDateString(LOCALE, { month: "long", year: "numeric" });
}

/** "Wed, Nov 18" (or "Wed, Nov 18, 2026" with the year) */
export function formatShortDate(day: Date, withYear = false) {
  return day.toLocaleDateString(LOCALE, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: withYear ? "numeric" : undefined,
  });
}

/** "Wednesday, November 18, 2026" */
export function formatLongDate(day: Date) {
  return day.toLocaleDateString(LOCALE, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * How many minutes a time zone is ahead of UTC at a given moment
 * (Karachi = 300). The browser knows the rules, including summer time.
 */
export function zoneOffsetMinutes(moment: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat(LOCALE, {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(moment);
  const part = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const clockAsUtc = Date.UTC(
    part("year"),
    part("month") - 1,
    part("day"),
    part("hour"),
    part("minute"),
    part("second"),
  );
  return Math.round((clockAsUtc - moment.getTime()) / 60000);
}

/** 300 -> "GMT+5", 330 -> "GMT+5:30", -300 -> "GMT-5" */
export function formatOffset(offsetMinutes: number) {
  const sign = offsetMinutes < 0 ? "-" : "+";
  const hours = Math.floor(Math.abs(offsetMinutes) / 60);
  const mins = Math.abs(offsetMinutes) % 60;
  return `GMT${sign}${hours}${mins ? `:${String(mins).padStart(2, "0")}` : ""}`;
}

/**
 * The exact moment of "this day, this time, in this time zone".
 * Needed for the calendar links, which want the time in UTC.
 */
export function zonedMoment(day: Date, minutes: number, timeZone: string) {
  const clockAsUtc = Date.UTC(day.getFullYear(), day.getMonth(), day.getDate(), 0, minutes);
  const offset = zoneOffsetMinutes(new Date(clockAsUtc), timeZone);
  return new Date(clockAsUtc - offset * 60000);
}

type CalendarEvent = {
  title: string;
  details: string;
  start: Date;
  end: Date;
};

/** Link that opens Google Calendar with the event filled in. */
export function googleCalendarLink({ title, details, start, end }: CalendarEvent) {
  // Google wants "20261118T063000Z".
  const stamp = (moment: Date) => moment.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details,
    dates: `${stamp(start)}/${stamp(end)}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** Link that opens Outlook on the web with the event filled in. */
export function outlookCalendarLink({ title, details, start, end }: CalendarEvent) {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: title,
    body: details,
    startdt: start.toISOString(),
    enddt: end.toISOString(),
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params}`;
}
