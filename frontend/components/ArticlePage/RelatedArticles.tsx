import ArticleCard from "@/components/BlogPage/ArticleCard";
import type { BlogPost } from "@/data/blog";

/**
 * "Related articles": three article cards (same cards as the Blog page).
 * 1 per row on phones, 2 on tablets, 3 on desktop.
 */
export default function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  return (
    <section aria-labelledby="related-title" className="bg-surface">
      <div className="mx-auto flex w-full max-w-page flex-col gap-8 page-x section-y xl:gap-12">
        <h2 id="related-title" className="font-heading text-h2-sm font-bold text-heading md:text-h2-md">
          Related articles
        </h2>
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <ArticleCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
