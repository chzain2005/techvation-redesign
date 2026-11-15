import Image from "next/image";
import Glyph from "@/components/Icon/Glyph";
import { getAboutPage } from "@/lib/cms/content";

/**
 * "Our mission" and "Our vision" as two glass cards on the dark background,
 * stacked on phones and tablets, side by side on desktop.
 */
export default async function MissionVision() {
  const aboutPage = await getAboutPage();
  const cards = [aboutPage.mission, aboutPage.vision];

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src="/assets/images/about/mission-glow-1.svg"
        alt=""
        width={800}
        height={700}
        className="pointer-events-none absolute -top-62.5 -left-50 -z-10 max-w-none"
      />
      <Image
        src="/assets/images/service-page/process-glow-2.svg"
        alt=""
        width={700}
        height={600}
        className="pointer-events-none absolute top-25 left-[62%] -z-10 max-w-none"
      />

      <ul className="mx-auto grid w-full max-w-page gap-6 page-x section-y xl:grid-cols-2">
        {cards.map((card) => (
          <li
            key={card.title}
            className="flex flex-col items-start gap-4.5 rounded-feature border border-white/12 bg-white/5 p-7 md:p-10"
          >
            <span className="rounded-2xl bg-brand p-3.5 text-white">
              <Glyph name={card.icon} size={26} />
            </span>
            <h2 className="font-heading text-popup-title-sm font-semibold text-white md:text-popup-title-lg">
              {card.title}
            </h2>
            <p className="text-body-base text-on-dark md:text-body-lg">{card.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
