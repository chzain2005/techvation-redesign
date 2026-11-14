import Image from "next/image";
import Glyph from "@/components/Icon/Glyph";
import { headingId, type ArticleBlock } from "@/data/blog-articles";
import type { BlogPost } from "@/data/blog";

/** One block of the article text. */
function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "lead":
      return <p className="text-body-lg text-heading md:text-body-xl">{block.text}</p>;
    case "h2":
      return (
        // "scroll-mt" keeps the heading clear of the top when jumped to.
        <h2 id={headingId(block.text)} className="scroll-mt-8 pt-2 font-heading text-popup-title-sm font-semibold text-heading md:text-popup-title-lg">
          {block.text}
        </h2>
      );
    case "p":
      return <p className="text-body-base text-body md:text-body-md">{block.text}</p>;
    case "quote":
      return (
        <blockquote className="flex gap-5 rounded-reason bg-surface px-6 py-6 md:px-8 md:py-7">
          <span aria-hidden className="w-1 shrink-0 rounded-sm bg-linear-to-b from-primary to-secondary" />
          <p className="font-heading text-title-sm font-semibold text-primary-dark md:text-title">{block.text}</p>
        </blockquote>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-5.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-body-base text-body md:text-body-md">
              <span className="mt-0.75 shrink-0 rounded-full bg-brand p-1 text-white">
                <Glyph name="check" size={13} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className="flex flex-col gap-5.5">
          <div className="relative aspect-[780/380] overflow-hidden rounded-reason">
            <Image src={block.src} alt="" fill sizes="(min-width: 1280px) 780px, 100vw" className="object-cover" />
          </div>
          <figcaption className="text-caption font-medium text-muted">{block.caption}</figcaption>
        </figure>
      );
  }
}

/**
 * The text of the article (left column) followed by the "Written by" box.
 */
export default function ArticleContent({
  blocks,
  author,
  authorBio,
}: {
  blocks: ArticleBlock[];
  author: BlogPost["author"];
  authorBio: string;
}) {
  return (
    <article className="flex min-w-0 flex-col gap-5.5 xl:w-195 xl:shrink-0">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}

      <aside className="mt-2 flex flex-col items-start gap-4.5 rounded-post border border-border p-6 sm:flex-row sm:items-center md:p-7">
        <Image src={author.avatar} alt="" width={64} height={64} className="size-16 shrink-0 rounded-full" />
        <div className="flex flex-col gap-1.5">
          <p className="font-heading text-subtitle font-semibold text-heading">Written by {author.name}</p>
          <p className="text-small text-body">{authorBio}</p>
        </div>
      </aside>
    </article>
  );
}
