import Image from "next/image";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { careersPage } from "@/data/careers";

/**
 * "Simple, respectful and quick": the four hiring steps as glass cards on
 * the dark background. 1 per row on phones, 2 on tablets, 4 on desktop.
 */
export default function HiringProcess() {
  const { process } = careersPage;

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src="/assets/images/service-page/process-glow-1.svg"
        alt=""
        width={800}
        height={700}
        className="pointer-events-none absolute -top-62.5 -left-50 -z-10 max-w-none"
      />
      <div className="mx-auto flex w-full max-w-page flex-col section-gap page-x section-y">
        <SectionHeader eyebrow={process.eyebrow} heading={process.heading} theme="dark" headingClassName="xl:max-w-180" />
        <ol className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {process.steps.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col gap-3.5 rounded-post border border-white/10 bg-white/5 p-7"
            >
              <span className="font-heading text-h2-md font-bold text-gradient-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-title font-semibold text-white">{step.title}</h3>
              <p className="text-small text-on-dark">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
