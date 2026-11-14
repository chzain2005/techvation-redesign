import Image from "next/image";
import Button from "@/components/Button/Button";
import Glyph from "@/components/Icon/Glyph";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { aboutPage } from "@/data/about";

/**
 * "Leadership": heading with a "Join our team" button, then one card per
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
              <article className="group overflow-hidden rounded-card border border-border bg-white">
                <div className="relative h-75 overflow-hidden">
                  <Image
                    src={member.photo}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-1.5 p-5.5">
                  <h3 className="font-heading text-subtitle font-semibold text-heading">{member.name}</h3>
                  <p className="text-small text-primary">{member.role}</p>
                  <div className="flex gap-2 pt-2 text-primary">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="transition-opacity hover:opacity-70"
                    >
                      <Glyph name="linkedin" size={18} />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="transition-opacity hover:opacity-70"
                    >
                      <Glyph name="mail" size={18} />
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
