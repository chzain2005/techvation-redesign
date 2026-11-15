import type { Metadata } from "next";
import JsonLd from "@/components/Seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import AboutHero from "@/components/AboutPage/AboutHero";
import GlobalPresence from "@/components/AboutPage/GlobalPresence";
import Leadership from "@/components/AboutPage/Leadership";
import MissionVision from "@/components/AboutPage/MissionVision";
import OurStory from "@/components/AboutPage/OurStory";
import Values from "@/components/AboutPage/Values";
import TrustedLogos from "@/components/TrustedLogos/TrustedLogos";

export const metadata: Metadata = pageMetadata({
  title: "About Us: Microsoft Dynamics, ERP & AI Experts",
  description:
    "Meet Techvation: certified Microsoft Dynamics 365, ERP and AI consultants delivering projects across North America, the Middle East, Africa and Asia Pacific.",
  path: "/about",
});

/**
 * The About Us page ("04 · About Us" in Figma). Its text lives in
 * /data/about.ts. The navbar, footer and pop-ups come from app/layout.tsx.
 */
export default function AboutPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "About Us", path: "/about" }])} />
      <AboutHero />
      <OurStory />
      <MissionVision />
      <Values />
      <Leadership />
      <GlobalPresence />
      <TrustedLogos />
    </main>
  );
}
