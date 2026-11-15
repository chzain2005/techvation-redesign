/*
 * Sends a website form to the inbox (see lib/forms/actions.ts). Used by
 * every form component:
 *
 *   const result = await sendForm("contact", formElement, { service: "…" });
 *   if (!result.ok) setError(result.error);
 */
import type { FormKind } from "@/cms/collections/FormSubmissions";
import { submitForm, type FormResult } from "./actions";

export async function sendForm(
  kind: FormKind,
  form: HTMLFormElement | FormData,
  extra: Record<string, string | undefined> = {},
): Promise<FormResult> {
  const data = form instanceof FormData ? form : new FormData(form);
  data.set("form", kind);
  data.set("page", window.location.pathname);
  for (const [key, value] of Object.entries(extra)) if (value) data.set(key, value);
  try {
    return await submitForm(data);
  } catch {
    return { ok: false, error: "Could not send. Please check your connection and try again." };
  }
}
