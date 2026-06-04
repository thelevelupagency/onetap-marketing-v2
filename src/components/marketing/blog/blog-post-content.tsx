import type { BlogPost } from "@/content/blog/posts";
import { getHeadingId } from "@/lib/blog";
import { type as typography } from "@/lib/typography";
import { BlogInlineText } from "@/components/marketing/blog/blog-inline-text";

const bodyClass = `${typography.body} leading-7`;

function BlogParagraphs({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter((p) => p.trim().length > 0);

  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={bodyClass}>
          <BlogInlineText text={paragraph} />
        </p>
      ))}
    </>
  );
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <article className="prose prose-neutral flex max-w-none flex-col gap-marketing-stack-gap normal-case prose-a:text-brand-turquoise-dark">
      {post.content.map((block, i) => {
        if (block.startsWith("## ")) {
          const lines = block.split("\n");
          const heading = lines[0].slice(3);
          const id = getHeadingId(heading, post.headings);
          const body = lines.slice(1).join("\n").trim();
          return (
            <section
              key={i}
              className="flex flex-col gap-3 border-t border-brand-midnight/5 pt-marketing-stack-gap first-of-type:border-0 first-of-type:pt-0"
            >
              <h2
                id={id}
                className={`${typography.subsectionTitle} scroll-mt-28 normal-case`}
              >
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
