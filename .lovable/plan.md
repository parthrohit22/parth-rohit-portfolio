## UI Polish Plan (content locked)

Goal: elevate visual polish, rhythm and readability without touching engineering copy, project data, links, or section order. All edits are presentation-only in `src/styles.css`, `src/components/*`, and layout markup in `src/routes/index.tsx`.

### 1. Design tokens (`src/styles.css`)

- Refine palette: slightly cooler background (`oklch(0.99 0.004 255)`), deeper foreground, softer border (`oklch(0.91 0.01 255)`), add `--surface-elevated`, `--accent-blue-soft`, `--shadow-sm`, `--shadow-card`, `--shadow-focus`.
- Add gradient tokens `--gradient-hairline` (top→bottom border fade) and `--gradient-diagram-bg` (very subtle blue wash) for figure backdrops.
- Introduce a fluid type scale via `clamp()` utilities: `.display-xl`, `.display-lg`, `.eyebrow`, `.body-lg`, `.body`, `.mono-caption`. Tighten tracking on large display sizes (`-0.045em`), open tracking on eyebrows.
- Improve `.action-link` (radius 8px, `transition` on bg/border/shadow, resting `shadow-sm`, hover lift), `.action-link-primary` (subtle inner highlight), `.nav-link` (underline-on-hover via `::after` grow), `.detail-list-item` (larger marker, aligned baseline), `.section-label` (slightly larger, `text-muted-foreground` by default with `.text-accent-blue` opt-in preserved).
- Add `.card-elevated` utility (bg-card, border, radius, shadow-card, hover lift + border darken) and `.hairline` divider utility.

### 2. Navigation (`src/components/site-header.tsx`)

- Keep brand text "Parth Rohit" (unchanged content). Add subtle scroll-state: header gains stronger backdrop-blur + hairline shadow after scroll (CSS-only via `backdrop-saturate` + existing border; no JS state needed beyond the sticky behavior already present).
- Tighten nav gap, add active-section indicator using `:target` pseudo-class fallback (visual only) — small underline under matching link when its section is `:target`. Purely CSS, no behavior change.
- Mobile menu: replace `<details>` chevron area with larger 44×44 tap target, add smooth open transition (transform+opacity), full-width sheet-style panel with hairline separators and consistent 12px padding.
- Add `aria-current` styling hooks (class only) so future JS can wire it.

### 3. Hero (`src/routes/index.tsx` Hero function)

- Regrid: on `lg` use `grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]` with larger `gap-16`, top-align. On mobile keep single column with more breathing room (`py-20 sm:py-28`).
- Typography: apply new `.display-xl` to headline for consistent fluid scale; increase supporting copy to `text-[17px] leading-8`; give the eyebrow a small colored dot before it (decorative span, no content change).
- Button hierarchy: primary (Selected Work) stays solid; GitHub + Resume become secondary with icon-only-on-mobile handled by CSS (labels remain in DOM for a11y). Add `gap-2.5` and align to a single row that wraps cleanly.
- Metadata row (`dl`): convert to a bordered chip strip using `.card-elevated` with vertical dividers between items on `sm+`, stacked on mobile. No text changes.
- "Evidence before claims" aside: promote to `.card-elevated`, tighten row padding, add hover state (bg tint + arrow translate), keep 01–04 counter.

### 4. Section wrapper (`src/components/section.tsx`)

- Replace hard `border-t` with a soft hairline gradient divider and slightly larger `py-24 sm:py-32`.
- Header block: add `max-w-3xl`, promote eyebrow to `.eyebrow`, title to `.display-lg`, description to `.body-lg`, add small underline accent under eyebrow.

### 5. Case study cards (`src/components/project-card.tsx`)

- Wrap each case study in a `.card-elevated` container with generous internal padding (`p-8 sm:p-12`) instead of the current flat top-border layout. Adds clear separation between projects; content itself untouched.
- Header: elevate the case-study counter to a small pill (`border rounded-full px-2 py-0.5`), improve title/positioning line-height, move repo/demo buttons to a right rail on `lg+`, stack cleanly on mobile.
- "Contribution boundary" callout: convert to a proper `.card-elevated` sub-card with left accent bar + slightly larger padding.
- "Implementation evidence" list: 3-col grid on `lg`, each item becomes a mini bordered card (rounded, subtle bg, hover border), preserving text verbatim.
- "Problem" / "Why it matters" / "Challenges" / "Tradeoffs": align to a 2-col grid with consistent gutter, unified `.section-label` styling, list markers refined.
- "Architecture" figure: give the diagram section a full-bleed feel inside the card — remove double borders, add `.gradient-diagram-bg`, larger caption, clearer figcaption typography.
- "Supporting technologies": convert plain paragraph to a wrapping row of subtle mono chips (`border` + `rounded-md` + `px-2 py-1`) — same strings, better scannability.
- "Engineering Decision Highlights": each decision card becomes `.card-elevated` with a numbered header, tighter DL typography, `dt`/`dd` spacing improved.

### 6. Architecture diagram (`src/components/project-diagram.tsx`)

- Bump `viewBox` height so labels never collide (`0 0 1000 380`), increase node radius to 8, add subtle drop-shadow filter on nodes, thicken edge stroke to 1.75 with rounded caps.
- Add faint dotted grid background (`<pattern>`) to make it read as a diagram, not a floating sketch.
- Use `--accent-blue` for edges, `color-mix` at 55% for edge labels; add small badge circle to node type indicator.
- Mobile fallback list: convert to numbered stepper with vertical connector line, larger tap area, mono numerals.

### 7. Engineering Approach / Capabilities / Experience / Contact / Footer

- Approach grid: switch from single hairline grid to individual `.card-elevated` tiles with hover lift; numeric label becomes a top-corner mono badge.
- Capabilities: keep 3-col grid, upgrade each item to `.card-elevated` w/ top accent hairline in `--accent-blue`.
- Experience: card-elevated for role + education, mono period becomes a right-aligned pill, contribution sub-sections get eyebrow + hairline dividers.
- Contact tiles: current grid becomes `.card-elevated` tiles with clear icon frame, hover state (bg tint, arrow translate), larger 48px icon square, ensure 44×44 tap targets on mobile.
- Footer: increase padding, add small brand cluster on left, right-side link row with dot separators.

### 8. Responsive & accessibility polish

- Ensure every icon-only Button variant (mobile menu trigger) has visible `aria-label` (already present — verified).
- Enforce `min-h-11 min-w-11` on primary tap targets (mobile menu trigger, contact icon frames, action-link).
- Add `focus-visible` ring token (`--shadow-focus`) applied consistently across action-link/card-elevated/nav-link.
- Confirm all headings retain single H1 (Hero), section H2s, card H3s — no structural change.
- Respect existing `prefers-reduced-motion` block; any new hover translates use `transform` inside a `@media (prefers-reduced-motion: no-preference)` guard.

### Non-goals (explicitly not doing)

- No changes to `src/lib/portfolio-data.ts` (all copy, project descriptions, evidence, decisions, tradeoffs, links preserved).
- No rewording in `index.tsx` — only class names, wrappers, and layout markup.
- No new dependencies. No new routes.
- No return of the removed hero architecture visual; no journey component reintroduced.

### Files touched

- `src/styles.css` (tokens + utilities)
- `src/components/site-header.tsx` (nav polish, mobile sheet)
- `src/components/section.tsx` (header typography, spacing, divider)
- `src/components/project-card.tsx` (card shell, sub-card treatments, chips)
- `src/components/project-diagram.tsx` (SVG polish, mobile stepper)
- `src/components/site-footer.tsx` (spacing/layout)
- `src/routes/index.tsx` (Hero layout classes, Approach/Capabilities/Experience/Contact class wrappers only)

### Verification

- After edits: run typecheck via build output, then Playwright screenshot at 1280 and 390 widths capturing hero, one case study (with diagram), approach grid, contact — verify hierarchy, spacing, no clipped text, focus rings visible on tab.
