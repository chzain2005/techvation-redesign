import type { Metadata } from "next";
import ComingSoonHero from "@/components/SolutionsPage/ComingSoonHero";
import SneakPeek from "@/components/SolutionsPage/SneakPeek";

export const metadata: Metadata = {
  title: "Industry Solutions (coming soon) | Techvation",
  description:
    "Ready-made industry packages on Dynamics 365, Odoo, Power BI and AI are on their way. Get notified at launch.",
};

/**
 * The Solutions page ("10 · Solutions (Coming soon)" in Figma). The navbar,
 * footer and pop-ups come from app/layout.tsx.
 */
export default function SolutionsPage() {
  return (
    <main>
      <ComingSoonHero />
      <SneakPeek />
    </main>
  );
}
