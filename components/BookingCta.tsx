'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cta, profile, site, socialLinks } from '@/data/site';
import { EASE } from '@/lib/utils';
import { InstagramIcon } from './icons';

export function BookingCta() {
  const reduce = useReducedMotion();

  return (
    <section
      id="rezerwacja"
      className="relative scroll-mt-8 overflow-hidden px-5 pb-40 pt-24 sm:px-8 lg:px-12 lg:pb-48 lg:pt-32"
    >
      {/* Ciepła poświata zamykająca stronę */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_85%,var(--accent-soft),transparent_65%)]"
      />
      <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 -z-10" />

      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <p className="eyebrow">Rezerwacja</p>

        <h2 className="mt-4 font-display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.05] tracking-[-0.02em] text-ink">
          Gotowa na <span className="italic text-primary">delikatny</span> manicure?
        </h2>

        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted">
          Napisz wiadomość na Instagramie — odpiszę z wolnymi terminami i pomogę dobrać stylizację do
          Twoich dłoni. {profile.name}, {site.city}.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <a
            href={socialLinks.instagramDm}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group inline-flex items-center gap-2.5 rounded-full bg-primary-dark px-8 py-4 text-[15px] font-medium text-porcelain shadow-[var(--shadow-lift)] transition-colors hover:bg-primary"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
            {cta.primary}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted underline-offset-4 transition-colors hover:text-primary-dark hover:underline"
          >
            {socialLinks.instagramHandle}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
