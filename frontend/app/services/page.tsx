import type { Metadata } from "next";
import CategoryBar from "@/components/ServicesPage/CategoryBar";
import EngagementModels from "@/components/ServicesPage/EngagementModels";
import ServiceGroup from "@/components/ServicesPage/ServiceGroup";
import ServicesHero from "@/components/ServicesPage/ServicesHero";
import { serviceCategories } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Techvation",
  description:
    "Microsoft Dynamics 365, ERP, web, mobile and custom software, agentic AI and managed services. One accountable team.",
};

/**
 * The Services page ("02 · Services" in Figma): hero with a service finder,
 * a sticky row of practice-area tabs, one group of cards per practice area,
 * and the engagement models. The navbar, footer and pop-ups come from
 * app/layout.tsx.
 */
export default function ServicesPage() {
  return (
    // "clip" (not "hidden") on the x axis keeps the category bar sticky.
    <main className="overflow-x-clip">
      <ServicesHero />
      <CategoryBar />
      {serviceCategories.map((category, i) => (
        <ServiceGroup key={category.id} category={category} index={i} />
      ))}
      <EngagementModels />
    </main>
  );
}
