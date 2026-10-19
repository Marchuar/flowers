# STEM – Blumenshop

Online-Shop für einen Blumen-Lieferservice in Warschau. Die Geschäftsidee habe ich gemeinsam mit meinem Bruder entwickelt, die Webseite habe ich allein gebaut, mit Claude Code und Claude Design als Unterstützung.

**Live-Demo:** https://flowers-olive-gamma.vercel.app

## Funktionen
- Startseite mit Hero-Bereich, Preisen, Kundenstimmen und E-Mail-Anmeldung
- Shop mit Filtern nach Art und Farbe, Sortierung und Produktdetails
- Warenkorb (Gratislieferung ab 80 zł) und Bestellformular mit Lieferzeiten und Zahlungsarten
- Seite für Geschäftskunden und Großbestellungen
- Zweisprachig: Polnisch und Englisch
- Animationen mit Framer Motion und GSAP

## Technik
React 19, TypeScript, Vite, Tailwind CSS, React Router, i18next, Framer Motion, GSAP

## Starten
```bash
npm install
npm run dev
```

Die Seite hat kein Backend, die Daten liegen im Code (`src/constants/products.ts`).
