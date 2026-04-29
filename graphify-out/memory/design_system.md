---
type: "context"
date: "2026-04-23T00:00:00.000Z"
question: "Какая дизайн-система используется в STEM (цвета, шрифты, утилиты)?"
contributor: "graphify"
source_nodes: ["Custom Tailwind color palette (bg, accent, bark, forest, blush…)", "Custom font families (display, editorial, sans, brand)", "tailwind.config.js"]
---

# Q: Какая дизайн-система используется в STEM (цвета, шрифты, утилиты)?

## Answer

**Цвета (Tailwind, hardcoded hex в tailwind.config.js):**
- `bg`: #FAFAF7 (cream white)
- `bg-subtle`: #F2EDE4
- `surface`: #FFFFFF
- `accent`: #2C5F3E (deep sage green)
- `accent-warm`: #C8622A (terracotta)
- `text-primary`: #111110
- `text-secondary`: #706860
- `border`: #DDD8CF
- `ink` / `ink-text`: #111110 / #FAF8F4 — тёмный фон / светлый текст (Footer, EmailCapture)

**Шрифты:** Boska (Fontshare, display/headings, font-display/font-brand/font-editorial) + General Sans (Fontshare, body, font-sans). Загружаются через Fontshare CDN в index.html.

**CSS утилиты** (src/index.css): .text-display, .section-heading, .eyebrow, .shimmer-text, .tag

**Анимации (Tailwind keyframes):**
- float / float-mobile / float-mobile-slow — плавающие SVG цветочки
- marquee — тикер/отзывы
- meteor — EmailCapture частицы
- border-beam — декоративная обводка

**3 слоя анимаций:**
1. Framer Motion — scroll-triggered входные анимации (useInView + motion.div, once: true, margin: -80px)
2. GSAP — сложные секвенционные анимации (hero word-drop) и счётчики (ScrollTrigger)
3. Tailwind keyframes — непрерывные loop-эффекты

**Шрифты:** Подключены через Fontshare CDN в index.html. НЕ Google Fonts.

## Source Nodes

- Custom Tailwind color palette (bg, accent, bark, forest, blush…)
- Custom font families (display, editorial, sans, brand)
- tailwind.config.js
