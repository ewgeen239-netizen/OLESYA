import {
  Brush,
  Calendar,
  Footprints,
  Gem,
  Images,
  Layers,
  Quote,
  Sparkles,
  User,
  type LucideIcon,
} from 'lucide-react';
import type { SVGProps } from 'react';

/** Lucide v1 nie zawiera już logotypów marek — Instagram rysujemy sami. */
export function InstagramIcon({ strokeWidth = 1.6, ...props }: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const serviceIcons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  gem: Gem,
  layers: Layers,
  footprints: Footprints,
  brush: Brush,
};

export const navIcons: Record<string, LucideIcon> = {
  images: Images,
  sparkles: Sparkles,
  user: User,
  quote: Quote,
  calendar: Calendar,
};
