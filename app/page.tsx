import { Experience } from '@/components/Experience';
import { profile } from '@/data/site';
import { publicFileExists } from '@/lib/assets';

/**
 * Komponent serwerowy — sprawdza, które zdjęcia marki są już wgrane,
 * i przekazuje tę informację do warstwy interaktywnej.
 *
 * Dzięki temu wgranie `public/images/hero-alesia.jpg` samo przełącza
 * pierwszy ekran z opisanego, pustego miejsca na prawdziwy portret.
 */
export default function Page() {
  return (
    <Experience
      hasHeroPhoto={publicFileExists(profile.heroImage)}
      hasAvatar={publicFileExists(profile.avatar)}
    />
  );
}
