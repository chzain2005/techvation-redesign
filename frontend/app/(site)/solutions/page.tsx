import type { Metadata } from "next";
import JsonLd from "@/components/Seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import ComingSoonHero from "@/components/SolutionsPage/ComingSoonHero";
import SneakPeek from "@/components/SolutionsPage/SneakPeek";

export const metadata: Metadata = pageMetadata({
  title: "Industry Solutions (Coming Soon)",
  description:
    "Ready-made industry solutions on Dynamics 365, Odoo, Power BI and AI are on their way. Get notified when Techvation launches them.",
  path: "/solutions",
});

/**
 * The Solutions page ("10 · Solutions (Coming soon)" in Figma). The navbar,
 * footer and pop-ups come from app/layout.tsx.
 */
export default function SolutionsPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Solutions", path: "/solutions" }])} />
      <ComingSoonHero />
      <SneakPeek />
    </main>
  );
}
