'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Element semantyczny, w który opakowujemy treść. */
  as?: 'div' | 'li' | 'section' | 'article';
}

/**
 * Miękkie pojawianie się sekcji przy przewijaniu.
 * Przy `prefers-reduced-motion` treść renderuje się od razu, bez ruchu.
 */
export function Reveal({ children, className, delay = 0, y = 26, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
