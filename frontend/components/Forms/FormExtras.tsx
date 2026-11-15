/*
 * Small pieces every website form uses:
 *   <Honeypot />  a hidden field that catches spam bots (see lib/forms/actions.ts)
 *   <FormError /> the message shown when a form could not be sent
 */
import { cn } from "@/lib/cn";

/** Invisible to people (and skipped by keyboard and screen readers); bots fill it in. */
export function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      className="pointer-events-none absolute -left-[9999px] size-px opacity-0"
    />
  );
}

export function FormError({ message, className }: { message: string; className?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className={cn("rounded-xl bg-danger/10 px-4 py-3 text-small font-medium text-danger", className)}>
      {message}
    </p>
  );
}
