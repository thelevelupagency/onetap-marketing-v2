import type { BlogPost } from "@/content/blog/posts";
import { getHeadingId } from "@/lib/blog";

export function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <article className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-4xl prose-h2:md:text-5xl prose-h2:leading-none prose-h3:text-xl prose-h3:md:text-2xl prose-h3:leading-tight prose-headings:text-brand-midnight prose-p:type-body prose-a:text-brand-turquoise-dark">
      {post.content.map((block, i) => {
        if (block.startsWith("## ")) {
          const lines = block.split("\n");
          const heading = lines[0].slice(3);
          const id = getHeadingId(heading, post.headings);
          const body = lines.slice(1).join("\n").trim();
          return (
            <div key={i}>
              <h2 id={id} className="scroll-mt-28">{heading}</h2>
              {body && <p>{body}</p>}
            </div>
          );
        }
        return <p key={i}>{block}</p>;
      })}
    </article>
  );
}
