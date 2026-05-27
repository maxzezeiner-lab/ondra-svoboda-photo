# King Shark Poker — Project Guide

Custom casino tables & accessories business website. Premium dark/gold design.
Owner email: zeiner.zdenek@gmail.com

## Stack

- **Next.js 16.2.6** with App Router (`app/` directory), TypeScript
- **Tailwind CSS v4** — CSS-based config via `@theme` in `globals.css`, NO `tailwind.config.ts`
- **React 19** — all interactive pages marked `"use client"`
- `xlsx` npm package for server-side order logging to `data/orders.xlsx`
- Dev server runs with `--turbopack` for faster startup

## Key Architecture Rules

### "use client" is mandatory on every interactive page
All three configurator pages (`tables`, `chairs`, `chips`) use `useState`. They MUST have `"use client"` at line 1.

### Never pass JSX as props to another component (the dead-button trap)
Previously `ConfiguratorLayout` received `controls={<jsx>}` as a prop — this orphaned event handlers during Next.js hydration. All three configurator pages now render their full JSX inline in their own `return` statement. **Do not reintroduce the JSX-as-props pattern.**

### Helper components must be defined OUTSIDE the page function
`Section`, `Opt`, `YesNo`, `SubLabel` etc. are all module-level functions. If defined inside the page component, React would lose their state on every render.

## File Map

```
app/
  page.tsx              — Home (server component)
  tables/page.tsx       — Table configurator ("use client", step-0 type picker + step-1 full config)
  chairs/page.tsx       — Chair configurator ("use client")
  chips/page.tsx        — Chips configurator ("use client")
  gallery/page.tsx      — Gallery with category filter ("use client")
  about/page.tsx        — About (server component)
  contact/page.tsx      — Contact form ("use client")
  api/submit/route.ts   — POST → appends row to data/orders.xlsx

components/
  Header.tsx            — Sticky nav, logo, EN/CZ switcher ("use client") — logo reads "King Shark Poker Tables"
  Footer.tsx            — Server component — uses .footer-link CSS class (no onMouse* handlers)
  configurator/
    ProductPreview.tsx  — Renders layered PNG stack; falls back to placeholder when no type selected
    PriceSummary.tsx    — Sticky right panel (top: 88px)
    ColorPicker.tsx     — Swatch grid + optional custom HEX; label prop renders only if non-empty
    CustomerInfoForm.tsx — Modal overlay, validates name/email/country before submit
    OptionGroup.tsx     — Generic option buttons (used sparingly; configurators use inline Opt)

lib/
  config.ts             — PRICES object (all EUR) + CONTENT (EN/CZ skeleton)
  colors.ts             — FELT_COLORS, VINYL_STANDARD, VINYL_PREMIUM, CHAIR_COLORS, CHIP_COLORS
  layers.ts             — Layer path builder for the configurator preview system
  images.ts             — Legacy single-photo path maps (kept for gallery; not used in configurator)
  gallery-data.ts       — GALLERY_ITEMS array

types/index.ts          — TableConfig, ChairConfig, ChipsConfig, CustomerInfo, etc.
public/images/          — Gallery photos + single product shots (see PHOTO_GUIDE.md)
public/layers/          — PNG layers for the configurator preview system (see below)
```

## Configurator Preview — Layered PNG System

The configurator preview (`ProductPreview.tsx`) stacks transparent PNG layers to compose a live product preview that updates as the user configures. Colour regions (felt, vinyl, upholstery) use CSS `mask-image` so a single greyscale mask PNG covers all colour variants — no per-colour files needed.

### Layer order (bottom → top) — Tables

| # | Layer | File | Notes |
|---|---|---|---|
| 1 | Legs | `legs-{A\|B\|C\|D\|E}.png` | Rendered behind table body |
| 2 | Base | `base.png` / `base-pit.png` | Table shell; pit variant when raised armrest selected |
| 3 | Felt | `felt-mask.png` (tint) | White silhouette of playing surface; coloured via CSS |
| 4 | Mat design | `mat-simpleLine.png` etc. | Conditional; only when mat design ≠ plain |
| 5 | Vinyl | `vinyl-mask.png` (tint) | White silhouette of rail wrap; coloured via CSS |
| 6 | Accessories | `cupholder.png`, `chiprack.png`, `lightrail.png` | Conditional |

### Layer order — Chairs

| # | Layer | File |
|---|---|---|
| 1 | Seat colour | `seat-mask.png` (tint) |
| 2 | Frame | `frame.png` |
| 3 | Armrest | `armrest.png` (conditional) |

### Layer order — Chips

| # | Layer | File |
|---|---|---|
| 1 | Base colour | `base-mask.png` (tint) |
| 2 | Edge detail | `edge.png` |

### File locations

```
public/layers/
  tables/{type}/{shape}/     e.g. tables/poker/oval/
  chairs/{type}/             e.g. chairs/highStool/
  chips/material-{a|b|c}/
```

### PNG specs
- Canvas: **1600 × 1000 px**, transparent background
- Format: **PNG-24 with alpha**
- All layers for a shape share the same canvas size and camera angle so they register perfectly when stacked
- Tint mask PNGs: white where colour should appear, fully transparent elsewhere
- Missing files fail silently (`onError` → `display:none`) — add layers incrementally

### How colours are applied
Each page (tables/chairs/chips) looks up the hex value from the selected colour ID and passes it to `ProductPreview`. `ProductPreview` passes it to `getTableLayers` / `getChairLayers` / `getChipLayers` in `lib/layers.ts`, which builds the ordered layer array. The `TintLayer` component applies `background-color + mask-image` to paint the region.

## Configurator Left Panel Pattern

All three configurator pages share this structure for the left panel:

```tsx
<div style={{
  background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "12px", padding: "1.5rem",
  position: "sticky", top: "88px", maxHeight: "calc(100vh - 108px)", overflowY: "auto"
}}>
  <Section title="...">
    {/* options */}
  </Section>
</div>
```

`Section` is a local collapsible component (chevron toggles open/closed) defined at module level.
`PriceSummary` (right panel) is also sticky at `top: 88px`.

## CSS Classes (globals.css)

- `.btn-gold` — primary gold button
- `.btn-outline-gold` — ghost gold button
- `.input-dark` — dark input/textarea
- `.card-premium` — dark card with gold border on hover
- `.product-card` — home page product cards with CSS hover transform
- `.footer-link` — footer links with CSS hover (no JS needed)
- `.configurator-grid` — `300px 1fr 280px` grid, collapses to single column at 1100px

## CSS Variables (`:root` in globals.css)

`--gold: #C9A84C`, `--surface: #111`, `--card: #1a1a1a`, `--border: #2a2a2a`, `--foreground: #f0ece0`

## Pricing

Central source of truth: `lib/config.ts` → `PRICES` object.
- Table: base (poker 1200€, blackjack 1100€, roulette 2500€, custom 1500€) + addons
- Chair: highStool 180€, lowOfficeChair 220€ per unit + armrests addon
- Chips: material A 0.80€/chip, B 1.20€/chip, C 2.00€/chip

## Order Submission

`POST /api/submit` — writes to `data/orders.xlsx` (created if missing).
Row format: Date, Time, Type, Name, Email, Phone, Company, Country, Message, Config JSON, Total.
Temporary solution — replace with email/CRM later.

## Known Gotchas

- **SSL during npm install**: `npm config set strict-ssl false` (corporate network)
- **Footer/home page hover**: must use CSS classes, NOT `onMouseEnter`/`onMouseLeave` on server components
- **ColorPicker label**: rendering is conditional (`{label && ...}`), pass `label=""` when wrapping in a Section to avoid double headers
- **Tailwind v4**: no `tailwind.config.ts` — add new tokens in `globals.css` under `@theme`
- **scroll-behavior warning**: fixed — `data-scroll-behavior="smooth"` added to `<html>` in `layout.tsx`
- **No decorative symbols/emojis** anywhere in the UI — removed from product cards, type selector, and ProductPreview
