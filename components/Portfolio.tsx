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

        {/* editorial full-screen showcase */}
        <motion.ul
          layout
          className="mt-10 flex flex-col gap-5 sm:gap-7 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => {
              const featured = i === 0 || i === 4;
              const tall = i % 3 === 2;

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
                className={featured ? "relative left-1/2 w-screen -translate-x-1/2" : ""}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Powiększ: ${item.label}`}
                  className="group block w-full text-left"
                >
                  <div
                    className={`relative overflow-hidden border border-espresso/8 transition-all duration-500 group-hover:shadow-[0_30px_70px_-42px_rgba(75,58,49,0.8)] ${
                      featured
                        ? "h-[86svh] min-h-[620px] rounded-none"
                        : tall
                          ? "h-[78svh] min-h-[560px] rounded-[12px] lg:ml-auto lg:w-[68%]"
                          : "h-[72svh] min-h-[520px] rounded-[12px] lg:w-[72%]"
                    }`}
                  >
                    <NailPhoto
                      src={item.src}
                      alt={item.alt}
                      ratio={item.ratio}
                      tone={item.tone}
                      sizes={featured ? "100vw" : "(max-width: 1024px) 100vw, 72vw"}
                      placeholderNote={item.isReference ? "inspiracja" : "portfolio photo coming soon"}
                      objectPosition={item.objectPosition}
                      className="h-full w-full"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(36,28,23,0.02)_0%,rgba(36,28,23,0.12)_52%,rgba(36,28,23,0.64)_100%)]"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-cream/85 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      <Expand className="h-4 w-4 text-espresso" />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 text-cream sm:p-7 lg:p-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-[7px] border border-cream/24 bg-cream/12 px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] uppercase backdrop-blur-sm">
                          {item.isReference ? "Inspiracja" : "Portfolio"}
                        </span>
                        <span className="rounded-[7px] border border-cream/24 bg-cream/12 px-2.5 py-1 text-[11px] tracking-[0.12em] uppercase text-cream/78 backdrop-blur-sm">
                          {item.category}
                        </span>
                      </div>
                      <div className="max-w-[680px]">
                        <p className="font-display text-[34px] leading-[1.05] text-balance sm:text-[46px] lg:text-[60px]">
                          {item.label}
                        </p>
                        <p className="mt-3 max-w-[52ch] text-[13px] leading-[1.65] text-cream/76 sm:text-[14px]">
                          {item.alt}
                          {item.source ? ` Source: ${item.source}.` : ""}
                        </p>
                      </div>
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
