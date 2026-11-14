"use client"; // "Book a meeting" opens the Schedule a Call pop-up.

import Glyph from "@/components/Icon/Glyph";
import { usePopups } from "@/components/Popups/PopupProvider";
import { contactPage } from "@/data/contact";

const cardClasses =
  "flex h-full w-full items-center gap-3 rounded-reason border border-border bg-white p-3.5 text-left shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 md:gap-3.5 md:p-5.5";

/**
 * Four quick ways to get in touch: call, WhatsApp, email, book a meeting.
 *
 * - Phones: a 2 x 2 grid of small cards with just the title.
 * - Tablets: 2 x 2 with the number or address under the title.
 * - Desktop (xl and up): four cards in a row.
 */
export default function QuickContact() {
  const { openScheduleCall } = usePopups();

  return (
    <section aria-label="Quick contact" className="bg-white">
      <ul className="mx-auto grid w-full max-w-page grid-cols-2 gap-3 page-x pt-6 md:gap-5 md:pt-14 xl:grid-cols-4">
        {contactPage.quickContact.map((item) => {
          const content = (
            <>
              <span className="shrink-0 rounded-chip bg-brand p-2 text-white md:p-3">
                <Glyph name={item.icon} size={20} />
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-heading text-label font-semibold text-heading md:text-subtitle-sm">
                  {item.short ? (
                    <>
                      <span className="md:hidden">{item.short}</span>
                      <span className="max-md:hidden">{item.title}</span>
                    </>
                  ) : (
                    item.title
                  )}
                </span>
                <span className="truncate text-small text-body max-md:hidden">{item.detail}</span>
              </span>
            </>
          );

          return (
            <li key={item.title}>
              {item.href === "#schedule-a-call" ? (
                <button type="button" onClick={openScheduleCall} className={`${cardClasses} cursor-pointer`}>
                  {content}
                </button>
              ) : (
                <a
                  href={item.href}
                  {...(item.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className={cardClasses}
                >
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
