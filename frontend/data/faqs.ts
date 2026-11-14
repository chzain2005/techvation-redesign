/*
 * ---------------------------------------------------------------------------
 * FAQ PAGE CONTENT  (Figma "06 · FAQs")
 * ---------------------------------------------------------------------------
 * Add a question by adding it to its category; the counts in the sidebar
 * and the headings update by themselves.
 *
 * NOTE ON SOURCES: the design shows the questions of four categories and
 * only the first answer of each. The other answers, and the questions of
 * "Implementation" and "Careers" (listed in the sidebar but not drawn),
 * were written to match the rest of the site; please review them.
 */

import type { GlyphName } from "@/components/Icon/Glyph";
import type { HighlightedHeading } from "./homepage";

export type FaqCategory = {
  /** Used as the #anchor of the group. */
  id: string;
  name: string;
  icon: GlyphName;
  questions: Array<{ question: string; answer: string }>;
};

export const faqPage = {
  hero: {
    breadcrumb: "FAQs",
    eyebrow: "Help center",
    heading: { lead: "Frequently asked ", highlight: "questions" } as HighlightedHeading,
    description: "Quick answers about our services, pricing, implementation and support.",
    image: "/assets/images/faqs/hero.jpg",
    search: {
      label: "Search the questions",
      placeholder: "Search a question, e.g. “ERP cost”",
      submitLabel: "Search",
      /** "3 results for “erp”" */
      resultLabel: (count: number, query: string) =>
        `${count} ${count === 1 ? "result" : "results"} for “${query}”`,
      clearLabel: "Clear search",
      emptyText: "No questions match your search. Try another word, or ask our team directly.",
    },
  },

  sidebar: {
    title: "Categories",
    help: {
      title: "Can’t find an answer?",
      text: "Our team replies within 24 hours.",
      actionLabel: "Ask a Question",
    },
  },

  /** "5 questions" */
  countLabel: (count: number) => `${count} ${count === 1 ? "question" : "questions"}`,

  contact: {
    eyebrow: "Still have questions?",
    heading: { lead: "Talk to a ", highlight: "real person" } as HighlightedHeading,
    cards: [
      {
        icon: "phone" as GlyphName,
        title: "Call us",
        text: "+1 (307) 855-0572 · +92 344 5450666",
        actionLabel: "Call now",
        href: "tel:+13078550572",
      },
      {
        icon: "mail" as GlyphName,
        title: "Email us",
        text: "info@thetechvation.com",
        actionLabel: "Send email",
        href: "mailto:info@thetechvation.com",
      },
      {
        icon: "calendar" as GlyphName,
        title: "Book a call",
        text: "Free 30-min consultation with an expert",
        actionLabel: "Book a slot",
        /** Opens the Schedule a Call pop-up. */
        href: "#schedule-a-call",
      },
    ],
  },

  categories: [
    {
      id: "general",
      name: "General",
      icon: "globe",
      questions: [
        {
          question: "What does Techvation do?",
          answer:
            "We help businesses transform with technology, Microsoft Dynamics 365, ERP implementation and customization, Odoo, Power BI, web and mobile development, and agentic AI, from strategy through long-term support.",
        },
        {
          question: "Which regions do you serve?",
          answer:
            "We work with clients across North America, the Middle East, Africa and Asia Pacific. Our teams are based in Wyoming, USA and Islamabad, Pakistan, and we deliver remotely with on-site visits when a project needs them.",
        },
        {
          question: "Which industries do you serve with your ERP and software solutions?",
          answer:
            "Manufacturing, retail and wholesale, healthcare, banking and finance, distribution, professional services, education and the government sector, plus many growing businesses outside those areas.",
        },
        {
          question: "How do I get started?",
          answer:
            "Book a free consultation or send us a message. We’ll learn about your goals, review your current systems and suggest the right next step, with no obligation.",
        },
        {
          question: "Do you work with small and mid-sized businesses?",
          answer:
            "Yes. Most of our clients are growing small and mid-sized companies, and we size every solution and engagement model to fit your budget and stage.",
        },
      ],
    },
    {
      id: "services-pricing",
      name: "Services & Pricing",
      icon: "dollar",
      questions: [
        {
          question: "How much does a project cost?",
          answer:
            "Every project is scoped individually. After a free consultation we send a fixed, itemised proposal, with options for fixed-price, dedicated team or time-and-materials engagements.",
        },
        {
          question: "Is the first consultation really free?",
          answer:
            "Yes. The first 30-minute consultation is free and comes with no obligation. You’ll leave with practical advice whether or not we work together.",
        },
        {
          question: "Do you offer fixed-price projects?",
          answer:
            "Yes. Well-defined projects can be delivered at a fixed price with clear milestones. For evolving products we also offer dedicated teams and time-and-materials.",
        },
        {
          question: "Can you integrate ERP with existing eCommerce platforms and third-party tools?",
          answer:
            "Yes. We connect Dynamics 365 and Odoo with eCommerce stores, payment gateways, CRMs, banks, shipping providers and custom systems through secure APIs, so data stays in sync.",
        },
        {
          question: "Do you help with software licensing?",
          answer:
            "Yes. We advise on the right Microsoft and Odoo licences for your team, so you only pay for what you actually need.",
        },
      ],
    },
    {
      id: "implementation",
      name: "Implementation",
      icon: "layers",
      questions: [
        {
          question: "How long does a typical implementation take?",
          answer:
            "It depends on scope. Odoo rollouts usually go live in 6–10 weeks and mid-size Dynamics 365 projects in 10–14 weeks. You get a fixed plan with milestones before any work begins.",
        },
        {
          question: "How do you handle data migration?",
          answer:
            "We cleanse, map and migrate your master and transactional data, then validate it with your team before go-live, so nothing is lost on the way.",
        },
        {
          question: "What does your delivery process look like?",
          answer:
            "Four phases: Discover (goals and process audit), Design (solution blueprint and fixed plan), Build (agile sprints with weekly demos) and Launch & Support (go-live, training and continuous support).",
        },
        {
          question: "Will our team be trained on the new system?",
          answer:
            "Yes. Every implementation includes role-based training and a hyper-care period after go-live, so your team is confident from day one.",
        },
      ],
    },
    {
      id: "support-maintenance",
      name: "Support & Maintenance",
      icon: "headset",
      questions: [
        {
          question: "Do you offer ongoing support and maintenance after project completion?",
          answer:
            "Absolutely. We provide flexible maintenance and support packages, including monitoring, bug fixes, updates and dedicated support channels after launch.",
        },
        {
          question: "What are your response times?",
          answer:
            "Response times depend on your plan. Critical issues get a response in under 2 hours on our SLA plans, and every ticket is tracked against the agreed SLA.",
        },
        {
          question: "Can you support a system another vendor built?",
          answer:
            "Yes. After a short onboarding review of your system and documentation, we take over support with the same response times as our own projects.",
        },
        {
          question: "Do you provide user training?",
          answer:
            "Yes. We run role-based training for new users and refresher sessions when your processes or the software change.",
        },
      ],
    },
    {
      id: "security-data",
      name: "Security & Data",
      icon: "shield",
      questions: [
        {
          question: "How do you ensure data security and compliance?",
          answer:
            "We use secure coding, SSL/TLS encryption, role-based access and regular security checks, and help ensure compliance with GDPR, HIPAA and other data-protection laws.",
        },
        {
          question: "Will we own the source code and data?",
          answer:
            "Yes. All source code, documentation and data belong to you, and we can set up repositories and environments in your own accounts from day one.",
        },
        {
          question: "Do you sign NDAs?",
          answer: "Yes. We’re happy to sign an NDA before you share any confidential information.",
        },
      ],
    },
    {
      id: "careers",
      name: "Careers",
      icon: "briefcase",
      questions: [
        {
          question: "How do I apply for a role?",
          answer:
            "Pick an open role on our Careers page and click “Apply now”, or send a general application with your CV if you don’t see the right role yet.",
        },
        {
          question: "Do you offer remote roles?",
          answer:
            "Yes. Many of our roles are remote-friendly or hybrid, with flexible hours. Each job listing shows where it is based.",
        },
        {
          question: "What does your hiring process look like?",
          answer:
            "Four simple steps: apply, a 20-minute intro call, a practical skills interview and a clear offer, usually within 2 weeks of applying.",
        },
      ],
    },
  ] as FaqCategory[],
};
