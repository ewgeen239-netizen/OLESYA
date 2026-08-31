'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useId, useRef } from 'react';
import { categoryLabel, cta, socialLinks, type GalleryItem } from '@/data/site';
import { EASE } from '@/lib/utils';
import { InstagramIcon } from './icons';

interface LightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onStep: (direction: 1 | -1) => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Lightbox({ items, activeIndex, onClose, onStep }: LightboxProps) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const isOpen = activeIndex !== null;
  const item = isOpen ? items[activeIndex] : null;

  /** Obsługa klawiatury: Esc zamyka, strzałki przechodzą między pracami, Tab zapętla focus. */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onStep(1);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onStep(-1);
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    [isOpen, onClose, onStep]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Blokada przewijania tła oraz focus na przycisku zamknięcia po otwarciu.
  useEffect(() => {
    if (!isOpen) {
      document.body.removeAttribute('data-scroll-locked');
      return;
    }
    document.body.setAttribute('data-scroll-locked', 'true');
    const raf = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      cancelAnimationFrame(raf);
      document.body.removeAttribute('data-scroll-locked');
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.3 }}
        >
          {/* Tło */}
          <button
            type="button"
            aria-label="Zamknij podgląd"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-[rgba(48,39,32,0.42)] backdrop-blur-md"
            tabIndex={-1}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="glass-strong relative z-10 grid max-h-[90svh] w-full max-w-4xl overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)] md:grid-cols-[1.05fr_0.95fr]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.42, ease: EASE }}
          >
            <div className="relative aspect-4/5 w-full max-h-[46svh] overflow-hidden bg-accent-soft md:max-h-none">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-between gap-6 overflow-y-auto p-6 sm:p-8">
              <div>
                <p className="eyebrow">{categoryLabel(item.category)}</p>
                <h2 id={titleId} className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.caption}</p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={socialLinks.instagramDm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary-dark px-6 py-3.5 text-sm font-medium text-porcelain transition-colors hover:bg-primary"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {cta.similar}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onStep(-1)}
                      aria-label="Poprzednia stylizacja"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-primary transition-colors hover:bg-accent-soft"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onStep(1)}
                      aria-label="Następna stylizacja"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-primary transition-colors hover:bg-accent-soft"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs tracking-widest text-muted">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Zamknij podgląd"
              className="glass absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-accent-soft"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
