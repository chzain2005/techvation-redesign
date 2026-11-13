import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import { uniqueValue } from "@/data/homepage";

/*
 * Where each floating pill sits inside the 560 x 560 illustration.
 * These are layout positions (not content), so they live in the component.
 */
const pillPositions = {
  topLeft: "left-0 top-30.75",
  topRight: "left-78.5 top-16.75",
  bottomRight: "left-89.5 top-100.75",
  bottomLeft: "-left-2.75 top-109.25",
};

/**
 * The illustration next to "Our Unique Value": the Techvation app icon on a
 * tilted plate, surrounded by rings, floating pills and a stat chip.
 *
 * The picture is drawn once at its desktop size (560 x 560), with every piece
 * placed by absolute position to match the Figma frame. On smaller screens
 * the whole drawing is simply scaled down, exactly like the Figma frames do:
 *
 *   phones   330px  (scale 59%)
 *   tablets  480px  (scale 86%)
 *   desktop  560px  (scale 100%)
 *
 * The outer box reserves the scaled size so the page layout stays correct.
 *
 * Motion (all defined in globals.css):
 * - the pills and the stat chip drift in a small loop ("animate-float"),
 *   each starting a little later so they do not move in step
 * - the app icon and the plate behind it bob slowly ("animate-float-slow")
 * - the dashed ring turns very slowly ("animate-orbit")
 * - hovering a pill or the chip pauses its drift and lifts it slightly
 * People who turn on "reduce motion" on their device see it standing still.
 */
export default function ValueVisual() {
  const { visual } = uniqueValue;

  return (
    // Small top/bottom padding below desktop, as in the tablet and phone frames.
    <div className="shrink-0 pt-2.5 pb-5 xl:p-0">
      <div className="size-82.5 md:size-120 xl:size-140">
        <div className="relative size-140 origin-top-left scale-59 md:scale-86 xl:scale-100">
          {/* Big hollow word behind everything */}
          <p
            aria-hidden
            className="absolute top-2.75 left-3 font-heading text-outline font-bold whitespace-nowrap text-outlined"
          >
            {visual.outlineWord}
          </p>

          {/* Dashed ring and soft glow */}
          <Image
            src="/assets/images/value/ring.svg"
            alt=""
            width={504}
            height={504}
            className="absolute top-11.25 left-7 h-auto w-auto max-w-none animate-orbit"
          />
          <Image
            src="/assets/images/value/glow.png"
            alt=""
            width={448}
            height={448}
            className="absolute top-18.25 left-14 max-w-none"
          />

          {/* Tilted see-through plate behind the icon */}
          {/* (it bobs half a cycle behind the icon, so the two drift apart and together) */}
          <div
            className="absolute top-33.25 left-43.5 flex size-77.75 animate-float-slow items-center justify-center"
            style={{ animationDelay: "-4s" }}
          >
            <div className="size-67.25 shrink-0 -rotate-10 rounded-app-icon-lg bg-linear-135 from-accent/35 to-accent-violet/35" />
          </div>

          {/* Techvation app icon, tilted the other way */}
          <div className="absolute top-40.5 left-29.5 flex size-73.75 animate-float-slow items-center justify-center">
            <div className="relative size-67.25 shrink-0 rotate-6 overflow-hidden rounded-app-icon-lg shadow-brand-xl">
              <Image
                src={visual.iconSrc}
                alt="Techvation"
                fill
                sizes="269px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Floating pills */}
          {visual.pills.map((pill, i) => (
            <p
              key={pill.label}
              // A negative delay starts each pill part-way through the loop,
              // so they are already out of step when the page loads.
              style={{ animationDelay: `${i * -1.5}s` }}
              className={`absolute flex animate-float items-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-label font-semibold whitespace-nowrap text-heading shadow-pill transition-transform duration-300 hover:scale-105 hover:animate-paused ${pillPositions[pill.position]}`}
            >
              <span className="rounded-full bg-brand p-1.5">
                <Icon src={pill.icon} size={16} />
              </span>
              {pill.label}
            </p>
          ))}

          {/* "100% custom-built for you" chip */}
          <p
            style={{ animationDelay: "-0.75s" }}
            className="absolute top-60.25 left-98 flex animate-float flex-col rounded-2xl bg-linear-155 from-primary-dark to-secondary px-4 py-3 whitespace-nowrap shadow-brand-md transition-transform duration-300 hover:scale-105 hover:animate-paused"
          >
            <span className="font-heading text-stat font-semibold text-white">
              {visual.stat.value}
            </span>
            <span className="text-caption font-medium text-white/85">
              {visual.stat.label}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
