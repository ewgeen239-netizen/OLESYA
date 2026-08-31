'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { galleryItems } from '@/data/site';
import { Lightbox } from './Lightbox';

interface GalleryContextValue {
  /** Otwiera lightbox na pracy o podanym id. */
  open: (id: string) => void;
}

const GalleryContext = createContext<GalleryContextValue>({ open: () => {} });

export const useGallery = () => useContext(GalleryContext);

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  /** Element, który otworzył lightbox — po zamknięciu wraca do niego focus. */
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((id: string) => {
    const index = galleryItems.findIndex((item) => item.id === id);
    if (index === -1) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
    // Przywracamy focus tam, skąd przyszedł użytkownik (dostępność klawiaturowa).
    requestAnimationFrame(() => triggerRef.current?.focus?.());
  }, []);

  const step = useCallback((direction: 1 | -1) => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + direction + galleryItems.length) % galleryItems.length;
    });
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <GalleryContext.Provider value={value}>
      {children}
      <Lightbox items={galleryItems} activeIndex={activeIndex} onClose={close} onStep={step} />
    </GalleryContext.Provider>
  );
}
