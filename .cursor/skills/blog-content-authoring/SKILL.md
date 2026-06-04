---
name: blog-content-authoring
description: Adds or edits blog posts in src/content/blog/ with valid slugs, headings, and static generation compatibility. Use when creating blog content or fixing post structure.
---

# Blog Content Authoring

## Workflow

1. Add or edit a post in `src/content/blog/copywriter-posts.ts` or `src/content/blog/editorial-posts.ts` (merged in `posts.ts`).
2. Match `BlogPost` shape in `src/content/blog/types.ts`.
3. Choose unique `slug` (kebab-case).
4. Write `content` as a string array; use light markdown below.
5. Align `headings[]` with every `##` and `###` in content (`id` + `text` + `level`). Only `level: 2` appears in the on-page TOC; `level: 3` is for in-article anchors only.
6. Run build to verify static paths.

## Light markdown (body)

| Syntax | Notes |
|--------|--------|
| `## Title` | Start a `content[]` block: `"## Title\n\nbody..."` |
| `### Title` | Subhead inside a section; add to `headings` with `level: 3` (anchor only — not shown in on-page TOC) |
| `- item` | Bullet list (prefer over `•`) |
| `1. item` | Numbered list |
| `**text**` | Bold in paragraphs |
| `![caption](url)` | Inline image (Unsplash hosts allowed in `next.config.ts`) |
| `> Tip: …` / `> Summary: …` | Callout panel |
| `/blog/other-slug` | Auto-links with a short label (title before `:`, or readable slug) |

**Style:** Short paragraphs (≤80 words), one idea each; one inline image on long posts.

## Checklist

- [ ] Slug unique and URL-safe
- [ ] `headings` match `##` / `###` in content
- [ ] `categories` is a non-empty array
- [ ] Cover image host allowed in `next.config.ts`
## Output format

```markdown
Blog post:
- Slug:
- Title:
- Categories / date:

Verification:
- build:
- URL: /blog/<slug>
```
