/*
 * Turns CMS documents into the plain shapes the components were built for
 * (the shapes in /data/*.ts):
 *
 *   - images become their URL string
 *   - string lists ([{ text: "a" }]) become ["a"]
 *   - empty values (null) are dropped, so the built-in text is used instead
 *   - CMS bookkeeping (id, blockName, createdAt…) is removed
 */

const DROP_KEYS = new Set(["id", "blockName", "createdAt", "updatedAt", "globalType", "_status", "_order"]);

type Plain = string | number | boolean | undefined | Plain[] | { [key: string]: Plain };

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** A populated upload (media document). */
export const isMedia = (value: unknown): value is { url: string; alt?: string } =>
  isObject(value) && typeof value.url === "string" && typeof value.mimeType === "string";

/** The URL of an image field (populated media document), or "" if missing. */
export const mediaUrl = (value: unknown) => (isMedia(value) ? value.url : "");

export function normalize(value: unknown): Plain {
  if (value === null || value === undefined) return undefined;
  if (isMedia(value)) return value.url;

  if (Array.isArray(value)) {
    const items = value.map(normalize).filter((item) => item !== undefined);
    // [{ text: "a" }, { text: "b" }] -> ["a", "b"]
    const isStringList =
      items.length > 0 &&
      items.every((item) => isObject(item) && Object.keys(item).length === 1 && typeof item.text === "string");
    return isStringList ? items.map((item) => (item as { text: string }).text) : items;
  }

  if (isObject(value)) {
    const out: Record<string, Plain> = {};
    for (const [key, child] of Object.entries(value)) {
      if (DROP_KEYS.has(key)) continue;
      const normalized = normalize(child);
      if (normalized !== undefined) out[key] = normalized;
    }
    return out;
  }

  return value as Plain;
}

/**
 * Lays the CMS content over the built-in defaults: objects are merged key
 * by key, everything else (text, lists) is taken from the CMS when present.
 * Functions in the defaults (e.g. "3 results for …" labels) are kept.
 */
export function mergeContent<T>(defaults: T, content: unknown): T {
  if (content === undefined) return defaults;
  if (isObject(defaults) && isObject(content)) {
    const out: Record<string, unknown> = { ...defaults };
    for (const [key, value] of Object.entries(content)) {
      out[key] = key in defaults ? mergeContent((defaults as Record<string, unknown>)[key], value) : value;
    }
    return out as T;
  }
  if (typeof defaults === "function") return defaults;
  return content as T;
}

/**
 * A copy without functions, so CMS content can be passed from a server to a
 * client component. The client puts it back over the built-in labels with
 * mergeContent(defaults, content).
 */
export const clientSafe = <T>(value: T): Partial<T> => JSON.parse(JSON.stringify(value));

/** normalize() + mergeContent() in one go. */
export const withDefaults = <T>(defaults: T, content: unknown): T => mergeContent(defaults, normalize(content));
