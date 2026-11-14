import Image from "next/image";
import Link from "next/link";
import Glyph from "@/components/Icon/Glyph";
import { blogPage, formatPostDate, postHref, type BlogPost } from "@/data/blog";

/**
 * The big "Featured" card under the hero. The whole card is one link.
 *
 * - Phones and tablets: cover on top, text below.
 * - Desktop (xl and up): 680px cover on the left, text on the right.
 */
export default function FeaturedArticle({ post }: { post: BlogPost }) {
  const lead = post.titleHighlight ? post.title.replace(post.titleHighlight, "") : post.title;

  return (
    <section aria-label="Featured article" className="bg-white">
      <div className="mx-auto w-full max-w-page page-x pt-12 md:pt-16 xl:pt-20">
        <Link
          href={postHref(post.slug)}
          className="group flex flex-col overflow-hidden rounded-post border border-border bg-white shadow-feature transition-shadow duration-300 hover:shadow-calendar md:rounded-feature xl:flex-row"
        >
          <div className="relative aspect-[680/440] overflow-hidden xl:h-110 xl:w-170 xl:shrink-0 xl:aspect-auto">
            <Image
              src={post.cover}
              alt=""
              fill
              sizes="(min-width: 1280px) 680px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col items-start justify-center gap-4.5 p-6 md:p-10 xl:p-12">
            <div className="flex gap-2">
              <span className="rounded-full bg-brand px-3 py-1.25 text-caption font-medium text-white">
                {blogPage.featuredBadge}
              </span>
              <span className="rounded-full bg-surface-tint px-3 py-1.25 text-caption font-medium text-primary">
                {post.category}
              </span>
            </div>
            <h2 className="font-heading text-h2-sm font-bold text-heading md:text-h2-md xl:max-w-125 xl:text-faq-title">
              {lead}
              {post.titleHighlight && <span className="text-gradient-brand">{post.titleHighlight}</span>}
            </h2>
            <p className="text-body-sm text-body md:text-body-base xl:max-w-125">{post.excerpt}</p>
            <div className="flex items-center gap-3">
              <Image src={post.author.avatar} alt="" width={44} height={44} className="size-11 rounded-full" />
              <div className="flex flex-col gap-0.5">
                <span className="text-label font-semibold text-heading">{post.author.name}</span>
                <span className="text-caption font-medium text-muted">
                  {formatPostDate(post.date)} · {blogPage.readTime(post.readMinutes, true)}
                </span>
              </div>
            </div>
            {/* Looks like a button; the whole card is the link. */}
            <span className="mt-1 inline-flex items-center gap-2.5 rounded-full bg-brand px-7 py-4.25 text-button font-semibold text-white drop-shadow-button transition duration-300 group-hover:-translate-y-0.5 group-hover:drop-shadow-button-hover">
              {blogPage.readLabel}
              <Glyph name="arrow-right" size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
