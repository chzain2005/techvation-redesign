import type { Metadata } from "next";
import { contactPage } from "@/data/contact";

/**
 * Everything search engines and social networks read about the site.
 *
 * The live address comes from NEXT_PUBLIC_SITE_URL (set it in the hosting
 * environment); thetechvation.com is the fallback.
 */
export const site = {
  name: "Techvation",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://thetechvation.com").replace(/\/$/, ""),
  title: "Techvation | Microsoft Dynamics 365, ERP, Custom Software & AI Solutions",
  description:
    "Microsoft Dynamics 365, ERP, Odoo and Power BI implementation, custom web and mobile software, and agentic AI for growing businesses in 4 regions.",
  keywords: [
    "Microsoft Dynamics 365 partner",
    "Dynamics 365 implementation",
    "ERP implementation",
    "Odoo ERP partner",
    "Power BI consulting",
    "custom software development",
    "web development company",
    "mobile app development",
    "agentic AI solutions",
    "AI consulting",
    "AI marketing",
    "managed IT services",
    "Techvation",
  ],
  /** Shared when a page is posted on LinkedIn, Facebook, X, WhatsApp… */
  shareImage: { url: "/og-image.png", width: 1200, height: 630, alt: "Techvation: Microsoft Dynamics, ERP, custom software and AI" },
  email: contactPage.offices[0].email,
  logo: "/assets/logos/techvation-icon.png",
};

/** Turns "/services" into "https://thetechvation.com/services". */
export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

type PageSeo = {
  /** The page name; " | Techvation" is added by the layout. */
  title: string;
  description: string;
  /** The page address, e.g. "/about". */
  path: string;
  /** A picture for social shares; the site share image otherwise. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

/**
 * The metadata of one page: title, description, canonical address and the
 * Open Graph / X (Twitter) cards, so every page looks right in Google and
 * when it is shared.
 */
export function pageMetadata({ title, description, path, image, type = "website", publishedTime, noIndex }: PageSeo): Metadata {
  const images = image ? [{ url: image, alt: title }] : [site.shareImage];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: "en_US",
      title: `${title} | ${site.name}`,
      description,
      images,
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: images.map((item) => item.url),
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}

/** A "Home > Section > Page" trail, shown by Google under the result. */
export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Who Techvation is: name, logo, offices and contact details. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: absoluteUrl(site.logo),
    image: absoluteUrl(site.shareImage.url),
    description: site.description,
    email: site.email,
    areaServed: ["North America", "Middle East", "Africa", "Asia Pacific"],
    knowsAbout: ["Microsoft Dynamics 365", "ERP", "Odoo", "Power BI", "Custom software development", "Artificial intelligence"],
    address: contactPage.offices.map((office) => ({
      "@type": "PostalAddress",
      addressLocality: office.location.split(",")[0].trim(),
      addressCountry: office.location.split(",").at(-1)?.trim(),
    })),
    contactPoint: contactPage.offices.map((office) => ({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: office.phone.href.replace("tel:", ""),
      email: office.email,
      areaServed: office.location.split(",").at(-1)?.trim(),
      availableLanguage: ["English"],
    })),
  };
}

/** The site itself, linked to the organisation. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  };
}
