import Image from "next/image";
import ActionButton from "@/components/Button/ActionButton";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { cta } from "@/data/homepage";
import { getServicesPageContent } from "@/lib/cms/content";

/**
 * "Our process": four numbered steps on the dark background, with a
 * "Start Your Project" button. The phone design leaves this section out,
 * so it shows from tablets up: two columns on tablets, four on desktop.
 */
export default async function ServiceProcess({ serviceTitle }: { serviceTitle: string }) {
  const { serviceDetailPage } = await getServicesPageContent();
  const { process } = serviceDetailPage;

  return (
    <section className="relative isolate hidden overflow-hidden bg-ink md:block">
      <Image
        src="/assets/images/service-page/process-glow-1.svg"
        alt=""
        width={800}
        height={700}
        className="pointer-events-none absolute -top-50 -left-50 -z-10 max-w-none"
      />
      <Image
        src="/assets/images/service-page/process-glow-2.svg"
        alt=""
        width={700}
        height={600}
        className="pointer-events-none absolute top-50 left-[62%] -z-10 max-w-none"
      />

      <div className="mx-auto flex w-full max-w-page flex-col gap-10 page-x section-y xl:gap-12">
        <div className="flex flex-col items-start gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex flex-col items-start gap-4">
            <Eyebrow theme="dark">{process.eyebrow}</Eyebrow>
            <h2 className="font-heading text-h2-md font-bold text-white xl:max-w-180 xl:text-h2">
              {process.headingLead}
              <span className="text-gradient-accent">{serviceTitle}</span>
            </h2>
          </div>
          <ActionButton href={cta.freeConsultation.href}>{process.actionLabel}</ActionButton>
        </div>

        <ol className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
          {process.steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3.5">
              {/* Number in a gradient circle, with a line fading out to the right */}
              <div className="flex items-center gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-label font-semibold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-0.5 flex-1 bg-linear-to-r from-primary/80 to-secondary/0" />
              </div>
              <h3 className="font-heading text-title font-semibold text-white">{step.title}</h3>
              <p className="text-small text-on-dark">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
