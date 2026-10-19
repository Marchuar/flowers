# STEM – Blumenshop

Online-Shop für einen Blumen-Lieferservice in Warschau. Die Geschäftsidee habe ich gemeinsam mit meinem Bruder entwickelt, die Webseite habe ich allein gebaut, mit Claude Code und Claude Design als Unterstützung.

**Live-Demo:** https://flowers-olive-gamma.vercel.app

## Funktionen
- Startseite mit Hero-Bereich, Preisvergleich, Instagram-Block und E-Mail-Anmeldung
- Shop mit Filtern nach Art und Farbe, Sortierung und Produktdetails
- Warenkorb (Gratislieferung ab 80 zł, sonst 9 zł) und Checkout mit Lieferzeiten
- Bezahlung über Stripe (Karte, BLIK, Apple Pay)
- Seite für Geschäftskunden und Großbestellungen
- Zweisprachig: Polnisch und Englisch
- Animationen mit Framer Motion und GSAP

## Backend: Medusa.js
Das Backend basiert auf [Medusa.js v2](https://medusajs.com), einer Open-Source-Plattform für E-Commerce auf Node.js. Medusa verwaltet Produkte, Preise, Warenkorb, Bestellungen und Versandoptionen; über das Admin-Panel (`http://localhost:9000/app`) lassen sich Produkte pflegen, ohne den Code anzufassen.

- Produkte kommen über das Medusa JS SDK aus der Store-API. Ist das Backend nicht erreichbar, zeigt der Shop die statischen Daten aus `frontend/src/constants/products.ts` (so läuft auch die Live-Demo).
- Checkout: Medusa legt den Warenkorb und die Zahlungssitzung an, die Zahlung selbst läuft über das Stripe-Modul (`@medusajs/payment-stripe`).
- Eigenes B2B-Modul mit Firmen und Angebotsanfragen, einem Workflow und einem Widget im Admin-Panel. Das Formular auf der Geschäftskunden-Seite ist noch nicht daran angeschlossen.
- PostgreSQL und Redis laufen lokal über Docker Compose.

## Technik
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, React Router, i18next, Framer Motion, GSAP
- **Backend:** Medusa.js v2, PostgreSQL, Redis, Stripe

## Projektstruktur
```
frontend/   Shop (React + Vite), Port 5173
backend/    Medusa.js-Backend, Port 9000
```

## Starten
Voraussetzungen: Node.js 20+, Yarn, Docker.

```bash
yarn install:all   # Abhängigkeiten für Root, Frontend und Backend
yarn db:start      # PostgreSQL + Redis starten
yarn migrate       # Datenbank-Migrationen
yarn seed          # Produkte und Region anlegen (einmalig)
yarn dev           # Frontend und Backend zusammen starten
```

Umgebungsvariablen:
- `backend/apps/backend/.env`: aus `.env.template` kopieren und `DATABASE_URL` sowie `STRIPE_API_KEY` (Stripe-Testschlüssel `sk_test_…`) eintragen
- `frontend/.env.local`: `VITE_MEDUSA_BACKEND_URL`, `VITE_MEDUSA_PUBLISHABLE_KEY`, `VITE_STRIPE_PUBLISHABLE_KEY`

Nur das Frontend, ohne Backend (mit statischen Produktdaten):
```bash
cd frontend && yarn install && yarn dev
```
