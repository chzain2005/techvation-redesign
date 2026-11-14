import Glyph from "@/components/Icon/Glyph";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { careersPage } from "@/data/careers";

/**
 * "Perks that help you do your best work": six lavender cards with a
 * gradient icon tile on the left. 1 per row on phones, 2 on tablets,
 * 3 on desktop.
 */
export default function Perks() {
  const { perks } = careersPage;

  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-page flex-col section-gap page-x section-y">
        <SectionHeader eyebrow={perks.eyebrow} heading={perks.heading} headingClassName="xl:max-w-180" />
        <ul className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {perks.items.map((perk) => (
            <li
              key={perk.title}
              className="flex items-start gap-4.5 rounded-post border border-border bg-surface p-6 md:p-7"
            >
              <span className="rounded-chip bg-brand p-3 text-white">
                <Glyph name={perk.icon} size={22} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="font-heading text-subtitle font-semibold text-heading">{perk.title}</span>
                <span className="text-small text-body">{perk.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
