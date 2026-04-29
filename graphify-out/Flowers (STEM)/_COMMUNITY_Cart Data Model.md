---
type: community
cohesion: 0.70
members: 5
---

# Cart Data Model

**Cohesion:** 0.70 - tightly connected
**Members:** 5 nodes

## Members
- [[CartContext (global cart state)]] - code - src/context/CartContext.tsx
- [[CartItem interface]] - code - src/context/CartContext.tsx
- [[Product interface]] - code - src/constants/products.ts
- [[cartReducer function]] - code - src/context/CartContext.tsx
- [[parsePrice utility]] - code - src/lib/utils.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Cart_Data_Model
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_Core App Architecture]]

## Top bridge nodes
- [[CartContext (global cart state)]] - degree 6, connects to 1 community
- [[Product interface]] - degree 3, connects to 1 community