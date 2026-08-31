# Alesia Nails Szczecin

Interaktywne portfolio stylistki paznokci — pełnoekranowa scena hero z portretem
Alesi i unoszącymi się kafelkami prac, szklany dok nawigacji, filtrowana galeria
z lightboxem i miękka animacja przewijania.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · lucide-react

---

## ⚠️ Zanim wdrożysz: wgraj portret Alesi

Pierwszy ekran jest zbudowany wokół zdjęcia stylistki. Zdjęcia **nie ma
w repozytorium** — dopóki go nie wgrasz, hero pokazuje wyraźnie opisane, puste
miejsce (celowo nie podstawiamy tam zdjęcia stockowego ani awatara 100×100).

Wgraj plik jako:

```
public/images/hero-alesia.jpg
```

Skrypt `scripts/sync-assets.mjs` (uruchamiany automatycznie przed `dev` i `build`)
znajdzie go też w tych lokalizacjach i skopiuje na miejsce:

| Kolejność | Ścieżka |
|---|---|
| 1 | `public/images/hero-alesia.jpg` ← zalecane |
| 2 | `public/hero-alesia.jpg` |
| 3 | `assets/nails-alesia/hero-alesia.jpg` |
| 4 | `~/Downloads/hero-alesia.jpg` |

**Zalecany kadr:** pionowy, min. 1200×1600 px, miękkie, jasne światło.
Strona sama wykryje plik i przełączy hero na prawdziwe zdjęcie — bez zmian w kodzie.

Opcjonalnie: `public/images/profile.jpg` (awatar 100×100 z Instagrama) trafia do
sekcji „O mnie”. Bez niego wyświetlany jest monogram.

---

## Uruchomienie

```bash
npm install
npm run dev       # http://localhost:3000
```

Produkcyjnie:

```bash
npm run build
npm run start     # http://localhost:3000
```

Dodatkowe polecenia:

```bash
npm run typecheck        # kontrola typów
npm run assets:generate  # regeneracja placeholderów portfolio
```

---

## Gdzie edytować treść

Cała treść strony siedzi w **`data/site.ts`** — nie trzeba dotykać komponentów.

| Sekcja | Klucz |
|---|---|
| Marka, adres URL, SEO | `site` |
| Instagram i CTA | `socialLinks`, `cta` |
| Profil, bio, statystyki, zdjęcia | `profile` |
| Galeria i kategorie | `galleryItems`, `categories` |
| Kafelki na pierwszym ekranie | `heroTiles` |
| Cennik | `services` |
| Proces wizyty | `processSteps` |
| Opinie | `reviews` |
| Dok nawigacji | `navItems` |

### Do potwierdzenia przed publikacją

Dwa miejsca są oznaczone w kodzie jako **treść zastępcza**:

1. **Ceny** (`services[].price`) — orientacyjne, wymagają potwierdzenia.
2. **Opinie** (`reviews`) — to przykłady, nie prawdziwe wypowiedzi klientek.
   Dopóki którakolwiek ma `isSample: true`, nad sekcją widnieje plakietka
   informująca, że opinie są poglądowe. Po wstawieniu prawdziwych opinii ustaw
   `isSample: false` — plakietka zniknie sama.

---

## Zdjęcia portfolio

W `public/images/portfolio/` leżą autorskie placeholdery SVG w kolorystyce marki
(abstrakcyjne „studia płytki paznokcia”), generowane przez
`npm run assets:generate`.

Podmiana na prawdziwe zdjęcia:

1. wgraj plik do `public/images/portfolio/`,
2. zmień pole `image` w `galleryItems` (`data/site.ts`),
3. zachowaj proporcje **4:5** — dzięki temu układ nie przeskakuje przy ładowaniu.

---

## Paleta

Kolory są zdefiniowane jako zmienne CSS w `app/globals.css` (`:root`) i wystawione
do Tailwinda przez `@theme inline`. Zmiana w jednym miejscu przebudowuje hero,
dok, kafelki, przyciski, filtry, lightbox i CTA.

```css
--background: #f8f3ed;   --surface: #fffaf5;
--primary:    #8b6f5a;   --primary-dark: #4b3a31;
--accent:     #c6a889;   --accent-soft:  #ead8c7;
--text:       #302720;   --muted:        #7b6a5d;
```

---

## Dostępność i ruch

- pełna obsługa klawiatury w lightboxie (Esc, ←/→, pułapka focusu, powrót focusu),
- widoczne obramowanie focusu, etykiety `aria-*`, link „Przejdź do treści”,
- `prefers-reduced-motion` wyłącza parallaksę, unoszenie kafelków, powiększanie
  doku i animacje wejścia — zarówno w CSS, jak i w Framer Motion.

---

## Wdrożenie na Vercel

Projekt jest standardową aplikacją Next.js — Vercel wykrywa konfigurację sam,
bez `vercel.json`.

1. [vercel.com/new](https://vercel.com/new) → zaimportuj to repozytorium.
2. Framework: **Next.js** (wykrywany automatycznie), build: `npm run build`.
3. Deploy.

Po wdrożeniu ustaw prawdziwą domenę w `site.url` (`data/site.ts`) — z niej
korzystają metadane OpenGraph, `robots.txt` i `sitemap.xml`.

> Wgranie `hero-alesia.jpg` wymaga ponownego builda (Vercel zrobi to sam przy
> kolejnym pushu) — obecność pliku jest sprawdzana na etapie budowania strony.
