import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
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
      <body className="flex min-h-full flex-col font-main">{children}</body>
    </html>
  );
}
