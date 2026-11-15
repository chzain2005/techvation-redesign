/*
 * Page-text globals for the inner pages. Lists of things (team, jobs, FAQs,
 * posts, services…) are collections; these hold the headings and copy
 * around them.
 */
import type { ArrayField, Field } from "payload";
import { glyphField, headingField, imageField, linkField, statsField, stringList } from "../fields";
import { optionalText, pageGlobal, tab, text, textarea } from "./helpers";

/** [{ icon, title, text }] cards (perks, values, reasons…). */
const iconCards = (name: string, label?: string): ArrayField => ({
  name,
  label,
  type: "array",
  labels: { singular: "Card", plural: "Cards" },
  fields: [glyphField(), text("title"), textarea("text")],
});

/** [{ title, text }] numbered steps. */
const steps = (name = "steps"): ArrayField => ({
  name,
  type: "array",
  labels: { singular: "Step", plural: "Steps" },
  fields: [text("title"), text("text")],
});

const breadcrumb: Field = text("breadcrumb", "Breadcrumb label");

/* --------------------------------- About --------------------------------- */

export const AboutPage = pageGlobal("about-page", "About Us page", [
  tab("hero", "Top section", [
    breadcrumb,
    text("eyebrow"),
    headingField(),
    textarea("description"),
    text("primaryLabel", "Main button text", "This button opens the free consultation form."),
    linkField("secondaryAction", "Secondary button"),
    imageField("image"),
  ]),
  tab("story", "Our story", [
    text("eyebrow"),
    headingField(),
    stringList("paragraphs", "Paragraphs"),
    statsField("stats", "Numbers (they count up when scrolled into view)"),
    {
      name: "collage",
      type: "group",
      fields: [
        imageField("main", "Large photo"),
        imageField("inset", "Small photo on top"),
        { name: "badge", type: "group", fields: [text("title"), text("text")] },
      ],
    },
  ]),
  tab("mission", "Mission", [text("title"), glyphField(), textarea("text")]),
  tab("vision", "Vision", [text("title"), glyphField(), textarea("text")]),
  tab("values", "Values", [text("eyebrow"), headingField(), iconCards("items", "Values")]),
  tab(
    "leadership",
    "Leadership",
    [text("eyebrow"), headingField(), linkField("action", "Button")],
    "The heading of the team section. To add or edit people, go to Company info → Team.",
  ),
  tab("presence", "Global presence", [
    text("eyebrow"),
    headingField(),
    textarea("description"),
    imageField("image", "Globe picture"),
    {
      name: "regions",
      type: "array",
      labels: { singular: "Region", plural: "Regions" },
      fields: [
        text("name"),
        text("detail", "Details"),
        optionalText("phone", "Phone link (optional)", 'Makes the region clickable to call. Write "tel:" and the number without spaces, e.g. tel:+13078550572'),
      ],
    },
  ]),
], undefined, "/about");

/* -------------------------------- Careers -------------------------------- */

export const CareersPage = pageGlobal("careers-page", "Careers page", [
  tab("hero", "Top section", [
    breadcrumb,
    text("eyebrow"),
    headingField(),
    textarea("description"),
    linkField("primaryAction", "Primary button"),
    linkField("secondaryAction", "Secondary button"),
    imageField("image"),
  ]),
  tab("perks", "Perks", [text("eyebrow"), headingField(), iconCards("items", "Perks")]),
  tab(
    "galleryTab",
    "Photo gallery",
    [
      {
        name: "images",
        type: "array",
        minRows: 6,
        maxRows: 6,
        labels: { singular: "Photo", plural: "Photos" },
        admin: { description: "Exactly six photos in two rows. Photos 1 and 6 are shown wide." },
        fields: [imageField("image")],
      },
    ],
  ),
  tab(
    "positions",
    "Open positions",
    [
      text("eyebrow"),
      headingField(),
      stringList("departments", "Departments", {
        labels: { singular: "Department", plural: "Departments" },
        admin: { description: "The filter buttons above the job list. Job openings pick their department from this list." },
      }),
      stringList("locations", "Locations", {
        labels: { singular: "Location", plural: "Locations" },
        admin: { description: "The choices in the location filter." },
      }),
      textarea("emptyText", "Text when no role matches the filters"),
    ],
    "The heading and filters of the job list. To add or edit jobs, go to Careers → Job openings.",
  ),
  tab("process", "Hiring process", [text("eyebrow"), headingField(), steps()]),
  tab("application", "Send-your-CV form", [
    text("eyebrow"),
    headingField(),
    textarea("description"),
    text("submitLabel"),
    text("successTitle"),
    textarea("successText"),
  ]),
], undefined, "/careers");

/* ---------------------------------- FAQs --------------------------------- */

export const FaqsPage = pageGlobal(
  "faqs-page",
  "FAQs page",
  [
    tab("hero", "Top section", [breadcrumb, text("eyebrow"), headingField(), textarea("description"), imageField("image", "Background photo")]),
    tab("sidebar", "Left column", [
      text("title", "Title above the topics"),
      { name: "help", label: '"Can\u2019t find an answer?" card', type: "group", fields: [text("title"), text("text"), text("actionLabel")] },
    ]),
    tab("contact", "Contact cards (bottom)", [
      text("eyebrow"),
      headingField(),
      {
        name: "cards",
        type: "array",
        labels: { singular: "Card", plural: "Cards" },
        fields: [
          glyphField(),
          text("title"),
          text("text"),
          text("actionLabel"),
          text("href", "Goes to", 'A phone ("tel:+13078550572"), an email ("mailto:info@thetechvation.com") or "#schedule-a-call" to open the booking form.'),
        ],
      },
    ]),
  ],
  "The questions themselves are under Company info → FAQs.",
  "/faqs",
);

/* ---------------------------------- Blog --------------------------------- */

export const BlogPage = pageGlobal(
  "blog-page",
  "Blog page",
  [
    tab("hero", "Top section", [text("eyebrow"), headingField(), textarea("description")]),
    tab("newsletter", "Newsletter box", [text("title"), text("text"), text("submitLabel"), text("successText")]),
    tab("articleDefaults", "Article pages", [
      {
        name: "cta",
        label: "Standard consultation box next to articles",
        type: "group",
        admin: { description: "Used by articles that have no card text of their own." },
        fields: [text("title"), text("buttonLabel")],
      },
    ]),
  ],
  "The posts themselves are under Blog → Blog posts.",
  "/blog",
);

/* -------------------------------- Contact -------------------------------- */

export const ContactPage = pageGlobal("contact-page", "Contact page", [
  tab("hero", "Top section", [
    breadcrumb,
    text("eyebrow"),
    headingField(),
    textarea("description"),
    text("descriptionShort", "Text (short version for phones)"),
    imageField("image", "Background photo"),
  ]),
  tab("quick", "Contact cards", [
    {
      name: "quickContact",
      label: "Cards",
      type: "array",
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        glyphField(),
        text("title"),
        optionalText("short", "Title (short version for phones)"),
        text("detail", "Details (e.g. the phone number)"),
        text("href", "Goes to", 'A phone ("tel:+13078550572"), an email ("mailto:…"), WhatsApp ("https://wa.me/923445450666") or "#schedule-a-call".'),
      ],
    },
  ]),
  tab("form", "Contact form", [
    text("title"),
    text("titleShort", "Title (short version for phones)"),
    text("servicesLabel", '"What do you need help with?" question'),
    {
      name: "services",
      label: "Service choices",
      type: "array",
      labels: { singular: "Choice", plural: "Choices" },
      fields: [{ type: "row", fields: [
        { name: "label", label: "Text", type: "text", required: true, admin: { width: "60%" } },
        { name: "short", label: "Short version for phones", type: "text", required: true, admin: { width: "40%" } },
      ] }],
    },
    stringList("budgets", "Budget choices", { labels: { singular: "Choice", plural: "Choices" } }),
    stringList("timelines", "Timeline choices", { labels: { singular: "Choice", plural: "Choices" } }),
    text("submitLabel"),
  ]),
  tab("offices", "Offices & hours", [
    {
      name: "offices",
      type: "array",
      labels: { singular: "Office", plural: "Offices" },
      fields: [
        text("name"),
        text("location"),
        linkField("phone", "Phone"),
        { name: "email", type: "email", required: true },
        imageField("photo"),
      ],
    },
    { name: "hours", label: "Business hours", type: "group", fields: [text("title"), stringList("lines")] },
  ]),
], undefined, "/contact");

/* -------------------------------- Services ------------------------------- */

export const ServicesPage = pageGlobal(
  "services-page",
  "Services pages",
  [
    tab("hero", "Services page: top", [
      breadcrumb,
      text("eyebrow"),
      headingField(),
      textarea("description"),
      { name: "finder", label: '"What do you need help with?" box', type: "group", fields: [text("title"), text("subtitle")] },
    ]),
    tab("engagement", "Services page: ways to work with us", [
      text("eyebrow"),
      headingField(),
      textarea("description"),
      {
        name: "models",
        type: "array",
        labels: { singular: "Model", plural: "Models" },
        fields: [
          glyphField(),
          text("title"),
          text("text"),
          stringList("points"),
          text("bestFor", "Best for"),
          { name: "popular", label: 'Show "Most popular"', type: "checkbox" },
        ],
      },
    ]),
    tab("megaMenu", "Services drop-down menu", [
      {
        name: "columns",
        type: "array",
        labels: { singular: "Column", plural: "Columns" },
        minRows: 1,
        maxRows: 3,
        admin: { description: 'The menu that opens when you point at "Services" in the top bar. Choose which practice areas go in each of its columns.' },
        fields: [
          {
            name: "categories",
            type: "relationship",
            relationTo: "service-categories",
            hasMany: true,
            required: true,
          },
        ],
      },
      {
        name: "promo",
        label: "Photo box on the right",
        type: "group",
        fields: [text("eyebrow"), text("title"), text("text"), text("actionLabel"), imageField("image")],
      },
      linkField("allServices", '"Explore all services" link'),
      linkField("phone", "Phone link at the bottom"),
    ]),
    tab(
      "detail",
      "Every service page",
      [
        {
          name: "heroForm",
          label: "Form at the top",
          type: "group",
          fields: [text("subtitle"), text("submitLabel")],
        },
        text("overviewBadgeSubtitle", "Second line on the white photo badge"),
        {
          name: "process",
          label: '"How we deliver" section',
          type: "group",
          fields: [text("headingLead", "Heading start", 'The service name is added after it, e.g. "How we deliver " + "Power BI".'), steps()],
        },
        {
          name: "tech",
          label: '"Why choose Techvation" section',
          type: "group",
          fields: [text("title", "Title above the tools"), iconCards("reasons")],
        },
      ],
      "Text that is the same on all 12 service pages. Each service's own text is under Services → Services.",
    ),
  ],
  "The services and practice areas themselves are under Services.",
  "/services",
);

/* -------------------------------- Solutions ------------------------------ */

export const SolutionsPage = pageGlobal(
  "solutions-page",
  "Solutions page",
  [
    tab("hero", "Top section", [text("eyebrow"), headingField(), textarea("description")]),
    tab("launch", "Countdown", [
      {
        name: "launchDate",
        type: "date",
        required: true,
        label: "Launch date and time",
        admin: { date: { pickerAppearance: "dayAndTime" }, description: "The countdown on the page counts down to this moment." },
      },
    ]),
    tab("notify", '"Notify me" form', [
      text("placeholder"),
      text("submitLabel"),
      text("note"),
      text("successTitle"),
      text("successText"),
    ]),
    tab("sneakPeek", "Sneak peek", [text("title"), text("badge"), linkField("primaryAction", "Button")]),
  ],
  "The suite cards are under Company info → Solution suites.",
  "/solutions",
);
