import Image from "next/image";
import ActionButton from "@/components/Button/ActionButton";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import { cta } from "@/data/homepage";
import { solutionsPage } from "@/data/solutions";

/**
 * "A sneak peek at what's coming": three upcoming industry suites, then two
 * buttons. Cards are 1 per row on phones, 2 on tablets, 3 on desktop.
 */
export default function SneakPeek() {
  const { sneakPeek } = solutionsPage;

  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-page flex-col items-center gap-8 page-x py-16 md:py-20 xl:pt-10 xl:pb-28">
        <h2 className="text-center font-heading text-popup-title-lg font-semibold text-heading">
          {sneakPeek.title}
        </h2>

        <ul className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sneakPeek.suites.map((suite, i) => (
            <li
              key={suite.title}
              // On tablets the third card sits alone, so it is centred.
              className={i === 2 ? "md:col-span-2 md:mx-auto md:w-1/2 md:px-3 xl:col-span-1 xl:mx-0 xl:w-full xl:px-0" : undefined}
            >
              <article className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-white shadow-card">
                <div className="relative h-45 md:h-55">
                  <Image
                    src={suite.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 410px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-ink/0 to-ink/35" />
                  <span className="absolute top-4 left-4 rounded-full bg-white/92 px-3 py-1.5 text-caption font-medium text-primary">
                    {sneakPeek.badge}
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-6">
                  <h3 className="flex items-center gap-2.5 font-heading text-title font-semibold text-heading">
                    <span className="rounded-cell bg-brand p-2">
                      <Icon src={suite.icon} size={18} />
                    </span>
                    {suite.title}
                  </h3>
                  <p className="text-small text-body">{suite.text}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Buttons: full width and stacked on phones */}
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <Button href={sneakPeek.primaryAction.href} className="w-full md:w-auto">
            {sneakPeek.primaryAction.label}
          </Button>
          <ActionButton href={cta.scheduleCall.href} variant="outlineDark" className="w-full md:w-auto">
            {cta.scheduleCall.label}
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
