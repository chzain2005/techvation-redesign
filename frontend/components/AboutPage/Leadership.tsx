import Image from "next/image";
import Button from "@/components/Button/Button";
import Glyph from "@/components/Icon/Glyph";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { aboutPage } from "@/data/about";

/**
 * "Leadership": heading with a "Join Our Team" button, then one card per
 * team member (photo, name, role, LinkedIn and email links).
 * 1 card per row on phones, 2 on tablets, 4 on desktop.
 */
export default function Leadership() {
  const { leadership } = aboutPage;

  return (
    // "id" lets the hero's "Meet the Team" button scroll here.
    <section id="leadership" className="scroll-mt-navbar bg-surface">
      <div className="mx-auto flex w-full max-w-page flex-col section-gap page-x section-y">
        <SectionHeader eyebrow={leadership.eyebrow} heading={leadership.heading}>
          <Button href={leadership.action.href} variant="outlineDark" className="self-start xl:self-auto">
            {leadership.action.label}
          </Button>
        </SectionHeader>

        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {leadership.members.map((member) => (
            <li key={member.role}>
              <article className="group overflow-hidden rounded-card border border-border bg-white shadow-card">
                {/* Square photo filling the top of the card. The placeholder
                    photos are round avatars, so they are zoomed in until the
                    round edge falls outside the square (scale-145). Real square
                    photos can drop the zoom. */}
                <div className="relative aspect-square overflow-hidden bg-surface-tint">
                  <Image
                    src={member.photo}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 768px) 50vw, 100vw"
                    className="scale-145 object-cover transition-transform duration-500 group-hover:scale-150"
                  />
                </div>
                <div className="flex flex-col gap-1 p-5.5">
                  <h3 className="font-heading text-title-sm font-semibold text-heading">{member.name}</h3>
                  <p className="text-small text-body">{member.role}</p>
                  <div className="mt-2 flex gap-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="rounded-full bg-surface p-2 text-primary transition-colors hover:bg-brand hover:text-white"
                    >
                      <Glyph name="linkedin" size={16} />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="rounded-full bg-surface p-2 text-primary transition-colors hover:bg-brand hover:text-white"
                    >
                      <Glyph name="mail" size={16} />
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
