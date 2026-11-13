/**
 * Joins class names together and skips empty values.
 *
 *   cn("flex", isActive && "bg-primary", undefined)  ->  "flex bg-primary"
 *
 * Handy for adding a class only when a condition is true.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
