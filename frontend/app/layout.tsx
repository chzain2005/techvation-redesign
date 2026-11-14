import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import BackToTop from "@/components/BackToTop/BackToTop";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import PopupProvider from "@/components/Popups/PopupProvider";
import "./globals.css";

/*
 * Fonts from the Figma design, loaded with next/font (self-hosted, no layout shift).
 * Each font exposes a CSS variable that globals.css maps to a Tailwind class:
 *   Inter  -> --font-inter  -> font-main     (body text, buttons, labels)
 *   Outfit -> --font-outfit -> font-heading  (headings and card titles)
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Techvation | Microsoft Dynamics, ERP & AI Solutions",
  description:
    "We help companies modernise with Microsoft Dynamics 365, ERP, custom software and agentic AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-main">
        {/* Every page shares the navbar, the footer and the pop-ups (free
            consultation, schedule a call), which any section can open. */}
        <PopupProvider>
          {/* The navbar floats on top of each page's dark hero. */}
          <Navbar />
          {children}
          <Footer />
          {/* Round arrow in the bottom-right corner, back to the top of the page */}
          <BackToTop />
        </PopupProvider>
      </body>
    </html>
  );
}
