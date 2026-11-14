import Image from "next/image";
import Breadcrumb from "@/components/ServicePage/Breadcrumb";
import { blogPage, formatLongDate, type BlogPost } from "@/data/blog";

/**
 * The dark, centred top of an article: breadcrumb, category, title and
 * the author line, with two soft glows behind.
 */
export default function ArticleHeader({ post }: { post: BlogPost }) {
  const lead = post.titleHighlight ? post.title.replace(post.titleHighlight, "") : post.title;

  return (
    // The top padding leaves room for the navbar that floats above the header.
    <header className="relative isolate overflow-hidden bg-ink pt-navbar-compact xl:pt-navbar">
      <Image
        src="/assets/images/blog/hero-glow-1.svg"
        alt=""
        width={900}
        height={700}
        className="pointer-events-none absolute -top-50 -left-50 -z-10 max-w-none"
      />
      <Image
        src="/assets/images/blog/article-glow-2.svg"
        alt=""
        width={800}
        height={700}
        className="pointer-events-none absolute top-0 left-[55%] -z-10 max-w-none"
      />

      <div className="mx-auto flex w-full max-w-page flex-col items-center gap-5 page-x pt-10 pb-10 text-center md:pt-14 md:pb-14">
        <Breadcrumb
          trail={[
            { label: "Home", href: "/" },
            { label: "Blogs", href: "/blog" },
          ]}
          current={post.category}
        />
        <span className="rounded-full bg-brand px-3 py-1.25 text-caption font-medium text-white">{post.category}</span>
        <h1 className="max-w-225 font-heading text-page-title-sm font-bold text-white md:text-h2-md xl:text-page-title">
          {lead}
          {post.titleHighlight && <span className="text-gradient-accent">{post.titleHighlight}</span>}
        </h1>
        <div className="flex items-center gap-3.5 text-left">
          <Image src={post.author.avatar} alt="" width={44} height={44} className="size-11 rounded-full" />
          <div className="flex flex-col gap-0.5">
            <span className="text-label font-semibold text-white">{post.author.name}</span>
            <span className="text-caption font-medium text-on-dark">
              {formatLongDate(post.date)} · {blogPage.readTime(post.readMinutes, true)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
