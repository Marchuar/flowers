---
type: "feedback"
date: "2026-04-23T00:00:00.000Z"
question: "Какие дизайн-решения нравятся пользователю и что было удалено?"
contributor: "graphify"
source_nodes: ["Hero section", "EmailCapture section", "Pricing section", "Products section + ProductCard", "Testimonials section"]
---

# Q: Какие дизайн-решения нравятся пользователю и что было удалено?

## Answer

**СОХРАНЯТЬ — пользователь это любит:**
- Hero анимации: word-drop GSAP + постепенно появляющийся фон
- Плавающие размытые SVG цветочки в Hero — float-анимация, эффект blur
- Meteor/sparkle в EmailCapture (тёмная секция внизу)
- Pricing comparison table с анимированным счётчиком
- Мягкая цветовая палитра (крем, sage green, терракота)
- Мягкость карточек товаров — округлые, пастельные

**УДАЛЕНО — пользователь отклонил:**
- Ticker/marquee новостная лента — некрасиво
- WhatsApp кнопка "Order on WhatsApp" — сайт единственный канал
- Двойной скроллящийся marquee для отзывов — заменён на featured quote + dots

**Типографика:**
- font-light (300) на display-заголовках — слишком тонко. Минимум font-[400] для font-display
- Кнопка навигации: "Browse Flowers" (НЕ "Order now" — путало пользователей)
- STEM лого: Bodoni Moda (font-brand) — высококонтрастный editorial serif

**Карточки товаров:** rounded-3xl, пастельный фон из цвета товара, hover tilt rotate: 1.5, кнопка "Add to bag" на всю ширину. Сетка: grid-cols-2 md:grid-cols-3 lg:grid-cols-4.

**Отзывы:** masonry 3-col на десктопе. НЕ marquee, НЕ crossfade с dots.

**Одна светлая тема** — тёмного режима нет, никакого ThemeContext.

**НЕ использовать** inline SVG botanical line-art как декорации фона — пользователь отклонял дважды.

## Source Nodes

- Hero section
- EmailCapture section
- Pricing section
- Products section + ProductCard
- Testimonials section
