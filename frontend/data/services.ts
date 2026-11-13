/*
 * ---------------------------------------------------------------------------
 * SERVICES CONTENT
 * ---------------------------------------------------------------------------
 * Everything the services part of the site says:
 *
 *   - the five practice areas ("categories") and which services they hold
 *   - the services mega menu in the navbar      (Figma "00 · Overlay · Services Mega Menu")
 *   - the Services page at /services            (Figma "02 · Services")
 *   - one detail page per service at /services/<slug>
 *                                               (Figma "03 · Service · ...")
 *
 * Like homepage.ts, this file decides WHAT is said; the components decide
 * HOW it looks. Adding a service = adding one object to `serviceDetails`
 * and its slug to a category. Its page, menu entry and card appear by
 * themselves.
 *
 * NOTE ON SOURCES: everything below the hero of each service page is copied
 * from its Figma frame. Two kinds of text were not in the export and were
 * written to match it; please check them against the design:
 *   - the hero heading, paragraph and form title of every service except
 *     MS Dynamics 365
 *   - the answers to FAQ questions 2-4 (Figma only shows question 1 open)
 */

import type { GlyphName } from "@/components/Icon/Glyph";
import type { HighlightedHeading } from "./homepage";

const image = (path: string) => `/assets/images/${path}`;

/* ------------------------------- Categories ------------------------------ */

export type ServiceCategory = {
  id: string;
  /** Used as the #anchor of the group on the Services page. */
  anchor: string;
  name: string;
  icon: GlyphName;
  /** One line under the group title on the Services page. */
  description: string;
  /** Text of the link next to it, which opens the consultation pop-up. */
  expertLabel: string;
  /** Slugs of the services in this group, in display order. */
  services: string[];
  /** Optional dark card that fills the last column of the group. */
  promo?: { title: string; text: string };
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "microsoft",
    anchor: "microsoft-solutions",
    name: "Microsoft Solutions",
    icon: "layers",
    description: "Dynamics 365 and the Power Platform, implemented by certified consultants.",
    expertLabel: "Talk to a Microsoft expert",
    services: ["ms-dynamics-365", "power-bi"],
    promo: {
      title: "Need a full Microsoft roadmap?",
      text: "Licensing, implementation and BI planned in one free session.",
    },
  },
  {
    id: "erp",
    anchor: "enterprise-erp",
    name: "Enterprise ERP",
    icon: "database",
    description: "ERP rollouts and extensions that teams actually adopt.",
    expertLabel: "Talk to an ERP expert",
    services: ["erp-implementation", "erp-customization", "odoo-erp"],
  },
  {
    id: "development",
    anchor: "development",
    name: "Development",
    icon: "code",
    description: "Web, mobile and custom software engineered to scale.",
    expertLabel: "Talk to a development expert",
    services: ["web-development", "mobile-app-development", "custom-software-development"],
  },
  {
    id: "ai",
    anchor: "ai-machine-learning",
    name: "AI & Machine Learning",
    icon: "bot",
    description: "Agents and models that automate work and drive growth.",
    expertLabel: "Talk to an AI expert",
    services: ["agentic-ai-development", "ai-driven-marketing"],
    promo: {
      title: "Exploring AI for your business?",
      text: "Get a free AI readiness assessment and a use-case shortlist.",
    },
  },
  {
    id: "managed",
    anchor: "managed-services",
    name: "Managed Services",
    icon: "headset",
    description: "Support and talent that keep you moving after launch.",
    expertLabel: "Talk to a managed services expert",
    services: ["maintenance-support", "staff-augmentation"],
    promo: {
      title: "Need help after go-live?",
      text: "Compare support plans and response times with our team.",
    },
  },
];

/* ------------------------------- Mega menu ------------------------------- */

export const megaMenu = {
  /** Which categories go in each of the three columns. */
  columns: [["microsoft", "erp"], ["development"], ["ai", "managed"]],
  promo: {
    eyebrow: "Free consultation",
    title: "Not sure where to start?",
    text: "Talk to a solution architect, free, no obligation.",
    actionLabel: "Book a Call",
    image: image("service-page/office.jpg"),
  },
  allServices: { label: "Explore all 12 services", href: "/services" },
  phone: { label: "Prefer to talk? +1 (307) 855-0572", href: "tel:+13078550572" },
};

/* ------------------------------ Services page ---------------------------- */

export const servicesPage = {
  hero: {
    breadcrumb: "Services",
    eyebrow: "12 services · 5 practice areas",
    heading: {
      lead: "Technology services that power ",
      highlight: "your next stage of growth",
    } as HighlightedHeading,
    description:
      "From Microsoft Dynamics 365 and ERP to custom apps and agentic AI. One accountable team, from strategy to long-term support.",
    finder: {
      title: "What do you need help with?",
      subtitle: "Jump to a practice area",
    },
  },
  /** The first tab of the sticky category bar. */
  allTab: "All services",
  /** "2 services", "3 services". */
  countSuffix: "services",
  engagement: {
    eyebrow: "Engagement models",
    heading: { lead: "Flexible ways to ", highlight: "work with us" } as HighlightedHeading,
    description:
      "Pick the model that fits your budget, timeline and level of control. You can switch as your project evolves.",
    bestForLabel: "Best for:",
    popularLabel: "Most popular",
    models: [
      {
        icon: "file-text" as GlyphName,
        title: "Fixed-price project",
        text: "Clear scope, fixed budget and milestones.",
        points: ["Detailed scope & SOW", "Milestone payments", "Guaranteed delivery dates"],
        bestFor: "Well-defined projects",
      },
      {
        icon: "users" as GlyphName,
        title: "Dedicated team",
        text: "A full team working only on your product.",
        points: ["Scale up or down monthly", "Your tools & time zone", "Full transparency"],
        bestFor: "Long-term products",
        popular: true,
      },
      {
        icon: "clock" as GlyphName,
        title: "Time & materials",
        text: "Pay for actual hours, maximum flexibility.",
        points: ["Weekly timesheets", "Change scope anytime", "Ideal for R&D and MVPs"],
        bestFor: "Evolving requirements",
      },
    ],
  },
};

/* --------------------------- Service detail pages ------------------------ */

/** Text that is the same on every service page. */
export const serviceDetailPage = {
  breadcrumb: { home: "Home", services: "Services" },
  heroForm: {
    subtitle: "Free 30-min session · reply within 24h",
    fields: {
      name: { label: "Full name", placeholder: "John Smith" },
      email: { label: "Work email", placeholder: "john@company.com" },
      phone: { label: "Phone / WhatsApp", placeholder: "+1 (555) 000-0000" },
    },
    submitLabel: "Request Free Consultation",
  },
  heroPrimaryLabel: "Get Free Consultation",
  overview: {
    eyebrow: "Overview",
    primaryLabel: "Book a Free Consultation",
    // TODO: point this at the real brochure PDF once it exists.
    brochure: { label: "Download Brochure", href: "/contact" },
  },
  capabilities: {
    eyebrow: "What we deliver",
    actionLabel: "Discuss this",
    /** Phones show this many cards, then a button that reveals the rest. */
    compactCount: 4,
    /** "View all 6 capabilities" */
    showAllLabel: (count: number) => `View all ${count} capabilities`,
    showLessLabel: "Show fewer",
  },
  process: {
    eyebrow: "Our process",
    headingLead: "How we deliver ",
    actionLabel: "Start Your Project",
    steps: [
      { title: "Discover", text: "Free consultation, goals and process audit." },
      { title: "Design", text: "Solution blueprint, scope and fixed plan." },
      { title: "Build", text: "Agile sprints with weekly demos and QA." },
      { title: "Launch & Support", text: "Go-live, training and continuous support." },
    ],
  },
  tech: {
    eyebrow: "Technologies",
    title: "Platforms & tools we work with",
    whyTitle: (service: string) => `Why choose Techvation for ${service}?`,
    reasons: [
      {
        icon: "award" as GlyphName,
        title: "Proven expertise",
        text: "Certified specialists with 6+ years of enterprise delivery.",
      },
      {
        icon: "dollar" as GlyphName,
        title: "Transparent pricing",
        text: "Fixed, itemised proposals, no hidden costs.",
      },
      {
        icon: "headset" as GlyphName,
        title: "Long-term partnership",
        text: "SLA-backed support long after go-live.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    headingHighlight: "asked questions",
    /** Short heading used on phones. */
    compactTitle: "FAQs",
    /** Phones show this many questions. */
    compactCount: 3,
    allFaqs: { label: "See all FAQs", href: "/faqs" },
  },
  related: {
    title: "Related services",
    actionLabel: "Explore",
  },
  overviewBadgeSubtitle: "Dedicated PM · weekly demos",
};

export type ServiceDetail = {
  slug: string;
  /** Full name, e.g. "MS Dynamics 365". */
  title: string;
  categoryId: string;
  icon: GlyphName;
  /** Photo used on cards and in related services. */
  image: string;
  /** One line in the mega menu. */
  menuDescription: string;
  /** One line on the Services page card. */
  cardDescription: string;
  hero: {
    heading: HighlightedHeading;
    description: string;
    formTitle: string;
  };
  outcomes: Array<{ value: string; label: string }>;
  overview: {
    heading: HighlightedHeading;
    description: string;
    points: string[];
    /** Title of the small white card on the photo. */
    badge: string;
  };
  capabilities: {
    heading: HighlightedHeading;
    items: Array<{ icon: GlyphName; title: string; text: string }>;
  };
  tools: string[];
  faqs: Array<{ question: string; answer: string }>;
  /** Slugs of the three "Related services" cards. */
  related: string[];
};

export const serviceDetails: ServiceDetail[] = [
  /* ------------------------------ MS Dynamics 365 ------------------------------ */
  {
    slug: "ms-dynamics-365",
    title: "MS Dynamics 365",
    categoryId: "microsoft",
    icon: "layers",
    image: image("services/ms-dynamics-365.png"),
    menuDescription: "Unified CRM & ERP for sales, service and finance.",
    cardDescription: "Unified CRM & ERP for sales, service, field ops and finance.",
    hero: {
      heading: { lead: "Microsoft Dynamics 365 that runs ", highlight: "your whole business" },
      description:
        "Unify sales, customer service, field service and finance on one intelligent Microsoft platform, implemented, integrated and supported by certified consultants.",
      formTitle: "Get a free Dynamics 365 consultation",
    },
    outcomes: [
      { value: "40%", label: "faster sales cycles" },
      { value: "360°", label: "customer view across teams" },
      { value: "10–14 wks", label: "typical go-live" },
    ],
    overview: {
      heading: { lead: "One connected platform for customers, ", highlight: "operations and finance" },
      description:
        "We plan, configure and roll out Dynamics 365 around your processes, not the other way round. From licensing advice to data migration, Power Platform extensions and user training, one team owns the outcome.",
      points: [
        "Licensing & solution advisory",
        "Data migration from legacy CRM/ERP",
        "Power Platform & Copilot extensions",
        "Training & adoption programs",
      ],
      badge: "Certified Dynamics 365 team",
    },
    capabilities: {
      heading: { lead: "Dynamics 365 services ", highlight: "we deliver" },
      items: [
        { icon: "trending-up", title: "Sales", text: "Pipeline, forecasting and sales automation with Copilot insights." },
        { icon: "headset", title: "Customer Service", text: "Omnichannel case management, SLAs and knowledge base." },
        { icon: "truck", title: "Field Service", text: "Scheduling, work orders and mobile technician apps." },
        { icon: "dollar", title: "Finance & Operations", text: "GL, AP/AR, procurement, inventory and multi-entity reporting." },
        { icon: "zap", title: "Power Platform", text: "Power Apps, Automate and BI dashboards on top of your data." },
        { icon: "sliders", title: "Integrations", text: "Connect D365 with ERP, eCommerce, payment gateways and APIs." },
      ],
    },
    tools: [
      "Dynamics 365 Sales",
      "Customer Service",
      "Field Service",
      "Business Central",
      "Finance & Ops",
      "Power Apps",
      "Power Automate",
      "Power BI",
      "Azure",
      "Copilot",
    ],
    faqs: [
      {
        question: "How long does a Dynamics 365 implementation take?",
        answer:
          "Most mid-size rollouts go live in 10–14 weeks. We start with a free discovery session and give you a fixed plan with milestones before any work begins.",
      },
      {
        question: "Can you migrate data from our current CRM or ERP?",
        answer:
          "Yes. We migrate accounts, contacts, open opportunities, cases and financial history from Salesforce, HubSpot, legacy Dynamics, Excel and most ERPs, and validate every record with your team before go-live.",
      },
      {
        question: "Do you provide training and post-go-live support?",
        answer:
          "Every rollout includes role-based training and a hyper-care period. After that, you can choose an SLA-backed support plan for fixes, updates and new features.",
      },
      {
        question: "Which Dynamics 365 apps are right for us?",
        answer:
          "It depends on your teams and processes. In the free consultation we map your needs to the right apps and licences, so you only pay for what you will actually use.",
      },
    ],
    related: ["erp-implementation", "erp-customization", "odoo-erp"],
  },

  /* ---------------------------- ERP Implementation ---------------------------- */
  {
    slug: "erp-implementation",
    title: "ERP Implementation",
    categoryId: "erp",
    icon: "database",
    image: image("services/erp-implementation.png"),
    menuDescription: "End-to-end rollout, migration and training.",
    cardDescription: "Process mapping, migration, go-live and training.",
    hero: {
      heading: { lead: "ERP implementation that ", highlight: "goes live on time" },
      description:
        "From process mapping and data migration to go-live and training, we roll out the right ERP for your business with a fixed plan and one accountable team.",
      formTitle: "Get a free ERP implementation consultation",
    },
    outcomes: [
      { value: "30%", label: "lower operating costs" },
      { value: "1 source", label: "of truth for every team" },
      { value: "100%", label: "data migrated & validated" },
    ],
    overview: {
      heading: { lead: "A structured rollout that ", highlight: "de-risks every phase" },
      description:
        "Our implementation framework covers business analysis, configuration, integrations, testing and change management. You get a dedicated project manager, weekly demos and full visibility from kickoff to hyper-care.",
      points: [
        "Business process mapping",
        "Vendor-neutral platform selection",
        "Phased or big-bang rollout plans",
        "Hyper-care after go-live",
      ],
      badge: "Certified ERP team",
    },
    capabilities: {
      heading: { lead: "Everything you need for a ", highlight: "successful ERP launch" },
      items: [
        { icon: "search", title: "Discovery & Fit-Gap", text: "Map current processes and define requirements." },
        { icon: "layers", title: "Configuration", text: "Set up finance, inventory, sales, purchasing and HR." },
        { icon: "database", title: "Data Migration", text: "Cleanse, map and migrate master and transactional data." },
        { icon: "sliders", title: "Integrations", text: "Connect eCommerce, CRM, banks and 3rd-party tools." },
        { icon: "check", title: "Testing & UAT", text: "Scripted tests and user acceptance sign-off." },
        { icon: "users", title: "Training & Change", text: "Role-based training and adoption support." },
      ],
    },
    tools: [
      "Dynamics 365 BC",
      "Dynamics 365 F&O",
      "Odoo",
      "SAP Business One",
      "Power BI",
      "Azure",
      "SQL Server",
      "REST APIs",
    ],
    faqs: [
      {
        question: "How much does an ERP implementation cost?",
        answer:
          "Cost depends on modules, users, integrations and data volume. After a free discovery call we provide a fixed, itemised proposal so there are no surprises.",
      },
      {
        question: "Which ERP platform should we choose?",
        answer:
          "We are vendor-neutral. We compare Dynamics 365, Odoo and SAP Business One against your processes, budget and growth plans, then recommend the best fit.",
      },
      {
        question: "How do you minimise disruption during go-live?",
        answer:
          "We test every process with your users first, run old and new systems side by side where needed, and schedule cut-over for a quiet period, with our team on hand throughout.",
      },
      {
        question: "Do you offer support after implementation?",
        answer:
          "Yes. Every project ends with a hyper-care period, followed by optional SLA-backed support for fixes, updates and improvements.",
      },
    ],
    related: ["erp-customization", "odoo-erp", "power-bi"],
  },

  /* ---------------------------- ERP Customization ----------------------------- */
  {
    slug: "erp-customization",
    title: "ERP Customization",
    categoryId: "erp",
    icon: "wrench",
    image: image("services/erp-customization.png"),
    menuDescription: "Custom modules, workflows and reports.",
    cardDescription: "Custom modules, workflows and reports for your operations.",
    hero: {
      heading: { lead: "ERP customization that ", highlight: "fits how you work" },
      description:
        "Custom modules, workflows, reports and integrations on Dynamics 365, Odoo and more, built cleanly so your upgrades stay safe.",
      formTitle: "Get a free ERP customization consultation",
    },
    outcomes: [
      { value: "60%", label: "less manual data entry" },
      { value: "2× faster", label: "approvals & workflows" },
      { value: "Upgrade-safe", label: "extensions" },
    ],
    overview: {
      heading: { lead: "Extend your ERP without ", highlight: "breaking future upgrades" },
      description:
        "We build clean, documented extensions on Dynamics 365, Odoo and other ERPs, so you get exactly the functionality you need while staying on the supported upgrade path.",
      points: [
        "Custom modules & fields",
        "Automated workflows & approvals",
        "Custom reports & dashboards",
        "API & third-party integrations",
      ],
      badge: "Certified ERP customization team",
    },
    capabilities: {
      heading: { lead: "Customization ", highlight: "services" },
      items: [
        { icon: "layers", title: "Custom Modules", text: "New functionality for unique business processes." },
        { icon: "zap", title: "Workflow Automation", text: "Approvals, notifications and rule-based automation." },
        { icon: "bar-chart", title: "Reports & BI", text: "Operational reports and executive dashboards." },
        { icon: "sliders", title: "Integrations", text: "APIs and connectors to eCommerce, CRM and banks." },
        { icon: "monitor", title: "UI/UX Improvements", text: "Simplified screens that speed up daily tasks." },
        { icon: "shield", title: "Upgrade & QA", text: "Regression tests so upgrades stay smooth." },
      ],
    },
    tools: ["AL / C/AL", "X++", "Python (Odoo)", "Power Automate", "Power BI", "Azure Functions", "REST / OData", "SQL"],
    faqs: [
      {
        question: "Will customizations break when we upgrade our ERP?",
        answer:
          "No. We follow each platform’s extension model and keep custom code isolated, documented and covered by regression tests, so upgrades stay safe.",
      },
      {
        question: "Can you customize an ERP another partner implemented?",
        answer:
          "Yes. We start with a short technical review of your current setup and code, then plan changes that work with what is already there.",
      },
      {
        question: "How do you estimate customization work?",
        answer:
          "We break each request into clear user stories and estimate them one by one. You get a fixed quote per change, or a monthly hour bank for ongoing work.",
      },
      {
        question: "Do you document the changes you make?",
        answer:
          "Always. Every extension comes with functional and technical documentation, and the source code lives in your own repository.",
      },
    ],
    related: ["odoo-erp", "power-bi", "web-development"],
  },

  /* --------------------------------- Odoo ERP --------------------------------- */
  {
    slug: "odoo-erp",
    title: "Odoo ERP",
    categoryId: "erp",
    icon: "sliders",
    image: image("services/odoo-erp.png"),
    menuDescription: "Open-source ERP configured around you.",
    cardDescription: "Open-source ERP configured around how you work.",
    hero: {
      heading: { lead: "Odoo ERP, ", highlight: "configured around you" },
      description:
        "Implementation, custom apps, migration and support for Odoo Community and Enterprise, delivered by certified Odoo consultants.",
      formTitle: "Get a free Odoo consultation",
    },
    outcomes: [
      { value: "50%", label: "lower licence cost vs. legacy ERP" },
      { value: "30+", label: "apps in one platform" },
      { value: "6–10 wks", label: "typical go-live" },
    ],
    overview: {
      heading: { lead: "Flexible ERP that ", highlight: "grows with your business" },
      description:
        "Whether you are moving from spreadsheets or a legacy ERP, we configure Odoo modules, migrate your data, build custom apps and train your team, then stay on for support and upgrades.",
      points: [
        "Odoo Community & Enterprise",
        "Module configuration",
        "Version migration & upgrades",
        "Custom Odoo apps",
      ],
      badge: "Certified Odoo team",
    },
    capabilities: {
      heading: { lead: "Odoo ", highlight: "services" },
      items: [
        { icon: "layers", title: "Implementation", text: "End-to-end setup of the Odoo apps you need." },
        { icon: "code", title: "Custom Development", text: "Bespoke modules, reports and portals in Python." },
        { icon: "database", title: "Migration", text: "Move from legacy systems or older Odoo versions." },
        { icon: "sliders", title: "Integrations", text: "eCommerce, payment, shipping and marketplace connectors." },
        { icon: "cart", title: "Odoo eCommerce", text: "Online store connected to inventory and accounting." },
        { icon: "headset", title: "Support & AMC", text: "Ongoing support, upgrades and performance tuning." },
      ],
    },
    tools: [
      "Sales & CRM",
      "Inventory",
      "Manufacturing (MRP)",
      "Accounting",
      "HR & Payroll",
      "eCommerce",
      "POS",
      "Python",
      "PostgreSQL",
    ],
    faqs: [
      {
        question: "Odoo Community or Enterprise, which is right for us?",
        answer:
          "Community is free and great for simpler needs; Enterprise adds advanced apps, hosting and official support. We recommend the right edition after reviewing your requirements.",
      },
      {
        question: "Can you migrate us to the latest Odoo version?",
        answer:
          "Yes. We upgrade the database and port your custom modules to the new version, then test everything with your team before switching over.",
      },
      {
        question: "Can Odoo handle multi-company and multi-currency?",
        answer:
          "Yes. Odoo supports multiple companies, currencies and tax setups in one database, with consolidated reporting across them.",
      },
      {
        question: "Do you provide Odoo hosting?",
        answer:
          "We can set up and manage hosting on Odoo.sh, Odoo Online or your own cloud, including backups, monitoring and updates.",
      },
    ],
    related: ["power-bi", "web-development", "mobile-app-development"],
  },

  /* --------------------------------- Power BI --------------------------------- */
  {
    slug: "power-bi",
    title: "Power BI",
    categoryId: "microsoft",
    icon: "bar-chart",
    image: image("services/power-bi.png"),
    menuDescription: "Real-time dashboards and data models.",
    cardDescription: "Real-time dashboards that turn data into decisions.",
    hero: {
      heading: { lead: "Power BI dashboards that ", highlight: "drive better decisions" },
      description:
        "Bring your ERP, CRM and finance data together in real-time dashboards your teams trust: modelled, secured and refreshed automatically.",
      formTitle: "Get a free Power BI consultation",
    },
    outcomes: [
      { value: "Real-time", label: "KPIs on every device" },
      { value: "80%", label: "less time building reports" },
      { value: "1 view", label: "across all your systems" },
    ],
    overview: {
      heading: { lead: "From scattered spreadsheets to ", highlight: "a single source of truth" },
      description:
        "We connect your ERP, CRM, finance and marketing data, model it properly and design intuitive dashboards, then set up governance and refresh so your numbers are always right.",
      points: [
        "Data source integration",
        "Star-schema data modeling",
        "DAX optimization",
        "Row-level security & governance",
      ],
      badge: "Certified Power BI team",
    },
    capabilities: {
      heading: { lead: "Power BI ", highlight: "services" },
      items: [
        { icon: "bar-chart", title: "Dashboard Design", text: "Executive and operational dashboards with clear storytelling." },
        { icon: "database", title: "Data Modeling", text: "Optimised models that keep reports fast at scale." },
        { icon: "zap", title: "DAX Optimization", text: "Measures and calculations that perform." },
        { icon: "cloud", title: "Data Pipelines", text: "Dataflows, Azure and SQL pipelines with scheduled refresh." },
        { icon: "shield", title: "Governance", text: "Workspaces, RLS and deployment pipelines." },
        { icon: "users", title: "Training", text: "Self-service BI training for your teams." },
      ],
    },
    tools: ["Power BI", "Power Query", "DAX", "Azure Synapse", "Microsoft Fabric", "SQL Server", "Excel", "Dataverse"],
    faqs: [
      {
        question: "Can Power BI connect to our ERP and CRM?",
        answer:
          "Yes, Power BI connects to Dynamics 365, Odoo, SQL databases, Excel, Salesforce and hundreds of other sources, including on-premise data via gateways.",
      },
      {
        question: "Do we need Power BI Pro or Premium licences?",
        answer:
          "Most teams start with Pro. Premium or Fabric capacity makes sense for large data volumes or many view-only users. We size licences during the consultation.",
      },
      {
        question: "How long does a dashboard project take?",
        answer:
          "A first set of dashboards usually takes 3–6 weeks, depending on the number of data sources and how clean the data is.",
      },
      {
        question: "Can you fix slow existing reports?",
        answer:
          "Yes. We review the data model, DAX and refresh setup, then optimise them. Most slow reports become several times faster.",
      },
    ],
    related: ["web-development", "mobile-app-development", "agentic-ai-development"],
  },

  /* ------------------------------ Web Development ----------------------------- */
  {
    slug: "web-development",
    title: "Web Development",
    categoryId: "development",
    icon: "code",
    image: image("services/web-development.png"),
    menuDescription: "Fast, secure React & Next.js web apps.",
    cardDescription: "Fast, secure React & Next.js web apps built to scale.",
    hero: {
      heading: { lead: "Web development that is ", highlight: "fast, secure and scalable" },
      description:
        "Marketing sites, web apps and SaaS platforms built with React, Next.js and Node.js, shipped in agile sprints with weekly demos.",
      formTitle: "Get a free web development consultation",
    },
    outcomes: [
      { value: "<1.5s", label: "average page load" },
      { value: "99.9%", label: "uptime on cloud hosting" },
      { value: "SEO-ready", label: "from day one" },
    ],
    overview: {
      heading: { lead: "From marketing sites to ", highlight: "complex web applications" },
      description:
        "Our product team handles UX, UI, front-end, back-end and DevOps. We ship in agile sprints with weekly demos, automated tests and CI/CD, so you see progress every week.",
      points: [
        "UX research & UI design",
        "React / Next.js front-ends",
        "Node.js & API back-ends",
        "Cloud hosting & CI/CD",
      ],
      badge: "Certified web team",
    },
    capabilities: {
      heading: { lead: "Web development ", highlight: "services" },
      items: [
        { icon: "monitor", title: "Corporate Websites", text: "High-performance, SEO-friendly marketing sites." },
        { icon: "layers", title: "Web Applications", text: "Dashboards, portals and internal tools." },
        { icon: "cloud", title: "SaaS Products", text: "Multi-tenant platforms built for scale." },
        { icon: "cart", title: "eCommerce", text: "Headless and Shopify/WooCommerce stores." },
        { icon: "sliders", title: "API Development", text: "Secure REST and GraphQL APIs." },
        { icon: "wrench", title: "Maintenance", text: "Updates, monitoring and performance tuning." },
      ],
    },
    tools: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "AWS", "Azure", "Vercel"],
    faqs: [
      {
        question: "How long does it take to build a website?",
        answer:
          "A marketing website usually takes 4–8 weeks; web applications typically 8–16 weeks depending on scope. You get a detailed timeline after the free consultation.",
      },
      {
        question: "Will my website be mobile-friendly and SEO-optimised?",
        answer:
          "Yes. Every site is designed for phones first, scores well on Core Web Vitals and ships with clean markup, metadata and sitemaps.",
      },
      {
        question: "Can you redesign our existing website?",
        answer:
          "Yes. We keep what works, redesign what doesn’t and migrate your content and URLs carefully, so you keep your search rankings.",
      },
      {
        question: "Do you provide hosting and maintenance?",
        answer:
          "We can host on AWS, Azure or Vercel and look after updates, backups, security patches and monitoring under a monthly plan.",
      },
    ],
    related: ["mobile-app-development", "agentic-ai-development", "ai-driven-marketing"],
  },

  /* -------------------------- Mobile App Development -------------------------- */
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    categoryId: "development",
    icon: "smartphone",
    image: image("services/mobile-app-development.png"),
    menuDescription: "Cross-platform iOS & Android apps.",
    cardDescription: "Cross-platform iOS & Android apps people love.",
    hero: {
      heading: { lead: "Mobile apps your ", highlight: "customers will love" },
      description:
        "Cross-platform iOS and Android apps, from product discovery and UX to store launch and continuous releases.",
      formTitle: "Get a free mobile app consultation",
    },
    outcomes: [
      { value: "2 platforms", label: "from one codebase" },
      { value: "4.8★", label: "target store rating" },
      { value: "30–40%", label: "faster time-to-market" },
    ],
    overview: {
      heading: { lead: "Design, build and launch, ", highlight: "with one accountable team" },
      description:
        "We validate your idea, design delightful UX, build with cross-platform frameworks and handle store submission, analytics and continuous releases after launch.",
      points: [
        "Product discovery & prototyping",
        "iOS & Android development",
        "Backend, APIs & integrations",
        "Store launch & ongoing releases",
      ],
      badge: "Certified mobile app team",
    },
    capabilities: {
      heading: { lead: "Mobile app ", highlight: "services" },
      items: [
        { icon: "smartphone", title: "Cross-platform Apps", text: "React Native & Flutter apps for iOS and Android." },
        { icon: "layers", title: "UI/UX Design", text: "Intuitive flows, prototypes and design systems." },
        { icon: "cloud", title: "Backend & APIs", text: "Secure cloud backends, auth and push notifications." },
        { icon: "cart", title: "mCommerce", text: "Shopping apps connected to your store and ERP." },
        { icon: "shield", title: "Security & QA", text: "Automated testing and secure data handling." },
        { icon: "trending-up", title: "Growth & Analytics", text: "Analytics, A/B tests and release management." },
      ],
    },
    tools: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js", "AWS Amplify", "App Store", "Google Play"],
    faqs: [
      {
        question: "Should we build native or cross-platform?",
        answer:
          "For most businesses cross-platform (React Native or Flutter) delivers near-native performance at lower cost. We recommend native only when an app needs deep device-level features.",
      },
      {
        question: "How much does a mobile app cost?",
        answer:
          "It depends on features, integrations and design. A focused first version usually takes 10–16 weeks; you get a fixed, itemised quote after the free consultation.",
      },
      {
        question: "Do you help publish to the App Store and Google Play?",
        answer:
          "Yes. We prepare store listings, screenshots and privacy details, handle the review process and manage every release after launch.",
      },
      {
        question: "Can the app integrate with our ERP or CRM?",
        answer:
          "Yes. We connect apps to Dynamics 365, Odoo, Salesforce and custom systems through secure APIs, so data stays in sync.",
      },
    ],
    related: ["agentic-ai-development", "ai-driven-marketing", "custom-software-development"],
  },

  /* -------------------------- Agentic AI Development -------------------------- */
  {
    slug: "agentic-ai-development",
    title: "Agentic AI Development",
    categoryId: "ai",
    icon: "bot",
    image: image("services/agentic-ai-development.png"),
    menuDescription: "Autonomous agents grounded in your data.",
    cardDescription: "Autonomous agents that act across your tools.",
    hero: {
      heading: { lead: "Agentic AI that ", highlight: "gets real work done" },
      description:
        "Autonomous agents grounded in your data that plan, use your tools and act, with guardrails and human approval where it matters.",
      formTitle: "Get a free agentic AI consultation",
    },
    outcomes: [
      { value: "70%", label: "of repetitive tasks automated" },
      { value: "24/7", label: "always-on digital workers" },
      { value: "Weeks", label: "not months, to first agent" },
    ],
    overview: {
      heading: { lead: "From AI pilots to ", highlight: "production-grade agents" },
      description:
        "We design multi-agent systems with retrieval-augmented generation (RAG), tool integrations and human-in-the-loop controls, then deploy them securely with monitoring and guardrails.",
      points: [
        "Use-case discovery & ROI",
        "RAG over your documents & data",
        "Tool & API integrations",
        "Guardrails, evals & monitoring",
      ],
      badge: "Certified AI team",
    },
    capabilities: {
      heading: { lead: "Agentic AI ", highlight: "services" },
      items: [
        { icon: "bot", title: "AI Agents", text: "Task-specific agents for sales, support, finance and ops." },
        { icon: "users", title: "Multi-Agent Systems", text: "Agents that collaborate on complex workflows." },
        { icon: "database", title: "RAG Pipelines", text: "Answers grounded in your knowledge base." },
        { icon: "sliders", title: "Tool Integration", text: "Agents that act in your CRM, ERP and apps." },
        { icon: "shield", title: "Safety & Guardrails", text: "Permissions, evaluations and audit trails." },
        { icon: "rocket", title: "Production Deployment", text: "Scalable, monitored deployment on your cloud." },
      ],
    },
    tools: ["OpenAI", "Anthropic Claude", "Azure OpenAI", "LangChain", "LlamaIndex", "Vector databases", "Python", "Copilot Studio"],
    faqs: [
      {
        question: "What is agentic AI?",
        answer:
          "Agentic AI goes beyond chatbots: agents plan multi-step tasks, use tools and APIs, and take actions toward a goal, with human approval where it matters.",
      },
      {
        question: "Is our data safe with AI agents?",
        answer:
          "Yes. Agents run in your own cloud tenant with role-based permissions, your data is not used to train public models, and every action is logged for audit.",
      },
      {
        question: "Which processes are best to automate first?",
        answer:
          "High-volume, rule-heavy tasks with clear inputs, such as invoice processing, support triage or lead qualification. We shortlist them by ROI in the discovery phase.",
      },
      {
        question: "Can agents work inside Dynamics 365 or Odoo?",
        answer:
          "Yes. Agents can read and update records through the platforms’ APIs, so they create quotes, update cases or post entries right inside your ERP or CRM.",
      },
    ],
    related: ["ai-driven-marketing", "custom-software-development", "maintenance-support"],
  },

  /* ---------------------------- AI Driven Marketing --------------------------- */
  {
    slug: "ai-driven-marketing",
    title: "AI Driven Marketing",
    categoryId: "ai",
    icon: "megaphone",
    image: image("services/ai-driven-marketing.png"),
    menuDescription: "Predictive, personalised campaigns.",
    cardDescription: "Predictive, personalised campaigns powered by data.",
    hero: {
      heading: { lead: "AI-driven marketing that ", highlight: "grows revenue" },
      description:
        "Predictive models, personalised campaigns and automated journeys that turn your customer data into measurable growth.",
      formTitle: "Get a free AI marketing consultation",
    },
    outcomes: [
      { value: "3×", label: "higher campaign ROI" },
      { value: "45%", label: "lower cost per lead" },
      { value: "1:1", label: "personalisation at scale" },
    ],
    overview: {
      heading: { lead: "Data-driven growth, ", highlight: "powered by AI" },
      description:
        "We unify your customer data, build predictive models and automate personalised campaigns across email, ads and social, with clear reporting on what drives revenue.",
      points: [
        "Customer data unification",
        "Predictive lead & churn scoring",
        "AI content generation",
        "Campaign automation & reporting",
      ],
      badge: "Certified AI marketing team",
    },
    capabilities: {
      heading: { lead: "AI marketing ", highlight: "services" },
      items: [
        { icon: "target", title: "Customer Segmentation", text: "Micro-segments based on behaviour and value." },
        { icon: "trending-up", title: "Predictive Analytics", text: "Lead scoring, churn and lifetime-value models." },
        { icon: "sparkles", title: "Content Generation", text: "On-brand copy and creatives at scale." },
        { icon: "zap", title: "Campaign Optimization", text: "Automated budget and audience optimisation." },
        { icon: "mail", title: "Marketing Automation", text: "Personalised journeys across every channel." },
        { icon: "bar-chart", title: "Attribution & BI", text: "Dashboards that tie spend to revenue." },
      ],
    },
    tools: ["D365 Customer Insights", "HubSpot", "Google Ads", "Meta Ads", "GA4", "Power BI", "OpenAI", "Python"],
    faqs: [
      {
        question: "What results can we expect from AI marketing?",
        answer:
          "Most clients see better lead quality and lower acquisition costs within the first 60–90 days, as models learn from your campaign and customer data.",
      },
      {
        question: "Do we need a lot of data to start?",
        answer:
          "No. A few months of CRM, website and campaign data is usually enough to start. Models get sharper as more data comes in.",
      },
      {
        question: "Which platforms do you work with?",
        answer:
          "Dynamics 365 Customer Insights, HubSpot, Google Ads, Meta Ads and GA4, with Power BI for reporting. We work with the tools you already have.",
      },
      {
        question: "Is AI-generated content on-brand?",
        answer:
          "Yes. We train generation on your brand guidelines and past content, and every piece goes through human review before it is published.",
      },
    ],
    related: ["custom-software-development", "maintenance-support", "staff-augmentation"],
  },

  /* ------------------------ Custom Software Development ----------------------- */
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    categoryId: "development",
    icon: "cpu",
    image: image("services/custom-software-development.png"),
    menuDescription: "Bespoke platforms and integrations.",
    cardDescription: "Bespoke platforms and integrations for unique needs.",
    hero: {
      heading: { lead: "Custom software ", highlight: "built around your business" },
      description:
        "Bespoke platforms, internal tools and integrations engineered for your exact workflows, with full IP ownership.",
      formTitle: "Get a free custom software consultation",
    },
    outcomes: [
      { value: "100%", label: "IP ownership for you" },
      { value: "2-week", label: "agile sprints" },
      { value: "Senior", label: "engineers on every project" },
    ],
    overview: {
      heading: { lead: "Software built ", highlight: "around your workflows" },
      description:
        "When off-the-shelf tools fall short, we design and build software that fits your processes exactly, with clean architecture, automated testing and full documentation.",
      points: [
        "Requirements & architecture",
        "Full-stack development",
        "Automated testing & CI/CD",
        "Documentation & handover",
      ],
      badge: "Certified software team",
    },
    capabilities: {
      heading: { lead: "Custom software ", highlight: "services" },
      items: [
        { icon: "layers", title: "Enterprise Applications", text: "Scalable systems for complex operations." },
        { icon: "monitor", title: "Internal Tools", text: "Portals and dashboards that save hours." },
        { icon: "sliders", title: "System Integration", text: "Connect legacy systems and modern apps." },
        { icon: "cloud", title: "Cloud Migration", text: "Modernise and move workloads to the cloud." },
        { icon: "shield", title: "Security", text: "Secure-by-design architecture and audits." },
        { icon: "wrench", title: "Modernisation", text: "Refactor and re-platform legacy software." },
      ],
    },
    tools: [".NET", "Node.js", "Python", "React", "Azure", "AWS", "Docker", "Kubernetes", "PostgreSQL"],
    faqs: [
      {
        question: "Who owns the code you build?",
        answer:
          "You do. All source code, documentation and IP are transferred to you, and we can set up repositories in your own accounts from day one.",
      },
      {
        question: "Fixed price or time & materials?",
        answer:
          "Both. Well-defined projects suit a fixed price; evolving products suit time & materials or a dedicated team. We recommend a model after the consultation.",
      },
      {
        question: "Can you take over an existing codebase?",
        answer:
          "Yes. We start with a code and architecture review, fix the most urgent issues, then continue development with full documentation.",
      },
      {
        question: "How do you ensure quality?",
        answer:
          "Code reviews on every change, automated tests in CI/CD, a dedicated QA engineer and a demo every sprint, so problems surface early.",
      },
    ],
    related: ["maintenance-support", "staff-augmentation", "ms-dynamics-365"],
  },

  /* --------------------------- Maintenance & Support -------------------------- */
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    categoryId: "managed",
    icon: "headset",
    image: image("services/maintenance-support.png"),
    menuDescription: "SLA-backed monitoring and fixes.",
    cardDescription: "SLA-backed monitoring, fixes and improvements.",
    hero: {
      heading: { lead: "Maintenance and support that ", highlight: "keeps you running" },
      description:
        "SLA-backed monitoring, fixes, upgrades and monthly improvements for your ERP, web and mobile systems.",
      formTitle: "Get a free support plan consultation",
    },
    outcomes: [
      { value: "<2h", label: "response for critical issues" },
      { value: "99.9%", label: "uptime target" },
      { value: "Dedicated", label: "support manager" },
    ],
    overview: {
      heading: { lead: "Peace of mind ", highlight: "after go-live" },
      description:
        "Choose a flexible support plan with guaranteed response times. We monitor, patch and improve your systems continuously so your team can focus on the business.",
      points: [
        "SLA-backed response times",
        "24/7 monitoring & alerts",
        "Updates, patches & upgrades",
        "Monthly health reports",
      ],
      badge: "Certified support team",
    },
    capabilities: {
      heading: { lead: "Support ", highlight: "services" },
      items: [
        { icon: "headset", title: "Help Desk", text: "Ticketing, email and phone support for your users." },
        { icon: "shield", title: "Monitoring", text: "Uptime, performance and security monitoring." },
        { icon: "wrench", title: "Bug Fixes", text: "Fast diagnosis and resolution of issues." },
        { icon: "rocket", title: "Upgrades", text: "Version upgrades with zero data loss." },
        { icon: "zap", title: "Enhancements", text: "Small improvements every month." },
        { icon: "file-text", title: "Reporting", text: "Monthly SLA and system health reports." },
      ],
    },
    tools: ["Dynamics 365", "Odoo", "Power Platform", "Azure", "AWS", "Web & mobile apps", "Jira Service Mgmt", "Datadog"],
    faqs: [
      {
        question: "What support plans do you offer?",
        answer:
          "We offer monthly retainers and hour-bank plans with different response times. A free consultation helps us size the right plan for your systems.",
      },
      {
        question: "Can you support systems built by another vendor?",
        answer:
          "Yes. After a short onboarding review of your systems and documentation, we take over support with the same response times.",
      },
      {
        question: "Do you offer 24/7 support?",
        answer:
          "Yes. Critical-issue cover around the clock is available on our premium plans; standard plans cover business hours in your time zone.",
      },
      {
        question: "How do we raise a support ticket?",
        answer:
          "Through our help-desk portal, by email or by phone. Every ticket is tracked against your SLA, and you see its status in real time.",
      },
    ],
    related: ["staff-augmentation", "ms-dynamics-365", "erp-implementation"],
  },

  /* ---------------------------- Staff Augmentation ---------------------------- */
  {
    slug: "staff-augmentation",
    title: "Staff Augmentation",
    categoryId: "managed",
    icon: "users",
    image: image("services/staff-augmentation.png"),
    menuDescription: "Vetted experts added in days.",
    cardDescription: "Vetted tech experts added to your team in days.",
    hero: {
      heading: { lead: "Vetted tech experts, ", highlight: "added to your team in days" },
      description:
        "ERP consultants, developers, data and AI engineers who join your stand-ups, tools and time zone, on flexible monthly contracts.",
      formTitle: "Get a free staffing consultation",
    },
    outcomes: [
      { value: "72h", label: "to share first profiles" },
      { value: "Top 5%", label: "vetted talent" },
      { value: "Flexible", label: "monthly contracts" },
    ],
    overview: {
      heading: { lead: "The right skills, ", highlight: "exactly when you need them" },
      description:
        "Tell us the skills you need and we share matched profiles within 72 hours. Engineers join your stand-ups, tools and time zone, with no long-term lock-in.",
      points: [
        "Dynamics 365 & Odoo consultants",
        "Full-stack & mobile developers",
        "Data, BI & AI engineers",
        "QA & DevOps specialists",
      ],
      badge: "Certified staffing team",
    },
    capabilities: {
      heading: { lead: "Roles we ", highlight: "can provide" },
      items: [
        { icon: "layers", title: "ERP Consultants", text: "Functional and technical D365 & Odoo experts." },
        { icon: "code", title: "Software Engineers", text: "Front-end, back-end and full-stack developers." },
        { icon: "smartphone", title: "Mobile Developers", text: "React Native, Flutter, iOS and Android." },
        { icon: "bar-chart", title: "Data & BI", text: "Power BI developers and data engineers." },
        { icon: "bot", title: "AI Engineers", text: "LLM, RAG and machine learning specialists." },
        { icon: "check", title: "QA & DevOps", text: "Test automation, CI/CD and cloud ops." },
      ],
    },
    tools: [
      "Dedicated teams",
      "Hourly or monthly",
      "Your time zone",
      "NDA & IP protection",
      "Replacement guarantee",
      "Weekly reporting",
    ],
    faqs: [
      {
        question: "How quickly can a developer start?",
        answer:
          "We typically share matched profiles within 72 hours and onboard selected candidates within 1–2 weeks.",
      },
      {
        question: "What if the engineer is not the right fit?",
        answer:
          "We replace them at no extra cost, usually within a week, and handle the knowledge transfer so your project keeps moving.",
      },
      {
        question: "Do augmented staff work in our time zone?",
        answer:
          "Yes. Engineers align their working hours with your team, join your stand-ups and use your tools and channels.",
      },
      {
        question: "How are contracts and pricing structured?",
        answer:
          "Simple monthly or hourly contracts with no long-term lock-in. You can scale the team up or down with one month’s notice.",
      },
    ],
    related: ["ms-dynamics-365", "erp-implementation", "erp-customization"],
  },
];

/* --------------------------------- Helpers ------------------------------- */

/** The page address of a service, e.g. "/services/power-bi". */
export const serviceHref = (slug: string) => `/services/${slug}`;

/** Finds a service by its slug (undefined if there is none). */
export function getService(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}

/** Finds the category a service belongs to. */
export function getCategory(id: string) {
  return serviceCategories.find((category) => category.id === id);
}

/** The services of one category, in display order. */
export function servicesIn(category: ServiceCategory) {
  return category.services
    .map(getService)
    .filter((service): service is ServiceDetail => Boolean(service));
}
