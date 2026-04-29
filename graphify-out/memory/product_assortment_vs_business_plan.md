---
type: "query"
date: "2026-04-23T00:00:00.000Z"
question: "Соответствуют ли продукты в магазине бизнес-плану STEM?"
contributor: "graphify"
source_nodes: ["products[] array (6 flower products)", "products.ts (data constants)", "ShopPage"]
---

# Q: Соответствуют ли продукты в магазине бизнес-плану STEM?

## Answer

Ассортимент полностью соответствует бизнес-плану (roses, tulips seasonal, chrysanthemums, eustoma, peonies seasonal, wildflower mix).

**Текущие 6 продуктов в src/constants/products.ts:**
| Цветок | Цена | Тег | Соответствие |
|---|---|---|---|
| Roses | from 3.50 zł/stem | Bestseller | ✓ |
| Tulips | from 2.90 zł/stem | Seasonal | ✓ seasonal |
| Peonies | from 6.90 zł/stem | Premium | ⚠ по бизнес-плану тоже seasonal |
| Wildflowers | from 2.20 zł/stem | — | ✓ |
| Eustoma | from 4.50 zł/stem | — | ✓ |
| Chrysanthemum | from 3.20 zł/stem | — | ✓ |

**Единственное несоответствие:** Peonies отмечены как "Premium", но по бизнес-плану они seasonal. Premium оправдан по цене (самые дорогие), но можно добавить Seasonal тег.

Диапазон цен 2.20–6.90 zł/стебель совпадает с Pricing секцией и бизнес-планом.

## Source Nodes

- products[] array (6 flower products)
- products.ts (data constants)
- ShopPage
