import type { Metadata } from "next";
import ContactCards from "@/components/FaqPage/ContactCards";
import FaqBody from "@/components/FaqPage/FaqBody";
import { FaqSearchBar, FaqSearchProvider } from "@/components/FaqPage/FaqSearch";
import PageHero from "@/components/PageHero/PageHero";
import { faqPage } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQs | Techvation",
  description: "Quick answers about Techvation’s services, pricing, implementation, support, security and careers.",
};

/**
 * The FAQ page ("06 · FAQs" in Figma). Questions live in /data/faqs.ts.
 * The navbar, footer and pop-ups come from app/layout.tsx.
 */
export default function FaqsPage() {
  const { hero } = faqPage;

  return (
    <main>
      {/* The search bar in the hero filters the questions below it. */}
      <FaqSearchProvider>
        <PageHero
          centered
          image={hero.image}
          breadcrumb={hero.breadcrumb}
          eyebrow={hero.eyebrow}
          heading={hero.heading}
          description={hero.description}
        >
          <FaqSearchBar />
        </PageHero>
        <FaqBody />
      </FaqSearchProvider>
      <ContactCards />
    </main>
  );
}
