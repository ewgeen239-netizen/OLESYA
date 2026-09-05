"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Expand } from "lucide-react";
import Lightbox from "@/components/Lightbox";
import NailPhoto from "@/components/ui/NailPhoto";
import Reveal from "@/components/ui/Reveal";
import { galleryFilters, galleryItems, type GalleryCategory } from "@/data/site";

type Filter = GalleryCategory | "Wszystko";

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>("Wszystko");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "Wszystko"
        ? galleryItems
        : galleryItems.filter((i) => i.category === filter),
    [filter],
  );

  const referenceCount = items.filter((item) => item.isReference).length;

  return (
    <section
      id="portfolio"
      className="overflow-hidden border-b border-espresso/8 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.24em] uppercase text-espresso-faint">
              Portfolio
            </p>
            <h2 className="mt-3 max-w-[16ch] font-display text-[32px] leading-[1.1] text-balance sm:text-[40px] lg:text-[44px]">
              Prace, które mówią więcej niż cennik
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[42ch] text-[14px] leading-[1.75] text-pretty text-espresso-soft">
              Wybierz kategorię i otwórz zdjęcie na pełny ekran. Zdjęcia oznaczone
              jako inspiracja są referencją stylu, nie portfolio stylistki.
            </p>
          </Reveal>
        </div>

        {/* filtry */}
        <Reveal delay={0.12}>
          <div
            role="tablist"
            aria-label="Filtry portfolio"
            className="no-scrollbar mt-9 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {galleryFilters.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(f);
                    setOpenIndex(null);
                  }}
                  className={`relative h-9 shrink-0 rounded-[8px] border px-3.5 text-[12.5px] tracking-[0.02em] transition-colors duration-300 ${
                    active
                      ? "border-espresso/80 bg-espresso text-cream"
                      : "border-espresso/12 bg-cream text-espresso-soft hover:border-espresso/30 hover:text-espresso"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>

        {referenceCount ? (
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-[68ch] text-[12.5px] leading-[1.7] text-espresso-faint">
              Inspiracje z Pexels są użyte tylko po to, żeby pokazać kierunek
              stylizacji. Realne prace dodaj do <code>public/nails-alesia</code> i
              podmień źródła w <code>data/site.ts</code>.
            </p>
          </Reveal>
        ) : null}

        {/* compact portfolio grid */}
        <motion.ul
          layout
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => {
              return (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i * 0.03, 0.24),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="min-w-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Powiększ: ${item.label}`}
                  className="group block w-full text-left"
                >
                  <div
                    className="relative overflow-hidden rounded-[10px] border border-espresso/8 bg-cream shadow-[0_18px_42px_-34px_rgba(75,58,49,0.7)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-espresso/18 group-hover:shadow-[0_26px_60px_-38px_rgba(75,58,49,0.82)]"
                  >
                    <NailPhoto
                      src={item.src}
                      alt={item.alt}
                      ratio={item.ratio}
                      tone={item.tone}
                      sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 260px"
                      placeholderNote={item.isReference ? "inspiracja" : "portfolio photo coming soon"}
                      objectPosition={item.objectPosition}
                      className="w-full"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(36,28,23,0)_42%,rgba(36,28,23,0.50)_100%)] opacity-90"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-cream/88 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      <Expand className="h-4 w-4 text-espresso" />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-3 text-cream sm:p-4">
                      <p className="truncate text-[11px] font-medium tracking-[0.12em] uppercase text-cream/72">
                        {item.isReference ? "Inspiracja" : "Portfolio"} · {item.category}
                      </p>
                      <p className="mt-1 font-display text-[20px] leading-[1.08] text-balance sm:text-[24px]">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}
