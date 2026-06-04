---
name: blog-content-authoring
description: Adds or edits blog posts in src/content/blog/posts.ts with valid slugs, headings, and static generation compatibility. Use when creating blog content or fixing post structure.
---

# Blog Content Authoring

## Workflow

1. Open `src/content/blog/posts.ts` and match `BlogPost` shape.
2. Choose unique `slug` (kebab-case).
3. Write `content` as string array with `## Heading` blocks; align `headings[].id` with anchor ids.
4. Set `categories` (one or more), `date` (ISO), `coverImage`, `excerpt`.
5. Confirm `getAllSlugs()` / `generateStaticParams` include the slug (automatic when in `posts` array).
6. Run build to verify static paths.

## Checklist

- [ ] Slug unique and URL-safe
- [ ] `headings` match content structure
- [ ] Cover image host allowed in `next.config.ts`
- [ ] No duplicate title/slug

## Output format

```markdown
Blog post:
- Slug:
- Title:
- Category / date:

Verification:
- build:
- URL: /blog/<slug>
```
