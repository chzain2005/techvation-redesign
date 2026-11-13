import Image from "next/image";
import ActionButton from "@/components/Button/ActionButton";
import Icon from "@/components/Icon/Icon";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { howWeWork } from "@/data/homepage";

/**
 * "How we work" section: heading + four step cards (Discover, Design,
 * Build & Integrate, Launch & Support).
 *
 * The cards are in 1 column on phones, 2 on tablets and 4 on desktop.
 */
export default function HowWeWork() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-page flex-col section-gap page-x section-y">
        <SectionHeader
          eyebrow={howWeWork.eyebrow}
          heading={howWeWork.heading}
          headingClassName="xl:max-w-155"
        >
          {/* Paragraph + button: under the heading on small screens, on the right on desktop */}
          <div className="flex flex-col items-start gap-4 xl:w-105">
            <p className="text-body-sm text-body md:text-body-base xl:max-w-100">
              {howWeWork.description}
            </p>
            <ActionButton href={howWeWork.action.href}>{howWeWork.action.label}</ActionButton>
          </div>
        </SectionHeader>

        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {howWeWork.steps.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col overflow-hidden rounded-card border border-border bg-white shadow-card"
            >
              {/* Photo with the step number and an icon on top.
                  Height: 170px on phones, 180px on tablets, 200px on desktop. */}
              <div className="relative h-42.5 md:h-45 xl:h-50">
                <Image
                  src={step.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 302px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                {/* Purple tint that gets stronger towards the bottom */}
                <div className="absolute inset-0 bg-linear-to-b from-ink/5 to-primary-dark/55" />
                <p className="absolute bottom-1.5 left-5 font-heading text-h1 font-bold text-white opacity-90">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <span className="absolute top-4 right-4 rounded-xl border border-white/30 bg-white/18 p-2.5 backdrop-blur-xs">
                  <Icon src={step.icon} size={20} />
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col items-start gap-3 p-5.5">
                <h3 className="font-heading text-title font-semibold text-heading">
                  {step.title}
                </h3>
                <p className="text-small text-body">{step.description}</p>

                {/* What the client receives in this step */}
                <ul className="flex flex-col gap-3">
                  {step.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="flex items-center gap-2 text-label-sm font-semibold text-heading"
                    >
                      <span className="rounded-full bg-brand p-0.75">
                        <Icon src="/assets/icons/check-white-11.svg" size={11} />
                      </span>
                      {deliverable}
                    </li>
                  ))}
                </ul>

                <p className="flex items-center gap-1.5 rounded-cell bg-surface px-2.5 py-1.5 text-caption font-medium">
                  <span className="text-body">{howWeWork.outcomeLabel}</span>
                  <span className="text-primary">{step.outcome}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
