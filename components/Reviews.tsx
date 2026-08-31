'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { reviews, reviewsSampleNotice } from '@/data/site';
import { EASE } from '@/lib/utils';
import { SectionHeading } from './SectionHeading';

export function Reviews() {
  const reduce = useReducedMotion();
  const hasSampleContent = reviews.some((review) => review.isSample);

  return (
    <section id="opinie" className="relative scroll-mt-8 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Opinie"
          title={
            <>
              Najczęściej wracają <span className="italic text-primary">po spokój</span>
            </>
          }
          align="center"
        />

        {/*
          Plakietka znika automatycznie, gdy w data/site.ts wszystkie opinie
          będą miały `isSample: false`.
        */}
        {hasSampleContent && (
          <p className="mx-auto mt-5 w-fit rounded-full border border-dashed border-[var(--accent)] bg-surface/70 px-4 py-1.5 text-[11px] text-muted">
            {reviewsSampleNotice}
          </p>
        )}

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <motion.li
              key={review.id}
              className="glass flex h-full flex-col justify-between rounded-2xl p-6 shadow-[var(--shadow-soft)]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: reduce ? 0 : index * 0.09, ease: EASE }}
            >
              <div>
                <div className="flex gap-0.5" aria-label={`Ocena: ${review.rating} na 5`}>
                  {Array.from({ length: review.rating }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-3.5 w-3.5 fill-[var(--accent)] text-[var(--accent)]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-[17px] leading-snug text-ink">
                  „{review.quote}”
                </blockquote>
              </div>

              <footer className="mt-6 border-t border-[var(--border)] pt-4">
                <p className="text-sm text-primary-dark">{review.name}</p>
                <p className="mt-0.5 text-[11px] text-muted">{review.service}</p>
              </footer>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
