---
type: community
cohesion: 0.15
members: 18
---

# Cart & Checkout Flow

**Cohesion:** 0.15 - loosely connected
**Members:** 18 nodes

## Members
- [[Business rule delivery cost 9 zł (below threshold)]] - code - src/pages/CartPage.tsx
- [[Business rule free delivery threshold (80 zł)]] - code - src/pages/CartPage.tsx
- [[Cart item count badge with spring animation]] - code - src/components/layout/Navigation.tsx
- [[CartPage]] - code - src/pages/CartPage.tsx
- [[CheckoutPage]] - code - src/pages/CheckoutPage.tsx
- [[Delivery time slots (9-12, 12-15, 15-18, 18-21)]] - code - src/pages/CheckoutPage.tsx
- [[FloatingInput]] - code - src/components/ui/FloatingInput.tsx
- [[Footer]] - code - src/components/layout/Footer.tsx
- [[Footer STEM watermark (oversized transparent brand text)]] - code - src/components/layout/Footer.tsx
- [[Mobile menu body scroll lock pattern]] - code - src/components/layout/Navigation.tsx
- [[Nav links Home, Shop, How it works, About]] - code - src/components/layout/Navigation.tsx
- [[Navigation]] - code - src/components/layout/Navigation.tsx
- [[Navigation scroll-aware background (transparent→frosted glass at 60px)]] - code - src/components/layout/Navigation.tsx
- [[Order number format STEM-XXXXX (random 5-digit)]] - code - src/pages/CheckoutPage.tsx
- [[Payment methods Card, BLIK, Bank transfer, Apple Pay]] - code - src/pages/CheckoutPage.tsx
- [[React Router (react-router-dom)]] - code - src/components/layout/Footer.tsx
- [[lucide-react icon library]] - code - src/components/layout/Navigation.tsx
- [[useCart() context hook]] - code - src/context/CartContext.tsx

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Cart_&_Checkout_Flow
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_Design System & Architecture Decisions]]
- 1 edge to [[_COMMUNITY_Product Catalog & Utilities]]

## Top bridge nodes
- [[CheckoutPage]] - degree 9, connects to 1 community
- [[Navigation]] - degree 8, connects to 1 community
- [[CartPage]] - degree 7, connects to 1 community
- [[React Router (react-router-dom)]] - degree 5, connects to 1 community
- [[Footer]] - degree 3, connects to 1 community