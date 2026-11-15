import type { Metadata } from "next";
import JsonLd from "@/components/Seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import Button from "@/components/Button/Button";
import CultureGallery from "@/components/CareersPage/CultureGallery";
import GeneralApplication from "@/components/CareersPage/GeneralApplication";
import HiringProcess from "@/components/CareersPage/HiringProcess";
import OpenPositions from "@/components/CareersPage/OpenPositions";
import Perks from "@/components/CareersPage/Perks";
import PageHero from "@/components/PageHero/PageHero";
import { getCareersPage } from "@/lib/cms/content";
import { clientSafe } from "@/lib/cms/normalize";

export const metadata: Metadata = pageMetadata({
  title: "Careers: Microsoft, ERP & AI Jobs",
  description:
    "Join Techvation and work on global Microsoft Dynamics, ERP and AI projects. Remote-friendly roles, learning budget and a team that invests in your growth.",
  path: "/careers",
});

/**
 * The Careers page ("05 · Careers" in Figma). Its text and the list of
 * open roles live in /data/careers.ts. The navbar, footer and pop-ups come
 * from app/layout.tsx.
 */
export default async function CareersPage() {
  const careersPage = await getCareersPage();
  const { hero } = careersPage;

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Careers", path: "/careers" }])} />
      <PageHero
        image={hero.image}
        breadcrumb={hero.breadcrumb}
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        description={hero.description}
      >
        <Button href={hero.primaryAction.href} className="w-full md:w-auto">
          {hero.primaryAction.label}
        </Button>
        <Button href={hero.secondaryAction.href} variant="outlineLight" showIcon={false} className="w-full md:w-auto">
          {hero.secondaryAction.label}
        </Button>
      </PageHero>
      <Perks />
      <CultureGallery />
      <OpenPositions content={clientSafe(careersPage.positions)} />
      <HiringProcess />
      <GeneralApplication
        content={clientSafe({ application: careersPage.application, positions: careersPage.positions })}
      />
    </main>
  );
}
