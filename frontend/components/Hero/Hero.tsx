import ActionButton from "@/components/Button/ActionButton";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { getHomepage } from "@/lib/cms/content";
import ConsultationForm from "./ConsultationForm";
import HeroBackground from "./HeroBackground";

/**
 * The first section of the page, on top of the dark tech background.
 *
 * - Phones and tablets: one column. Headline, short paragraph, two wide
 *   buttons, then the form.
 * - Desktop (xl and up): headline + buttons on the left, form on the right.
 */
export default async function Hero() {
  const { hero } = await getHomepage();
  return (
    // "isolate" keeps the background layers behind the content of this section only.
    // The top padding leaves room for the navbar that floats above the hero.
    <section className="relative isolate flex flex-col bg-ink pt-navbar-compact xl:min-h-195 xl:pt-navbar">
      <HeroBackground />

      <div className="relative mx-auto flex w-full max-w-page flex-1 flex-col gap-4 page-x pt-8 pb-10 md:pt-12 md:pb-14 xl:flex-row xl:items-center xl:gap-16">
        {/* Text */}
        <div className="flex min-w-0 flex-col items-start gap-4 xl:flex-1">
          {/* Short label on phones, full label from tablets up */}
          <span className="md:hidden">
            <Eyebrow theme="dark">{hero.eyebrowShort}</Eyebrow>
          </span>
          <span className="hidden md:block">
            <Eyebrow theme="dark">{hero.eyebrow}</Eyebrow>
          </span>

          {/* Headline: 40px on phones, 58px on tablets, 68px on desktop */}
          <h1 className="font-heading text-display-sm font-bold text-white md:text-display-md xl:max-w-170 xl:text-display">
            {hero.heading.lead}
            <span className="text-gradient-accent">{hero.heading.highlight}</span>
          </h1>

          {/* Short paragraph on phones and tablets, full paragraph on desktop */}
          <p className="text-body-sm text-white/82 md:text-body-md xl:hidden">
            {hero.descriptionShort}
          </p>
          <p className="hidden max-w-145 text-body-lg text-white/82 xl:block">
            {hero.description}
          </p>

          {/* Buttons: full width and stacked on phones, two equal halves on
              tablets, natural width on desktop */}
          <div className="flex w-full flex-col gap-2.5 md:flex-row md:gap-3 xl:w-auto">
            <ActionButton
              href={hero.primaryAction.href}
              variant="secondary"
              className="w-full md:flex-1 xl:w-auto xl:flex-none"
            >
              {hero.primaryAction.label}
            </ActionButton>
            <ActionButton
              href={hero.secondaryAction.href}
              variant="outlineLight"
              className="w-full md:flex-1 xl:w-auto xl:flex-none"
            >
              {hero.secondaryAction.label}
            </ActionButton>
          </div>
        </div>

        {/* Form */}
        <ConsultationForm form={hero.form} />
      </div>
    </section>
  );
}
