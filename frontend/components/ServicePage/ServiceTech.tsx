import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Glyph from "@/components/Icon/Glyph";
import { getServicesPageContent } from "@/lib/cms/content";

/**
 * "Technologies" chips on the left and the dark "Why choose Techvation"
 * card on the right. The phone design leaves this section out, so it shows
 * from tablets up: stacked on tablets, side by side on desktop.
 */
export default async function ServiceTech({ serviceTitle, tools }: { serviceTitle: string; tools: string[] }) {
  const { serviceDetailPage } = await getServicesPageContent();
  const { tech } = serviceDetailPage;

  return (
    <section className="hidden bg-white md:block">
      <div className="mx-auto flex w-full max-w-page flex-col gap-10 page-x section-y xl:flex-row xl:items-start xl:gap-20">
        <div className="flex flex-col items-start gap-4 xl:flex-1">
          <Eyebrow>{tech.eyebrow}</Eyebrow>
          <h2 className="font-heading text-popup-title-lg font-semibold text-heading">{tech.title}</h2>
          <ul className="flex flex-wrap gap-2.5 xl:max-w-140">
            {tools.map((tool) => (
              <li
                key={tool}
                className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-label font-semibold text-primary-dark"
              >
                <span aria-hidden className="size-2 rounded-full bg-brand" />
                {tool}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4.5 rounded-feature bg-linear-150 from-ink-soft to-ink-violet p-9 xl:w-150 xl:shrink-0">
          <h2 className="font-heading text-popup-title font-semibold text-white">
            {tech.whyTitle(serviceTitle)}
          </h2>
          <ul className="flex flex-col gap-4.5">
            {tech.reasons.map((reason) => (
              <li key={reason.title} className="flex items-start gap-3.5">
                <span className="rounded-xl bg-white/10 p-2.5 text-accent">
                  <Glyph name={reason.icon} size={20} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-heading text-subtitle font-semibold text-white">{reason.title}</span>
                  <span className="text-small text-on-dark">{reason.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
