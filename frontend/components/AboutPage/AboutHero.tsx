import ActionButton from "@/components/Button/ActionButton";
import Button from "@/components/Button/Button";
import PageHero from "@/components/PageHero/PageHero";
import { aboutPage } from "@/data/about";
import { cta } from "@/data/homepage";

/**
 * The About Us hero: "Work With Us" opens the consultation pop-up and
 * "Meet the Team" scrolls to the Leadership section.
 */
export default function AboutHero() {
  const { hero } = aboutPage;

  return (
    <PageHero
      image={hero.image}
      breadcrumb={hero.breadcrumb}
      eyebrow={hero.eyebrow}
      heading={hero.heading}
      description={hero.description}
    >
      <ActionButton href={cta.freeConsultation.href} className="w-full md:w-auto">
        {hero.primaryLabel}
      </ActionButton>
      <Button href={hero.secondaryAction.href} variant="outlineLight" showIcon={false} className="w-full md:w-auto">
        {hero.secondaryAction.label}
      </Button>
    </PageHero>
  );
}
