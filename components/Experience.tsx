'use client';

import { About } from './About';
import { BookingCta } from './BookingCta';
import { Cursor } from './Cursor';
import { Dock } from './Dock';
import { Footer } from './Footer';
import { GalleryProvider } from './GalleryProvider';
import { Hero } from './Hero';
import { Portfolio } from './Portfolio';
import { Process } from './Process';
import { Reviews } from './Reviews';
import { Services } from './Services';

interface ExperienceProps {
  /** Czy w /public leży prawdziwy portret Alesi. */
  hasHeroPhoto: boolean;
  /** Czy w /public leży awatar 100×100 do sekcji „O mnie”. */
  hasAvatar: boolean;
}

export function Experience({ hasHeroPhoto, hasAvatar }: ExperienceProps) {
  return (
    <GalleryProvider>
      <Cursor />

      <main id="tresc">
        <Hero hasHeroPhoto={hasHeroPhoto} />
        <Portfolio />
        <Services />
        <Process />
        <About hasAvatar={hasAvatar} />
        <Reviews />
        <BookingCta />
      </main>

      <Footer />
      <Dock />
    </GalleryProvider>
  );
}
