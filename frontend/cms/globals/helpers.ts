import type { Field, GlobalConfig, Tab } from "payload";
import { signedIn } from "../access";
import { revalidateGlobal } from "../hooks";

/** A named tab: its fields are saved under `name` (e.g. data.hero.*). */
export const tab = (name: string, label: string, fields: Field[], description?: string): Tab => ({
  name,
  label,
  description,
  fields,
});

/** The admin sidebar group of the page-text globals. */
export const PAGES_GROUP = "Website pages";

/**
 * A page-text global ("Website pages" group in the admin sidebar). `path`
 * is the page on the website, opened by the "view" button at the top.
 */
export function pageGlobal(
  slug: string,
  label: string,
  tabs: Tab[],
  description?: string,
  path = "/",
): GlobalConfig {
  return {
    slug,
    label,
    admin: {
      group: PAGES_GROUP,
      description: `${description ? `${description} ` : ""}Each tab is one section of the page, from top to bottom.`,
      preview: () => path,
    },
    access: { read: () => true, update: signedIn },
    hooks: revalidateGlobal(slug),
    fields: [{ type: "tabs", tabs }],
  };
}

export const text = (name: string, label?: string, description?: string): Field => ({
  name,
  label,
  type: "text",
  required: true,
  admin: description ? { description } : undefined,
});

export const optionalText = (name: string, label?: string, description?: string): Field => ({
  name,
  label,
  type: "text",
  admin: description ? { description } : undefined,
});

export const textarea = (name: string, label?: string, description?: string): Field => ({
  name,
  label,
  type: "textarea",
  required: true,
  admin: description ? { description } : undefined,
});
