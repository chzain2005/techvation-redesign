/*
 * Rate limiting for the website forms (server only).
 *
 * Visitors are told apart by a one-way hash of their IP address (the IP
 * itself is never stored). Form submissions are counted in the database,
 * so the limit holds across all of Vercel's servers; the calendar's
 * "which times are booked" lookups use a small in-memory counter.
 */
import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import type { Payload } from "payload";

/** Submissions allowed per visitor: a short burst, and a daily total. */
const LIMITS = [
  { windowMs: 10 * 60 * 1000, max: 5 },
  { windowMs: 24 * 60 * 60 * 1000, max: 30 },
];

export const TOO_MANY = "Too many requests from your connection. Please wait a few minutes and try again.";

/** A one-way hash of the visitor's IP address ("" when it is unknown). */
export async function visitorHash() {
  const list = await headers();
  const ip = (list.get("x-forwarded-for") ?? "").split(",")[0].trim() || list.get("x-real-ip") || "";
  if (!ip) return "";
  return createHash("sha256")
    .update(`${ip}|${process.env.PAYLOAD_SECRET ?? ""}`)
    .digest("hex")
    .slice(0, 32);
}

/** Whether this visitor has sent too many forms recently. */
export async function overFormLimit(payload: Payload, hash: string) {
  if (!hash) return false;
  for (const { windowMs, max } of LIMITS) {
    const { totalDocs } = await payload.count({
      collection: "form-submissions",
      where: {
        and: [
          { visitor: { equals: hash } },
          { createdAt: { greater_than: new Date(Date.now() - windowMs).toISOString() } },
        ],
      },
      overrideAccess: true,
    });
    if (totalDocs >= max) return true;
  }
  return false;
}

/* In-memory limiter for cheap, read-only lookups (per server instance). */
const hits = new Map<string, number[]>();

export function overLookupLimit(hash: string, max = 60, windowMs = 60 * 1000) {
  if (!hash) return false;
  const now = Date.now();
  const recent = (hits.get(hash) ?? []).filter((time) => now - time < windowMs);
  recent.push(now);
  hits.set(hash, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > max;
}
