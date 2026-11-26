---
name: social-creative-pipeline
description: Designs English OneTap social posts, carousels, Stories, Reel covers, and promo banners in the OneTap Social Figma file. Use when the brief is a social asset, feed post, story, reel cover, carousel, or promo banner. Do not use for marketing website pages.
---

# Social creative pipeline

Art direction: `.cursor/rules/social-art-direction.mdc`.

Compose in Figma. Do not build the post as a React page, `PageShell`, or marketing section.

## File

- Figma: [OneTap Social](https://www.figma.com/design/JxqjjabC2xZEvnDlp95llv) (`JxqjjabC2xZEvnDlp95llv`)
- Team: kaspiofir's team. Official remote MCP (`use_figma`). Load `figma-use` before every `use_figma` call. Pass `sessionId` from `create_session`.
- `Foundations` (page `0:1`) is the token board. Leave it in place. Create each campaign on its own page.

Brand color variables (collection `VariableCollectionId:1:12`, mode Value). Bind these ids. Do not bind the hidden Primitives collection, and do not paint raw hex.

| Token | Variable id | CSS |
|---|---|---|
| color/navy | `VariableID:1:13` | `var(--brand-navy)` |
| color/midnight | `VariableID:1:14` | `var(--brand-midnight)` |
| color/turquoise | `VariableID:1:15` | `var(--brand-turquoise)` |
| color/turquoise-dark | `VariableID:1:16` | `var(--brand-turquoise-dark)` |
| color/turquoise-light | `VariableID:1:17` | `var(--brand-turquoise-light)` |
| color/cream | `VariableID:1:18` | `var(--brand-cream)` |
| color/surface | `VariableID:1:19` | `var(--brand-surface)` |
| color/border | `VariableID:1:20` | `var(--brand-border)` |
| color/muted | `VariableID:1:21` | `var(--brand-muted)` |
| radius/md | `VariableID:1:22` | `var(--radius)` = 12 |

Text styles (id includes the trailing comma):

| Style | Id | Face |
|---|---|---|
| Display/Poster | `S:836aa08943c5ed598d36666db9556cc3d8b2dc50,` | Space Grotesk Bold, 96 / 95% / -4% / UPPER |
| Label/Pill | `S:471e38bf045137d5f6f8c4b81bb358c7d0b8a84b,` | Space Grotesk Bold, 28 / 100% / -2% / UPPER |
| Support/Short | `S:1124333a033e13609727357c655c8827e54a1906,` | Plus Jakarta Sans Regular, 22 / 120% |

Resolve with `figma.variables.getVariableByIdAsync` before binding. Load Space Grotesk Bold and Plus Jakarta Sans Regular before any text write.

## 1. Concept and copy hook

Stop before creating frames until the brief includes:

- Ratio: `1080×1350`, `1080×1080`, or `1080×1920`. Do not assume one.
- Slide count. `1` is a single frame. More than one is a carousel in that same ratio.
- The hook: English, two lines maximum, about two to six words. This is the only large type.
- Optional: one pill (a metric or a one-to-three-word promo) and one support line.

If the brief is Hebrew or asks for RTL, stop. This pipeline is English only. Website Hebrew stays on the i18n path.

Write the hook before opening Figma. If it needs a paragraph to make sense, shorten the hook. Do not add body copy to explain it.

## 2. Asset preparation

Use only the sources below. Do not add API keys or MCP config to the repo.

**Local brand files** (upload into the campaign page, then place):

- `public/logos/onetap_logo.png`
- `public/logos/onetap_logo_and_text_bright.png` on dark grounds
- `public/logos/onetap_logo_and_text_dark.png` on cream or surface
- `public/marketing/devices/iphone-13-pro-max-silver.png`
- `public/marketing/devices/macbook-pro-16-silver.webp`

**Icons.** Fetch SVG yourself. Allow only:

- `solar` icons whose name ends in `-bold-duotone`
- `ph` icons whose name ends in `-fill`

`https://api.iconify.design/{prefix}/{name}.svg`

Place the SVG inside a badge, stamp, or pill. Do not build an icon row.

**Not connected.** Recraft, Fal.ai, and Replicate have no MCP server in this workspace. If the brief needs a custom illustration, a new studio background, or a cutout that is not already in `public/`, stop and say which source is missing. Do not substitute stock art or generate a stand-in image.

## 3. Figma canvas composition

1. `create_session` on `JxqjjabC2xZEvnDlp95llv` when this task does not already have one.
2. Create a page named for the campaign. `await figma.setCurrentPageAsync(page)` once in that call. Do not edit `Foundations` except to read variables and styles.
3. For each slide, `figma.createFrame()`, `resize` to the brief’s pixel size, `clipsContent = true`, `layoutMode = "NONE"`. Name frames `01`, `02`, … Park them in a row with an 80px gap, clear of the origin.
4. Append layers back to front, each with absolute `x` / `y`:
   1. Ground rectangle, full frame, fill bound to a Brand color variable.
   2. Radial light: an ellipse larger than the frame, turquoise or cream at low opacity, sitting in the upper third. Blur it when a layer blur is available.
   3. Subject. Device frames may rotate (`rotation` in degrees). Let them overlap the type area.
   4. Hook text using `Display/Poster`. Resize the text box and, if needed, the font size until the block is about 40–50% of the frame height. Keep the style’s 95% line-height. Stay at or above 72px on a 1080-wide frame; cut words before going smaller.
   5. Pills and stamps. The pill’s outer shape may sit in absolute coordinates. Inside the pill, auto-layout is fine: icon, `Label/Pill` text, padding, radius bound to `radius/md` or a fully rounded pill.
   6. Grain, only when a grain texture already exists in the file. A full-frame overlay at roughly 8–14% opacity. If no texture exists, omit this layer.
5. Carousel continuity: a layer that crosses the right edge of slide N is repeated on slide N+1, shifted left by `1080` plus the 80px gap you used on the canvas, so the picture reads straight across the set.
6. Return every created node id from each `use_figma` call.

`generate_figma_design` is the website-capture tool. Do not call it for social frames.

The `figma-use` guidance to wrap related children in auto-layout applies inside pills and badges. The poster frame itself stays absolutely positioned so layers can overlap and tilt.

## 4. Refinement

Screenshot every frame with `get_screenshot` and check:

- The hook occupies about 40–50% of the height and uses Space Grotesk.
- There is no paragraph, three-column row, or stack of flat gray cards.
- A subject or pill overlaps another layer. The frame is not a single centered column.
- Brand colors are variable bindings.
- On a carousel, one motif continues across the cut.
- Copy is English.

Fix the frame and screenshot again. The last passing screenshot is the deliverable, plus the Figma link and the ratio you used.

## Done

Report the campaign page name, frame ids, ratio, slide count, and the hook. Note any skipped layer (grain, custom illustration, missing cutout) in one line.
