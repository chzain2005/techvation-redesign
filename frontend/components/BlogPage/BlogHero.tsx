import Image from "next/image";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { blogPage } from "@/data/blog";
import { BlogSearchBar } from "./BlogSearch";

/**
 * The dark, centred top section of the Blog page: two soft colour glows,
 * label, headline, paragraph and the article search bar.
 */
export default function BlogHero() {
  const { hero } = blogPage;

  return (
    // The top padding leaves room for the navbar that floats above the hero.
    <section className="relative isolate overflow-hidden bg-ink pt-navbar-compact xl:flex xl:h-125 xl:flex-col xl:pt-navbar">
      <Image
        src="/assets/images/blog/hero-glow-1.svg"
        alt=""
        width={900}
        height={700}
        className="pointer-events-none absolute -top-50 -left-50 -z-10 max-w-none"
      />
      <Image
        src="/assets/images/blog/hero-glow-2.svg"
        alt=""
        width={800}
        height={700}
        className="pointer-events-none absolute -top-25 left-[55%] -z-10 max-w-none"
      />

      <div className="mx-auto flex w-full max-w-page flex-col items-center justify-center gap-4 page-x pt-10 pb-14 text-center md:pt-14 md:pb-16 xl:flex-1 xl:py-14">
        <Eyebrow theme="dark">{hero.eyebrow}</Eyebrow>
        <h1 className="max-w-205 font-heading text-page-title-sm font-bold text-white md:text-h2-md xl:text-page-title">
          {hero.heading.lead}
          <span className="text-gradient-accent">{hero.heading.highlight}</span>
        </h1>
        <p className="max-w-155 text-body-sm text-on-dark md:text-body-lg">{hero.description}</p>
        <BlogSearchBar />
      </div>
    </section>
  );
}
