import type { BlogContentNode } from "@/lib/blog-markdown";
import type { BlogHeading } from "@/content/blog/posts";
import { getHeadingId } from "@/lib/blog";
import { type as typography } from "@/lib/typography";
import { BlogRichText } from "@/components/marketing/blog/blog-rich-text";
import { BlogBlockCallout } from "@/components/marketing/blog/blocks/blog-block-callout";
import { BlogBlockFigure } from "@/components/marketing/blog/blocks/blog-block-figure";
import { BlogBlockOl, BlogBlockUl } from "@/components/marketing/blog/blocks/blog-block-list";

export function BlogBlockRenderer({
  nodes,
  headings,
}: {
  nodes: BlogContentNode[];
  headings: BlogHeading[];
}) {
  return (
    <div className="flex flex-col gap-marketing-prose-gap [&>h3]:mt-6 [&>h3:first-child]:mt-0">
      {nodes.map((node, i) => {
        switch (node.type) {
          case "paragraph":
            return (
              <p key={i} className={typography.body}>
                <BlogRichText text={node.text} />
              </p>
            );
          case "ul":
            return <BlogBlockUl key={i} items={node.items} />;
          case "ol":
            return <BlogBlockOl key={i} items={node.items} />;
          case "image":
            return <BlogBlockFigure key={i} alt={node.alt} src={node.src} />;
          case "callout":
            return (
              <BlogBlockCallout key={i} variant={node.variant} text={node.text} />
            );
          case "h3": {
            const id = getHeadingId(node.text, headings);
            return (
              <h3
                key={i}
                id={id}
                className={`${typography.proseSubheading} scroll-mt-28 text-pretty normal-case`}
              >
                {node.text}
              </h3>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
