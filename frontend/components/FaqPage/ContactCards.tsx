import ActionButton from "@/components/Button/ActionButton";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Glyph from "@/components/Icon/Glyph";
import { getFaqPage } from "@/lib/cms/content";

/**
 * "Still have questions? Talk to a real person": call, email or book a call.
 * 1 card per row on phones, 3 in a row from tablets up.
 */
export default async function ContactCards() {
  const faqPage = await getFaqPage();
  const { contact } = faqPage;

  return (
    <section className="bg-surface">
      <div className="mx-auto flex w-full max-w-page flex-col items-center gap-4 page-x section-y">
        <Eyebrow>{contact.eyebrow}</Eyebrow>
        <h2 className="text-center font-heading text-h2-sm font-bold text-heading md:text-h2-md xl:text-h2">
          {contact.heading.lead}
          <span className="text-gradient-brand">{contact.heading.highlight}</span>
        </h2>
        <ul className="mt-4 grid w-full gap-4 md:grid-cols-3 md:gap-6">
          {contact.cards.map((card) => (
            <li
              key={card.title}
              className="flex flex-col items-center gap-3.5 rounded-card border border-border bg-white p-7 text-center md:p-8"
            >
              <span className="rounded-full bg-brand p-3.5 text-white">
                <Glyph name={card.icon} size={24} />
              </span>
              <h3 className="font-heading text-title font-semibold text-heading">{card.title}</h3>
              <p className="text-small text-body">{card.text}</p>
              {/* Phone and email open the phone or mail app; "Book a slot"
                  opens the Schedule a Call pop-up. */}
              <ActionButton href={card.href} variant="outlineDark">
                {card.actionLabel}
              </ActionButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
