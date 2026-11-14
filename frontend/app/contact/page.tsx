import type { Metadata } from "next";
import ContactForm from "@/components/ContactPage/ContactForm";
import ContactInfo from "@/components/ContactPage/ContactInfo";
import QuickContact from "@/components/ContactPage/QuickContact";
import PageHero from "@/components/PageHero/PageHero";
import { contactPage } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact Us | Techvation",
  description:
    "Tell us what you’re building. A Techvation solution architect will get back to you within 24 hours.",
};

/**
 * The Contact Us page ("09 · Contact Us" in Figma). Every "Let's Talk"
 * button on the site links here. The navbar, footer and pop-ups come from
 * app/layout.tsx.
 */
export default function ContactPage() {
  const { hero } = contactPage;

  return (
    <main>
      <PageHero
        centered
        image={hero.image}
        breadcrumb={hero.breadcrumb}
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        description={hero.description}
        descriptionShort={hero.descriptionShort}
      />
      <QuickContact />

      {/* Form and offices: side by side on desktop, stacked below xl. */}
      <section aria-label="Contact form and offices" className="bg-white">
        <div className="mx-auto flex w-full max-w-page flex-col gap-8 page-x pt-8 pb-16 md:gap-10 md:py-16 xl:flex-row xl:items-start xl:gap-20 xl:py-section">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
    </main>
  );
}
