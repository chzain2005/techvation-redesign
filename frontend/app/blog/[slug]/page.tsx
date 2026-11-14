import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticlePage/ArticleContent";
import ArticleCover from "@/components/ArticlePage/ArticleCover";
import ArticleHeader from "@/components/ArticlePage/ArticleHeader";
import ArticleSidebar from "@/components/ArticlePage/ArticleSidebar";
import RelatedArticles from "@/components/ArticlePage/RelatedArticles";
import { blogPosts, getPost, relatedPosts } from "@/data/blog";
import { articleContent, articleHeadings, defaultArticleCta } from "@/data/blog-articles";

/** Build one page per article ahead of time, e.g. /blog/rag-explained. */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Techvation`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.cover], type: "article" },
  };
}

/**
 * A blog article ("08 · Blog Article" in Figma): dark header, cover photo,
 * the article with its sidebar, and three related articles. The card
 * details come from /data/blog.ts and the text from /data/blog-articles.ts.
 * The navbar, footer and pop-ups come from app/layout.tsx.
 */
export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  const content = articleContent[slug];
  if (!post || !content) notFound();

  return (
    <main>
      <ArticleHeader post={post} />
      <ArticleCover src={post.cover} />

      {/* Article and sidebar: side by side on desktop, stacked below xl. */}
      <div className="bg-white">
        <div className="mx-auto flex w-full max-w-page flex-col gap-12 page-x section-y xl:flex-row xl:items-start xl:gap-20">
          <ArticleContent blocks={content.blocks} author={post.author} authorBio={content.authorBio} />
          <ArticleSidebar
            title={post.title}
            headings={articleHeadings(content.blocks)}
            cta={content.cta ?? defaultArticleCta}
          />
        </div>
      </div>

      <RelatedArticles posts={relatedPosts(post)} />
    </main>
  );
}
