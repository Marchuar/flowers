# Graph Report - src  (2026-05-01)

## Corpus Check
- 35 files · ~26,837 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 80 nodes · 49 edges · 2 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]

## God Nodes (most connected - your core abstractions)
1. `onTouchEnd()` - 3 edges
2. `cartReducer()` - 2 edges
3. `nextImg()` - 2 edges
4. `prevImg()` - 2 edges
5. `parsePrice()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `cartReducer()` --calls--> `parsePrice()`  [INFERRED]
  context/CartContext.tsx → src/lib/utils.ts

## Communities

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (2): cartReducer(), parsePrice()

### Community 2 - "Community 2"
Cohesion: 0.32
Nodes (3): nextImg(), onTouchEnd(), prevImg()

## Knowledge Gaps
- **Thin community `Community 1`** (8 nodes): `CartProvider()`, `cartReducer()`, `loadCart()`, `CartContext.tsx`, `utils.ts`, `cn()`, `formatPrice()`, `parsePrice()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Not enough signal to generate questions. This usually means the corpus has no AMBIGUOUS edges, no bridge nodes, no INFERRED relationships, and all communities are tightly cohesive. Add more files or run with --mode deep to extract richer edges._