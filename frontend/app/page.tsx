import Blog from "@/components/Blog/Blog";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Industries from "@/components/Industries/Industries";
import Navbar from "@/components/Navbar/Navbar";
import Services from "@/components/Services/Services";
import StrategyCall from "@/components/StrategyCall/StrategyCall";
import TrustedLogos from "@/components/TrustedLogos/TrustedLogos";
import UniqueValue from "@/components/UniqueValue/UniqueValue";
import WhyTechvation from "@/components/WhyTechvation/WhyTechvation";

/**
 * The homepage. It only lists the sections in the order they appear in the
 * Figma frame "01 · Home". Each section is its own component in /components,
 * and all of their text comes from /data/homepage.ts.
 */
export default function Home() {
  return (
    <>
      {/* The navbar floats on top of the hero. */}
      <Navbar />
      <main>
        <Hero />
        <TrustedLogos />
        <UniqueValue />
        <Services />
        <WhyTechvation />
        <HowWeWork />
        <Industries />
        <StrategyCall />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
