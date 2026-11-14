import Image from "next/image";
import Glyph from "@/components/Icon/Glyph";
import { aboutPage } from "@/data/about";

/**
 * "Our mission" and "Our vision" as two glass cards on the dark background,
 * stacked on phones and tablets, side by side on desktop.
 */
export default function MissionVision() {
  const cards = [aboutPage.mission, aboutPage.vision];

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src="/assets/images/service-page/process-glow-1.svg"
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
            className="flex flex-col items-start gap-4 rounded-feature border border-white/14 bg-white/6 p-7 backdrop-blur-md md:p-10"
          >
            <span className="rounded-chip bg-brand p-3 text-white">
              <Glyph name={card.icon} size={22} />
            </span>
            <h2 className="mt-2 font-heading text-stat font-semibold text-white">{card.title}</h2>
            <p className="text-body-base text-on-dark md:text-body-lg">{card.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
