import Image from "next/image";
import type { PhotoRatio } from "@/data/site";

const TONES = [
  { from: "#FCF5EC", to: "#EADBC7", ink: "#B39877" },
  { from: "#FAF1E8", to: "#E3D2BC", ink: "#AC8F71" },
  { from: "#FBF6F0", to: "#E7DACB", ink: "#A9917A" },
  { from: "#F9F2E9", to: "#DFCDB6", ink: "#A88A69" },
  { from: "#FCF6EE", to: "#E4D7C5", ink: "#AD947A" },
] as const;

export type NailPhotoProps = {
  src: string | null;
  alt: string;
  ratio: PhotoRatio;
  tone?: 0 | 1 | 2 | 3 | 4;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** widoczny podpis na placeholderze (np. nazwa pliku do podmiany) */
  placeholderNote?: string;
  /** kadrowanie zdjęcia, np. "50% 20%" */
  objectPosition?: string;
  fit?: "cover" | "contain";
};

/**
 * Stała proporcja => brak layout shiftu niezależnie od tego,
 * czy zdjęcie jest już wgrane, czy nadal mamy placeholder.
 */
export default function NailPhoto({
  src,
  alt,
  ratio,
  tone = 0,
  sizes,
  priority = false,
  className = "",
  placeholderNote,
  objectPosition = "center",
  fit = "cover",
}: NailPhotoProps) {
  const t = TONES[tone];

  return (
    <div
      className={`relative overflow-hidden bg-latte/60 ${className}`}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={fit === "contain" ? "object-contain" : "object-cover"}
          style={{ objectPosition }}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(120% 90% at 30% 12%, ${t.from} 0%, ${t.to} 72%, ${t.to} 100%)`,
          }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 100 130"
            className="absolute left-1/2 top-1/2 h-[58%] w-auto -translate-x-1/2 -translate-y-1/2"
            fill="none"
          >
            <path
              d="M50 6c15.5 0 25.5 11.5 25.5 28 0 25-6 55-9.5 69.5-1.8 7.4-7.8 12-16 12s-14.2-4.6-16-12C30.5 89 24.5 59 24.5 34 24.5 17.5 34.5 6 50 6Z"
              stroke={t.ink}
              strokeOpacity="0.45"
              strokeWidth="1.1"
            />
            <path
              d="M27 32c7-6.5 39-6.5 46 0"
              stroke={t.ink}
              strokeOpacity="0.35"
              strokeWidth="1.1"
            />
          </svg>
          {placeholderNote ? (
            <span
              className="absolute bottom-3 left-3 rounded-[6px] bg-cream/70 px-2 py-1 text-[10px] font-medium tracking-[0.14em] uppercase"
              style={{ color: t.ink }}
            >
              {placeholderNote}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
