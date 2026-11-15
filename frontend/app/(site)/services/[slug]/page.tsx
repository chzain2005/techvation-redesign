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
import JsonLd from "@/components/Seo/JsonLd";
import { getService, getServices } from "@/lib/cms/content";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, site } from "@/lib/seo";

/**
 * Pages added in the CMS after the last build were not prerendered. This
 * lets their first visit render the full page on the server (and get a real
 * 404 for unknown addresses); after that the page is cached like the rest.
 */
export const instant = false;

/** Build one page per service ahead of time, e.g. /services/power-bi. */
export async function generateStaticParams() {
  const { services } = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = (await getService(slug))?.service;
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} Services`,
    description: service.hero.description,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

/**
 * A service page ("03 · Service · …" frames in Figma). All twelve services
 * share this layout; the content comes from the CMS (Services collection).
 * The navbar, footer and pop-ups come from app/layout.tsx.
 */
export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = (await getService(slug))?.service;
  if (!service) notFound();

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            serviceType: service.title,
            description: service.hero.description,
            url: absoluteUrl(`/services/${service.slug}`),
            image: absoluteUrl(service.image),
            provider: { "@id": `${site.url}/#organization` },
            areaServed: ["North America", "Middle East", "Africa", "Asia Pacific"],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]}
      />
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
