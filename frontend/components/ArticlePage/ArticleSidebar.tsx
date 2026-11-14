"use client"; // Highlights the current section, sends the form and opens share windows.

import { useEffect, useState, type FormEvent } from "react";
import Button from "@/components/Button/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Glyph, { type GlyphName } from "@/components/Icon/Glyph";
import { usePopups } from "@/components/Popups/PopupProvider";
import { cn } from "@/lib/cn";
import { trackFormSubmit } from "@/lib/analytics";

type ArticleSidebarProps = {
  title: string;
  headings: Array<{ text: string; id: string }>;
  cta: { title: string; buttonLabel: string };
};

/** Share targets. The page address is read when the button is clicked. */
const shareLinks: Array<{ name: string; icon: GlyphName; url: (url: string, text: string) => string }> = [
  { name: "LinkedIn", icon: "linkedin", url: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  { name: "Facebook", icon: "facebook", url: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { name: "X", icon: "x-logo", url: (u, t) => `https://x.com/intent/post?url=${u}&text=${t}` },
];

/**
 * The column next to the article:
 *   - "On this page", with the section you are reading highlighted
 *   - a dark card with a short consultation form
 *   - share buttons (LinkedIn, Facebook, X, email)
 *
 * On desktop it sticks while you scroll. Below xl it sits under the article,
 * without the "On this page" list (the sections follow straight on).
 */
export default function ArticleSidebar({ title, headings, cta }: ArticleSidebarProps) {
  const { showConsultationSuccess } = usePopups();
  const [current, setCurrent] = useState(headings[0]?.id);

  // Highlight the heading whose section is in the upper part of the screen.
  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setCurrent(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Record the sent form in Google Analytics (no personal details).
    trackFormSubmit("article_sidebar_consultation");
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    // TODO: send to the backend once the consultation endpoint exists.
    showConsultationSuccess({ email });
    event.currentTarget.reset();
  }

  function share(build: (url: string, text: string) => string) {
    const url = encodeURIComponent(window.location.href);
    window.open(build(url, encodeURIComponent(title)), "_blank", "noopener,noreferrer,width=640,height=560");
  }

  const iconButton =
    "grid size-9 cursor-pointer place-items-center rounded-full border border-border text-primary transition-colors hover:border-primary/40 hover:bg-surface";

  return (
    <aside className="flex flex-col gap-6 transition-[top] duration-300 ease-out xl:sticky xl:top-[calc(var(--nav-offset)+2rem)] xl:min-w-0 xl:flex-1">
      {headings.length > 0 && (
        <nav aria-label="On this page" className="flex flex-col gap-3 rounded-reason bg-surface p-6 max-xl:hidden">
          <p className="text-label-sm font-semibold tracking-[1.5px] text-subtle uppercase">On this page</p>
          <ul className="flex flex-col gap-3">
            {headings.map((heading) => {
              const isCurrent = heading.id === current;
              return (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    aria-current={isCurrent ? "location" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 text-small transition-colors",
                      isCurrent ? "text-primary" : "text-body hover:text-primary",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn("h-4.5 w-0.75 shrink-0 rounded-xs", isCurrent ? "bg-linear-to-b from-primary to-secondary" : "bg-border")}
                    />
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-4 rounded-post bg-linear-145 from-ink-soft to-primary-dark p-7"
      >
        <Eyebrow theme="dark">Free consultation</Eyebrow>
        <p className="font-heading text-title font-semibold text-white xl:max-w-70">{cta.title}</p>
        <label className="flex w-full flex-col gap-2 text-label-sm font-semibold text-white">
          Work email
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="john@company.com"
            className="w-full rounded-xl border border-white/18 bg-white/8 px-4 py-3.5 text-small font-normal text-white outline-none placeholder:text-white/55 focus:border-accent"
          />
        </label>
        <Button type="submit" className="w-full">
          {cta.buttonLabel}
        </Button>
      </form>

      <div className="flex items-center gap-2.5">
        <span className="text-label font-semibold text-heading">Share</span>
        {shareLinks.map((link) => (
          <button
            key={link.name}
            type="button"
            aria-label={`Share on ${link.name}`}
            onClick={() => share(link.url)}
            className={iconButton}
          >
            <Glyph name={link.icon} size={16} />
          </button>
        ))}
        <a
          href={`mailto:?subject=${encodeURIComponent(title)}`}
          onClick={(event) => {
            event.currentTarget.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`;
          }}
          aria-label="Share by email"
          className={iconButton}
        >
          <Glyph name="mail" size={16} />
        </a>
      </div>
    </aside>
  );
}
