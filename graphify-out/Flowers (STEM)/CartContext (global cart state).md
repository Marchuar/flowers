---
source_file: "src/context/CartContext.tsx"
type: "code"
community: "Cart Data Model"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/Cart_Data_Model
---

# CartContext (global cart state)

## Connections
- [[App (root component)]] - `wraps_with_provider` [EXTRACTED]
- [[CartItem interface]] - `manages_state_of` [EXTRACTED]
- [[Product interface]] - `depends_on_type` [EXTRACTED]
- [[cartReducer function]] - `contains_reducer` [EXTRACTED]
- [[parsePrice utility]] - `calls_function` [EXTRACTED]
- [[useCart hook]] - `reads_context` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/Cart_Data_Model