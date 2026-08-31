'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { categories, categoryLabel, galleryItems, type CategoryId } from '@/data/site';
import { cn, EASE } from '@/lib/utils';
import { useGallery } from './GalleryProvider';
import { SectionHeading } from './SectionHeading';

type Filter = CategoryId | 'all';

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>('all');
  const { open } = useGallery();
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter]
  );

  return (
    <section id="portfolio" className="relative scroll-mt-8 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title={
              <>
                Prace, które mówią <span className="italic text-primary">spokojnym</span> głosem
              </>
            }
            description="Każda stylizacja powstaje od zera pod konkretną dłoń. Wybierz kategorię, żeby zobaczyć więcej."
          />

          {/* Filtry */}
          <div
            role="group"
            aria-label="Filtruj portfolio według kategorii"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:justify-end"
          >
            {categories.map((category) => {
              const isActive = filter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFilter(category.id as Filter)}
                  aria-pressed={isActive}
                  data-cursor="hover"
                  className={cn(
                    'shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300',
                    isActive
                      ? 'border-transparent bg-primary-dark text-porcelain shadow-[var(--shadow-soft)]'
                      : 'border-line bg-surface/60 text-muted hover:border-[var(--accent)] hover:text-primary-dark'
                  )}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Siatka masonry (CSS columns — brak przeskoków przy filtrowaniu) */}
        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 lg:gap-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item, index) => (
              <motion.div
                key={item.id}
                layout={!reduce}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : Math.min(index * 0.05, 0.4), ease: EASE }}
                className="mb-4 break-inside-avoid lg:mb-5"
              >
                <button
                  type="button"
                  onClick={() => open(item.id)}
                  data-cursor="hover"
                  aria-label={`Zobacz stylizację: ${item.title}`}
                  className="group relative block w-full overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ring-1 ring-[var(--border)] transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]"
                >
                  <div className={cn('relative w-full', item.span === 'tall' ? 'aspect-4/6' : 'aspect-4/5')}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 46vw, (max-width: 1024px) 30vw, 23vw"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                    />
                  </div>

                  <span className="glass absolute inset-x-2 bottom-2 block translate-y-0 rounded-xl px-3.5 py-2.5 text-left transition-all duration-500">
                    <span className="eyebrow block text-[9.5px]">{categoryLabel(item.category)}</span>
                    <span className="mt-0.5 block font-display text-sm leading-tight text-ink">{item.title}</span>
                    <span className="block max-h-0 overflow-hidden text-[11px] leading-snug text-muted opacity-0 transition-all duration-500 group-hover:mt-1.5 group-hover:max-h-12 group-hover:opacity-100">
                      {item.caption}
                    </span>
                  </span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
