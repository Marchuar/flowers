---
type: "context"
date: "2026-04-23T00:00:00.000Z"
question: "Какова структура сайта STEM и его цели?"
contributor: "graphify"
source_nodes: ["App (root component)", "Navigation", "HomePage", "ShopPage", "CheckoutPage", "CartPage"]
---

# Q: Какова структура сайта STEM и его цели?

## Answer

**Сайт — ЕДИНСТВЕННЫЙ канал продаж.** Это полноценный e-commerce магазин, не лендинг.

**Цели сайта:**
1. Продавать цветы — каталог, корзина, оплата
2. Ранжироваться в Google по польским ключевым словам: *dostawa kwiatów Warszawa*, *tanie kwiaty online*
3. Чётко донести концепцию — "просто стебли, без букетов, оптовая цена"
4. Обслуживать все 3 сегмента аудитории
5. Поддерживать будущую подписку (архитектура должна позволять)

**Маршруты (React Router v7):**
- `/` — HomePage: Hero + Pricing + Testimonials + EmailCapture
- `/shop` — ShopPage: полный каталог с фильтрами и ProductModal
- `/how-it-works` — HowItWorksPage: 3-шаговый процесс
- `/about` — AboutPage: история бренда, статистика
- `/cart` — CartPage: полная корзина
- `/checkout` — CheckoutPage: оформление заказа
- `/business` — BusinessPage: B2B страница
- `/faq` — FaqPage: 24 вопроса в 4 категориях, аккордеон

**Навигация:** левые ссылки [Home, Shop, For Businesses, How it works] · центр STEM лого · правые ссылки [About, FAQ] + иконка корзины + кнопка "Browse Flowers" (ведёт на /shop).

## Source Nodes

- App (root component)
- Navigation
- HomePage
- ShopPage
- CheckoutPage
- CartPage
