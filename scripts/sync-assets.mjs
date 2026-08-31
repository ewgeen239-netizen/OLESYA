/**
 * Szuka zdjęć marki w kilku typowych lokalizacjach i kopiuje je tam,
 * gdzie spodziewa się ich Next.js (public/images/).
 *
 * Uruchamiane automatycznie przed `npm run dev` i `npm run build`.
 *
 * Dzięki temu wystarczy wrzucić plik `hero-alesia.jpg` w dowolne z miejsc
 * poniżej — nie trzeba niczego zmieniać w kodzie.
 */

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TARGET_DIR = join(ROOT, 'public', 'images');

/** Kolejność wyszukiwania jest istotna — pierwszy trafiony plik wygrywa. */
const ASSETS = [
  {
    name: 'hero-alesia.jpg',
    required: true,
    sources: [
      join(ROOT, 'public', 'images', 'hero-alesia.jpg'),
      join(ROOT, 'public', 'hero-alesia.jpg'),
      join(ROOT, 'assets', 'nails-alesia', 'hero-alesia.jpg'),
      join(homedir(), 'Downloads', 'hero-alesia.jpg'),
      join(ROOT, 'Downloads', 'hero-alesia.jpg'),
    ],
  },
  {
    name: 'profile.jpg',
    required: false,
    sources: [
      join(ROOT, 'public', 'images', 'profile.jpg'),
      join(ROOT, 'public', 'profile.jpg'),
      join(ROOT, 'assets', 'nails-alesia', 'profile.jpg'),
      join(homedir(), 'Downloads', 'profile.jpg'),
    ],
  },
];

/**
 * Ten skrypt działa jako `prebuild`, także na CI (np. Vercel).
 * Jest wyłącznie udogodnieniem — kopiuje zdjęcia, jeśli leżą nie tam, gdzie
 * trzeba. Nigdy nie może przerwać builda, dlatego każda operacja na dysku
 * jest osłonięta: brak katalogu domowego czy read-only FS ma być pomijany,
 * a nie wywracać wdrożenie.
 */
const safely = (fn, fallback) => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

safely(() => mkdirSync(TARGET_DIR, { recursive: true }));

let missingRequired = false;

for (const asset of ASSETS) {
  const target = join(TARGET_DIR, asset.name);
  const found = safely(
    () => asset.sources.find((p) => safely(() => existsSync(p) && statSync(p).isFile(), false)),
    undefined
  );

  if (!found) {
    if (asset.required) missingRequired = true;
    continue;
  }

  if (found !== target) {
    const copied = safely(() => {
      copyFileSync(found, target);
      return true;
    }, false);
    if (copied) console.log(`✓ Skopiowano ${asset.name} → public/images/${asset.name}`);
  }
}

if (missingRequired) {
  console.log(
    [
      '',
      '────────────────────────────────────────────────────────────────',
      '  ⚠  BRAKUJE GŁÓWNEGO ZDJĘCIA: hero-alesia.jpg',
      '',
      '  Pierwszy ekran pokaże opisane, puste miejsce zamiast portretu.',
      '  Celowo NIE podstawiamy tam zdjęcia zastępczego ani awatara.',
      '',
      '  Wrzuć portret Alesi w jedno z tych miejsc i uruchom ponownie:',
      '    • public/images/hero-alesia.jpg      ← zalecane',
      '    • public/hero-alesia.jpg',
      '    • assets/nails-alesia/hero-alesia.jpg',
      '',
      '  Zalecany kadr: pionowy, min. 1200×1600 px, miękkie jasne światło.',
      '────────────────────────────────────────────────────────────────',
      '',
    ].join('\n')
  );
}
