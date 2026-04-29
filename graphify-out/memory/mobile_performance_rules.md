---
type: "feedback"
date: "2026-04-23T00:00:00.000Z"
question: "Как оптимизировать мобильную производительность не удаляя эффекты?"
contributor: "graphify"
source_nodes: ["Hero section", "EmailCapture section"]
---

# Q: Как оптимизировать мобильную производительность не удаляя эффекты?

## Answer

**Правило:** Никогда не убирать визуальные эффекты ради оптимизации. Пользователь хочет сохранить blur на цветочках — это дизайн-фича.

**Техники оптимизации без потери эффектов:**
- `will-change: transform` на анимированных элементах с фильтрами = браузер растеризует фильтр один раз в GPU-текстуру → float-анимация перемещает текстуру дёшево (без пересчёта на каждый кадр)
- На мобиле: отключить parallax scroll (нет визуальных изменений при первом просмотре)
- Использовать `float-mobile` keyframes (только translateY, без rotate — разница незаметна)
- Скрыть 2 самых маленьких цветочка (Purple, Pink) на мобиле — меньше compositor layers
- Уменьшить количество частиц на мобиле (meteors 10→4) — sparkle сохраняется
- Пропустить 3D трансформации (GSAP rotateX) на мобиле — анимации играют, просто 2D

**Технический конфликт:** Никогда не использовать `transition-all` на `motion.div` с анимацией x/y/transform — CSS transition подхватывает Framer Motion changes, на мобиле GPU не успевает, виден flash/jump на последнем кадре. Решение: `transition-[padding-left]` вместо `transition-all`.

**Файлы:**
- `src/hooks/useIsMobile.ts` — хук определения мобиля
- `tailwind.config.js` — `animate-float-mobile`, `animate-float-mobile-slow`

## Source Nodes

- Hero section
- EmailCapture section
