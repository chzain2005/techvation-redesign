/*
 * lib/schedule.ts: the date and time maths behind "Schedule a Call".
 * Days are local calendar dates; times are minutes after midnight in the
 * visitor's chosen time zone.
 */
import { describe, expect, it } from "vitest";
import {
  firstAvailableDay,
  formatOffset,
  formatTime,
  formatTimeRange,
  googleCalendarLink,
  isAvailableDay,
  isSameDay,
  monthCells,
  outlookCalendarLink,
  zonedMoment,
  zoneOffsetMinutes,
} from "@/lib/schedule";

const day = (y: number, m: number, d: number) => new Date(y, m - 1, d);

describe("times", () => {
  it("formats minutes after midnight", () => {
    expect(formatTime(690)).toBe("11:30 AM");
    expect(formatTime(0)).toBe("12:00 AM");
    expect(formatTime(12 * 60)).toBe("12:00 PM");
    expect(formatTime(17 * 60 + 30)).toBe("05:30 PM");
  });

  it("formats a 30-minute range", () => {
    expect(formatTimeRange(690, 30)).toBe("11:30 AM – 12:00 PM");
  });
});

describe("bookable days", () => {
  const today = day(2026, 11, 16); // a Monday

  it("never offers today or earlier", () => {
    expect(isAvailableDay(today, today)).toBe(false);
    expect(isAvailableDay(day(2026, 11, 13), today)).toBe(false);
  });

  it("offers weekdays from tomorrow, never weekends", () => {
    expect(isAvailableDay(day(2026, 11, 17), today)).toBe(true); // Tuesday
    expect(isAvailableDay(day(2026, 11, 21), today)).toBe(false); // Saturday
    expect(isAvailableDay(day(2026, 11, 22), today)).toBe(false); // Sunday
  });

  it("skips the weekend for the first free day", () => {
    expect(isSameDay(firstAvailableDay(day(2026, 11, 20)), day(2026, 11, 23))).toBe(true); // Fri -> Mon
  });

  it("lays out a month starting on Sunday", () => {
    const cells = monthCells(2026, 10); // November 2026 starts on a Sunday
    expect(cells[0]?.getDate()).toBe(1);
    expect(cells.filter(Boolean)).toHaveLength(30);
    const march = monthCells(2026, 2); // March 2026 starts on a Sunday too
    expect(march.filter((c) => c === null)).toHaveLength(0);
    const feb = monthCells(2027, 1); // February 2027 starts on a Monday
    expect(feb[0]).toBeNull();
    expect(feb[1]?.getDate()).toBe(1);
  });
});

describe("time zones", () => {
  it("knows the offsets of the offered zones", () => {
    const moment = new Date("2026-11-17T06:30:00Z");
    expect(zoneOffsetMinutes(moment, "Asia/Karachi")).toBe(300);
    expect(zoneOffsetMinutes(moment, "Asia/Dubai")).toBe(240);
    expect(zoneOffsetMinutes(moment, "America/New_York")).toBe(-300); // winter time
    expect(zoneOffsetMinutes(new Date("2026-07-01T12:00:00Z"), "America/New_York")).toBe(-240); // summer time
  });

  it("formats offsets", () => {
    expect(formatOffset(300)).toBe("GMT+5");
    expect(formatOffset(330)).toBe("GMT+5:30");
    expect(formatOffset(-300)).toBe("GMT-5");
  });

  it("turns a day + time + zone into the exact moment", () => {
    expect(zonedMoment(day(2026, 11, 17), 690, "Asia/Karachi").toISOString()).toBe("2026-11-17T06:30:00.000Z");
    expect(zonedMoment(day(2026, 11, 17), 630, "Asia/Dubai").toISOString()).toBe("2026-11-17T06:30:00.000Z");
  });

  it("makes the same call clash across time zones (11:30 Karachi = 10:30 Dubai)", () => {
    const karachi = zonedMoment(day(2026, 11, 17), 690, "Asia/Karachi").getTime();
    const dubai = zonedMoment(day(2026, 11, 17), 630, "Asia/Dubai").getTime();
    expect(karachi).toBe(dubai);
  });
});

describe("calendar links", () => {
  const event = {
    title: "Techvation strategy call",
    details: "Free call",
    start: new Date("2026-11-17T06:30:00Z"),
    end: new Date("2026-11-17T07:00:00Z"),
  };

  it("builds a Google Calendar link in UTC", () => {
    const url = new URL(googleCalendarLink(event));
    expect(url.hostname).toBe("calendar.google.com");
    expect(url.searchParams.get("dates")).toBe("20261117T063000Z/20261117T070000Z");
    expect(url.searchParams.get("text")).toBe("Techvation strategy call");
  });

  it("builds an Outlook link", () => {
    const url = new URL(outlookCalendarLink(event));
    expect(url.searchParams.get("startdt")).toBe("2026-11-17T06:30:00.000Z");
    expect(url.searchParams.get("enddt")).toBe("2026-11-17T07:00:00.000Z");
  });
});
