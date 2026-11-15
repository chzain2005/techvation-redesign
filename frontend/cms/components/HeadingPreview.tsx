"use client";

/*
 * Shows how a two-colour heading will look on the site, right under its
 * three boxes: "Innovating at the " + coloured "Speed of AI".
 */
import { useFormFields } from "@payloadcms/ui";
import "./admin.css";

export function HeadingPreview({ path }: { path: string }) {
  // This field sits inside the heading group, next to lead/highlight/tail.
  const base = path.split(".").slice(0, -1).join(".");
  const [lead, highlight, tail] = useFormFields(([fields]) => [
    fields[`${base}.lead`]?.value as string | undefined,
    fields[`${base}.highlight`]?.value as string | undefined,
    fields[`${base}.tail`]?.value as string | undefined,
  ]);

  if (!lead && !highlight && !tail) return null;
  return (
    <div className="tv-heading-preview">
      <span className="tv-heading-preview__label">Preview</span>
      <p className="tv-heading-preview__text">
        {lead}
        <span className="tv-heading-preview__highlight">{highlight}</span>
        {tail}
      </p>
    </div>
  );
}
