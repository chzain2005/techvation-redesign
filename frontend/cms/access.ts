import type { Access, FieldAccess } from "payload";

/**
 * Two kinds of CMS user:
 *   admin  - everything, including managing other users
 *   editor - edits content, cannot manage users
 */
export type Role = "admin" | "editor";

type MaybeUser = { roles?: Role[] | null } | null | undefined;

export const isAdminUser = (user: MaybeUser) => Boolean(user?.roles?.includes("admin"));

/** Anyone can read published content (the public site reads it too). */
export const anyone: Access = () => true;

/** Any signed-in CMS user. */
export const signedIn: Access = ({ req }) => Boolean(req.user);

export const adminsOnly: Access = ({ req }) => isAdminUser(req.user as MaybeUser);

export const adminsOnlyField: FieldAccess = ({ req }) => isAdminUser(req.user as MaybeUser);

/** Admins can edit anyone; other users only themselves. */
export const adminsOrSelf: Access = ({ req }) => {
  if (!req.user) return false;
  if (isAdminUser(req.user as MaybeUser)) return true;
  return { id: { equals: req.user.id } };
};

/** Published documents for the public, drafts too for CMS users. */
export const publishedOrSignedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};
