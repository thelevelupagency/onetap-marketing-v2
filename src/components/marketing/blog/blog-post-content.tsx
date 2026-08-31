import type { BlogPost } from "@/content/blog/types";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { getHeadingId } from "@/lib/blog";
import { parseBlogBody, parseContentBlock } from "@/lib/blog-markdown";
import { type as typography } from "@/lib/typography";
import { BlogBlockRenderer } from "@/components/marketing/blog/blocks/blog-block-renderer";

const articleClass =
  "prose prose-neutral mx-auto flex w-full max-w-prose flex-col gap-marketing-prose-section-gap pt-2 normal-case prose-p:my-0 prose-headings:mt-0 prose-headings:mb-0 prose-a:text-brand-turquoise-dark prose-figure:max-w-none [&_figure]:w-full [&_figure_img]:!m-0 [&_figure_img]:!size-full [&_figure_img]:!max-w-none [&_figure_img]:!object-cover";

export function BlogPostContent({ post, locale = DEFAULT_LOCALE }: { post: BlogPost; locale?: Locale }) {
  return (
    <article className={articleClass}>
      {post.content.map((block, i) => {
        const parsed = parseContentBlock(block);

        if (parsed.kind === "section") {
          const id = getHeadingId(parsed.heading, post.headings);
          const nodes = parseBlogBody(parsed.body);
          return (
            <section
              key={i}
              id={id}
              className="flex scroll-mt-28 flex-col gap-marketing-prose-gap"
            >
              <h2
                className={`${typography.subsectionTitle} text-pretty normal-case`}
              >
                {parsed.heading}
              </h2>
              {nodes.length > 0 ? (
                <BlogBlockRenderer nodes={nodes} headings={post.headings} locale={locale} />
              ) : null}
            </section>
          );
        }

        const nodes = parseBlogBody(parsed.body);
        return (
          <BlogBlockRenderer key={i} nodes={nodes} headings={post.headings} locale={locale} />
        );
      })}
    </article>
  );
}
