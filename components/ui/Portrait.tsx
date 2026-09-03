import Image from "next/image";

type PortraitProps = {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** kadrowanie zdjęcia, np. "50% 22%" — trzyma twarz w kadrze */
  objectPosition?: string;
  /** zbliżenie kadru (1 = bez zoomu); punktem stałym jest objectPosition */
  zoom?: number;
  /** miękkie rozjaśnienie u dołu, pod podpis */
  fade?: boolean;
};

/**
 * Portret mistrzyni w hero. Proporcja 3:4 jest stała — podmiana zdjęcia
 * nie powoduje przeskoku layoutu. Placeholder jasno mówi, co wgrać.
 */
export default function Portrait({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  objectPosition = "50% 24%",
  zoom = 1,
  fade = false,
}: PortraitProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: "3 / 4" }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{
            objectPosition,
            transform: zoom === 1 ? undefined : `scale(${zoom})`,
            transformOrigin: objectPosition,
          }}
        />
      ) : (
        <div
          role="img"
          aria-label={`${alt} — miejsce na zdjęcie`}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(110% 80% at 50% 8%, #FDF7F0 0%, #F0E4D4 46%, #E4D3BE 100%)",
          }}
        >
          {/* miękka sylwetka — bez kiczu, tylko sugestia kadru */}
          <svg
            aria-hidden="true"
            viewBox="0 0 300 400"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            <defs>
              <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B99B7C" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#B99B7C" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <ellipse cx="150" cy="150" rx="58" ry="72" fill="url(#pg)" />
            <path
              d="M46 400c0-64 46-108 104-108s104 44 104 108"
              fill="url(#pg)"
            />
            <circle
              cx="150"
              cy="150"
              r="72"
              stroke="#B08F6E"
              strokeOpacity="0.28"
              strokeWidth="1"
            />
          </svg>

          <div className="absolute inset-x-4 bottom-4 rounded-[10px] border border-espresso/10 bg-cream/75 px-3.5 py-3 backdrop-blur-sm">
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-espresso-soft">
              Miejsce na portret
            </p>
            <p className="mt-1 text-[11.5px] leading-snug text-espresso-faint">
              Wgraj <code className="text-[11px]">/public/images/hero-alesia.jpg</code>{" "}
              i ustaw <code className="text-[11px]">hero.portrait</code> w{" "}
              <code className="text-[11px]">data/site.ts</code>
            </p>
          </div>
        </div>
      )}

      {src && fade ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-[linear-gradient(0deg,rgba(255,250,245,0.92)_0%,rgba(255,250,245,0)_100%)]"
        />
      ) : null}
    </div>
  );
}
