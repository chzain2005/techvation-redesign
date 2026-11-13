import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RelatedServices from "@/components/ServicePage/RelatedServices";
import ServiceCapabilities from "@/components/ServicePage/ServiceCapabilities";
import ServiceFaq from "@/components/ServicePage/ServiceFaq";
import ServiceHero from "@/components/ServicePage/ServiceHero";
import ServiceOutcomes from "@/components/ServicePage/ServiceOutcomes";
import ServiceOverview from "@/components/ServicePage/ServiceOverview";
import ServiceProcess from "@/components/ServicePage/ServiceProcess";
import ServiceTech from "@/components/ServicePage/ServiceTech";
import { getService, serviceDetails } from "@/data/services";

/** Build one page per service ahead of time, e.g. /services/power-bi. */
export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Techvation`,
    description: service.hero.description,
  };
}

/**
 * A service page ("03 · Service · …" frames in Figma). All twelve services
 * share this layout; the content comes from /data/services.ts.
 * The navbar, footer and pop-ups come from app/layout.tsx.
 */
export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main>
      <ServiceHero service={service} />
      <ServiceOutcomes outcomes={service.outcomes} />
      <ServiceOverview service={service} />
      <ServiceCapabilities capabilities={service.capabilities} />
      <ServiceProcess serviceTitle={service.title} />
      <ServiceTech serviceTitle={service.title} tools={service.tools} />
      <ServiceFaq serviceTitle={service.title} faqs={service.faqs} />
      <RelatedServices slugs={service.related} />
    </main>
  );
}
