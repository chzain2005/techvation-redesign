import { headingField, iconFileField, imageField, linkField, statsField, stringList } from "../fields";
import { pageGlobal, tab, text, textarea } from "./helpers";

const WHITE_16 = ["sparkles", "award", "users", "trending-up", "heart", "briefcase", "building", "cart", "factory", "truck"];
const WHITE_20 = [
  "search", "layers", "code", "rocket", "bar-chart", "bot", "cpu", "database", "headset",
  "megaphone", "sliders", "smartphone", "sparkles", "users", "wrench",
];
const WHITE_22 = ["users", "zap", "dollar", "shield", "globe", "headset"];

export const Homepage = pageGlobal("homepage", "Homepage", [
  tab("hero", "Top section", [
    text("eyebrow"),
    text("eyebrowShort"),
    headingField(),
    textarea("description"),
    textarea("descriptionShort"),
    linkField("primaryAction", "Primary button"),
    linkField("secondaryAction", "Secondary button"),
    {
      name: "form",
      label: "Consultation form (right side)",
      type: "group",
      fields: [text("title"), text("subtitle"), text("subtitleShort"), text("submitLabel"), text("note")],
    },
  ]),
  tab(
    "trustedLogos",
    "Client logos",
    [stringList("titleLines", "Title on computers (two lines)", { maxRows: 2 }), text("title", "Title on phones (one line)")],
    "The text next to the scrolling logos. To add or remove logos, go to Company info → Client logos.",
  ),
  tab("uniqueValue", "Our unique value", [
    text("eyebrow"),
    text("title"),
    textarea("description"),
    {
      name: "values",
      label: "Small badges under the text",
      labels: { singular: "Badge", plural: "Badges" },
      type: "array",
      fields: [
        text("label"),
        {
          name: "icon",
          type: "select",
          required: true,
          options: [
            { label: "Sparkles", value: "/assets/icons/sparkles-brand-16.svg" },
            { label: "Award", value: "/assets/icons/award-brand.svg" },
            { label: "Heart", value: "/assets/icons/heart-brand-16.svg" },
            { label: "Check", value: "/assets/icons/check-brand.svg" },
            { label: "Clock", value: "/assets/icons/clock-brand.svg" },
          ],
        },
      ],
    },
    linkField("action", "Button"),
    {
      name: "visual",
      label: "Picture on the right",
      type: "group",
      fields: [
        text("outlineWord", "Outline word"),
        { name: "stat", type: "group", fields: [text("value"), text("label")] },
        {
          name: "pills",
          type: "array",
          maxRows: 4,
          fields: [
            text("label"),
            iconFileField("icon", WHITE_16, "white-16"),
            {
              name: "position",
              type: "select",
              required: true,
              options: [
                { label: "Top left", value: "topLeft" },
                { label: "Top right", value: "topRight" },
                { label: "Bottom right", value: "bottomRight" },
                { label: "Bottom left", value: "bottomLeft" },
              ],
            },
          ],
        },
      ],
    },
  ]),
  tab("services", "Services", [
    text("eyebrow"),
    headingField(),
    textarea("description"),
    {
      name: "items",
      label: "Services shown",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      required: true,
      admin: {
        description:
          "Which services appear in the sliding cards, in this order. New services are not added automatically: pick them here. Drag to reorder.",
      },
    },
  ]),
  tab("whyTechvation", "Why Techvation", [
    text("eyebrow"),
    headingField(),
    textarea("description"),
    { name: "hub", label: "Centre of the circle", type: "group", fields: [text("badge", "Text under the logo")] },
    {
      name: "reasons",
      type: "array",
      minRows: 6,
      maxRows: 6,
      labels: { singular: "Reason", plural: "Reasons" },
      admin: { description: "Exactly six: the first three are shown on the left of the circle, the last three on the right." },
      fields: [text("title"), text("description"), iconFileField("icon", WHITE_22, "white-22")],
    },
    statsField(),
    linkField("primaryAction", "Primary button"),
    linkField("secondaryAction", "Secondary button"),
  ]),
  tab("howWeWork", "How we work", [
    text("eyebrow"),
    headingField(),
    textarea("description"),
    text("outcomeLabel", 'Word before each result (e.g. "Outcome:")'),
    {
      name: "steps",
      type: "array",
      fields: [
        text("title"),
        textarea("description"),
        stringList("deliverables"),
        text("outcome"),
        iconFileField("icon", WHITE_20, "white-20"),
        imageField("image"),
      ],
    },
  ]),
  tab(
    "industries",
    "Industries",
    [text("eyebrow"), headingField(), text("description"), text("hint")],
    "The heading of the industries section. To edit the industries, go to Company info → Industries.",
  ),
  tab("strategyCall", "Strategy call", [
    text("eyebrow"),
    headingField(),
    textarea("description"),
    stringList("steps"),
  ]),
  tab(
    "blog",
    "Blog section",
    [text("eyebrow"), headingField(), linkField("viewAll", '"View all articles" button')],
    "Shows the newest featured blog post and the three newest others automatically.",
  ),
]);
