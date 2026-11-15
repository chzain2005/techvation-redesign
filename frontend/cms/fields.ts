/*
 * Field helpers shared by the CMS collections and globals.
 *
 * The admin forms mirror the shapes in /data/*.ts (the files the site was
 * built from), so the content the site reads from the CMS has exactly the
 * same structure as before. Labels and help texts are written for people
 * who are not developers; cms/friendly.ts adds the rest.
 */
import type { ArrayField, Field, GroupField, SelectField, TextField } from "payload";

/** The line icons in /public/assets/icons/glyph (see components/Icon/Glyph.tsx). */
export const GLYPHS = [
  "award", "bar-chart", "bell", "bot", "briefcase", "calendar", "cart", "check", "clock", "cloud",
  "code", "cpu", "database", "dollar", "file-text", "globe", "headset", "heart", "layers", "mail",
  "map-pin", "megaphone", "message", "monitor", "phone", "rocket", "search", "shield", "sliders",
  "smartphone", "sparkles", "target", "trending-up", "truck", "users", "wrench", "zap",
] as const;

/** Industry icons, which exist as /assets/icons/<name>-white-{16,18,20}.svg. */
export const INDUSTRY_ICONS = [
  "factory", "cart", "heart", "landmark", "truck", "briefcase", "grad-cap", "building",
] as const;

const titleCase = (value: string) =>
  value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

/** Shows the options as a grid of real icons (cms/components/IconPicker). */
const iconPicker = (kind: "glyph" | "file" | "industry") => ({
  components: { Field: { path: "/cms/components/IconPicker#IconPicker", clientProps: { kind } } },
});

/** A picker of line icons. */
export function glyphField(name = "icon", overrides: Partial<SelectField> = {}): SelectField {
  return {
    name,
    label: "Icon",
    type: "select",
    required: true,
    options: GLYPHS.map((value) => ({ label: titleCase(value), value })),
    ...overrides,
    admin: { ...iconPicker("glyph"), ...overrides.admin },
  } as SelectField;
}

/**
 * A picker whose values are icon file paths, e.g.
 * "/assets/icons/users-white-22.svg", for the sections that show an
 * icon file in one fixed colour and size.
 */
export function iconFileField(name: string, icons: readonly string[], suffix: string): SelectField {
  return {
    name,
    label: "Icon",
    type: "select",
    required: true,
    options: icons.map((icon) => ({ label: titleCase(icon), value: `/assets/icons/${icon}-${suffix}.svg` })),
    admin: iconPicker("file"),
  };
}

/** A picker of the industry icons. */
export function industryIconField(): SelectField {
  return {
    name: "icon",
    label: "Icon",
    type: "select",
    required: true,
    options: INDUSTRY_ICONS.map((value) => ({ label: titleCase(value), value })),
    admin: iconPicker("industry"),
  };
}

/** A heading with a part in gradient colour: lead + highlight (+ tail), with a live preview. */
export function headingField(name = "heading", label = "Heading"): GroupField {
  return {
    name,
    label,
    type: "group",
    admin: {
      description:
        "Write the heading in up to three parts. The middle part is shown in the purple-blue gradient colour. Check the preview below.",
    },
    fields: [
      {
        type: "row",
        fields: [
          { name: "lead", label: "Start", type: "text", required: true, admin: { width: "40%" } },
          { name: "highlight", label: "Coloured part", type: "text", required: true, admin: { width: "40%" } },
          { name: "tail", label: "End (optional)", type: "text", admin: { width: "20%" } },
        ],
      },
      {
        name: "preview",
        type: "ui",
        admin: { components: { Field: "/cms/components/HeadingPreview#HeadingPreview" } },
      },
    ],
  };
}

const LINK_HELP =
  'Where the button goes: a page of this site (e.g. /contact), a full web address (https://…), or "#free-consultation" / "#schedule-a-call" to open those pop-ups.';

/** A button or link: label + href. */
export function linkField(name: string, label?: string, required = true): GroupField {
  return {
    name,
    label,
    type: "group",
    fields: [
      {
        type: "row",
        fields: [
          { name: "label", label: "Button text", type: "text", required, admin: { width: "40%" } },
          { name: "href", label: "Goes to", type: "text", required, admin: { width: "60%", description: LINK_HELP } },
        ],
      },
    ],
  };
}

/** A list of plain strings, stored as [{ text }] and flattened when read. */
export function stringList(name: string, label?: string, extra: Partial<ArrayField> = {}): ArrayField {
  return {
    name,
    label,
    type: "array",
    labels: { singular: "Line", plural: "Lines" },
    fields: [{ name: "text", label: "Text", type: "text", required: true }],
    ...extra,
    admin: { initCollapsed: false, ...extra.admin },
  } as ArrayField;
}

/**
 * A URL-safe slug, unique within its collection. It is made from the
 * `from` field when left empty; `fromLabel` is that field's name in the
 * help text.
 */
export function slugField(from = "title", base = "", fromLabel = from): TextField {
  return {
    name: "slug",
    label: "Web address",
    type: "text",
    required: true,
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description: `The end of the page address${base ? `: thetechvation.com${base}/…` : ""}. Filled in from the ${fromLabel} if you leave it empty. Changing it breaks old links to this page.`,
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          const source = (value as string) || (data?.[from] as string) || "";
          return source
            .toLowerCase()
            .normalize("NFD")
            .replace(/[^\w\s-]/g, "")
            .trim()
            .replace(/[\s_]+/g, "-")
            .replace(/-+/g, "-");
        },
      ],
    },
    // A custom validate replaces Payload's own "required" check, so it is repeated here.
    validate: (value: string | null | undefined) =>
      !value
        ? "Please enter a web address (or a name it can be made from)."
        : /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) || "Use lowercase letters, numbers and dashes only.",
  };
}

/** An "anchor" (the #link of a section), made from the name automatically. */
export function anchorField(from = "name"): TextField {
  return {
    name: "anchor",
    label: "Section link (advanced)",
    type: "text",
    unique: true,
    admin: {
      position: "sidebar",
      description: "Filled in automatically. Only change it if you know why.",
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) =>
          ((value as string) || (data?.[from] as string) || "")
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
      ],
    },
  };
}

/** Simple "{ value, label }" stat rows (e.g. "50+ Projects"). */
export function statsField(name = "stats", label = "Numbers"): ArrayField {
  return {
    name,
    label,
    type: "array",
    labels: { singular: "Number", plural: "Numbers" },
    admin: { description: 'e.g. "50+" and "Projects delivered".' },
    fields: [
      {
        type: "row",
        fields: [
          { name: "value", label: "Number", type: "text", required: true, admin: { width: "35%" } },
          { name: "label", label: "What it counts", type: "text", required: true, admin: { width: "65%" } },
        ],
      },
    ],
  };
}

/** An image from the media library. */
export function imageField(name: string, label?: string, required = true): Field {
  return { name, label, type: "upload", relationTo: "media", required };
}
