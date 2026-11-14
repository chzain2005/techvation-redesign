import Image from "next/image";
import type { ReactNode } from "react";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Breadcrumb from "@/components/ServicePage/Breadcrumb";
import type { HighlightedHeading } from "@/data/homepage";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  /** Background photo. */
  image: string;
  /** Name of this page in the breadcrumb ("Home / <breadcrumb>"). */
  breadcrumb: string;
  eyebrow: string;
  heading: HighlightedHeading;
  description: string;
  /** Optional shorter paragraph shown on phones instead of `description`. */
  descriptionShort?: string;
  /**
   * Centred version (FAQs): everything centred, a shorter hero (560px on
   * desktop) and slightly stronger fades.
   */
  centered?: boolean;
  /** Whatever goes under the paragraph: buttons, a search bar... */
  children?: ReactNode;
};

const fades = {
  default:
    "linear-gradient(180deg, rgb(11 8 32 / 0.2) 0%, rgb(11 8 32 / 0.85) 100%), linear-gradient(90deg, rgb(11 8 32 / 0.95) 0%, rgb(28 22 69 / 0.6) 100%)",
  centered:
    "linear-gradient(180deg, rgb(11 8 32 / 0.3) 0%, rgb(11 8 32 / 0.9) 100%), linear-gradient(90deg, rgb(11 8 32 / 0.95) 0%, rgb(28 22 69 / 0.75) 100%)",
};

/**
 * The dark top section of inner pages such as About Us and Careers
 * ("Page Hero" in Figma): a photo behind two dark fades and two soft glows,
 * then breadcrumb, label, headline, paragraph and buttons.
 *
 * Headline: 32px on phones, 58px on tablets, 60px on desktop.
 * The buttons are full width and stacked on phones.
 */
export default function PageHero({
  image,
  breadcrumb,
  eyebrow,
  heading,
  description,
  descriptionShort,
  centered = false,
  children,
}: PageHeroProps) {
  return (
    // The top padding leaves room for the navbar that floats above the hero.
    <section
      className={cn(
        "relative isolate overflow-hidden bg-ink pt-navbar-compact xl:flex xl:flex-col xl:pt-navbar",
        centered ? "xl:h-140" : "xl:h-160",
      )}
    >
      <Image src={image} alt="" fill preload sizes="100vw" className="-z-20 object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: centered ? fades.centered : fades.default }}
      />
      <Image
        src="/assets/images/service-page/hero-glow-1.svg"
        alt=""
        width={700}
        height={700}
        className="pointer-events-none absolute -top-37.5 left-[59%] -z-10 max-w-none"
      />
      <Image
        src="/assets/images/service-page/hero-glow-2.svg"
        alt=""
        width={700}
        height={700}
        className="pointer-events-none absolute top-75 -left-62.5 -z-10 max-w-none"
      />

      <div
        className={cn(
          "mx-auto flex w-full max-w-page flex-col justify-center gap-4 page-x pt-8 pb-12 md:pt-12 md:pb-16 xl:flex-1 xl:pb-16",
          centered ? "items-center text-center xl:pt-12" : "items-start xl:pt-14",
        )}
      >
        <Breadcrumb trail={[{ label: "Home", href: "/" }]} current={breadcrumb} />
        <Eyebrow theme="dark">{eyebrow}</Eyebrow>
        <h1
          className={cn(
            "font-heading text-page-title-sm font-bold text-white md:text-display-md",
            centered ? "max-w-215 xl:text-display-md" : "max-w-225 xl:text-page-title-lg",
          )}
        >
          {heading.lead}
          <span className="text-gradient-accent">{heading.highlight}</span>
        </h1>
        <p
          className={cn(
            "text-body-sm text-white/82 md:text-body-md xl:text-body-lg",
            centered ? "max-w-160" : "max-w-180",
            descriptionShort && "max-md:hidden",
          )}
        >
          {description}
        </p>
        {descriptionShort && <p className="text-body-sm text-white/82 md:hidden">{descriptionShort}</p>}
        {children && (
          <div className={cn("flex w-full flex-col gap-2.5 md:flex-row md:gap-3", centered ? "md:justify-center" : "md:w-auto")}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
