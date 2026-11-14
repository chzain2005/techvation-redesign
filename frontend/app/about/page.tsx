import type { Metadata } from "next";
import AboutHero from "@/components/AboutPage/AboutHero";
import GlobalPresence from "@/components/AboutPage/GlobalPresence";
import Leadership from "@/components/AboutPage/Leadership";
import MissionVision from "@/components/AboutPage/MissionVision";
import OurStory from "@/components/AboutPage/OurStory";
import Values from "@/components/AboutPage/Values";
import TrustedLogos from "@/components/TrustedLogos/TrustedLogos";

export const metadata: Metadata = {
  title: "About Us | Techvation",
  description:
    "Techvation helps companies across four regions modernise with Microsoft Dynamics 365, ERP, custom software and AI.",
};

/**
 * The About Us page ("04 · About Us" in Figma). Its text lives in
 * /data/about.ts. The navbar, footer and pop-ups come from app/layout.tsx.
 */
export default function AboutPage() {
  return (
    <main>
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
