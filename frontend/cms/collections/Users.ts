import type { CollectionConfig } from "payload";
import { adminsOnly, adminsOnlyField, adminsOrSelf, isAdminUser } from "../access";

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
  },
  access: {
    // The very first user can be created from the /admin sign-up screen.
    create: ({ req }) => !req.user || isAdminUser(req.user),
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
      access: { update: adminsOnlyField },
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
