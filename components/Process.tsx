'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { processSteps } from '@/data/site';
import { EASE } from '@/lib/utils';
import { SectionHeading } from './SectionHeading';

export function Process() {
  const reduce = useReducedMotion();

  return (
    <section id="proces" className="relative scroll-mt-8 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Proces"
          title={
            <>
              Cztery kroki, <span className="italic text-primary">zero</span> pośpiechu
            </>
          }
          description="Tak wygląda każda wizyta — od pierwszego pytania po wskazówki na kolejne tygodnie."
        />

        <div className="relative mt-16">
          {/* Linia prowadząca — rysuje się przy wejściu sekcji w kadr */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[19px] top-2 hidden w-px origin-top bg-[linear-gradient(180deg,var(--accent),transparent)] sm:block lg:left-0 lg:top-[19px] lg:h-px lg:w-full lg:origin-left lg:bg-[linear-gradient(90deg,var(--accent),transparent)]"
            style={{ height: 'calc(100% - 1rem)' }}
            initial={reduce ? false : { scaleY: 0, scaleX: 0 }}
            whileInView={{ scaleY: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: EASE }}
          />

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, index) => (
              <motion.li
                key={step.number}
                className="relative pl-14 sm:pl-16 lg:pl-0 lg:pt-14"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.7, delay: reduce ? 0 : index * 0.12, ease: EASE }}
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface font-display text-sm text-primary-dark shadow-[var(--shadow-soft)]">
                  {step.number}
                </span>
                <h3 className="font-display text-xl leading-tight text-ink">{step.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
