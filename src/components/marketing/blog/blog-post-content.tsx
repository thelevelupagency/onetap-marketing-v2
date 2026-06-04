import type { BlogPost } from "@/content/blog/posts";
import { getHeadingId } from "@/lib/blog";
import { type as typography } from "@/lib/typography";
import { BlogInlineText } from "@/components/marketing/blog/blog-inline-text";

const bodyClass = typography.body;

const articleClass =
  "prose prose-neutral flex max-w-none flex-col gap-marketing-prose-section-gap normal-case prose-p:my-0 prose-headings:mt-0 prose-headings:mb-0 prose-a:text-brand-turquoise-dark";

function BlogParagraphs({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter((p) => p.trim().length > 0);

  return (
    <div className="flex flex-col gap-marketing-prose-gap">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={bodyClass}>
          <BlogInlineText text={paragraph} />
        </p>
      ))}
    </div>
  );
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <article className={articleClass}>
      {post.content.map((block, i) => {
        if (block.startsWith("## ")) {
          const lines = block.split("\n");
          const heading = lines[0].slice(3);
          const id = getHeadingId(heading, post.headings);
          const body = lines.slice(1).join("\n").trim();
          return (
            <section
              key={i}
              id={id}
              className="flex scroll-mt-28 flex-col gap-2"
            >
              <h2 className={`${typography.subsectionTitle} normal-case`}>
                {heading}
              </h2>
              {body && <BlogParagraphs text={body} />}
            </section>
          );
        }
        return <BlogParagraphs key={i} text={block} />;
      })}
    </article>
  );
}
