"use client"; // The questions open and close on click.

import { useId, useState } from "react";
import Button from "@/components/Button/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Glyph from "@/components/Icon/Glyph";
import { serviceDetailPage, type ServiceDetail } from "@/data/services";
import { cn } from "@/lib/cn";

/**
 * Questions and answers about the service. One answer is open at a time;
 * the first one starts open, as in the design.
 *
 * - Phones: a short "FAQs" title and the first three questions.
 * - Tablets: heading on top, then the questions.
 * - Desktop (xl and up): heading and "See all FAQs" on the left, questions
 *   on the right.
 */
export default function ServiceFaq({ serviceTitle, faqs }: { serviceTitle: string; faqs: ServiceDetail["faqs"] }) {
  const { faq } = serviceDetailPage;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const id = useId();

  return (
    <section className="bg-surface">
      <div className="mx-auto flex w-full max-w-page flex-col gap-6 page-x section-y md:gap-8 xl:flex-row xl:items-start xl:gap-20">
        {/* Heading */}
        <h2 className="font-heading text-h2-sm font-bold text-heading md:hidden">{faq.compactTitle}</h2>
        <div className="hidden flex-col items-start gap-4 md:flex xl:w-95 xl:shrink-0">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <h2 className="font-heading text-h2-md font-bold text-heading xl:text-faq-title">
            {serviceTitle}, frequently <span className="text-gradient-brand">{faq.headingHighlight}</span>
          </h2>
          <Button href={faq.allFaqs.href} variant="outlineDark" className="mt-2">
            {faq.allFaqs.label}
          </Button>
        </div>

        {/* Questions */}
        <ul className="flex min-w-0 flex-1 flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            const answerId = `${id}-answer-${i}`;
            return (
              <li
                key={item.question}
                className={cn(
                  "rounded-float border bg-white transition-colors duration-200",
                  isOpen ? "border-primary/35" : "border-border",
                  // Phones show only the first few questions.
                  i >= faq.compactCount && "max-md:hidden",
                )}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center gap-4 px-4 py-4 text-left font-heading text-label font-semibold text-heading md:px-6 md:py-5.5 md:text-subtitle"
                  >
                    <span className="flex-1">{item.question}</span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full p-1.5 transition-colors duration-200",
                        isOpen ? "bg-brand text-white" : "bg-surface text-primary",
                      )}
                    >
                      <Glyph name={isOpen ? "minus" : "plus"} size={16} />
                    </span>
                  </button>
                </h3>
                {/* The answer unfolds by animating its grid row from 0 to its natural height. */}
                <div
                  id={answerId}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-small text-body md:px-6 md:pb-5.5 md:text-body-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
