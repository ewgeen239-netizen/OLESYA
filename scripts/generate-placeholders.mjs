/**
 * Generuje autorskie placeholdery SVG dla portfolio, w kolorystyce marki.
 *
 * To NIE są zdjęcia stockowe — to abstrakcyjne "studia płytki paznokcia"
 * w ciepłej, brązowo-kremowej palecie, dzięki czemu strona wygląda spójnie,
 * zanim pojawią się prawdziwe fotografie.
 *
 * Podmiana na prawdziwe zdjęcia:
 *   1. wgraj plik do public/images/portfolio/
 *   2. zmień pole `image` w data/site.ts
 *   3. zachowaj proporcje 4:5 (np. 800×1000), żeby układ się nie przesuwał
 *
 * Uruchomienie:  npm run assets:generate
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'images', 'portfolio');

const W = 800;
const H = 1000;

/**
 * Warianty kolorystyczne — wszystkie w rodzinie ciepłego brązu / kości słoniowej.
 * Tło jest wyraźnie ciemniejsze od płytek: dzięki temu kompozycja czyta się
 * także w małym kafelku na pierwszym ekranie.
 */
const PALETTES = {
  french: { from: '#f0e2d1', to: '#cdae91', plate: '#fdf8f2', edge: '#e3cfb8' },
  nude: { from: '#ecdcc9', to: '#c4a181', plate: '#f2e1cf', edge: '#d5b699' },
  gel: { from: '#f3e6d7', to: '#d0b192', plate: '#fbf2e6', edge: '#e0c8ae' },
  pedicure: { from: '#eaddcc', to: '#c6a888', plate: '#f6ead9', edge: '#dbc2a5' },
  design: { from: '#e6d4be', to: '#b5977a', plate: '#efdecb', edge: '#cdaf90' },
};

const CHAMPAGNE = '#d9c3a5';
const ESPRESSO = '#4b3a31';

/**
 * Geometria wachlarza pięciu płytek.
 * Kompozycja celowo wypełnia ok. połowy kadru — w małym kafelku hero
 * mniejszy układ zlewał się w jednolitą plamę.
 */
function plates(category, variant) {
  const isPedi = category === 'pedicure';
  const tilt = variant % 2 === 0 ? 1 : -1;
  const lift = (variant % 3) * 14;

  return Array.from({ length: 5 }, (_, i) => {
    const d = i - 2;
    const w = isPedi ? 140 : 116;
    const h = (isPedi ? 210 : 400) - d * d * (isPedi ? 24 : 42) - lift;
    const cx = (isPedi ? 106 : 112) + i * (isPedi ? 147 : 144);
    /* Kompozycja kończy się ok. 70% wysokości kadru — niżej siada podpis
       nałożony na zdjęcie, który zasłaniałby końcówki paznokci. */
    const bottom = (isPedi ? 636 : 660) + d * d * (isPedi ? 10 : 12);
    const angle = d * (isPedi ? 5 : 9) * tilt;
    return { i, cx, w, h, bottom, top: bottom - h, angle };
  });
}

function detailFor(category, p, clip) {
  const { cx, w, top, bottom } = p;
  const parts = [];

  // Wspólne: miękki refleks światła po lewej stronie płytki.
  parts.push(
    `<rect clip-path="url(#${clip})" x="${(cx - w / 2 + 17).toFixed(1)}" y="${(top + 34).toFixed(1)}" ` +
      `width="17" height="${Math.max(0, bottom - top - 96).toFixed(1)}" rx="8.5" fill="#fffdfa" opacity="0.42"/>`
  );

  // Delikatny cień przy skórkach.
  parts.push(
    `<ellipse clip-path="url(#${clip})" cx="${cx}" cy="${bottom.toFixed(1)}" rx="${(w * 0.52).toFixed(1)}" ry="24" ` +
      `fill="${ESPRESSO}" opacity="0.10"/>`
  );

  if (category === 'french') {
    parts.push(
      `<ellipse clip-path="url(#${clip})" cx="${cx}" cy="${(top + 6).toFixed(1)}" rx="${(w * 0.85).toFixed(1)}" ry="46" ` +
        `fill="#ffffff" opacity="0.95"/>`
    );
  }

  if (category === 'gel') {
    parts.push(
      `<ellipse clip-path="url(#${clip})" cx="${(cx + w * 0.17).toFixed(1)}" cy="${(top + 110).toFixed(1)}" ` +
        `rx="${(w * 0.28).toFixed(1)}" ry="92" fill="#ffffff" opacity="0.42"/>`
    );
  }

  if (category === 'design' && p.i === 2) {
    parts.push(
      `<circle clip-path="url(#${clip})" cx="${cx}" cy="${(top + 74).toFixed(1)}" r="15" fill="${CHAMPAGNE}"/>`,
      `<circle clip-path="url(#${clip})" cx="${cx}" cy="${(top + 74).toFixed(1)}" r="15" fill="none" ` +
        `stroke="#fffaf5" stroke-width="2.5" opacity="0.75"/>`
    );
  }

  if (category === 'design' && p.i !== 2) {
    parts.push(
      `<rect clip-path="url(#${clip})" x="${(cx - w / 2).toFixed(1)}" y="${(top + 48).toFixed(1)}" ` +
        `width="${w}" height="3" fill="${CHAMPAGNE}" opacity="0.85"/>`
    );
  }

  return parts.join('\n      ');
}

function buildSvg({ slug, category, variant }) {
  const pal = PALETTES[category];
  const list = plates(category, variant);
  const uid = slug.replace(/[^a-z0-9]/gi, '');

  const clips = list
    .map((p) => {
      const id = `c-${uid}-${p.i}`;
      return (
        `<clipPath id="${id}">` +
        `<rect x="${(p.cx - p.w / 2).toFixed(1)}" y="${p.top.toFixed(1)}" width="${p.w}" height="${p.h.toFixed(1)}" ` +
        `rx="${(p.w / 2).toFixed(1)}" transform="rotate(${p.angle} ${p.cx} ${p.bottom.toFixed(1)})"/>` +
        `</clipPath>`
      );
    })
    .join('\n      ');

  const shapes = list
    .map((p) => {
      const clip = `c-${uid}-${p.i}`;
      return (
        `<g transform="rotate(${p.angle} ${p.cx} ${p.bottom.toFixed(1)})" filter="url(#soft-${uid})">\n        ` +
        `<rect x="${(p.cx - p.w / 2).toFixed(1)}" y="${p.top.toFixed(1)}" width="${p.w}" height="${p.h.toFixed(1)}" ` +
        `rx="${(p.w / 2).toFixed(1)}" fill="${pal.plate}" stroke="${pal.edge}" stroke-width="1" stroke-opacity="0.5"/>\n      </g>\n      ` +
        detailFor(category, p, clip)
      );
    })
    .join('\n      ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <linearGradient id="bg-${uid}" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="${pal.from}"/>
      <stop offset="1" stop-color="${pal.to}"/>
    </linearGradient>
    <radialGradient id="glow-${uid}" cx="0.32" cy="0.22" r="0.75">
      <stop offset="0" stop-color="#fffdfa" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#fffdfa" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig-${uid}" cx="0.5" cy="0.45" r="0.92">
      <stop offset="0.6" stop-color="${ESPRESSO}" stop-opacity="0"/>
      <stop offset="1" stop-color="${ESPRESSO}" stop-opacity="0.09"/>
    </radialGradient>
    <filter id="soft-${uid}" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="26" stdDeviation="26" flood-color="${ESPRESSO}" flood-opacity="0.22"/>
    </filter>
    <filter id="grain-${uid}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    ${clips}
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg-${uid})"/>
  <rect width="${W}" height="${H}" fill="url(#glow-${uid})"/>

  <g>
      ${shapes}
  </g>

  <!-- Miękki cień kontaktowy pod kompozycją (zamiast ciemnego pasa u dołu kadru) -->
  <ellipse cx="${W / 2}" cy="${H - 250}" rx="${W * 0.38}" ry="46" fill="${ESPRESSO}" opacity="0.06"/>
  <rect width="${W}" height="${H}" fill="url(#vig-${uid})"/>
  <rect width="${W}" height="${H}" filter="url(#grain-${uid})" opacity="0.055"/>
</svg>
`;
}

/** Slug → kategoria. Musi odpowiadać `galleryItems` w data/site.ts. */
const ITEMS = [
  ['french-minimal', 'french'],
  ['soft-nude', 'nude'],
  ['gel-shape', 'gel'],
  ['pearl-detail', 'design'],
  ['clean-pedicure', 'pedicure'],
  ['evening-design', 'design'],
  ['milky-french', 'french'],
  ['almond-nude', 'nude'],
  ['glass-gloss', 'gel'],
  ['cat-eye', 'design'],
  ['spa-pedicure', 'pedicure'],
  ['micro-french', 'french'],
];

mkdirSync(OUT_DIR, { recursive: true });

ITEMS.forEach(([slug, category], index) => {
  const svg = buildSvg({ slug, category, variant: index });
  writeFileSync(join(OUT_DIR, `${slug}.svg`), svg, 'utf8');
});

console.log(`✓ Wygenerowano ${ITEMS.length} placeholderów w public/images/portfolio/`);
