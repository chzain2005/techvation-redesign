"use client";

import { useRowLabel } from "@payloadcms/ui";

/**
 * Names each row of a list after its content ("Discover", "50+ Projects")
 * instead of "Item 01". `fields` are tried in order; the first one with a
 * value is shown.
 */
export function ItemRowLabel({ fields = ["title", "label", "name", "text"], fallback = "Item" }: {
  fields?: string[];
  fallback?: string;
}) {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>();
  const number = String((rowNumber ?? 0) + 1).padStart(2, "0");
  const value = fields.map((field) => data?.[field]).find((v) => typeof v === "string" && v.trim());
  const extra = typeof data?.value === "string" && data.value && fields.includes("label") ? `${data.value} ` : "";
  return <span>{value ? `${extra}${value}` : `${fallback} ${number}`}</span>;
}

/** FAQ rows show their question. */
export function QuestionRowLabel() {
  return <ItemRowLabel fields={["question"]} fallback="Question" />;
}
