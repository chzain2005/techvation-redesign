import { ValidationError, type CollectionConfig } from "payload";
import { adminsOnly, adminsOnlyField, adminsOrSelf } from "../access";

/** The people who can sign in to the CMS at /admin. */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "User account", plural: "User accounts" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "roles"],
    group: "Settings",
    description: "People who can sign in to this editor.",
  },
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8 hours
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // 15 minutes
    // The login cookie is only sent over HTTPS on the live site, and never
    // readable by page scripts (httpOnly is Payload's default).
    cookies: { secure: process.env.NODE_ENV === "production", sameSite: "Lax" },
  },
  hooks: {
    // Passwords must be at least 12 characters (Payload has no minimum).
    beforeValidate: [
      ({ data }) => {
        const password = (data as { password?: unknown } | undefined)?.password;
        if (typeof password === "string" && password.length < 12) {
          throw new ValidationError({
            errors: [{ message: "Use a password of at least 12 characters.", path: "password" }],
          });
        }
        return data;
      },
    ],
  },
  access: {
    // Only admins create accounts. The very first account is made on the
    // /admin "create first user" screen, which Payload only allows while
    // there are no users at all (it bypasses this rule on its own).
    create: adminsOnly,
    read: adminsOrSelf,
    update: adminsOrSelf,
    delete: adminsOnly,
  },
  fields: [
    { name: "name", type: "text" },
    {
      name: "roles",
      label: "Access level",
      type: "select",
      hasMany: true,
      required: true,
      defaultValue: ["editor"],
      saveToJWT: true,
      options: [
        { label: "Admin: can edit everything and manage user accounts", value: "admin" },
        { label: "Editor: can edit website content", value: "editor" },
      ],
      // Only admins can give or change access levels (also when creating an account).
      access: { create: adminsOnlyField, update: adminsOnlyField },
      hooks: {
        // The first account ever created is always an admin.
        beforeChange: [
          async ({ req, value, operation }) => {
            if (operation !== "create") return value;
            const { totalDocs } = await req.payload.count({ collection: "users" });
            return totalDocs === 0 ? ["admin"] : value;
          },
        ],
      },
    },
  ],
};
