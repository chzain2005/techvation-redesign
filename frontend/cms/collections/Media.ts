import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";
import { revalidateCollection } from "../hooks";

/**
 * Every image on the site. Locally files are saved in /frontend/media; in
 * production they go to Supabase Storage (see payload.config.ts).
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Image library" },
  admin: {
    group: "Settings",
    defaultColumns: ["filename", "alt", "updatedAt"],
    description: "Every image used on the website. You can also upload new images straight from any image field.",
  },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  upload: {
    // Local uploads folder (also used to avoid duplicate file names). MEDIA_DIR
    // can point elsewhere, e.g. an empty folder when uploading to the cloud.
    staticDir: process.env.MEDIA_DIR || "media",
    // Photos only: SVG files are refused because they can contain scripts.
    mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/avif", "image/gif"],
    focalPoint: true,
  },
  hooks: revalidateCollection("media"),
  fields: [
    {
      name: "alt",
      label: "Short description of the image",
      type: "text",
      admin: { description: 'e.g. "Team meeting in the Islamabad office". Helps Google and visitors who use screen readers.' },
    },
  ],
};
