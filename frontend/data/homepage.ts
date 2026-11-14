/*
 * ---------------------------------------------------------------------------
 * HOMEPAGE CONTENT
 * ---------------------------------------------------------------------------
 * All text, links and image paths for the homepage live in this one file.
 * The components only decide HOW things look; this file decides WHAT they say.
 *
 * Later this content will be loaded from the backend CMS. When that happens,
 * the API should return objects with the same shape as the ones below, and
 * the components will not need to change.
 *
 * Image paths start with "/assets/..." which points to /frontend/public/assets.
 */

/* ----------------------------- Shared types ----------------------------- */

/** A link or button: the text to show and where it goes. */
export type LinkItem = {
  label: string;
  href: string;
};

/**
 * A heading where part of the text is shown in gradient colour.
 * Example: lead "Innovating at the " + highlight "Speed of AI".
 */
export type HighlightedHeading = {
  lead: string;
  highlight: string;
  /** Optional plain text after the highlighted part (e.g. a full stop). */
  tail?: string;
};

/** Shortcut so icon paths stay short and consistent. */
const icon = (name: string) => `/assets/icons/${name}.svg`;
const image = (path: string) => `/assets/images/${path}.png`;

/* ------------------------------ Shared links ----------------------------- */

/** Call-to-action targets that are reused in several sections. */
export const cta = {
  letsTalk: { label: "Let’s Talk", href: "/contact" },
  scheduleCall: { label: "Schedule a Call", href: "#schedule-a-call" },
  freeConsultation: { label: "Free Consultation", href: "#free-consultation" },
} satisfies Record<string, LinkItem>;

/* --------------------------------- Navbar -------------------------------- */

export const navbar = {
  logo: {
    src: "/assets/logos/techvation-logo.png",
    alt: "Techvation",
  },
  links: [
    { label: "Home", href: "/" },
    // Hovering "Services" on desktop opens the services mega menu; clicking
    // it goes to the Services page.
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Solutions", href: "/solutions", badge: "SOON" },
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "FAQs", href: "/faqs" },
    { label: "Blogs", href: "/#insights" },
  ] as Array<LinkItem & { hasDropdown?: boolean; badge?: string }>,
  secondaryAction: cta.letsTalk,
  primaryAction: cta.freeConsultation,
  /** The three stacked buttons in the full-screen mobile menu. */
  menuActions: [cta.freeConsultation, cta.letsTalk, cta.scheduleCall],
};

/* ---------------------------------- Hero --------------------------------- */

export const hero = {
  eyebrow: "Microsoft Dynamics · ERP · AI Solutions",
  /** Shorter label used on phones, where the long one does not fit. */
  eyebrowShort: "Dynamics · ERP · AI",
  heading: {
    lead: "Innovating at the ",
    highlight: "Speed of AI",
  } as HighlightedHeading,
  description:
    "We help companies across North America, the Middle East, Africa and Asia Pacific modernise with Microsoft Dynamics 365, ERP, custom software and agentic AI.",
  /** Shorter paragraph used on phones and tablets. */
  descriptionShort:
    "Microsoft Dynamics 365, ERP, custom software and agentic AI for growing businesses in 4 regions.",
  primaryAction: cta.letsTalk,
  secondaryAction: cta.scheduleCall,
  /** The "Free Consultation" form on the right side of the hero. */
  form: {
    title: "Free Consultation",
    subtitle: "Expert reply within 24 hours",
    /** Shorter subtitle used on phones and tablets. */
    subtitleShort: "Reply within 24 hours",
    fields: {
      name: { label: "Full name", placeholder: "John Smith" },
      email: { label: "Work email", placeholder: "john@company.com" },
      service: { label: "Service", placeholder: "Select a service" },
    },
    submitLabel: "Get Free Consultation",
    note: "100% confidential · No commitment",
  },
};

/* ------------------------------ Trusted logos ---------------------------- */

export const trustedLogos = {
  /** Shown on two lines, exactly as in the design. */
  titleLines: ["Trusted by growing", "businesses worldwide"],
  /** The same title on one line, used on phones and tablets. */
  title: "Trusted by growing businesses worldwide",
  logos: [
    { name: "Truck LTS", src: image("clients/truck-lts") },
    { name: "STS", src: image("clients/sts") },
    { name: "Infinity 10x", src: image("clients/infinity-10x") },
    { name: "Ezylock", src: image("clients/ezylock") },
    { name: "Brandster", src: image("clients/brandster") },
    { name: "Typhoon", src: image("clients/typhoon") },
    { name: "Prime Solution", src: image("clients/prime-solution") },
    { name: "NZ Outlet", src: image("clients/nz-outlet") },
    { name: "Oliverock", src: image("clients/oliverock") },
    { name: "MD Group", src: image("clients/md-group") },
  ],
};

/* ----------------------------- Our Unique Value -------------------------- */

export const uniqueValue = {
  eyebrow: "What makes us different",
  title: "Our Unique Value",
  description:
    "What sets Techvation apart is our commitment to technology innovation, quality and customer satisfaction. Our highly skilled professionals are experts in their fields and use the latest technologies to deliver superior results. Our customised approach ensures each client receives solutions that are not only effective but also scalable and future-proof.",
  /** Small chips under the paragraph. */
  values: [
    { label: "Innovation", icon: icon("sparkles-brand-16") },
    { label: "Quality", icon: icon("award-brand") },
    { label: "Customer satisfaction", icon: icon("heart-brand-16") },
  ],
  action: { label: "Get In Touch", href: "/contact" } as LinkItem,
  /** The illustration on the right. */
  visual: {
    outlineWord: "VALUE",
    iconSrc: "/assets/logos/techvation-icon.png",
    stat: { value: "100%", label: "custom-built for you" },
    /** Floating pills around the icon. "position" picks one of four fixed spots. */
    pills: [
      { label: "Innovation-led", icon: icon("sparkles-white-16"), position: "topLeft" },
      { label: "Quality you can trust", icon: icon("award-white-16"), position: "topRight" },
      { label: "Expert team", icon: icon("users-white-16"), position: "bottomRight" },
      { label: "Scalable & future-proof", icon: icon("trending-up-white-16"), position: "bottomLeft" },
    ] as Array<{
      label: string;
      icon: string;
      position: "topLeft" | "topRight" | "bottomRight" | "bottomLeft";
    }>,
  },
};

/* --------------------------------- Services ------------------------------ */

export type Service = {
  title: string;
  category: string;
  description: string;
  /** Shorter description used on phones and tablets. */
  descriptionShort: string;
  icon: string;
  image: string;
  href: string;
};

export const services = {
  eyebrow: "Our services",
  heading: {
    lead: "Technology services that move ",
    highlight: "your business forward",
  } as HighlightedHeading,
  description:
    "Twelve specialised services across Microsoft, ERP, development, AI and managed support. One accountable team.",
  learnMoreLabel: "Learn more",
  cardAction: cta.letsTalk,
  /** Text after the counter, e.g. "01 / 12 services". */
  counterSuffix: "services",
  items: [
    {
      title: "MS Dynamics 365",
      category: "Microsoft",
      description: "Unified CRM & ERP for sales, service, field ops and finance.",
      descriptionShort: "Unified CRM & ERP for sales, service and finance.",
      icon: icon("layers-white-20"),
      image: image("services/ms-dynamics-365"),
      href: "/services/ms-dynamics-365",
    },
    {
      title: "ERP Implementation",
      category: "Enterprise",
      description: "Process mapping, migration, go-live and training, done right.",
      descriptionShort: "Mapping, migration, go-live and training.",
      icon: icon("database-white-20"),
      image: image("services/erp-implementation"),
      href: "/services/erp-implementation",
    },
    {
      title: "Odoo ERP",
      category: "Enterprise",
      description: "Open-source ERP configured around how you actually work.",
      descriptionShort: "Open-source ERP configured around you.",
      icon: icon("sliders-white-20"),
      image: image("services/odoo-erp"),
      href: "/services/odoo-erp",
    },
    {
      title: "Power BI",
      category: "Analytics",
      description: "Real-time dashboards that turn data into decisions.",
      descriptionShort: "Real-time dashboards for decisions.",
      icon: icon("bar-chart-white-20"),
      image: image("services/power-bi"),
      href: "/services/power-bi",
    },
    {
      title: "ERP Customization",
      category: "Enterprise",
      description: "Custom modules, workflows and reports for your operations.",
      descriptionShort: "Custom modules, workflows and reports.",
      icon: icon("wrench-white-20"),
      image: image("services/erp-customization"),
      href: "/services/erp-customization",
    },
    {
      title: "Web Development",
      category: "Development",
      description: "Fast, secure React & Next.js web apps built to scale.",
      descriptionShort: "Fast, secure web apps built to scale.",
      icon: icon("code-white-20"),
      image: image("services/web-development"),
      href: "/services/web-development",
    },
    {
      title: "Mobile App Development",
      category: "Development",
      description: "Cross-platform iOS & Android apps people love.",
      descriptionShort: "Cross-platform iOS & Android apps.",
      icon: icon("smartphone-white-20"),
      image: image("services/mobile-app-development"),
      href: "/services/mobile-app-development",
    },
    {
      title: "Custom Software Development",
      category: "Development",
      description: "Bespoke platforms and integrations for unique needs.",
      descriptionShort: "Bespoke platforms and integrations.",
      icon: icon("cpu-white-20"),
      image: image("services/custom-software-development"),
      href: "/services/custom-software-development",
    },
    {
      title: "Agentic AI Development",
      category: "AI & ML",
      description: "Autonomous agents that act across your tools.",
      descriptionShort: "Autonomous agents across your tools.",
      icon: icon("bot-white-20"),
      image: image("services/agentic-ai-development"),
      href: "/services/agentic-ai-development",
    },
    {
      title: "AI Driven Marketing",
      category: "AI & ML",
      description: "Predictive, personalised campaigns powered by data.",
      descriptionShort: "Predictive, personalised campaigns.",
      icon: icon("megaphone-white-20"),
      image: image("services/ai-driven-marketing"),
      href: "/services/ai-driven-marketing",
    },
    {
      title: "Maintenance & Support",
      category: "Managed",
      description: "SLA-backed monitoring, fixes and improvements.",
      descriptionShort: "SLA-backed monitoring and fixes.",
      icon: icon("headset-white-20"),
      image: image("services/maintenance-support"),
      href: "/services/maintenance-support",
    },
    {
      title: "Staff Augmentation",
      category: "Managed",
      description: "Vetted tech experts added to your team in days.",
      descriptionShort: "Vetted experts added in days.",
      icon: icon("users-white-20"),
      image: image("services/staff-augmentation"),
      href: "/services/staff-augmentation",
    },
  ] as Service[],
};

/* ------------------------------ Why Techvation --------------------------- */

export const whyTechvation = {
  eyebrow: "Why Techvation",
  heading: {
    lead: "Six reasons growing companies choose, and ",
    highlight: "stay with, Techvation",
  } as HighlightedHeading,
  description:
    "Six reasons growing companies trust us with their most important systems, and keep working with us after go-live.",
  /** The badge under the Techvation icon in the middle of the orbit. */
  hub: {
    iconSrc: "/assets/logos/techvation-icon.png",
    badge: "10+ years · 50+ projects",
  },
  /** The first three cards sit left of the orbit, the last three on the right. */
  reasons: [
    {
      title: "Certified experts",
      description: "Microsoft & Odoo specialists with real industry experience.",
      icon: icon("users-white-22"),
    },
    {
      title: "Agile, transparent delivery",
      description: "Two-week sprints, weekly demos and one dedicated PM.",
      icon: icon("zap-white-22"),
    },
    {
      title: "Fixed, honest pricing",
      description: "Itemised proposals, no hidden costs or surprises.",
      icon: icon("dollar-white-22"),
    },
    {
      title: "Security-first",
      description: "SSL/TLS, role-based access, GDPR & HIPAA-ready builds.",
      icon: icon("shield-white-22"),
    },
    {
      title: "Global, follow-the-sun",
      description: "Teams across 4 regions with overlapping hours.",
      icon: icon("globe-white-22"),
    },
    {
      title: "Support after go-live",
      description: "SLA-backed monitoring, fixes and improvements.",
      icon: icon("headset-white-22"),
    },
  ],
  stats: [
    { value: "50+", label: "Projects delivered" },
    { value: "10+", label: "Countries" },
    { value: "15+", label: "Active clients" },
    { value: "10+", label: "Years of expertise" },
  ],
  primaryAction: { label: "Talk to an Expert", href: "#free-consultation" } as LinkItem,
  secondaryAction: { label: "About Techvation", href: "/about" } as LinkItem,
};

/* -------------------------------- How We Work ---------------------------- */

export const howWeWork = {
  eyebrow: "How we work",
  heading: {
    lead: "A proven roadmap from first ",
    highlight: "call to go-live",
  } as HighlightedHeading,
  description:
    "Four clear phases, fixed milestones and weekly demos so you always know what’s happening and what comes next.",
  action: cta.scheduleCall,
  outcomeLabel: "Outcome:",
  steps: [
    {
      title: "Discover",
      description: "Free consultation, goals and a process audit of your current systems.",
      deliverables: ["Discovery call", "Fit-gap report"],
      outcome: "Clear scope",
      icon: icon("search-white-20"),
      image: image("process/discover"),
    },
    {
      title: "Design",
      description: "Solution blueprint, UX prototypes and a fixed, transparent plan.",
      deliverables: ["Blueprint", "Clickable prototype"],
      outcome: "Fixed proposal",
      icon: icon("layers-white-20"),
      image: image("process/design"),
    },
    {
      title: "Build & Integrate",
      description: "Agile sprints with weekly demos, integrations and built-in QA.",
      deliverables: ["Bi-weekly demos", "Integrations & QA"],
      outcome: "Working software",
      icon: icon("code-white-20"),
      image: image("process/build-integrate"),
    },
    {
      title: "Launch & Support",
      description: "Go-live, training, monitoring and continuous improvement.",
      deliverables: ["User training", "SLA support"],
      outcome: "Live & supported",
      icon: icon("rocket-white-20"),
      image: image("process/launch-support"),
    },
  ],
};

/* --------------------------------- Industries ---------------------------- */

export type Industry = {
  name: string;
  description: string;
  tags: string[];
  exploreLabel: string;
  href: string;
  image: string;
  /** Same icon in three sizes: 20px for the collapsed desktop panel, 16px
   *  when it is expanded, and 18px for the swipe cards on phones and tablets. */
  iconLarge: string;
  iconSmall: string;
  iconCard: string;
};

export const industries = {
  eyebrow: "Industries we serve",
  heading: {
    lead: "Built for the way ",
    highlight: "your industry works",
  } as HighlightedHeading,
  description: "8 industries · pre-built accelerators · domain experts on every project.",
  hint: "Hover or click an industry to expand it",
  items: [
    {
      name: "Manufacturing",
      description: "Plan production, track inventory in real time and close the books faster.",
      tags: ["MRP", "Inventory", "Quality"],
      exploreLabel: "Explore manufacturing solutions",
      href: "/industries/manufacturing",
      image: image("industries/manufacturing"),
      iconLarge: icon("factory-white-20"),
      iconSmall: icon("factory-white-16"),
      iconCard: icon("factory-white-18"),
    },
    {
      name: "Retail & Wholesale",
      description: "Unified POS, eCommerce and stock across every channel.",
      tags: ["POS", "eCommerce", "Pricing"],
      exploreLabel: "Explore retail & wholesale solutions",
      href: "/industries/retail-wholesale",
      image: image("industries/retail-wholesale"),
      iconLarge: icon("cart-white-20"),
      iconSmall: icon("cart-white-16"),
      iconCard: icon("cart-white-18"),
    },
    {
      name: "Healthcare",
      description: "Secure patient, billing and compliance workflows.",
      tags: ["HIPAA-ready", "Billing", "Scheduling"],
      exploreLabel: "Explore healthcare solutions",
      href: "/industries/healthcare",
      image: image("industries/healthcare"),
      iconLarge: icon("heart-white-20"),
      iconSmall: icon("heart-white-16"),
      iconCard: icon("heart-white-18"),
    },
    {
      name: "Banking & Finance",
      description: "Automated finance, risk reporting and real-time dashboards.",
      tags: ["Reporting", "Compliance", "BI"],
      exploreLabel: "Explore banking & finance solutions",
      href: "/industries/banking-finance",
      image: image("industries/banking-finance"),
      iconLarge: icon("landmark-white-20"),
      iconSmall: icon("landmark-white-16"),
      iconCard: icon("landmark-white-18"),
    },
    {
      name: "Distribution",
      description: "Warehouse, logistics and route visibility end to end.",
      tags: ["WMS", "Logistics", "Tracking"],
      exploreLabel: "Explore distribution solutions",
      href: "/industries/distribution",
      image: image("industries/distribution"),
      iconLarge: icon("truck-white-20"),
      iconSmall: icon("truck-white-16"),
      iconCard: icon("truck-white-18"),
    },
    {
      name: "Professional Services",
      description: "Projects, timesheets and billing in one place.",
      tags: ["PSA", "Billing", "CRM"],
      exploreLabel: "Explore professional services solutions",
      href: "/industries/professional-services",
      image: image("industries/professional-services"),
      iconLarge: icon("briefcase-white-20"),
      iconSmall: icon("briefcase-white-16"),
      iconCard: icon("briefcase-white-18"),
    },
    {
      name: "Education",
      description: "Admissions, finance and learning systems connected.",
      tags: ["Admissions", "Finance", "Portals"],
      exploreLabel: "Explore education solutions",
      href: "/industries/education",
      image: image("industries/education"),
      iconLarge: icon("grad-cap-white-20"),
      iconSmall: icon("grad-cap-white-16"),
      iconCard: icon("grad-cap-white-18"),
    },
    {
      name: "Government Sector",
      description: "Secure, transparent citizen and back-office services.",
      tags: ["Workflows", "Records", "Security"],
      exploreLabel: "Explore government sector solutions",
      href: "/industries/government-sector",
      image: image("industries/government-sector"),
      iconLarge: icon("building-white-20"),
      iconSmall: icon("building-white-16"),
      iconCard: icon("building-white-18"),
    },
  ] as Industry[],
};

/* ------------------------- CTA: book a strategy call --------------------- */

export const strategyCall = {
  eyebrow: "Free 30-minute strategy call",
  heading: {
    lead: "Ready to transform your business? ",
    highlight: "Let’s map it out together.",
  } as HighlightedHeading,
  description:
    "Pick a time that suits you. A senior consultant reviews your goals and shares a practical roadmap. No sales pitch.",
  steps: ["Pick a date", "Choose a time", "Get your roadmap"],
  primaryAction: cta.scheduleCall,
  secondaryAction: cta.letsTalk,
  /**
   * The calendar picture on the right. It is only an illustration of the
   * booking flow, so the dates below are sample content.
   */
  calendar: {
    monthLabel: "November 2026",
    weekdays: ["S", "M", "T", "W", "T", "F", "S"],
    /** Blank cells before day 1 (0 = the month starts on Sunday). */
    startOffset: 0,
    daysInMonth: 30,
    availableDays: [16, 17, 18, 19, 20, 23, 24, 25, 26, 27, 30],
    selectedDay: 18,
    slotsTitle: "Wed, Nov 18",
    slots: ["10:00 AM", "11:30 AM", "2:00 PM"],
    selectedSlot: "11:30 AM",
    meetingPill: "30 min · Meet / Teams",
    bookedToast: "Call booked · Nov 18, 11:30",
    consultants: {
      title: "Senior consultants",
      subtitle: "Dynamics · ERP · AI",
      avatars: [
        image("cta/consultant-1"),
        image("cta/consultant-2"),
        image("cta/consultant-3"),
      ],
    },
  },
};

/* ------------------------------ Blog / Insights -------------------------- */

export type BlogPost = {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
};

export const blog = {
  eyebrow: "Insights & news",
  heading: {
    lead: "Ideas to help you ",
    highlight: "build smarter",
  } as HighlightedHeading,
  /** Filter chips. "All" shows every post. */
  allLabel: "All",
  categories: ["Dynamics 365", "ERP", "AI & ML", "Power BI"],
  viewAll: { label: "View all articles", href: "/blog" } as LinkItem,
  emptyMessage: "No articles in this category yet.",
  featured: {
    badge: "FEATURED",
    title: "How agentic AI is changing back-office operations in 2026",
    excerpt:
      "From invoices to customer follow-ups, AI agents now complete multi-step work across ERP and CRM. Here’s where they pay off first.",
    category: "AI & ML",
    author: {
      name: "Techvation Team",
      avatar: image("blog/author-techvation-team"),
    },
    date: "Nov 10, 2026",
    readTime: "8 min read",
    image: image("blog/agentic-ai"),
    href: "/blog/agentic-ai-back-office-operations",
  },
  posts: [
    {
      title: "10 Power BI dashboards every operations leader should have",
      category: "Power BI",
      date: "Oct 28, 2026",
      readTime: "6 min read",
      image: image("blog/power-bi-dashboards"),
      href: "/blog/power-bi-dashboards-operations",
    },
    {
      title: "Dynamics 365 vs Odoo: choosing the right ERP for a growing business",
      category: "ERP",
      date: "Oct 14, 2026",
      readTime: "10 min read",
      image: image("blog/dynamics-vs-odoo"),
      href: "/blog/dynamics-365-vs-odoo",
    },
    {
      title: "RAG explained: grounding AI in your company’s knowledge",
      category: "AI & ML",
      date: "Sep 30, 2026",
      readTime: "9 min read",
      image: image("blog/rag-explained"),
      href: "/blog/rag-explained",
    },
  ] as BlogPost[],
};

/* ---------------------------------- Footer ------------------------------- */

export const footer = {
  /** The gradient band at the top of the footer. */
  cta: {
    heading: {
      lead: "Let’s build ",
      highlight: "what’s next",
      tail: ".",
    } as HighlightedHeading,
    description: "Choose how you’d like to start. We reply within 24 hours.",
    /** The first is solid white, the last has no arrow (every screen size). */
    actions: [cta.freeConsultation, cta.letsTalk, cta.scheduleCall],
  },
  logo: navbar.logo,
  about:
    "Microsoft Dynamics, ERP, custom software and AI, delivered by certified experts across North America, the Middle East, Africa and Asia Pacific.",
  /** Shorter version used on phones and tablets. */
  aboutShort:
    "Microsoft Dynamics, ERP, custom software and AI, delivered by certified experts.",
  social: [
    { name: "LinkedIn", href: "https://www.linkedin.com", icon: icon("social/linkedin") },
    { name: "Facebook", href: "https://www.facebook.com", icon: icon("social/facebook") },
    { name: "Instagram", href: "https://www.instagram.com", icon: icon("social/instagram") },
    { name: "X", href: "https://x.com", icon: icon("social/x") },
    { name: "YouTube", href: "https://www.youtube.com", icon: icon("social/youtube") },
  ],
  /** Link columns. "arrow" adds a small arrow, "badge" adds a small tag. */
  columns: [
    {
      title: "Services",
      links: [
        { label: "Dynamics 365", href: "/services/ms-dynamics-365" },
        { label: "ERP & Odoo", href: "/services/odoo-erp" },
        { label: "Power BI", href: "/services/power-bi" },
        { label: "Web & Mobile Apps", href: "/services/web-development" },
        { label: "Agentic AI", href: "/services/agentic-ai-development" },
        { label: "All services", href: "/services", arrow: true },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Solutions", href: "/solutions", badge: "SOON" },
        { label: "Blogs", href: "/blog" },
        { label: "FAQs", href: "/faqs" },
      ],
    },
  ] as Array<{
    title: string;
    links: Array<LinkItem & { arrow?: boolean; badge?: string }>;
  }>,
  /** The two shorter link columns shown on phones and tablets. */
  columnsCompact: [
    {
      title: "Services",
      links: [
        { label: "Dynamics 365", href: "/services/ms-dynamics-365" },
        { label: "ERP & Odoo", href: "/services/odoo-erp" },
        { label: "Power BI", href: "/services/power-bi" },
        { label: "Agentic AI", href: "/services/agentic-ai-development" },
        { label: "All services", href: "/services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Solutions", href: "/solutions", badge: "SOON" },
        { label: "Blogs", href: "/blog" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ] as Array<{
    title: string;
    links: Array<LinkItem & { badge?: string }>;
  }>,
  contact: {
    title: "Contact",
    items: [
      { label: "+1 (307) 855-0572", href: "tel:+13078550572", icon: icon("phone-16") },
      { label: "+92 344 5450666", href: "tel:+923445450666", icon: icon("phone-16") },
      { label: "info@thetechvation.com", href: "mailto:info@thetechvation.com", icon: icon("mail-16") },
      { label: "USA · Pakistan", icon: icon("map-pin-16") },
    ] as Array<{ label: string; href?: string; icon: string }>,
    link: { label: "Contact Us", href: "/contact" } as LinkItem,
  },
  newsletter: {
    title: "Get our monthly tech digest",
    /** Shorter title used on phones and tablets. */
    titleShort: "Monthly tech digest",
    description: "Practical insights on Dynamics, ERP and AI. No spam, ever.",
    placeholder: "Your work email",
    submitLabel: "Subscribe",
  },
  copyright: "© 2026 The Techvation. All rights reserved.",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Sitemap", href: "/sitemap" },
  ] as LinkItem[],
};
