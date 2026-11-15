import Image from "next/image";
import ActionButton from "@/components/Button/ActionButton";
import CountUp from "@/components/CountUp/CountUp";
import Icon from "@/components/Icon/Icon";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import type { whyTechvation as whyTechvationContent } from "@/data/homepage";
import { getHomepage } from "@/lib/cms/content";

type Reason = (typeof whyTechvationContent.reasons)[number];

/*
 * Positions of the six small dots on the middle ring of the orbit
 * (layout only, taken from the Figma frame).
 */
const orbitDotPositions = [
  "left-53 top-10.5",
  "left-87.75 top-31.75",
  "left-87.75 top-74.25",
  "left-53 top-95.5",
  "left-18.25 top-74.25",
  "left-18.25 top-31.75",
];

/* The connector drawing fills the 1280 x 600 stage and only exists on the
   full desktop layout. */
const connectorClasses =
  "absolute inset-0 hidden h-auto w-auto max-w-none desktop:block";

/** One white card: gradient icon tile, number + title, short description. */
function ReasonCard({ reason, number }: { reason: Reason; number: number }) {
  return (
    <li className="flex items-start gap-4 rounded-reason border border-border bg-white p-5 shadow-reason">
      <span className="rounded-chip bg-brand p-3">
        <Icon src={reason.icon} size={22} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="flex items-center gap-2 font-heading text-subtitle font-semibold text-heading">
          {/* "01", "02" ... */}
          <span className="font-main text-caption font-medium text-subtle">
            {String(number).padStart(2, "0")}
          </span>
          {reason.title}
        </h3>
        <p className="text-small text-body">{reason.description}</p>
      </div>
    </li>
  );
}

/**
 * The circle graphic: rings, glow, orbit dots, app icon and badge.
 *
 * It is drawn once at its desktop size (460 x 460) and scaled down on smaller
 * screens, like the Figma frames: 300px on phones (65%), 360px on tablets
 * (78%). The outer box reserves the scaled size.
 *
 * - Below 1440px it sits centred above the reason cards.
 * - From 1440px up it sits in the middle of the stage, between the cards.
 *
 * Motion (all defined in globals.css; switched off for "reduce motion"):
 * - the soft glow behind everything "breathes"            (animate-glow)
 * - the outer dotted ring turns slowly                    (animate-orbit)
 * - the inner dashed ring turns the other way             (animate-orbit-reverse)
 * - the six dots travel round the solid ring              (animate-orbit-dots)
 * - the app icon bobs gently                              (animate-float-slow)
 */
function OrbitHub({ hub }: { hub: (typeof whyTechvationContent)["hub"] }) {

  return (
    <div
      aria-hidden
      className="mx-auto size-75 md:size-90 desktop:absolute desktop:top-1/2 desktop:left-1/2 desktop:size-115 desktop:-translate-x-1/2 desktop:-translate-y-1/2"
    >
      <div className="relative size-115 origin-top-left scale-65 md:scale-78 desktop:scale-100">
        <Image
          src="/assets/images/why/ring-outer.svg"
          alt=""
          width={460}
          height={460}
          className="absolute top-0 left-0 h-auto w-auto max-w-none animate-glow"
        />
        <Image
          src="/assets/images/why/glow-outer.png"
          alt=""
          width={460}
          height={460}
          className="absolute top-0 left-0 max-w-none animate-orbit"
        />
        <Image
          src="/assets/images/why/ring-middle.svg"
          alt=""
          width={340}
          height={340}
          className="absolute top-15 left-15 h-auto w-auto max-w-none"
        />
        <Image
          src="/assets/images/why/glow-inner.png"
          alt=""
          width={230}
          height={230}
          className="absolute top-28.75 left-28.75 max-w-none animate-orbit-reverse"
        />
        {/* The dots sit in a box that covers the whole hub. Turning the box
            around its centre moves every dot along the solid ring. */}
        <div className="absolute inset-0 animate-orbit-dots">
          {orbitDotPositions.map((position) => (
            <Image
              key={position}
              src="/assets/images/why/orbit-dot.svg"
              alt=""
              width={36}
              height={36}
              className={`absolute h-auto w-auto max-w-none ${position}`}
            />
          ))}
        </div>

        {/* Techvation app icon in the centre */}
        <div className="absolute top-40.25 left-40.25 size-34.5 animate-float-slow overflow-hidden rounded-app-icon shadow-brand-lg">
          <Image src={hub.iconSrc} alt="" fill sizes="138px" className="object-cover" />
        </div>

        {/* Badge under the icon */}
        <p className="absolute top-79.25 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-caption font-medium whitespace-nowrap text-heading shadow-badge">
          <Icon src="/assets/icons/award-brand.svg" size={14} scale />
          {hub.badge}
        </p>
      </div>
    </div>
  );
}

/**
 * "Why Techvation" section.
 *
 * - Phones: centred heading, orbit graphic, six reason cards in one column,
 *   stats in a 2 x 2 grid.
 * - Tablets: the same, with the cards in two columns and the stats in a row.
 * - Full desktop (1440px and wider): the reasons sit left and right of the
 *   orbit graphic, joined to it by dashed lines, and two buttons follow the
 *   stats. Between 1280px and 1440px the orbit stage does not fit, so the
 *   tablet arrangement of graphic + cards is used there.
 */
export default async function WhyTechvation() {
  const { whyTechvation } = await getHomepage();
  const { reasons, stats } = whyTechvation;
  const half = Math.ceil(reasons.length / 2);

  /* Shared classes of the left and right card columns.
     "contents" makes the column wrapper disappear on small screens, so all six
     cards flow into one grid. On desktop it becomes a real column. */
  const columnClasses =
    "contents desktop:absolute desktop:inset-y-0 desktop:flex desktop:w-95 desktop:flex-col desktop:justify-around";

  return (
    // "overflow-x-clip": the turning dots layer of the hub is a square, and its
    // corners swing past the screen edge on phones. Clipping them sideways stops
    // the whole page from scrolling left and right (they are empty anyway).
    <section className="overflow-x-clip bg-surface">
      <div className="mx-auto flex w-full max-w-page flex-col items-center section-gap page-x section-y">
        <SectionHeader
          eyebrow={whyTechvation.eyebrow}
          heading={whyTechvation.heading}
          headingClassName="xl:max-w-170"
          centerOnCompact
        >
          <p className="hidden max-w-100 text-body-base text-body xl:block">
            {whyTechvation.description}
          </p>
        </SectionHeader>

        {/* Orbit stage: stacked below 1440px, a 1280 x 600 stage from 1440px */}
        <div className="relative flex w-full flex-col section-gap desktop:block desktop:h-150">
          {/* Dashed connector lines between the cards and the hub.
              The first image is the lines themselves. The two copies on top
              are each cut to one half and shown through sliding stripes
              ("mask-flow"), which makes light appear to run along the lines:
              out from the hub towards the cards on both sides. */}
          <Image
            src="/assets/images/why/connectors.svg"
            alt=""
            width={1280}
            height={600}
            className={connectorClasses}
          />
          <Image
            src="/assets/images/why/connectors.svg"
            alt=""
            width={1280}
            height={600}
            className={`${connectorClasses} animate-flow-reverse mask-flow clip-left-half`}
          />
          <Image
            src="/assets/images/why/connectors.svg"
            alt=""
            width={1280}
            height={600}
            className={`${connectorClasses} animate-flow mask-flow clip-right-half`}
          />
          <OrbitHub hub={whyTechvation.hub} />

          {/* Reason cards: 1 column on phones, 2 on tablets */}
          <div className="grid gap-3.5 md:grid-cols-2 desktop:contents">
            {/* Reasons 1-3 (left of the orbit on desktop) */}
            <ul className={`${columnClasses} desktop:left-2.5`}>
              {reasons.slice(0, half).map((reason, i) => (
                <ReasonCard key={reason.title} reason={reason} number={i + 1} />
              ))}
            </ul>
            {/* Reasons 4-6 (right of the orbit on desktop) */}
            <ul className={`${columnClasses} desktop:right-2.5`}>
              {reasons.slice(half).map((reason, i) => (
                <ReasonCard key={reason.title} reason={reason} number={half + i + 1} />
              ))}
            </ul>
          </div>
        </div>

        {/* Gradient stats bar: 2 x 2 on phones, one row from tablets up */}
        <dl className="grid w-full grid-cols-2 rounded-card bg-brand-deep px-2 py-6 md:grid-cols-4">
          {stats.map((stat) => (
            // flex-col-reverse: the number is shown above its label, while the
            // HTML keeps the correct order (label first) for screen readers.
            <div key={stat.label} className="flex flex-col-reverse items-center gap-0.5 p-2">
              <dt className="text-caption font-medium text-white/80">{stat.label}</dt>
              <dd className="font-heading text-h2-sm font-bold text-white xl:text-h3">
                {/* Counts up from 0 whenever the bar scrolls into view. */}
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>

        {/* Buttons (desktop only; the tablet and phone designs end with the stats) */}
        <div className="hidden justify-center gap-3 xl:flex">
          <ActionButton href={whyTechvation.primaryAction.href}>
            {whyTechvation.primaryAction.label}
          </ActionButton>
          <ActionButton
            href={whyTechvation.secondaryAction.href}
            variant="outlineDark"
            showIcon={false}
          >
            {whyTechvation.secondaryAction.label}
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
