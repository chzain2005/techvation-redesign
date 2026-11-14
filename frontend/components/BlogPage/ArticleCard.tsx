import Image from "next/image";
import Link from "next/link";
import { blogPage, formatPostDate, postHref, type BlogPost } from "@/data/blog";

/**
 * One article in the Blog grid: cover with its category tag, title,
 * one-line summary and the author line. The whole card is one link.
 */
export default function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={postHref(post.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-white shadow-post transition duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative h-50 overflow-hidden md:h-57.5">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(min-width: 1280px) 410px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/95 px-2.5 py-1.25 text-caption font-medium text-primary">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-heading text-title font-semibold text-heading transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="text-small text-body">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-2.5 pt-1.5">
          <Image src={post.author.avatar} alt="" width={32} height={32} className="size-8 rounded-full" />
          <div className="flex flex-col text-caption font-medium">
            <span className="text-heading">{post.author.name}</span>
            <span className="text-muted">
              {formatPostDate(post.date)} · {blogPage.readTime(post.readMinutes)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
