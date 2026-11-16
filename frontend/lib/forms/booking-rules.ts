/*
 * Rules for "Schedule a Call" bookings (server only).
 *
 * A booking is a form submission of kind "booking" with its exact start
 * time in `bookingStart`. Calls last 30 minutes; two calls clash when they
 * overlap. Cancelled bookings (status "cancelled" in the inbox) free their
 * time again.
 */
import "server-only";
import type { Payload, Where } from "payload";
import { scheduleCall } from "@/data/popups";

export const CALL_MS = scheduleCall.durationMinutes * 60 * 1000;

/** How far ahead a call can be booked (the calendar shows `monthsAhead` months). */
export const MAX_AHEAD_MS = (scheduleCall.monthsAhead + 1) * 31 * 24 * 60 * 60 * 1000;

/** Start times (ms) of the active bookings between two moments. */
export async function bookedStarts(payload: Payload, from: number, to: number, exceptId?: number | string) {
  const where: Where = {
    and: [
      { form: { equals: "booking" } },
      { status: { not_equals: "cancelled" } },
      // A call that starts up to 30 minutes before `from` still overlaps it.
      { bookingStart: { greater_than: new Date(from - CALL_MS).toISOString() } },
      { bookingStart: { less_than: new Date(to + CALL_MS).toISOString() } },
      ...(exceptId !== undefined ? [{ id: { not_equals: exceptId } }] : []),
    ],
  };
  const { docs } = await payload.find({
    collection: "form-submissions",
    where,
    limit: 500,
    depth: 0,
    select: { bookingStart: true },
    overrideAccess: true,
  });
  return docs
    .map((doc) => (doc.bookingStart ? new Date(doc.bookingStart).getTime() : NaN))
    .filter((time) => !Number.isNaN(time));
}

/** Whether a call starting at `start` overlaps an existing booking. */
export async function clashes(payload: Payload, start: number, exceptId?: number | string) {
  const starts = await bookedStarts(payload, start, start, exceptId);
  return starts.some((other) => Math.abs(other - start) < CALL_MS);
}
