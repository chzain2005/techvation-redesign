/*
 * CVs sent with job applications. Private: only signed-in users can open
 * them (the files are served through Payload, which checks access). They
 * are stored under random names, and in production in their own storage
 * bucket when S3_PRIVATE_BUCKET is set (see payload.config.ts).
 */
import { randomUUID } from "node:crypto";
import type { CollectionConfig } from "payload";
import { signedIn } from "../access";

export const CvUploads: CollectionConfig = {
  slug: "cv-uploads",
  labels: { singular: "CV", plural: "CVs" },
  admin: {
    group: "Inbox",
    hidden: true, // opened from the submission they belong to
    useAsTitle: "originalName",
  },
  access: {
    create: () => false, // only the website's server action uploads CVs
    read: signedIn,
    update: signedIn,
    delete: signedIn,
  },
  upload: {
    staticDir: process.env.CV_DIR || "private-uploads",
    mimeTypes: ["application/pdf"],
  },
  hooks: {
    beforeOperation: [
      // Store every CV under a random name, so file addresses can't be guessed.
      ({ operation, req }) => {
        if (operation === "create" && req.file) {
          req.file.name = `${randomUUID()}.pdf`;
        }
      },
    ],
  },
  fields: [
    {
      name: "originalName",
      label: "File name sent by the applicant",
      type: "text",
      admin: { readOnly: true },
    },
  ],
};
