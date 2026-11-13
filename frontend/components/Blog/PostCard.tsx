import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import type { BlogPost } from "@/data/homepage";

/**
 * A small horizontal article card. The whole card is one link.
 *
 * - Phones: a compact card with a 96px square thumbnail, the category tag
 *   and the title only.
 * - Tablets and desktop: a larger thumbnail, plus the date line and an arrow.
 */
export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={post.href}
      className="flex items-center gap-3.5 rounded-post border border-border bg-white p-3 shadow-post transition-shadow hover:shadow-card md:gap-5 md:p-4"
    >
      {/* Thumbnail */}
      <div className="relative size-24 shrink-0 overflow-hidden rounded-chip md:h-31 md:w-37.5 md:rounded-2xl">
        <Image src={post.image} alt="" fill sizes="150px" className="object-cover" />
      </div>

      {/* Text */}
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
        <span className="rounded-full bg-surface-tint px-2.5 py-1 text-caption font-medium text-primary">
          {post.category}
        </span>
        <h3 className="font-heading text-title-xs font-semibold text-heading md:text-subtitle">
          {post.title}
        </h3>
        {/* Date and reading time (tablets and up) */}
        <p className="hidden items-center gap-1.5 text-caption font-medium text-muted md:flex">
          <Icon src="/assets/icons/clock-13.svg" size={13} />
          {post.date} · {post.readTime}
        </p>
      </div>

      {/* Arrow (tablets and up) */}
      <span className="hidden rounded-full border border-border p-2.5 md:block">
        <Icon src="/assets/icons/arrow-up-right-brand-16.svg" size={16} scale />
      </span>
    </Link>
  );
}
