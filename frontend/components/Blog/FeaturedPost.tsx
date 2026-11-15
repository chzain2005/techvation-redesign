import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import type { blog } from "@/data/homepage";

/**
 * The large featured article card: a photo with the text on top of it.
 * The whole card is one link.
 *
 * Height: 380px on phones, 420px on tablets, 464px on desktop (where it is
 * also fixed to 640px wide and sits next to the list).
 */
export default function FeaturedPost({ featured }: { featured: (typeof blog)["featured"] }) {

  return (
    <Link
      href={featured.href}
      className="relative isolate flex min-h-95 flex-col items-start justify-end gap-3.5 overflow-hidden rounded-feature p-5 shadow-feature md:min-h-105 md:p-9 xl:h-116 xl:w-160 xl:shrink-0 xl:self-start"
    >
      {/* Photo + dark fade so the white text stays readable */}
      <Image
        src={featured.image}
        alt=""
        fill
        sizes="(min-width: 1280px) 640px, 100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink/5 to-ink/95" />

      {/* Tags */}
      <div className="flex gap-2 text-caption font-medium">
        <span className="rounded-full bg-accent-gradient px-3 py-1.5 text-ink">
          {featured.badge}
        </span>
        <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-white">
          {featured.category}
        </span>
      </div>

      <h3 className="font-heading text-stat font-bold text-white md:text-h4">
        {featured.title}
      </h3>
      <p className="text-small text-white/80 md:text-body-base">{featured.excerpt}</p>

      {/* Author, date and the round "read" button */}
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5 text-caption font-medium">
          <Image
            src={featured.author.avatar}
            alt=""
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="text-white">{featured.author.name}</span>
          <Icon src="/assets/icons/dot-separator.svg" size={4} />
          <span className="text-white/75">
            {featured.date} · {featured.readTime}
          </span>
        </div>
        <span className="rounded-full bg-white p-3">
          <Icon src="/assets/icons/arrow-up-right-dark-18.svg" size={18} />
        </span>
      </div>
    </Link>
  );
}
