import Glyph from "@/components/Icon/Glyph";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { aboutPage } from "@/data/about";

/**
 * "Our values": centred heading and four value cards.
 * 1 card per row on phones, 2 on tablets, 4 on desktop.
 */
export default function Values() {
  const { values } = aboutPage;

  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-page flex-col items-center section-gap page-x section-y">
        {/* Centred heading at every screen size */}
        <div className="flex max-w-180 flex-col items-center gap-4 text-center">
          <Eyebrow>{values.eyebrow}</Eyebrow>
          <h2 className="font-heading text-h2-sm font-bold text-heading md:text-h2-md xl:text-h2">
            {values.heading.lead}
            <span className="text-gradient-brand">{values.heading.highlight}</span>
          </h2>
        </div>
        <ul className="grid w-full gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {values.items.map((value) => (
            <li
              key={value.title}
              className="flex flex-col items-start gap-3 rounded-post border border-border bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card"
            >
              <span className="mb-2 rounded-chip bg-white p-3 text-primary shadow-chip">
                <Glyph name={value.icon} size={24} />
              </span>
              <h3 className="font-heading text-title font-semibold text-heading">{value.title}</h3>
              <p className="text-small text-body">{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
