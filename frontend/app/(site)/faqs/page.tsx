import type { Metadata } from "next";
import JsonLd from "@/components/Seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import ContactCards from "@/components/FaqPage/ContactCards";
import FaqBody from "@/components/FaqPage/FaqBody";
import { FaqSearchBar, FaqSearchProvider } from "@/components/FaqPage/FaqSearch";
import PageHero from "@/components/PageHero/PageHero";
import { getFaqPage } from "@/lib/cms/content";

export const metadata: Metadata = pageMetadata({
  title: "FAQs: Pricing, Implementation & Support",
  description:
    "Answers to common questions about Techvation’s Dynamics 365, ERP and AI services: pricing, timelines, implementation, support, security and careers.",
  path: "/faqs",
});

/**
 * The FAQ page ("06 · FAQs" in Figma). Questions live in /data/faqs.ts.
 * The navbar, footer and pop-ups come from app/layout.tsx.
 */
export default async function FaqsPage() {
  const faqPage = await getFaqPage();
  const { hero } = faqPage;

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "FAQs", path: "/faqs" }]),
          // Every question and answer, so Google can show them in results.
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqPage.categories.flatMap((category) =>
              category.questions.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            ),
          },
        ]}
      />
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
        <FaqBody categories={faqPage.categories} sidebar={faqPage.sidebar} />
      </FaqSearchProvider>
      <ContactCards />
    </main>
  );
}
