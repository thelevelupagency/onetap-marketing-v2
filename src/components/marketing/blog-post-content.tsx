import type { BlogPost } from "@/content/blog/posts";

export function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <article className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:leading-none prose-h1:leading-[0.95] prose-h2:leading-none prose-h3:leading-tight prose-headings:text-brand-midnight prose-p:text-brand-midnight/80 prose-a:text-brand-turquoise-dark">
      {post.content.map((block, i) => {
        if (block.startsWith("## ")) {
          const lines = block.split("\n");
          const heading = lines[0].slice(3);
          const id = heading.toLowerCase().replace(/\s+/g, "-");
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
