---
type: community
cohesion: 0.14
members: 25
---

# Core App Architecture

**Cohesion:** 0.14 - loosely connected
**Members:** 25 nodes

## Members
- [[App (root component)]] - code - src/App.tsx
- [[CartDrawer (slide-out cart UI)]] - code - src/components/ui/CartDrawer.tsx
- [[Custom Tailwind animations (float, marquee, meteor, border-beam…)]] - code - tailwind.config.js
- [[Custom Tailwind color palette (bg, accent, bark, forest, blush…)]] - code - tailwind.config.js
- [[Custom font families (display, editorial, sans, brand)]] - code - tailwind.config.js
- [[EmailCapture section]] - code - src/components/sections/EmailCapture.tsx
- [[GSAP + ScrollTrigger]] - code - node_modules/gsap
- [[Hero section]] - code - src/components/sections/Hero.tsx
- [[HomePage]] - code - src/pages/HomePage.tsx
- [[HowItWorks section]] - code - src/components/sections/HowItWorks.tsx
- [[HowItWorksPage]] - code - src/pages/HowItWorksPage.tsx
- [[Pricing section]] - code - src/components/sections/Pricing.tsx
- [[Products section + ProductCard]] - code - src/components/sections/Products.tsx
- [[Ticker (marquee banner)]] - code - src/components/sections/Ticker.tsx
- [[Toast  ToastProvider (notifications)]] - code - src/components/ui/Toast.tsx
- [[framer-motion (animation library)]] - code - node_modules/framer-motion
- [[lucide-react (icons)]] - code - node_modules/lucide-react
- [[main.tsx (entry point)]] - code - src/main.tsx
- [[postcss.config.js_1]] - code - postcss.config.js
- [[products array (6 flower products)]] - code - src/constants/products.ts
- [[react-router-dom]] - code - node_modules/react-router-dom
- [[tailwind.config.js_1]] - code - tailwind.config.js
- [[useCart hook]] - code - src/context/CartContext.tsx
- [[useToast hook]] - code - src/components/ui/Toast.tsx
- [[vite.config.ts_1]] - code - vite.config.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Core_App_Architecture
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_Cart Data Model]]
- 3 edges to [[_COMMUNITY_Product Catalog & Utilities]]

## Top bridge nodes
- [[framer-motion (animation library)]] - degree 8, connects to 1 community
- [[Products section + ProductCard]] - degree 8, connects to 1 community
- [[App (root component)]] - degree 6, connects to 1 community
- [[HomePage]] - degree 4, connects to 1 community
- [[useCart hook]] - degree 3, connects to 1 community