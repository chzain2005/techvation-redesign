import Blog from "@/components/Blog/Blog";
import Hero from "@/components/Hero/Hero";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Industries from "@/components/Industries/Industries";
import Services from "@/components/Services/Services";
import StrategyCall from "@/components/StrategyCall/StrategyCall";
import TrustedLogos from "@/components/TrustedLogos/TrustedLogos";
import UniqueValue from "@/components/UniqueValue/UniqueValue";
import WhyTechvation from "@/components/WhyTechvation/WhyTechvation";
import { getHomepage } from "@/lib/cms/content";

/**
 * The homepage. It only lists the sections in the order they appear in the
 * Figma frame "01 · Home". Each section is its own component in /components,
 * and all of their content comes from the CMS (Pages → Homepage, plus the
 * Services, Client logos, Industries and Blog posts collections).
 *
 * The navbar, footer and pop-ups come from app/layout.tsx.
 */
export default async function Home() {
  const { blog } = await getHomepage();
  return (
    <main>
      <Hero />
      <TrustedLogos />
      <UniqueValue />
      <Services />
      <WhyTechvation />
      <HowWeWork />
      <Industries />
      <StrategyCall />
      <Blog blog={blog} />
    </main>
  );
}
