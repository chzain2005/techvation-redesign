import Button from "@/components/Button/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Icon from "@/components/Icon/Icon";
import { uniqueValue } from "@/data/homepage";
import ValueVisual from "./ValueVisual";

/**
 * "Our Unique Value" section.
 *
 * - Phones and tablets: the illustration sits on top, the text below it.
 * - Desktop (xl and up): text on the left, illustration on the right.
 *
 * The text comes first in the HTML (better for screen readers and search
 * engines); "flex-col-reverse" flips the visual order on small screens.
 */
export default function UniqueValue() {
  return (
    // "overflow-x-clip": the turning dashed ring of the illustration is a
    // square, and its corners swing past the screen edge on phones. Clipping
    // them sideways stops the page from scrolling left and right.
    <section className="overflow-x-clip bg-white">
      <div className="mx-auto flex w-full max-w-page flex-col-reverse items-center gap-6 page-x section-y md:gap-8 xl:flex-row xl:gap-20">
        {/* Text */}
        <div className="flex w-full min-w-0 flex-col items-start gap-4 xl:flex-1">
          <Eyebrow>{uniqueValue.eyebrow}</Eyebrow>
          {/* The whole title is gradient coloured: 38px / 52px / 64px */}
          <h2 className="font-heading text-h1-sm font-bold text-gradient-brand md:text-h1-md xl:text-h1">
            {uniqueValue.title}
          </h2>
          <p className="text-body-sm text-body md:text-body-md">
            {uniqueValue.description}
          </p>

          {/* Value chips */}
          <ul className="flex flex-wrap gap-2 md:gap-3">
            {uniqueValue.values.map((value) => (
              <li
                key={value.label}
                className="flex items-center gap-2 rounded-chip border border-border bg-surface px-3.5 py-2.5 text-label font-semibold text-primary-dark"
              >
                <Icon src={value.icon} size={16} scale />
                {value.label}
              </li>
            ))}
          </ul>

          <Button href={uniqueValue.action.href}>{uniqueValue.action.label}</Button>
        </div>

        {/* Illustration */}
        <ValueVisual />
      </div>
    </section>
  );
}
