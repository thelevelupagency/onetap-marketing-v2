# Fix mobile-only blank MacBook mockups

## What we now know

Not a coincidence, and not “all device frames fail on iOS”:

- **Works on mobile and desktop:** homepage hero phones and the other homepage phones (card UX / same `IPhone13ProMaxMockup` path).
- **Broken on mobile only:** homepage dashboard MacBook, agency workspace MacBook, and the agency governance block (phone + laptop). Desktop of those is fine.

So we **do not** rewrite the shared iPhone mockup or unwrap Card UX. Hero already proves `transform: scale()` of the 1500×3000 bezel paints correctly on iPhone.

## Why laptops fail only on mobile

`MarketingLaptopPreview` is a different path from phones:

- Phones use a **fixed** scale. Even governance is ~261px wide — fits an iPhone.
- The laptop **initial** scale was `MACBOOK_PRO_16_SCALE_MOBILE_MAX = 0.24`, which is a **cap**, not a fit. Layout width is `~2170 × 0.24 ≈ 521px`.
- iPhone CSS width is ~390px. Until `ResizeObserver` runs, the layout box is **wider than the viewport**.
- `body` has `overflow-x-clip`. On mobile that clips the oversized scaled layer; you still get reserved height (the parent is `w-full`) but **no visible frame**. Desktop containers are wide enough for 0.24, so they never hit this.

The inner MacBook node was still **in-flow at 2170px** then CSS-scaled. That is the overflow `clip` is fighting.

The governance **phone** uses the same mockup as the working hero. It is almost certainly collateral: section `overflow-x-clip` + oversized sibling laptop + scroll `Reveal`. Not a broken iPhone component.

## Approach

Keep desktop motion/layout. Narrow mobile fixes only.

### 1. Laptop must fit the container on first paint (primary)

In `marketing-laptop-preview.tsx` + `laptop-mockup.ts`:

- Stop using `0.24` as the **default** width. Default to a scale that fits ~360px. `0.24` stays a **max cap** only.
- Layout box: `width: layout.width`, `maxWidth: "100%"`, height from the mockup **aspect ratio**.
- Keep `ResizeObserver` for fluid desktop; it must never be required for the box to fit on a phone.

### 2. Contain only the MacBook inner layer

In `macbook-pro-16-mockup.tsx` only:

- Clip shell: `overflow-hidden isolate`, layout-sized
- Inner bezel: `position: absolute; left: 0` with unscaled size + `transform: scale(...)` so 2170px is **out of flow**
- Top trim via `top: -(MACBOOK_PRO_16_TOP_TRIM * scale)` instead of `marginTop`

Leave `iphone-13-pro-max-mockup.tsx` alone unless governance still fails after (1)–(3).

### 3. Agency governance parents (the only broken phone)

In `agency-governance-section.tsx`:

- Remove `overflow-x-clip` on the section
- Keep `Reveal` on copy; wrap phone and laptop columns in plain `div`s

### 4. Unwrap laptops from scroll Reveal only

Replace device-column `Reveal` with a `div` in:

- `dashboard-section.tsx`
- `agency-workspace-simulator.tsx`

Do **not** change hero, `card-ux-section.tsx`, freelancer phones, or global `useRevealVisibility`.

## Verification

- `npm run typecheck && npm run lint && npm run build`
- Desktop: dashboard + agency workspace + governance still look correct; no new horizontal scroll
- **Real iPhone Safari:** those three surfaces show bezel + screenshot; **hero fan and homepage card-UX phone unchanged**

No sitemap/SEO/route changes. Skip `CHLOG-AI.md`.
