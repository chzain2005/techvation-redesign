import Image from "next/image";
import Glyph from "@/components/Icon/Glyph";
import { getSolutionsPage } from "@/lib/cms/content";
import Countdown from "./Countdown";
import NotifyForm from "./NotifyForm";

/**
 * The dark, centred "Coming soon" hero of the Solutions page: label,
 * headline, paragraph, live countdown, "notify me" form and a small note.
 * Behind it: two soft colour glows and a faint grid that fades out at the
 * edges.
 */
export default async function ComingSoonHero() {
  const solutionsPage = await getSolutionsPage();
  const { hero, notify } = solutionsPage;

  return (
    // The top padding leaves room for the navbar that floats above the hero.
    <section className="relative isolate overflow-hidden bg-ink pt-navbar-compact xl:min-h-215 xl:pt-navbar">
      <Image
        src="/assets/images/service-page/hero-glow-1.svg"
        alt=""
        width={1000}
        height={900}
        className="pointer-events-none absolute -top-50 -left-50 -z-10 max-w-none"
      />
      <Image
        src="/assets/images/service-page/hero-glow-2.svg"
        alt=""
        width={900}
        height={800}
        className="pointer-events-none absolute top-25 left-[49%] -z-10 max-w-none"
      />
      {/* Faint 64px grid, faded out towards the edges */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="mx-auto flex w-full max-w-page flex-col items-center gap-5 page-x pt-12 pb-16 text-center md:gap-6 md:pt-16 md:pb-20 xl:pt-30 xl:pb-24">
        <p className="flex items-center gap-2 rounded-full border border-white/18 bg-white/8 py-2 pr-4 pl-4 text-eyebrow font-semibold text-white uppercase">
          <Glyph name="sparkles" size={16} className="text-accent" />
          {hero.eyebrow}
        </p>
        <h1 className="max-w-225 font-heading text-display-sm font-bold text-white md:text-display-md xl:text-display">
          {hero.heading.lead}
          <span className="text-gradient-accent">{hero.heading.highlight}</span>
        </h1>
        <p className="max-w-160 text-body-sm text-white/82 md:text-body-lg">{hero.description}</p>

        <div className="mt-2 flex w-full flex-col items-center gap-5 md:mt-4 md:gap-6">
          <Countdown launchDate={solutionsPage.launchDate} />
          <NotifyForm
            notify={{
              label: notify.label,
              placeholder: notify.placeholder,
              submitLabel: notify.submitLabel,
              successTitle: notify.successTitle,
              successText: notify.successText,
            }}
          />
          <p className="text-caption font-medium text-white/55">{notify.note}</p>
        </div>
      </div>
    </section>
  );
}
