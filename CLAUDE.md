# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (port 5173, HMR enabled)
npm run build     # tsc -b && vite build (TypeScript compile, then bundle)
npm run lint      # ESLint on all files
npm run preview   # Preview production build locally
```

No test framework is configured. This is a full e-commerce store — the only sales channel for STEM.

## Architecture

**STEM** is a multi-page React + TypeScript + Vite e-commerce store for a Warsaw-based flower delivery service. It is purely frontend — no backend, no API calls (except external Unsplash image URLs).

### Page Structure (React Router v7)

| Route | Page | Content |
|-------|------|---------|
| `/` | HomePage | Hero + Pricing + Testimonials + EmailCapture |
| `/shop` | ShopPage | Product catalog, filters by type/color, sort, ProductModal |
| `/how-it-works` | HowItWorksPage | 3-step process |
| `/about` | AboutPage | Brand story, stats |
| `/cart` | CartPage | Full cart, free delivery threshold 80 zł |
| `/checkout` | CheckoutPage | Order form, payment (Card/BLIK/Apple Pay), delivery slots |
| `/business` | BusinessPage | B2B page — corporate clients, bulk orders |
| `/faq` | FaqPage | 24 questions in 4 categories, accordion UI |

**Navigation:** left links [Home, Shop, For Businesses, How it works] · center STEM logo · right [About, FAQ] + cart icon + "Browse Flowers" pill (→ /shop).

**HomePage** composes sections in linear scroll order:
```
Hero (brand intro, GSAP word-drop animation, 5 floating blurred SVG flowers)
→ Products (6-product grid, click → ProductModal)
→ HowItWorks
→ Pricing (comparison table with GSAP scroll-triggered price counter)
→ Testimonials (masonry 3-col grid on desktop — NOT marquee)
→ EmailCapture (newsletter signup with meteor particle effect)
→ Footer
```

### Data

All product and testimonial data lives in `src/constants/products.ts`. There are 6 products (each with name, price, image URL, tag, and a pastel `color` hex used for hover overlays) and 5 testimonials.

### Animation Strategy

Three animation layers, each with a distinct role:
- **Framer Motion** — scroll-triggered entrance animations (`useInView` + `motion.div`). Use `once: true` and `margin: '-80px'` for viewport trigger offset.
- **GSAP** — complex sequenced animations (hero headline word-drop) and numerical counters (`ScrollTrigger`).
- **Tailwind keyframes** — continuous looping effects: `float` (decorative SVG flowers), `marquee` (ticker/testimonials), `meteor` (email section particles).

Always use `useInView(ref, { once: true })` for scroll animations — triggers once, then unmounts the listener.

### Styling

- Tailwind-only (no CSS modules or component-scoped styles).
- Custom semantic color palette defined in `tailwind.config.js`: `bg`, `bg-subtle`, `accent` (sage green), `accent-warm` (terracotta), `text-primary`, `text-secondary`, `surface`, `border`, `bark`.
- Two fonts: `Boska` (display/headings via `font-display`, `font-brand`, `font-editorial`) and `General Sans` (body via `font-sans`). Loaded via Fontshare CDN in `index.html` — not Google Fonts.
- Custom Tailwind utilities in `index.css`: `.text-display`, `.eyebrow`, `.section-heading`, `.shimmer-text` — use these for typographic consistency.
- All font sizes use `clamp()` for responsive scaling without breakpoints.
- `prefers-reduced-motion` is respected — ensure any new animations are covered in `index.css`.

### Adding a New Section

1. Create `src/components/sections/NewSection.tsx`
2. Import and place in `App.tsx`
3. Use `useRef` + `useInView({ once: true, margin: '-80px' })` for scroll animations
4. Add new keyframes/animations to `tailwind.config.js` `extend.keyframes` and `extend.animation`
5. Add anchor link to `Navigation.tsx` if needed

### TypeScript Config

Strict mode is on: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`. Target is `ES2023`, module resolution is `bundler`. Clean up unused imports/variables before building.

## graphify

Two knowledge graphs are available as MCP servers. Use the right one for the task:

| MCP server | Graph | When to use |
|---|---|---|
| `graphify-semantic` | `graphify-out/graph.json` | Architecture decisions, business rules, "why", patterns, semantic relations |
| `graphify-code` | `src/graphify-out/graph.json` | Find a file/function/component, code structure, "where", current AST |

**Rules — follow in order:**
1. Before reading any source file, query the appropriate graph with `query_graph`.
   - "Where is X implemented?" → `graphify-code`
   - "Why does X work this way?" / "What depends on X?" → `graphify-semantic`
2. For dependency/path questions use `get_neighbors` or `shortest_path`.
3. Only open a raw file when you need exact line-level code the graph doesn't contain.
4. `graphify-code` is always current (PostToolUse hook auto-runs `graphify update src/` on every Edit/Write).
5. `graphify-semantic` has richer context but may lag behind new files — cross-check with `graphify-code` when unsure.
