import type { Metadata } from "next";
import JsonLd from "@/components/Seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import CategoryBar from "@/components/ServicesPage/CategoryBar";
import EngagementModels from "@/components/ServicesPage/EngagementModels";
import ServiceGroup from "@/components/ServicesPage/ServiceGroup";
import ServicesHero from "@/components/ServicesPage/ServicesHero";
import { getServices } from "@/lib/cms/content";

export const metadata: Metadata = pageMetadata({
  title: "IT Services: Dynamics 365, ERP, Software & AI",
  description:
    "Microsoft Dynamics 365, Power BI, ERP and Odoo implementation, web and mobile development, agentic AI and managed IT services, delivered by one accountable team.",
  path: "/services",
});

/**
 * The Services page ("02 · Services" in Figma): hero with a service finder,
 * a sticky row of practice-area tabs, one group of cards per practice area,
 * and the engagement models. The navbar, footer and pop-ups come from
 * app/layout.tsx.
 */
export default async function ServicesPage() {
  const { categories: serviceCategories } = await getServices();
  return (
    // "clip" (not "hidden") on the x axis keeps the category bar sticky.
    <main className="overflow-x-clip">
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <ServicesHero />
      <CategoryBar serviceCategories={serviceCategories} />
      {serviceCategories.map((category, i) => (
        <ServiceGroup key={category.id} category={category} index={i} />
      ))}
      <EngagementModels />
    </main>
  );
}
