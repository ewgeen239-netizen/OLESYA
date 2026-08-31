'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cta, navItems, socialLinks } from '@/data/site';
import { cn } from '@/lib/utils';
import { InstagramIcon, navIcons } from './icons';

/* -------------------------------------------------------------------------- */
/*  Śledzenie aktywnej sekcji                                                 */
/* -------------------------------------------------------------------------- */

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/* -------------------------------------------------------------------------- */
/*  Pojedyncza ikona doku — powiększenie w stylu macOS                        */
/* -------------------------------------------------------------------------- */

interface DockIconProps {
  mouseX: MotionValue<number>;
  item: (typeof navItems)[number];
  isActive: boolean;
  disabled: boolean;
}

function DockIcon({ mouseX, item, isActive, disabled }: DockIconProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const Icon = navIcons[item.icon];

  // Odległość kursora od środka ikony steruje jej rozmiarem.
  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Number.MAX_SAFE_INTEGER;
    return value - bounds.x - bounds.width / 2;
  });

  const targetSize = useTransform(distance, [-140, 0, 140], [46, 68, 46], { clamp: true });
  const size = useSpring(targetSize, { mass: 0.1, stiffness: 160, damping: 13 });

  return (
    <a
      ref={ref}
      href={item.href}
      data-cursor="hover"
      aria-label={item.label}
      aria-current={isActive ? 'true' : undefined}
      className="group relative flex flex-col items-center"
    >
      {/* Etykieta pojawiająca się nad ikoną */}
      <span className="glass-strong pointer-events-none absolute -top-10 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium text-ink opacity-0 shadow-[var(--shadow-soft)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        {item.label}
      </span>

      <motion.span
        style={disabled ? { width: 50, height: 50 } : { width: size, height: size }}
        className={cn(
          'flex items-center justify-center rounded-2xl border transition-colors duration-300',
          isActive
            ? 'border-[var(--accent)] bg-surface text-primary-dark shadow-[var(--shadow-soft)]'
            : 'border-transparent bg-[rgba(255,250,245,0.55)] text-primary hover:bg-surface'
        )}
      >
        <Icon className="h-[42%] w-[42%]" strokeWidth={1.6} aria-hidden="true" />
      </motion.span>

      {/* Wskaźnik aktywnej sekcji */}
      <span
        aria-hidden="true"
        className={cn(
          'mt-1.5 h-1 w-1 rounded-full transition-all duration-300',
          isActive ? 'bg-primary opacity-100' : 'bg-primary opacity-0'
        )}
      />
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dok                                                                       */
/* -------------------------------------------------------------------------- */

const SECTION_IDS = navItems.map((item) => item.id);

export function Dock() {
  const reduce = useReducedMotion();
  const active = useActiveSection(SECTION_IDS);
  const mouseX = useMotionValue(Number.MAX_SAFE_INTEGER);

  return (
    <>
      {/* ---------------- Desktop: pływające szklane doki ---------------- */}
      <motion.nav
        aria-label="Nawigacja główna"
        className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 lg:block"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          onMouseMove={(event) => !reduce && mouseX.set(event.clientX)}
          onMouseLeave={() => mouseX.set(Number.MAX_SAFE_INTEGER)}
          className="glass-bar flex items-end gap-2 rounded-[1.6rem] px-3 pb-2 pt-3 shadow-[var(--shadow-dock)]"
        >
          {navItems.map((item) => (
            <DockIcon
              key={item.id}
              item={item}
              mouseX={mouseX}
              isActive={active === item.id}
              disabled={Boolean(reduce)}
            />
          ))}

          <span aria-hidden="true" className="mx-1 mb-4 h-8 w-px bg-[var(--border)]" />

          <a
            href={socialLinks.instagramDm}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="mb-3 inline-flex items-center gap-2 rounded-2xl bg-primary-dark px-4 py-3 text-[13px] font-medium text-porcelain transition-colors hover:bg-primary"
          >
            <InstagramIcon className="h-4 w-4" />
            {cta.short}
          </a>
        </div>
      </motion.nav>

      {/* ---------------- Mobile: przyklejony pasek nawigacji ---------------- */}
      <nav
        aria-label="Nawigacja główna"
        className="glass-bar fixed inset-x-0 bottom-0 z-50 flex items-center gap-1 border-x-0 border-b-0 px-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[var(--shadow-dock)] lg:hidden"
      >
        {navItems
          .filter((item) => item.id !== 'rezerwacja')
          .map((item) => {
            const Icon = navIcons[item.icon];
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition-colors',
                  isActive ? 'text-primary-dark' : 'text-muted'
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                <span className="whitespace-nowrap text-[10px] leading-none">{item.label}</span>
              </a>
            );
          })}

        <a
          href={socialLinks.instagramDm}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-dark px-4 py-3 text-[13px] font-medium text-porcelain"
        >
          <InstagramIcon className="h-4 w-4" />
          {cta.short}
        </a>
      </nav>
    </>
  );
}
