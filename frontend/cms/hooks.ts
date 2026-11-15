/*
 * Keeps the public site in step with the CMS.
 *
 * The site caches what it reads from the CMS (see lib/cms). Each collection
 * and global is cached under a tag named after its slug; when an admin saves
 * or deletes something, the tag is invalidated so the next visitor gets the
 * new content. No rebuild or redeploy is needed.
 */
import { revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

function invalidate(tag: string, context: Record<string, unknown>) {
  // The seed script runs outside Next.js, where there is no cache to clear.
  if (context.skipRevalidate) return;
  try {
    // expire: 0 = the next request waits for fresh data instead of being
    // served the old version once, so admins see their change straight away.
    revalidateTag(tag, { expire: 0 });
  } catch {
    // Not inside a Next.js request (e.g. a script): nothing to invalidate.
  }
}

export const revalidateCollection = (tag: string) => {
  const afterChange: CollectionAfterChangeHook = ({ doc, req }) => {
    invalidate(tag, req.context);
    return doc;
  };
  const afterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
    invalidate(tag, req.context);
    return doc;
  };
  return { afterChange: [afterChange], afterDelete: [afterDelete] };
};

export const revalidateGlobal = (tag: string): { afterChange: GlobalAfterChangeHook[] } => ({
  afterChange: [
    ({ doc, req }) => {
      invalidate(tag, req.context);
      return doc;
    },
  ],
});
