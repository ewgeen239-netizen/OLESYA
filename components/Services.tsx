'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { cta, services, servicesNote, socialLinks } from '@/data/site';
import { cn, EASE } from '@/lib/utils';
import { serviceIcons } from './icons';
import { SectionHeading } from './SectionHeading';

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="uslugi" className="relative scroll-mt-8 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      {/* Ciepłe tło odcinające sekcję od reszty strony */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-full bg-[linear-gradient(180deg,transparent,var(--porcelain)_18%,var(--porcelain)_82%,transparent)]"
      />

      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Usługi"
          title={
            <>
              Krótkie menu, <span className="italic text-primary">długa</span> lista detali
            </>
          }
          description="Pracuję w systemie jednej klientki na wizytę, więc na każdą stylizację jest tyle czasu, ile naprawdę potrzeba."
          align="center"
        />

        <ul className="mt-14 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <motion.li
                key={service.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: reduce ? 0 : index * 0.07, ease: EASE }}
              >
                <div
                  className={cn(
                    'group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-3 px-2 py-7 transition-colors duration-500 hover:bg-surface/70 sm:grid-cols-[auto_1fr_auto] sm:px-4',
                    service.featured && 'bg-surface/40'
                  )}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-primary transition-colors duration-500 group-hover:border-[var(--accent)] group-hover:text-primary-dark">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-xl leading-tight text-ink">{service.name}</h3>
                      {service.featured && (
                        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-primary-dark uppercase">
                          Najczęściej wybierane
                        </span>
                      )}
                    </div>
                    <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-muted">
                      {service.description}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted">
                      <Clock className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                      {service.duration}
                    </p>
                  </div>

                  <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:flex-col sm:items-end sm:justify-start sm:gap-3">
                    <p className="font-display text-2xl leading-none text-primary-dark">{service.price}</p>
                    <a
                      href={socialLinks.instagramDm}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-4 py-2 text-[13px] text-primary-dark transition-colors hover:border-[var(--accent)] hover:bg-accent-soft"
                    >
                      {cta.short}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted">{servicesNote}</p>
      </div>
    </section>
  );
}
