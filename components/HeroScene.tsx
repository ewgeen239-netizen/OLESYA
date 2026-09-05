"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import InstagramIcon from "@/components/ui/InstagramIcon";
import NailPhoto from "@/components/ui/NailPhoto";
import Portrait from "@/components/ui/Portrait";
import Lightbox from "@/components/Lightbox";
import {
  galleryItems,
  hero,
  heroTiles,
  profile,
  socialLinks,
  type GalleryItem,
  type HeroTile,
} from "@/data/site";

const SPRING = { stiffness: 70, damping: 22, mass: 0.7 };

/* ------------------------------------------------------------------ */
/*  Kafel portfolio — unosi się, reaguje na kursor, otwiera lightbox    */
/* ------------------------------------------------------------------ */

type TileProps = {
  tile: HeroTile;
  index: number;
  onOpen: (tile: HeroTile) => void;
  px?: MotionValue<number>;
  py?: MotionValue<number>;
  floating?: boolean;
};

function TileCard({ tile, index, onOpen, px, py, floating = false }: TileProps) {
  const reduce = useReducedMotion();
  const range = 26 * tile.depth;

  const idleX = useMotionValue(0);
  const idleY = useMotionValue(0);
  const x = useTransform(px ?? idleX, (v: number) => v * range);
  const y = useTransform(py ?? idleY, (v: number) => v * range * 0.7);

  return (
    <motion.div
      style={floating && !reduce ? { x, y } : undefined}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.35 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.button
        type="button"
        data-magnetic
        onClick={() => onOpen(tile)}
        aria-label={`Zobacz prace: ${tile.label}`}
        animate={
          reduce || !floating
            ? undefined
            : { y: [0, -9, 0], rotate: [tile.tilt, tile.tilt + 0.8, tile.tilt] }
        }
        transition={
          reduce || !floating
            ? undefined
            : {
                duration: 7 + index * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        whileHover={{ scale: 1.05, rotate: 0, y: -10 }}
        whileTap={{ scale: 0.98 }}
        className="group block w-full rounded-[14px] border border-cream/60 bg-cream/55 p-2 text-left shadow-[0_24px_50px_-34px_rgba(75,58,49,0.55)] backdrop-blur-md transition-colors duration-300 hover:bg-cream/80"
      >
        <div className="overflow-hidden rounded-[10px]">
          <NailPhoto
            src={tile.src}
            alt={`${tile.label} — ${tile.caption}`}
            ratio="1/1"
            tone={tile.tone}
            sizes="(max-width: 1024px) 45vw, 180px"
            placeholderNote="foto"
          />
        </div>
        <div className="px-1 pt-2 pb-1">
          <p className="text-[12.5px] leading-none font-medium text-espresso">
            {tile.label}
          </p>
          <p className="mt-1.5 text-[11px] leading-snug text-espresso-faint">
            {tile.caption}
          </p>
        </div>
      </motion.button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Blok tekstowy hero                                                  */
/* ------------------------------------------------------------------ */

function HeroCopy({ compact = false, onVisual = false }: { compact?: boolean; onVisual?: boolean }) {
  return (
    <div
      className={
        compact
          ? ""
          : "max-w-[460px]"
      }
    >
      <p
        className={`flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase ${
          onVisual ? "text-cream/75" : "text-espresso-faint"
        }`}
      >
        <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
        {hero.eyebrow}
      </p>

      <h1
        className={`mt-4 font-display text-[38px] leading-[1.03] text-balance sm:text-[46px] lg:text-[64px] ${
          onVisual ? "text-cream" : "text-espresso"
        }`}
      >
        Alesia Nails
        <span className={`block ${onVisual ? "text-cream/82" : "text-espresso-soft"}`}>
          Szczecin
        </span>
      </h1>

      <p
        className={`mt-4 max-w-[42ch] text-[14.5px] leading-[1.7] text-pretty ${
          onVisual ? "text-cream/78" : "text-espresso-soft"
        }`}
      >
        {profile.tagline}
      </p>

      <div className={`mt-6 flex flex-col gap-2.5 ${compact ? "sm:flex-row sm:items-center" : ""}`}>
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          className={`group inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-espresso px-5 text-[14px] font-medium text-cream transition-all duration-300 hover:bg-[#241C17] hover:shadow-[0_18px_40px_-20px_rgba(75,58,49,0.9)] ${compact ? "sm:w-auto" : ""}`}
        >
          <InstagramIcon className="h-4 w-4" />
          {hero.ctaLabel}
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
        <a
          href="#portfolio"
          data-magnetic
          className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border px-5 text-[14px] font-medium backdrop-blur-sm transition-all duration-300 ${
            onVisual
              ? "border-cream/35 bg-cream/12 text-cream hover:bg-cream/20"
              : "border-espresso/15 bg-cream/70 text-espresso hover:border-espresso/35"
          } ${compact ? "sm:w-auto" : ""}`}
        >
          Zobacz portfolio
        </a>
      </div>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {(compact ? profile.trustChips : profile.trustChips.slice(0, 2)).map((chip) => (
          <li
            key={chip}
            className={`rounded-[8px] border px-2.5 py-1.5 text-[11px] tracking-[0.03em] ${
              onVisual
                ? "border-cream/24 bg-cream/12 text-cream/72 backdrop-blur-sm"
                : "border-espresso/10 bg-cream/60 text-espresso-soft"
            }`}
          >
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scena                                                               */
/* ------------------------------------------------------------------ */

export default function HeroScene() {
  const reduce = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, SPRING);
  const py = useSpring(rawY, SPRING);

  const bgX = useTransform(px, (v) => v * -18);
  const bgY = useTransform(py, (v) => v * -12);
  const portraitX = useTransform(px, (v) => v * 14);
  const portraitY = useTransform(py, (v) => v * 10);

  const [lightboxItems, setLightboxItems] = useState<GalleryItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || e.pointerType !== "mouse") return;
      const rect = sceneRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY, reduce],
  );

  const openTile = useCallback((tile: HeroTile) => {
    const matches = galleryItems.filter((g) => g.category === tile.category);
    setLightboxItems(matches.length ? matches : galleryItems);
    setLightboxIndex(0);
  }, []);

  return (
    <section
      id="top"
      ref={sceneRef}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden border-b border-espresso/8 pt-20 pb-32 lg:pt-0 lg:pb-0"
    >
      {/* --- tło sceny --- */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { x: bgX, y: bgY }}
        className="absolute -inset-[6%] -z-10"
      >
        {hero.background ? (
          <motion.div
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={hero.background}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "52% 48%" }}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
            style={{
              backgroundImage: [
                "radial-gradient(46% 40% at 18% 12%, rgba(234,216,199,0.65) 0%, rgba(234,216,199,0) 100%)",
                "radial-gradient(52% 46% at 88% 78%, rgba(198,168,137,0.42) 0%, rgba(198,168,137,0) 100%)",
                "radial-gradient(70% 60% at 50% 4%, #FFFBF6 0%, #F8F1E7 44%, #F0E5D6 76%, #EADFCF 100%)",
              ].join(", "),
            }}
          />
        )}
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(36,28,23,0.72)_0%,rgba(36,28,23,0.38)_38%,rgba(248,243,237,0.08)_100%)]"
      />
      <div className="noise pointer-events-none absolute inset-0 -z-10" />

      {/* =============== DESKTOP: pełnoekranowa scena =============== */}
      <div className="relative hidden min-h-[100svh] lg:block">
        {/* portret */}
        <motion.div
          style={reduce ? undefined : { x: portraitX, y: portraitY }}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-1/2 z-10 w-[min(26vw,340px)] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="overflow-hidden rounded-[14px] border border-cream/30 bg-cream/10 p-2 shadow-[0_50px_110px_-60px_rgba(36,28,23,0.9)] backdrop-blur-md">
            <Portrait
              src={hero.portrait}
              alt={hero.portraitAlt}
              priority
              sizes="380px"
              className="rounded-[12px]"
              objectPosition="46% 14%"
              zoom={1.5}
              fade
            />
          </div>
          <p className="mt-3 text-center text-[11.5px] tracking-[0.16em] uppercase text-cream/68">
            {profile.master} · {profile.role}
          </p>
        </motion.div>

        {/* kafle */}
        {heroTiles.map((tile, i) => (
          <div
            key={tile.id}
            className="absolute w-[170px]"
            style={{
              left: `${tile.pos.x}%`,
              top: `${tile.pos.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: Math.round(tile.depth * 10),
            }}
          >
            <TileCard tile={tile} index={i} onOpen={openTile} px={px} py={py} floating />
          </div>
        ))}

        {/* tekst */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-[84px] left-8 z-20 xl:left-14"
        >
          <HeroCopy onVisual={Boolean(hero.background)} />
        </motion.div>

      </div>

      {/* =============== MOBILE / TABLET =============== */}
      <div className="relative flex flex-1 flex-col justify-end px-5 pb-8 sm:px-8 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[210px] sm:max-w-[250px]"
        >
          <div className="overflow-hidden rounded-[16px] border border-cream/70 bg-cream/40 p-2 shadow-[0_40px_80px_-56px_rgba(75,58,49,0.85)] backdrop-blur-md">
            <Portrait
              src={hero.portrait}
              alt={hero.portraitAlt}
              priority
              sizes="(max-width: 640px) 78vw, 340px"
              className="rounded-[12px]"
              objectPosition="46% 14%"
              zoom={1.5}
              fade
            />
          </div>
          <p className="mt-2.5 text-center text-[11px] tracking-[0.16em] uppercase text-espresso-faint">
            {profile.master} · {profile.role}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7"
        >
          <HeroCopy compact onVisual={Boolean(hero.background)} />
        </motion.div>

        {/* swipe-stack kafli */}
        <div className="no-scrollbar -mx-5 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8">
          {heroTiles.map((tile, i) => (
            <div
              key={tile.id}
              className="w-[152px] shrink-0 snap-start sm:w-[168px]"
            >
              <TileCard tile={tile} index={i} onOpen={openTile} />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
