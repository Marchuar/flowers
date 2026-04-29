# Graph Report - .  (2026-04-29)

## Corpus Check
- 37 files · ~193,471 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 115 nodes · 74 edges · 47 communities detected
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]

## God Nodes (most connected - your core abstractions)
1. `STEM Business Plan` - 8 edges
2. `CLAUDE.md (project architecture guide)` - 7 edges
3. `Website goals: sell, SEO, explain concept, serve 3 segments` - 4 edges
4. `onTouchEnd()` - 3 edges
5. `Architecture decision: Tailwind-only styling (no CSS modules)` - 3 edges
6. `cartReducer()` - 2 edges
7. `nextImg()` - 2 edges
8. `prevImg()` - 2 edges
9. `parsePrice()` - 2 edges
10. `STEM brand (Warsaw flower delivery)` - 2 edges

## Surprising Connections (you probably didn't know these)
- `STEM brand (Warsaw flower delivery)` --represented_by--> `Favicon: purple lightning bolt / energy bolt shape (brand identity)`  [INFERRED]
  CLAUDE.md → public/favicon.svg
- `STEM Business Plan` --rationale_for--> `Website goals: sell, SEO, explain concept, serve 3 segments`  [INFERRED]
  graphify-out/memory/business_plan_stem.md → graphify-out/memory/website_goals_and_structure.md
- `cartReducer()` --calls--> `parsePrice()`  [INFERRED]
  src/context/CartContext.tsx → src/lib/utils.ts
- `Website is the ONLY sales channel (no WhatsApp, no store)` --rationale_for--> `Design decision: WhatsApp button removed (not sales channel)`  [INFERRED]
  graphify-out/memory/website_goals_and_structure.md → graphify-out/memory/design_preferences.md
- `Design rule: keep Hero GSAP word-drop + floating blurred SVG flowers` --conceptually_related_to--> `Mobile rule: KEEP blur on SVG flowers (design feature, never remove)`  [INFERRED]
  graphify-out/memory/design_preferences.md → graphify-out/memory/mobile_performance_rules.md

## Hyperedges (group relationships)
- **STEM Business Context (plan + goals + assortment)** — business_plan_stem_concept, website_goals, product_range_stems, website_only_sales_channel [INFERRED 0.90]
- **Design Rules and Preferences** — design_keep_hero_animations, design_no_botanical_svg, design_font_weight_rule, design_system_light_only, mobile_keep_blur [INFERRED 0.85]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (11): Architecture decision: clamp() for responsive font sizes without breakpoints, Architecture decision: purely frontend, no backend/API calls, Architecture decision: prefers-reduced-motion respected in index.css, Architecture decision: Tailwind-only styling (no CSS modules), Architecture decision: Three animation layers (Framer Motion, GSAP, Tailwind keyframes), Architecture decision: useInView once:true for scroll animations, CLAUDE.md (project architecture guide), Semantic color palette: bg, bg-subtle, accent (sage green), accent-warm (terracotta), text-primary, text-secondary, surface, border, bark (+3 more)

### Community 1 - "Community 1"
Cohesion: 0.2
Nodes (0): 

### Community 2 - "Community 2"
Cohesion: 0.24
Nodes (10): STEM Business Plan, Future: weekly/monthly flower subscription, Operations: 2h delivery, 9-21 window, Warsaw, Product assortment matches business plan (6 stems, 2.20-6.90 zl), Peonies tagged Premium not Seasonal — minor mismatch with business plan, Product range: roses, tulips, chrysanthemums, eustoma, peonies, wildflowers, STEM UTP — wholesale price, no bouquets, Target segment: B2B companies and offices (+2 more)

### Community 3 - "Community 3"
Cohesion: 0.25
Nodes (2): cartReducer(), parsePrice()

### Community 4 - "Community 4"
Cohesion: 0.32
Nodes (3): nextImg(), onTouchEnd(), prevImg()

### Community 5 - "Community 5"
Cohesion: 0.4
Nodes (5): Design decision: WhatsApp button removed (not sales channel), SEO: dostawa kwiatow Warszawa, tanie kwiaty online, Site routes: /, /shop, /how-it-works, /about, /cart, /checkout, /business, /faq, Website goals: sell, SEO, explain concept, serve 3 segments, Website is the ONLY sales channel (no WhatsApp, no store)

### Community 6 - "Community 6"
Cohesion: 0.5
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 0.5
Nodes (4): Design rule: keep Hero GSAP word-drop + floating blurred SVG flowers, Mobile rule: KEEP blur on SVG flowers (design feature, never remove), Bug rule: never use transition-all on motion.div (causes flash on mobile), Mobile optimization: will-change transform + float-mobile keyframes

### Community 8 - "Community 8"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Community 15"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Community 16"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (2): public/icons.svg (brand icon sprite), SVG symbol set: bluesky, discord, documentation, github, social, x icons

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (2): src/assets/hero.png (isometric 3D product image, white/purple layers), Hero image: isometric 3D layered shapes (white top layer, purple-glowing bottom)

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (2): Typography rule: min font-400 for font-display headings (not font-light), Design system fonts: Boska display + General Sans body via Fontshare CDN

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (2): Design system colors: bg #FAFAF7, accent #2C5F3E sage green, accent-warm #C8622A terracotta, Design: single light theme only, no dark mode, no ThemeContext

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (1): Toast / ToastProvider (notifications)

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (1): useToast hook

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (1): Design decision: Ticker marquee removed (ugly)

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (1): Rule: no inline botanical SVG line-art as background decoration

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (1): Testimonials: masonry 3-col grid, NOT marquee or crossfade

## Knowledge Gaps
- **26 isolated node(s):** `Toast / ToastProvider (notifications)`, `useToast hook`, `public/icons.svg (brand icon sprite)`, `public/favicon.svg (STEM brand favicon, purple lightning bolt)`, `src/assets/hero.png (isometric 3D product image, white/purple layers)` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 8`** (2 nodes): `ScrollToTop()`, `ScrollToTop.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (2 nodes): `onKeyDown()`, `CartDrawer.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (2 nodes): `Ticker.tsx`, `TickerItem()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (2 nodes): `useCart.ts`, `useCart()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (2 nodes): `useIsMobile.ts`, `useIsMobile()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (2 nodes): `setLanguage()`, `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (2 nodes): `handlePlaceOrder()`, `CheckoutPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (2 nodes): `toggleType()`, `ShopPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (2 nodes): `HowItWorksPage()`, `HowItWorksPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (2 nodes): `RevealSection()`, `BusinessPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `HomePage()`, `HomePage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (2 nodes): `public/icons.svg (brand icon sprite)`, `SVG symbol set: bluesky, discord, documentation, github, social, x icons`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `src/assets/hero.png (isometric 3D product image, white/purple layers)`, `Hero image: isometric 3D layered shapes (white top layer, purple-glowing bottom)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `Typography rule: min font-400 for font-display headings (not font-light)`, `Design system fonts: Boska display + General Sans body via Fontshare CDN`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `Design system colors: bg #FAFAF7, accent #2C5F3E sage green, accent-warm #C8622A terracotta`, `Design: single light theme only, no dark mode, no ThemeContext`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (1 nodes): `tailwind.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (1 nodes): `eslint.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (1 nodes): `postcss.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (1 nodes): `cartContextDef.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (1 nodes): `products.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (1 nodes): `FloatingInput.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (1 nodes): `Toast / ToastProvider (notifications)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `useToast hook`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `Hero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `Pricing.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `HowItWorks.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `EmailCapture.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `Testimonials.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `Footer.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `Navigation.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `en.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `pl.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `CartPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `AboutPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (1 nodes): `FaqPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `Design decision: Ticker marquee removed (ugly)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (1 nodes): `Rule: no inline botanical SVG line-art as background decoration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (1 nodes): `Testimonials: masonry 3-col grid, NOT marquee or crossfade`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `STEM Business Plan` connect `Community 2` to `Community 5`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `Website goals: sell, SEO, explain concept, serve 3 segments` connect `Community 5` to `Community 2`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `Toast / ToastProvider (notifications)`, `useToast hook`, `public/icons.svg (brand icon sprite)` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._