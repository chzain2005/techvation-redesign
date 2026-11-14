import Image from "next/image";
import ActionButton from "@/components/Button/ActionButton";
import Button from "@/components/Button/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Breadcrumb from "@/components/ServicePage/Breadcrumb";
import { aboutPage } from "@/data/about";
import { cta } from "@/data/homepage";

/**
 * The top section of the About Us page: a team photo behind a dark purple
 * fade, breadcrumb, label, headline, paragraph and two buttons
 * ("Work With Us" opens the consultation pop-up, "Meet the Team" scrolls to
 * the Leadership section). Buttons are full width and stacked on phones.
 */
export default function AboutHero() {
  const { hero } = aboutPage;

  return (
    // The top padding leaves room for the navbar that floats above the hero.
    <section className="relative isolate overflow-hidden bg-ink pt-navbar-compact xl:min-h-160 xl:pt-navbar">
      <Image src={hero.image} alt="" fill preload sizes="100vw" className="-z-20 object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(11 8 32 / 0.95) 0%, rgb(28 22 69 / 0.8) 55%, rgb(61 42 141 / 0.55) 100%), linear-gradient(180deg, rgb(11 8 32 / 0.2) 0%, rgb(61 42 141 / 0.6) 100%)",
        }}
      />

      <div className="mx-auto flex w-full max-w-page flex-col items-start gap-4 page-x pt-8 pb-12 md:pt-12 md:pb-16 xl:pt-20 xl:pb-24">
        <Breadcrumb trail={[{ label: "Home", href: "/" }]} current={hero.breadcrumb} />
        <Eyebrow theme="dark">{hero.eyebrow}</Eyebrow>
        <h1 className="max-w-200 font-heading text-page-title-sm font-bold text-white md:text-display-md xl:text-display">
          {hero.heading.lead}
          <span className="text-gradient-accent">{hero.heading.highlight}</span>
        </h1>
        <p className="max-w-160 text-body-sm text-white/82 md:text-body-md xl:text-body-lg">{hero.description}</p>
        <div className="flex w-full flex-col gap-2.5 pt-2 md:w-auto md:flex-row md:gap-3">
          <ActionButton href={cta.freeConsultation.href} className="w-full md:w-auto">
            {hero.primaryLabel}
          </ActionButton>
          <Button
            href={hero.secondaryAction.href}
            variant="outlineLight"
            showIcon={false}
            className="w-full md:w-auto"
          >
            {hero.secondaryAction.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
