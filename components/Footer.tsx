import { site, socialLinks } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-5 pb-28 pt-10 sm:px-8 lg:px-12 lg:pb-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.fullName}
        </p>
        <p>
          {site.tagline} · {site.city}
        </p>
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-primary-dark"
        >
          {socialLinks.instagramHandle}
        </a>
      </div>
    </footer>
  );
}
