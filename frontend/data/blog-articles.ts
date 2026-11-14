/*
 * ---------------------------------------------------------------------------
 * BLOG ARTICLE BODIES  (Figma "08 · Blog Article")
 * ---------------------------------------------------------------------------
 * The text of each article, as a list of blocks. The card details (title,
 * cover, date…) live in blog.ts; this file only holds what is inside.
 *
 * Block types:
 *   lead   - the larger first paragraph
 *   h2     - a section heading (also listed under "On this page")
 *   p      - a normal paragraph
 *   quote  - a highlighted quote
 *   list   - a list with check marks
 *   image  - a full-width picture with a caption
 *
 * NOTE ON SOURCES: the first article is copied from the Figma design. The
 * others were not designed and were written to match their titles; please
 * review them (or replace them with the real articles) before publishing.
 */

const image = (path: string) => `/assets/images/${path}`;

export type ArticleBlock =
  | { type: "lead"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; caption: string };

export type ArticleContent = {
  blocks: ArticleBlock[];
  /** The box at the end of the article. */
  authorBio: string;
  /** The dark consultation card in the sidebar. */
  cta: { title: string; buttonLabel: string };
};

/** Used when an article has no sidebar text of its own. */
export const defaultArticleCta = {
  title: "Talk to an expert about your project",
  buttonLabel: "Get Free Consultation",
};

export const articleContent: Record<string, ArticleContent> = {
  "agentic-ai-back-office-operations": {
    blocks: [
      {
        type: "lead",
        text: "AI has moved beyond chatbots. In 2026, agentic AI systems plan multi-step tasks, use business tools and complete work end-to-end, with people approving the decisions that matter.",
      },
      { type: "h2", text: "What makes AI “agentic”?" },
      {
        type: "p",
        text: "An agent combines a language model with memory, tools and a goal. Instead of answering a single question, it breaks a task into steps, reading an email, checking stock in the ERP, drafting a reply and updating the CRM, and executes them in order.",
      },
      {
        type: "quote",
        text: "“The biggest wins come from boring, repetitive processes, that’s where agents pay for themselves in weeks.”",
      },
      { type: "h2", text: "Where agents deliver ROI first" },
      {
        type: "list",
        items: [
          "Accounts payable, reading invoices, matching POs and flagging exceptions",
          "Customer service, triaging tickets and drafting grounded responses",
          "Sales operations, enriching leads and updating pipeline data",
          "Reporting, generating weekly summaries from Power BI and ERP data",
        ],
      },
      {
        type: "image",
        src: image("careers/culture-4.jpg"),
        caption: "Teams review agent output in a simple approval queue before anything is sent.",
      },
      { type: "h2", text: "How to deploy agents safely" },
      {
        type: "p",
        text: "Start with one well-defined process, ground the agent in your own data with retrieval (RAG), restrict its permissions, and keep a human in the loop. Measure accuracy and time saved before scaling to the next workflow.",
      },
    ],
    authorBio: "Our AI engineers design and deploy agentic systems for clients across four regions.",
    cta: { title: "Explore AI agents for your business", buttonLabel: "Get My AI Roadmap" },
  },

  "power-bi-dashboards-operations": {
    blocks: [
      {
        type: "lead",
        text: "Most operations teams already have the data they need, it just lives in ten different places. The right Power BI dashboards turn that data into a short list of numbers you can act on every morning.",
      },
      { type: "h2", text: "Start with the decisions, not the data" },
      {
        type: "p",
        text: "Before building anything, list the decisions your team makes each week: what to reorder, which orders are at risk, where costs are drifting. Every dashboard should answer one of those questions in under ten seconds.",
      },
      { type: "h2", text: "The dashboards we build most often" },
      {
        type: "list",
        items: [
          "Order-to-cash, from open orders to overdue invoices",
          "Inventory health, stock cover, slow movers and reorder alerts",
          "Production and quality, output, scrap rates and downtime",
          "Purchasing, supplier lead times and price variance",
          "Cash flow, receivables, payables and the 13-week forecast",
        ],
      },
      { type: "quote", text: "“A good dashboard makes the next action obvious; a great one makes the meeting shorter.”" },
      { type: "h2", text: "Keep them fast and trusted" },
      {
        type: "p",
        text: "Model your ERP data in a clean star schema, refresh it on a schedule and secure it with row-level security. When numbers load instantly and match the ERP, people stop exporting to Excel.",
      },
    ],
    authorBio: "Our Power BI specialists build data models and dashboards that teams actually use.",
    cta: { title: "Get dashboards your team will use", buttonLabel: "Plan My Dashboards" },
  },

  "dynamics-365-vs-odoo": {
    blocks: [
      {
        type: "lead",
        text: "Dynamics 365 and Odoo are both excellent ERPs, but they suit different businesses. The right choice depends on your size, your processes and how fast you need to go live.",
      },
      { type: "h2", text: "Cost and licensing" },
      {
        type: "p",
        text: "Odoo usually has a lower entry cost, especially for smaller teams, and its Community edition is free. Dynamics 365 is licensed per user and app, which costs more but includes deep Microsoft 365 integration and enterprise support.",
      },
      { type: "h2", text: "Flexibility and fit" },
      {
        type: "list",
        items: [
          "Odoo, very modular, quick to customise in Python and strong for SMB retail and manufacturing",
          "Dynamics 365 Business Central, a great fit for growing companies that live in Microsoft 365",
          "Dynamics 365 Finance & Operations, built for multi-entity, multi-country enterprises",
        ],
      },
      { type: "h2", text: "Time to value" },
      {
        type: "p",
        text: "Odoo projects typically go live in 6–10 weeks; mid-size Dynamics 365 rollouts take 10–14 weeks. Either way, a short discovery phase that maps your processes to the platform is what keeps the project on time.",
      },
      { type: "quote", text: "“Choose the ERP that fits the next five years of your business, not just the next five months.”" },
    ],
    authorBio: "Our ERP consultants implement both Dynamics 365 and Odoo, so our advice stays vendor-neutral.",
    cta: { title: "Not sure which ERP fits you?", buttonLabel: "Compare My Options" },
  },

  "outgrown-spreadsheets": {
    blocks: [
      {
        type: "lead",
        text: "Spreadsheets are a great way to start a business and a costly way to run a growing one. Here are the signs it’s time to move to a proper ERP.",
      },
      { type: "h2", text: "The five warning signs" },
      {
        type: "list",
        items: [
          "Month-end closing takes days of copying and checking",
          "Nobody trusts the stock numbers without counting",
          "The same customer data lives in three different files",
          "Reports depend on one person who knows the formulas",
          "Growth means hiring people just to move data around",
        ],
      },
      { type: "h2", text: "What an ERP changes" },
      {
        type: "p",
        text: "An ERP keeps sales, inventory, purchasing and finance in one system, so every number updates once and everyone sees the same version. Approvals, reminders and reports run on their own.",
      },
      { type: "h2", text: "Where to begin" },
      {
        type: "p",
        text: "Map your current processes, decide what must change and pick a platform that fits your size. A phased rollout, finance and inventory first, keeps disruption low.",
      },
    ],
    authorBio: "Our consultants have moved dozens of growing businesses from spreadsheets to ERP.",
    cta: { title: "Ready to leave spreadsheets behind?", buttonLabel: "Get a Free ERP Assessment" },
  },

  "react-native-vs-flutter": {
    blocks: [
      {
        type: "lead",
        text: "Both React Native and Flutter let you ship iOS and Android apps from one codebase. After shipping apps with both, here is how we choose between them.",
      },
      { type: "h2", text: "When we pick React Native" },
      {
        type: "p",
        text: "React Native is our default when the client already has a React or Next.js web team, when the app shares logic with a website, or when it relies on many existing JavaScript libraries.",
      },
      { type: "h2", text: "When we pick Flutter" },
      {
        type: "p",
        text: "Flutter shines for highly custom, animation-heavy interfaces and when pixel-identical design across platforms matters. Its rendering engine gives very consistent results on every device.",
      },
      { type: "h2", text: "What matters more than the framework" },
      {
        type: "list",
        items: [
          "A clear product scope and a tested prototype",
          "A secure backend and a clean API",
          "Automated testing and release pipelines",
          "Analytics from day one, so you learn what users need",
        ],
      },
    ],
    authorBio: "Our mobile team builds and maintains cross-platform apps for clients in four regions.",
    cta: { title: "Planning a mobile app?", buttonLabel: "Talk to Our App Team" },
  },

  "web-app-security-checklist": {
    blocks: [
      {
        type: "lead",
        text: "Security isn’t a feature you add at the end. These are the controls we build into every business web application from the first sprint.",
      },
      { type: "h2", text: "The essentials" },
      {
        type: "list",
        items: [
          "HTTPS everywhere, with modern TLS and secure headers",
          "Strong authentication with multi-factor sign-in",
          "Role-based access, so people only see what they need",
          "Input validation and parameterised queries against injection",
          "Secrets kept in a vault, never in the code",
        ],
      },
      { type: "h2", text: "Watch and respond" },
      {
        type: "p",
        text: "Log every sign-in and sensitive action, alert on unusual patterns and keep dependencies up to date. Regular backups, tested restores and a simple incident plan turn a bad day into a short one.",
      },
      { type: "quote", text: "“Most breaches use old, known weaknesses. Doing the basics well stops most attacks.”" },
      { type: "h2", text: "Make it a habit" },
      {
        type: "p",
        text: "Add automated security checks to your build pipeline and review access rights every quarter. Security that runs on its own is security that actually happens.",
      },
    ],
    authorBio: "Our engineers build secure-by-design web applications and run security reviews for clients.",
    cta: { title: "Want a security review of your app?", buttonLabel: "Book a Security Check" },
  },

  "rag-explained": {
    blocks: [
      {
        type: "lead",
        text: "Large language models know a lot about the world but nothing about your business. Retrieval-augmented generation (RAG) fixes that by letting AI look things up in your own documents before it answers.",
      },
      { type: "h2", text: "How RAG works" },
      {
        type: "p",
        text: "Your documents are split into small passages and stored in a vector database. When someone asks a question, the most relevant passages are retrieved and given to the model, which writes an answer based on them and can cite its sources.",
      },
      { type: "h2", text: "Why it matters" },
      {
        type: "list",
        items: [
          "Answers stay accurate and up to date without retraining a model",
          "Every answer can link back to its source document",
          "Access rules keep confidential documents private",
          "It works with policies, manuals, contracts and ERP data",
        ],
      },
      { type: "h2", text: "Getting it right" },
      {
        type: "p",
        text: "Clean, well-structured content matters more than the model. Start with one knowledge area, test answers with real users and measure accuracy before rolling it out further.",
      },
    ],
    authorBio: "Our AI engineers build RAG systems grounded in clients’ own knowledge bases.",
    cta: { title: "Put your company knowledge to work", buttonLabel: "Explore RAG for My Team" },
  },

  "online-store-erp-integration": {
    blocks: [
      {
        type: "lead",
        text: "When your online store and ERP don’t talk, someone ends up re-typing orders and fixing stock levels by hand. A good integration makes both systems tell the same story.",
      },
      { type: "h2", text: "What to keep in sync" },
      {
        type: "list",
        items: [
          "Products, prices and stock levels from ERP to store",
          "Orders and customers from store to ERP",
          "Shipping status and tracking back to the customer",
          "Payments and refunds into accounting",
        ],
      },
      { type: "h2", text: "Choosing the approach" },
      {
        type: "p",
        text: "Ready-made connectors are quick for common platforms like Shopify and WooCommerce. For complex pricing, multiple warehouses or marketplaces, a custom API integration gives you full control.",
      },
      { type: "h2", text: "Avoiding the headaches" },
      {
        type: "p",
        text: "Decide which system owns each piece of data, handle errors with clear alerts and test with real order volumes before go-live. That’s what keeps the integration quiet after launch.",
      },
    ],
    authorBio: "Our integration team connects eCommerce platforms with Dynamics 365, Odoo and custom systems.",
    cta: { title: "Connect your store to your ERP", buttonLabel: "Plan My Integration" },
  },

  "business-central-cloud-migration": {
    blocks: [
      {
        type: "lead",
        text: "Moving Business Central from on-premise to the cloud brings automatic updates, lower IT overhead and access from anywhere. A clear plan keeps the move smooth.",
      },
      { type: "h2", text: "Step 1: assess what you have" },
      {
        type: "p",
        text: "List your customisations, integrations and reports. Older C/AL code needs to become AL extensions, and some customisations can be replaced by standard features.",
      },
      { type: "h2", text: "Step 2: plan the migration" },
      {
        type: "list",
        items: [
          "Clean up old data and decide how much history to move",
          "Rebuild customisations as upgrade-safe extensions",
          "Reconnect integrations through cloud APIs",
          "Run a full test migration before the real one",
        ],
      },
      { type: "h2", text: "Step 3: go live and support" },
      {
        type: "p",
        text: "Schedule the cut-over for a quiet period, train users on what has changed and keep support close for the first weeks. After that, Microsoft’s regular updates keep you current.",
      },
    ],
    authorBio: "Our Dynamics 365 consultants have migrated many Business Central customers to the cloud.",
    cta: { title: "Moving Business Central to the cloud?", buttonLabel: "Get a Migration Plan" },
  },

  "delivery-framework": {
    blocks: [
      {
        type: "lead",
        text: "Clients often ask how we keep projects on time and on budget. The answer isn’t magic, it’s a few simple habits we repeat on every project.",
      },
      { type: "h2", text: "Fixed plans, short sprints" },
      {
        type: "p",
        text: "Every project starts with a discovery phase and a fixed plan with milestones. We then deliver in two-week sprints, so progress is visible and problems surface early.",
      },
      { type: "h2", text: "The rituals that matter" },
      {
        type: "list",
        items: [
          "A weekly demo of working software, not slides",
          "A shared board where clients see every task",
          "A dedicated project manager as the single point of contact",
          "Automated tests and code reviews on every change",
        ],
      },
      { type: "quote", text: "“Predictable projects come from small, regular deliveries, not big reveals.”" },
      { type: "h2", text: "After go-live" },
      {
        type: "p",
        text: "Launch is the start of support, not the end of the project. A hyper-care period and SLA-backed support keep systems running and improving.",
      },
    ],
    authorBio: "Our delivery team runs projects across Dynamics 365, ERP, web, mobile and AI.",
    cta: defaultArticleCta,
  },
};

/** The headings of an article, used for "On this page" and for anchor ids. */
export function articleHeadings(blocks: ArticleBlock[]) {
  return blocks
    .filter((block): block is { type: "h2"; text: string } => block.type === "h2")
    .map((block) => ({ text: block.text, id: headingId(block.text) }));
}

/** "What makes AI “agentic”?" -> "what-makes-ai-agentic" */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
