import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import type { ReactNode } from 'react';
import { profile, site, socialLinks } from '@/data/site';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Jost({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — ${site.tagline}`,
    template: `%s | ${site.fullName}`,
  },
  description: site.description,
  keywords: [
    'manicure Szczecin',
    'paznokcie Szczecin',
    'stylizacja paznokci Szczecin',
    'manicure hybrydowy Szczecin',
    'przedłużanie paznokci Szczecin',
    'pedicure Szczecin',
    'french manicure',
    'nude manicure',
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.fullName,
    title: `${site.fullName} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.fullName} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'beauty',
};

export const viewport: Viewport = {
  themeColor: '#f8f3ed',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

/** Dane strukturalne — bez wymyślonego adresu i telefonu. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: site.fullName,
  description: site.description,
  url: site.url,
  areaServed: { '@type': 'City', name: site.city },
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'PL' },
  sameAs: [socialLinks.instagram],
  founder: { '@type': 'Person', name: profile.name, jobTitle: profile.role },
  makesOffer: [
    'Manicure hybrydowy',
    'Stylizacja żelowa',
    'Przedłużanie paznokci',
    'Pedicure',
    'Zdobienia',
  ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#tresc"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-primary-dark focus:px-5 focus:py-3 focus:text-sm focus:text-porcelain"
        >
          Przejdź do treści
        </a>

        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
