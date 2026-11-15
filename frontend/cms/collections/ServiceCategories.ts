import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";
import { anchorField, glyphField } from "../fields";
import { revalidateCollection } from "../hooks";

/** The practice areas ("Microsoft Solutions", "Enterprise ERP"…) services are grouped in. */
export const ServiceCategories: CollectionConfig = {
  slug: "service-categories",
  labels: { singular: "Practice area", plural: "Practice areas" },
  orderable: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "description"],
    group: "Services",
    description: 'The groups services are sorted into, e.g. "Microsoft Solutions". Drag the ⠿ handle to change the order.',
  },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  hooks: revalidateCollection("service-categories"),
  fields: [
    { name: "name", type: "text", required: true },
    anchorField(),
    glyphField(),
    { name: "description", label: "Short line under the name", type: "text", required: true },
    {
      name: "expertLabel",
      label: "Contact link text",
      type: "text",
      required: true,
      admin: { description: 'Opens the consultation form, e.g. "Talk to an ERP expert".' },
    },
    {
      name: "promo",
      label: "Promo card (optional)",
      type: "group",
      admin: { description: "A dark card that fills the empty space when the area has only two services. Leave the title empty to hide it." },
      fields: [
        { name: "title", type: "text" },
        { name: "text", type: "text" },
      ],
    },
    {
      name: "services",
      label: "Services in this area",
      type: "join",
      collection: "services",
      on: "category",
      admin: { description: "To add a service here, open the service and choose this practice area." },
    },
  ],
};
