'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Camera } from 'lucide-react';
import Image from 'next/image';
import { useCallback } from 'react';
import { categoryLabel, cta, galleryById, heroTiles, profile, site, socialLinks } from '@/data/site';
import { cn, EASE } from '@/lib/utils';
import { useGallery } from './GalleryProvider';
import { InstagramIcon } from './icons';

/* -------------------------------------------------------------------------- */
/*  Portret — prawdziwe zdjęcie albo wyraźnie opisane, puste miejsce           */
/* -------------------------------------------------------------------------- */

function PortraitPlaceholder() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-[2rem] border-2 border-dashed border-accent bg-[linear-gradient(175deg,var(--porcelain)_0%,var(--accent-soft)_100%)] p-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-primary shadow-[var(--shadow-soft)]">
        <Camera className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="font-display text-xl leading-tight text-ink">Miejsce na portret Alesi</p>
      <p className="max-w-[15rem] text-xs leading-relaxed text-muted">
        Wgraj zdjęcie do repozytorium jako:
      </p>
      <code className="rounded-full bg-surface px-3 py-1.5 text-[11px] tracking-tight text-primary-dark">
        public/images/hero-alesia.jpg
      </code>
      <p className="max-w-[15rem] text-[11px] leading-relaxed text-muted">
        Kadr pionowy, min. 1200×1600 px. Pojawi się tutaj automatycznie — bez zmian w kodzie.
      </p>
    </div>
  );
}

function Portrait({ hasPhoto, className }: { hasPhoto: boolean; className?: string }) {
  return (
    <div className={cn('relative', className)}>
      {/* Poświata za portretem — buduje głębię i oddziela go od tła */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(255,253,250,0.95),rgba(255,253,250,0)_68%)] blur-2xl"
      />
      {hasPhoto ? (
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-accent-soft shadow-[var(--shadow-lift)] ring-1 ring-[var(--border)]">
          <Image
            src={profile.heroImage}
            alt={profile.heroAlt}
            fill
            priority
            sizes="(max-width: 1024px) 88vw, 400px"
            className="object-cover object-top"
          />
          {/* Delikatne wtopienie dolnej krawędzi w tło strony */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/4 bg-[linear-gradient(to_top,var(--background),transparent)]"
          />
        </div>
      ) : (
        <PortraitPlaceholder />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Unoszący się kafelek portfolio                                            */
/* -------------------------------------------------------------------------- */

interface TileProps {
  itemId: string;
  index: number;
  delay: number;
  rotate: number;
}

function FloatingTile({ itemId, index, delay, rotate }: TileProps) {
  const item = galleryById(itemId);
  const { open } = useGallery();
  const reduce = useReducedMotion();

  if (!item) return null;

  return (
    <div>
      <motion.div
        /* Kafelek skaluje się z wysokością okna — dzięki temu na niskich
           laptopach nie wchodzi w nagłówek, a na dużych nie jest znaczkiem. */
        style={{ height: 'clamp(132px, 18vh, 186px)' }}
        className="aspect-4/5"
        animate={reduce ? undefined : { y: [0, -11, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 6.5 + index * 0.7, repeat: Infinity, ease: 'easeInOut', delay }
        }
      >
        <motion.button
          type="button"
          onClick={() => open(item.id)}
          data-cursor="hover"
          aria-label={`Zobacz stylizację: ${item.title}`}
          className="group relative block h-full w-full overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ring-1 ring-[var(--border)] transition-shadow hover:shadow-[var(--shadow-lift)]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 34, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate }}
          transition={{ duration: 0.9, delay: 0.55 + index * 0.11, ease: EASE }}
          whileHover={reduce ? undefined : { scale: 1.055, rotate: 0, y: -8 }}
          whileFocus={reduce ? undefined : { scale: 1.055, rotate: 0 }}
        >
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="200px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />

          {/* Etykieta na szkle: kategoria, tytuł i podpis odsłaniany na hover */}
          <span className="glass absolute inset-x-1.5 bottom-1.5 block rounded-xl px-3 py-2 text-left">
            <span className="eyebrow block text-[9px]">{categoryLabel(item.category)}</span>
            <span className="mt-0.5 block font-display text-[13px] leading-tight text-ink">{item.title}</span>
            <span className="mt-0 block max-h-0 overflow-hidden text-[10px] leading-snug text-muted opacity-0 transition-all duration-500 group-hover:mt-1 group-hover:max-h-8 group-hover:opacity-100">
              {item.caption.split('.')[0]}.
            </span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Treść nagłówka                                                            */
/* -------------------------------------------------------------------------- */

function HeroCopy({ className, variant }: { className?: string; variant: 'desktop' | 'mobile' }) {
  /*
   * Na desktopie nagłówek stoi w wąskiej kolumnie obok portretu, więc musi być
   * wyraźnie mniejszy — inaczej łamie się na dodatkowe wiersze i wchodzi
   * w kafelki. Na mobile ma całą szerokość ekranu, więc może urosnąć.
   */
  const headingSize =
    variant === 'desktop'
      ? 'text-[clamp(1.85rem,2.55vw,2.75rem)]'
      : 'text-[clamp(2.1rem,8.4vw,2.9rem)]';

  return (
    <div className={className}>
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      >
        {profile.name} · {profile.role} · {site.city}
      </motion.p>

      <motion.h1
        className={cn(
          'mt-4 font-display font-normal leading-[1.05] tracking-[-0.022em] text-ink',
          headingSize
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
      >
        Paznokcie, które
        <br />
        wyglądają jak <span className="italic text-primary">Twoje</span>
        <br />
        własne
      </motion.h1>

      <motion.p
        className="mt-5 max-w-[30ch] text-[15px] leading-relaxed text-muted"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
      >
        Precyzyjny kształt, spokojne odcienie i trwałość na 3–4 tygodnie. Kameralna pracownia w Szczecinie.
      </motion.p>

      <motion.div
        className="mt-7 flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.44, ease: EASE }}
      >
        <a
          href={socialLinks.instagramDm}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-primary-dark px-6 py-3.5 text-sm font-medium text-porcelain shadow-[var(--shadow-soft)] transition-colors hover:bg-primary"
        >
          <InstagramIcon className="h-4 w-4" />
          {cta.primary}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <a
          href="#portfolio"
          data-cursor="hover"
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3.5 text-sm font-medium text-primary-dark transition-colors hover:bg-surface"
        >
          Zobacz portfolio
          <ArrowDown className="h-3.5 w-3.5" />
        </a>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scena                                                                     */
/* -------------------------------------------------------------------------- */

export function Hero({ hasHeroPhoto }: { hasHeroPhoto: boolean }) {
  const reduce = useReducedMotion();
  const { open } = useGallery();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 48, damping: 18, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 48, damping: 18, mass: 0.7 });

  // Każda warstwa reaguje na kursor z inną siłą — stąd wrażenie głębi.
  const bgX = useTransform(smoothX, [-0.5, 0.5], [22, -22]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-46, 46]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-28, 28]);
  const portraitX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [-9, 9]);
  // Celowo delikatne — mocniejszy ruch sprawia, że kafelki "uciekają" spod kursora.
  const tilesX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const tilesY = useTransform(smoothY, [-0.5, 0.5], [9, -9]);

  const handlePointerMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (reduce) return;
      const rect = event.currentTarget.getBoundingClientRect();
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY, reduce]
  );

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <section
      id="hero"
      aria-label="Alesia Nails Szczecin — stylizacja paznokci"
      className="relative overflow-hidden"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      {/* ---------------------------------------------------------------- */}
      {/*  Warstwy tła                                                     */}
      {/* ---------------------------------------------------------------- */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-[7%] bg-[linear-gradient(162deg,var(--porcelain)_0%,var(--background)_42%,var(--accent-soft)_100%)]"
        style={{ x: bgX, y: bgY }}
        animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
        transition={reduce ? undefined : { duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div aria-hidden="true" className="absolute inset-0" style={{ x: glowX, y: glowY }}>
        <div className="absolute left-[8%] top-[12%] h-[38vw] w-[38vw] rounded-full bg-[radial-gradient(circle,rgba(255,253,250,0.9),transparent_70%)] blur-3xl" />
        <div className="absolute right-[6%] top-[38%] h-[34vw] w-[34vw] rounded-full bg-[radial-gradient(circle,rgba(217,195,165,0.5),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[4%] left-[36%] h-[30vw] w-[30vw] rounded-full bg-[radial-gradient(circle,rgba(201,163,148,0.28),transparent_70%)] blur-3xl" />
      </motion.div>

      <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0" />

      {/* ================================================================ */}
      {/*  DESKTOP — pełnoekranowa scena                                   */}
      {/* ================================================================ */}
      <div className="relative hidden h-[100svh] min-h-[720px] lg:block">
        {/* Portret: centralny bohater pierwszego ekranu */}
        <motion.div
          className="absolute bottom-0 left-1/2 z-20 h-[76vh] max-h-[720px] w-[min(400px,32vw)] -translate-x-1/2"
          style={{ x: portraitX, y: portraitY }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <Portrait hasPhoto={hasHeroPhoto} className="h-full w-full" />
        </motion.div>

        {/*
          Kafelki rozmieszczone procentowo — pozycje omijają portret (34–66%),
          nagłówek (lewy dolny róg) i dok. Szczegóły w `heroTiles` w data/site.ts.
        */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30"
          style={{ x: tilesX, y: tilesY }}
        >
          {heroTiles.map((tile, index) => (
            <div
              key={tile.itemId}
              className="pointer-events-auto absolute"
              style={{ left: `${tile.left}%`, top: `${tile.top}%` }}
            >
              <FloatingTile
                itemId={tile.itemId}
                index={index}
                delay={tile.delay}
                rotate={tile.rotate}
              />
            </div>
          ))}
        </motion.div>

        {/* Nagłówek: dolny lewy róg, poza pasem portretu */}
        <HeroCopy
          variant="desktop"
          className="absolute bottom-[12%] left-0 z-40 max-w-[30vw] px-8 xl:max-w-[22rem] xl:px-12"
        />
      </div>

      {/* ================================================================ */}
      {/*  MOBILE — portret pozostaje głównym bohaterem                    */}
      {/* ================================================================ */}
      <div className="relative z-10 flex flex-col px-5 pb-36 pt-24 sm:px-8 lg:hidden">
        <HeroCopy variant="mobile" className="text-left" />

        <motion.div
          className="mx-auto mt-9 aspect-4/5 w-full max-w-sm"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
        >
          <Portrait hasPhoto={hasHeroPhoto} className="h-full w-full" />
        </motion.div>

        {/* Kafelki zamieniają się w przewijaną poziomo taśmę prac */}
        <div className="mt-8">
          <p className="eyebrow mb-3">Wybrane realizacje</p>
          <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
            {heroTiles.map((tile) => {
              const item = galleryById(tile.itemId);
              if (!item) return null;
              return (
                <li key={tile.itemId} className="shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={() => open(item.id)}
                    aria-label={`Zobacz stylizację: ${item.title}`}
                    className="relative block aspect-4/5 w-[9.5rem] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ring-1 ring-[var(--border)]"
                  >
                    <Image src={item.image} alt={item.alt} fill sizes="152px" className="object-cover" />
                    <span className="glass absolute inset-x-1.5 bottom-1.5 block rounded-lg px-2.5 py-1.5 text-left">
                      <span className="eyebrow block text-[9px]">{categoryLabel(item.category)}</span>
                      <span className="block font-display text-[12px] leading-tight text-ink">{item.title}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
