import Image from "next/image";
import Link from "next/link";
import ActionButton from "@/components/Button/ActionButton";
import HomeLink from "@/components/HomeLink/HomeLink";
import Icon from "@/components/Icon/Icon";
import type { footer as footerContent } from "@/data/homepage";
import { getSiteContent } from "@/lib/cms/content";
import NewsletterForm from "./NewsletterForm";

type Footer = typeof footerContent;
type FooterProps = { footer: Footer };

/* Shared styles for the footer columns. */
const columnTitleClasses = "text-eyebrow font-semibold text-accent uppercase";
const linkClasses =
  "flex items-center gap-2 text-body-sm text-white/72 transition-colors hover:text-white";

/** The small "SOON" tag next to a footer link. */
function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-accent/15 px-1.75 py-0.5 text-micro font-medium text-accent">
      {children}
    </span>
  );
}

/** Row of round social media buttons (used by both footer layouts). */
function SocialLinks({ footer }: FooterProps) {
  return (
    <ul className="flex gap-3">
      {footer.social.map((item) => (
        <li key={item.name}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="block rounded-full border border-white/12 bg-white/6 p-2.75 transition-colors hover:bg-white/12"
          >
            <Icon src={item.icon} size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * The gradient call-to-action band at the top of the footer.
 * - Phones and tablets: text, then three full-width stacked buttons.
 * - Desktop: text on the left, the three buttons in a row on the right.
 */
function FooterCta({ footer }: FooterProps) {
  const { cta } = footer;

  return (
    <div className="bg-brand-deep">
      <div className="mx-auto flex w-full max-w-page flex-col gap-3.5 px-6 py-14 md:px-10 xl:flex-row xl:items-center xl:justify-between xl:p-gutter">
        <div className="flex flex-col gap-3.5">
          {/* Headline: 30px on small screens, 44px (tighter) on desktop */}
          <h2 className="font-heading text-h2-xs font-bold text-white xl:text-h2 xl:leading-display xl:tracking-display">
            {cta.heading.lead}
            <span className="text-accent-ice">{cta.heading.highlight}</span>
            {cta.heading.tail}
          </h2>
          <p className="text-body-base text-white/85 xl:text-body-lg">{cta.description}</p>
        </div>

        {/* The same three buttons everywhere: "Free Consultation" (solid white),
            "Let's Talk" and "Schedule a Call" (no arrow), as in the design.
            Phones and tablets: large, full width and stacked.
            Desktop: in a row. */}
        <div className="mt-1.5 flex flex-col gap-3.5 xl:hidden">
          {cta.actions.map((action, i) => (
            <ActionButton
              key={action.label}
              href={action.href}
              variant={i === 0 ? "secondary" : "outlineLight"}
              showIcon={i < cta.actions.length - 1}
              className="w-full"
            >
              {action.label}
            </ActionButton>
          ))}
        </div>
        <div className="hidden shrink-0 gap-3.5 xl:flex">
          {cta.actions.map((action, i) => (
            <ActionButton
              key={action.label}
              href={action.href}
              variant={i === 0 ? "secondary" : "outlineLight"}
              showIcon={i < cta.actions.length - 1}
            >
              {action.label}
            </ActionButton>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Footer body for phones and tablets ("Footer / Compact" in Figma):
 * one column with logo, short text, two link columns, a contact card,
 * the newsletter form and the social buttons.
 */
function FooterCompact({ footer }: FooterProps) {
  return (
    <div className="flex flex-col items-start gap-10 px-6 pt-14 pb-10 md:px-10 xl:hidden">
      <HomeLink className="relative h-9 w-37.5">
        <Image
          src={footer.logo.src}
          alt={footer.logo.alt}
          fill
          sizes="150px"
          className="object-contain"
        />
      </HomeLink>
      <p className="text-body-sm text-on-dark">{footer.aboutShort}</p>

      {/* Two link columns of equal width */}
      <div className="flex w-full gap-6">
        {footer.columnsCompact.map((column) => (
          <nav key={column.title} aria-label={column.title} className="min-w-0 flex-1">
            <h3 className={`${columnTitleClasses} mb-4`}>{column.title}</h3>
            <ul className="flex flex-col gap-4">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClasses}>
                    {link.label}
                    {link.badge && <Badge>{link.badge}</Badge>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Contact card: only the items that are links (phones and email) */}
      <ul className="flex w-full flex-col gap-3.5 rounded-reason border border-white/8 bg-white/4 p-5">
        {footer.contact.items
          .filter((item) => item.href)
          .map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="flex items-center gap-3 text-body-sm text-white/80 hover:text-white"
              >
                <Icon src={item.icon} size={16} />
                {item.label}
              </a>
            </li>
          ))}
      </ul>

      {/* Newsletter */}
      <div className="flex w-full flex-col gap-3">
        <h3 className="font-heading text-title-sm font-semibold text-white">
          {footer.newsletter.titleShort}
        </h3>
        <NewsletterForm newsletter={footer.newsletter} />
      </div>

      <SocialLinks footer={footer} />
    </div>
  );
}

/**
 * Footer body for desktop: logo + about text + social buttons on the left,
 * three link columns on the right, and the newsletter box underneath.
 */
function FooterDesktop({ footer }: FooterProps) {
  return (
    <div className="hidden xl:block">
      <div className="mx-auto flex w-full max-w-page items-start justify-between px-gutter pt-24 pb-20">
        {/* Brand */}
        <div className="flex w-95 flex-col items-start gap-7">
          {/* The logo always goes to the top of the homepage. */}
          <HomeLink className="relative h-11 w-45">
            <Image
              src={footer.logo.src}
              alt={footer.logo.alt}
              fill
              sizes="180px"
              className="object-contain"
            />
          </HomeLink>
          <p className="max-w-90 text-body-sm text-on-dark">{footer.about}</p>
          <SocialLinks footer={footer} />
        </div>

        {/* Columns */}
        <div className="flex gap-18">
          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className={`${columnTitleClasses} mb-5.5`}>{column.title}</h3>
              <ul className="flex flex-col gap-4.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClasses}>
                      {link.label}
                      {link.arrow && (
                        <Icon src="/assets/icons/arrow-right-accent-14.svg" size={14} />
                      )}
                      {link.badge && <Badge>{link.badge}</Badge>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact column: each row has an icon in front */}
          <div>
            <h3 className={`${columnTitleClasses} mb-5.5`}>{footer.contact.title}</h3>
            <ul className="flex flex-col gap-4.5">
              {footer.contact.items.map((item) => (
                <li key={item.label}>
                  {/* Phone and email are links; the location is plain text. */}
                  {item.href ? (
                    <a href={item.href} className={`${linkClasses} gap-3`}>
                      <Icon src={item.icon} size={16} />
                      {item.label}
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 text-body-sm text-white/72">
                      <Icon src={item.icon} size={16} />
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
              <li>
                <Link href={footer.contact.link.href} className={linkClasses}>
                  {footer.contact.link.label}
                  <Icon src="/assets/icons/arrow-right-accent-14.svg" size={14} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter box */}
      <div className="mx-auto w-full max-w-page px-gutter pb-16">
        <div className="flex items-center justify-between rounded-card border border-white/8 bg-white/4 px-8 py-7">
          <div className="flex flex-col gap-1.5">
            <h3 className="font-heading text-title font-semibold text-white">
              {footer.newsletter.title}
            </h3>
            <p className="text-small text-on-dark">{footer.newsletter.description}</p>
          </div>
          <NewsletterForm newsletter={footer.newsletter} />
        </div>
      </div>
    </div>
  );
}

/**
 * The page footer. From top to bottom:
 *   1. gradient call-to-action band
 *   2. footer body (a compact version for phones and tablets, a wide version
 *      for desktop; each hides itself on the other screen sizes)
 *   3. copyright bar
 */
export default async function Footer() {
  const { footer } = await getSiteContent();
  return (
    <footer className="bg-ink">
      <FooterCta footer={footer} />
      <FooterCompact footer={footer} />
      <FooterDesktop footer={footer} />

      {/* Copyright bar: centred and stacked on small screens, one row on desktop */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex w-full max-w-page flex-col items-center gap-2.5 px-6 pt-6 pb-8 text-caption font-medium text-muted md:px-10 xl:flex-row xl:justify-between xl:px-gutter xl:pt-7 xl:pb-9 xl:text-small xl:font-normal">
          <p>{footer.copyright}</p>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 xl:gap-x-8">
            {footer.legalLinks.map((link, i) => (
              // The sitemap link is only shown on desktop, as in the design.
              <li
                key={link.label}
                className={i === footer.legalLinks.length - 1 ? "hidden xl:block" : ""}
              >
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
