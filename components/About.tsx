'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { profile, site, socialLinks } from '@/data/site';
import { Reveal } from './Reveal';
import { InstagramIcon } from './icons';

export function About({ hasAvatar }: { hasAvatar: boolean }) {
  return (
    <section id="o-mnie" className="relative scroll-mt-8 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-full bg-[linear-gradient(180deg,transparent,var(--porcelain)_20%,var(--porcelain)_80%,transparent)]"
      />

      <div className="mx-auto max-w-3xl">
        <Reveal className="glass rounded-[1.75rem] p-8 shadow-[var(--shadow-soft)] sm:p-12">
          <div className="flex items-center gap-4">
            {/* Awatar 100×100 — świadomie użyty tylko tutaj, nigdy jako hero */}
            {hasAvatar ? (
              <Image
                src={profile.avatar}
                alt={profile.avatarAlt}
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-[var(--border)]"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--accent-soft),var(--accent))] font-display text-2xl text-primary-dark ring-1 ring-[var(--border)]"
              >
                {profile.name.charAt(0)}
              </span>
            )}

            <div>
              <p className="eyebrow">O mnie</p>
              <h2 className="mt-1 font-display text-2xl leading-tight text-ink sm:text-3xl">
                {profile.name}
              </h2>
              <p className="text-sm text-muted">
                {profile.role} · {profile.location}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {profile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-[15px] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-[var(--border)] pt-7">
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl leading-none text-primary-dark">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block text-[11px] leading-snug text-muted">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary-dark transition-colors hover:text-primary"
          >
            <InstagramIcon className="h-4 w-4" />
            {socialLinks.instagramHandle}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <p className="sr-only">Pracownia stylizacji paznokci w mieście {site.city}.</p>
        </Reveal>
      </div>
    </section>
  );
}
