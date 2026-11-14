import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter, Outfit } from "next/font/google";
import BackToTop from "@/components/BackToTop/BackToTop";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import PopupProvider from "@/components/Popups/PopupProvider";
import JsonLd from "@/components/Seo/JsonLd";
import { organizationJsonLd, site, websiteJsonLd } from "@/lib/seo";
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

/*
 * Defaults for every page (search results, social shares, the browser tab).
 * Each page sets its own title and description with pageMetadata() from
 * lib/seo.ts; " | Techvation" is added to its title here. The tab icons
 * come from app/favicon.ico, app/icon.png and app/apple-icon.png.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    title: site.title,
    description: site.description,
    images: [site.shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.shareImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Paste the code from Google Search Console / Bing Webmaster Tools here
  // (or set the environment variables) to verify the site.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  formatDetection: { telephone: false },
};

/** Colours the phone's browser bar to match the dark navbar. */
export const viewport: Viewport = {
  themeColor: "#0b0820",
};

/** The Google Analytics 4 measurement ID (e.g. "G-ABC123XYZ"), if set. */
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-main">
        {/* Tells search engines who the company is, on every page. */}
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
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
      {/* Google Analytics 4. Only loaded when NEXT_PUBLIC_GA_ID is set, so
          local development without the variable works as before. */}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
