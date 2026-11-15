import ActionButton from "@/components/Button/ActionButton";
import Glyph from "@/components/Icon/Glyph";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { cta } from "@/data/homepage";
import { getServicesPageContent } from "@/lib/cms/content";
import { cn } from "@/lib/cn";

/**
 * "Flexible ways to work with us": three engagement models side by side on
 * desktop (stacked below xl). The middle one is marked "Most popular".
 */
export default async function EngagementModels() {
  const { servicesPage } = await getServicesPageContent();
  const { engagement } = servicesPage;

  return (
    <section className="bg-surface">
      <div className="mx-auto flex w-full max-w-page flex-col section-gap page-x section-y">
        <SectionHeader eyebrow={engagement.eyebrow} heading={engagement.heading} headingClassName="xl:max-w-140">
          <p className="text-body-sm text-body md:text-body-base xl:max-w-100">{engagement.description}</p>
        </SectionHeader>

        <ul className="grid gap-6 xl:grid-cols-3 xl:items-start">
          {engagement.models.map((model) => (
            <li
              key={model.title}
              className={cn(
                "flex flex-col gap-4.5 rounded-card bg-white p-7 md:p-8",
                model.popular
                  ? "border-2 border-primary shadow-brand-md"
                  : "border border-border shadow-card",
              )}
            >
              <div className="flex items-start justify-between">
                <span className="rounded-chip bg-brand p-3 text-white">
                  <Glyph name={model.icon} size={22} />
                </span>
                {model.popular && (
                  <span className="rounded-full bg-brand px-2.5 py-1.25 text-caption font-medium text-white">
                    {engagement.popularLabel}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-stat font-semibold text-heading">{model.title}</h3>
                <p className="text-body-base text-body">{model.text}</p>
              </div>
              <hr className="border-border" />
              <ul className="flex flex-col gap-4">
                {model.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-body-sm text-heading">
                    <Glyph name="check" size={16} className="text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="text-caption font-medium text-muted">
                {engagement.bestForLabel} <span className="text-body">{model.bestFor}</span>
              </p>
              <ActionButton
                href={cta.scheduleCall.href}
                variant={model.popular ? "primary" : "outlineDark"}
                size="md"
                className="w-full"
              >
                {cta.scheduleCall.label}
              </ActionButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
