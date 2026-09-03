"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import InstagramIcon from "@/components/ui/InstagramIcon";
import NailPhoto from "@/components/ui/NailPhoto";
import { socialLinks, type GalleryItem } from "@/data/site";

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
};

export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const total = items.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null || total === 0) return;
      onIndexChange((index + dir + total) % total);
    },
    [index, total, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };

    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open, onClose, go]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Podgląd zdjęcia: ${item.label}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] flex flex-col bg-[#1F1915]/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* pasek górny */}
          <div className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-cream/70">
              {item.isReference ? "Inspiracja" : "Portfolio"} · {item.category} ·{" "}
              {index + 1} / {total}
            </p>
            <button
              ref={closeRef}
              type="button"
              aria-label="Zamknij podgląd"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-cream/20 text-cream transition-colors hover:bg-cream/10"
            >
              <X aria-hidden="true" className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* zdjęcie */}
          <div className="flex min-h-0 flex-1 items-center justify-center px-3 py-4 sm:px-6">
            <motion.figure
              key={item.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -450) go(1);
                else if (info.offset.x > 60 || info.velocity.x > 450) go(-1);
              }}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-full max-w-[1500px] cursor-grab flex-col overflow-hidden rounded-[12px] active:cursor-grabbing"
            >
              <NailPhoto
                src={item.src}
                alt={item.alt}
                ratio={item.ratio}
                tone={item.tone}
                sizes="100vw"
                placeholderNote="podmień zdjęcie"
                objectPosition={item.objectPosition}
                fit="contain"
                className="min-h-0 flex-1 bg-[#1F1915]"
              />
              <figcaption className="flex flex-col gap-3 bg-cream px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="min-w-0">
                  <span className="block text-[13.5px] text-espresso">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] leading-snug text-espresso-faint">
                    {item.alt}
                    {item.source ? ` Source: ${item.source}.` : ""}
                  </span>
                </span>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-[10px] bg-espresso px-4 text-[13px] font-medium text-cream transition-colors hover:bg-[#241C17]"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                  Umów podobną stylizację
                </a>
              </figcaption>
            </motion.figure>
          </div>

          {/* nawigacja */}
          <div className="flex items-center justify-center gap-3 px-4 pb-6 sm:pb-8">
            <button
              type="button"
              aria-label="Poprzednie zdjęcie"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-cream/20 text-cream transition-colors hover:bg-cream/10"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <p className="hidden text-[12px] text-cream/55 sm:block">
              Przesuń palcem lub użyj strzałek
            </p>
            <button
              type="button"
              aria-label="Następne zdjęcie"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-cream/20 text-cream transition-colors hover:bg-cream/10"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
