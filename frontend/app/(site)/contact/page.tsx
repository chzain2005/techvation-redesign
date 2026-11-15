import type { Metadata } from "next";
import JsonLd from "@/components/Seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import ContactForm from "@/components/ContactPage/ContactForm";
import ContactInfo from "@/components/ContactPage/ContactInfo";
import QuickContact from "@/components/ContactPage/QuickContact";
import PageHero from "@/components/PageHero/PageHero";
import { getContactPage } from "@/lib/cms/content";
import { clientSafe } from "@/lib/cms/normalize";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us: Free Consultation",
  description:
    "Contact Techvation for a free consultation on Dynamics 365, ERP, Power BI, custom software or AI. A solution architect replies within 24 hours.",
  path: "/contact",
});

/**
 * The Contact Us page ("09 · Contact Us" in Figma). Every "Let's Talk"
 * button on the site links here. The navbar, footer and pop-ups come from
 * app/layout.tsx.
 */
export default async function ContactPage() {
  const contactPage = await getContactPage();
  const { hero } = contactPage;

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact Us", path: "/contact" }])} />
      <PageHero
        centered
        image={hero.image}
        breadcrumb={hero.breadcrumb}
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        description={hero.description}
        descriptionShort={hero.descriptionShort}
      />
      <QuickContact items={contactPage.quickContact} />

      {/* Form and offices: side by side on desktop, stacked below xl. */}
      <section aria-label="Contact form and offices" className="bg-white">
        <div className="mx-auto flex w-full max-w-page flex-col gap-8 page-x pt-8 pb-16 md:gap-10 md:py-16 xl:flex-row xl:items-start xl:gap-20 xl:py-section">
          <ContactForm content={clientSafe(contactPage.form)} />
          <ContactInfo />
        </div>
      </section>
    </main>
  );
}
