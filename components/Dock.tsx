"use client";

import { useEffect, useRef, useState } from "react";
import { usePointerFine } from "@/hooks/usePointerFine";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  CalendarHeart,
  Images,
  MessageSquareQuote,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { socialLinks } from "@/data/site";

type DockItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  external?: boolean;
};

const ITEMS: DockItem[] = [
  { id: "portfolio", label: "Portfolio", icon: Images, href: "#portfolio" },
  { id: "uslugi", label: "Usługi", icon: Sparkles, href: "#uslugi" },
  { id: "o-mnie", label: "O mnie", icon: UserRound, href: "#o-mnie" },
  { id: "opinie", label: "Opinie", icon: MessageSquareQuote, href: "#opinie" },
  {
    id: "book",
    label: "Umów",
    icon: CalendarHeart,
    href: socialLinks.instagram,
    external: true,
  },
];

/* Powiększenie w stylu macOS — liczone z odległości kursora od ikony. */
function DockButton({
  item,
  active,
  mouseX,
  enabled,
}: {
  item: DockItem;
  active: boolean;
  mouseX: MotionValue<number>;
  enabled: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds || val === Number.POSITIVE_INFINITY) return 999;
    return val - (bounds.left + bounds.width / 2);
  });

  const scaleRaw = useTransform(distance, [-130, 0, 130], [1, 1.34, 1]);
  const liftRaw = useTransform(distance, [-130, 0, 130], [0, -7, 0]);
  const scale = useSpring(scaleRaw, { stiffness: 320, damping: 22, mass: 0.4 });
  const lift = useSpring(liftRaw, { stiffness: 320, damping: 22, mass: 0.4 });

  const Icon = item.icon;
  const isBook = item.id === "book";

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      aria-label={isBook ? "Umów wizytę przez Instagram" : `Przejdź do sekcji ${item.label}`}
      aria-current={active ? "true" : undefined}
      style={enabled ? { scale, y: lift } : undefined}
      whileTap={{ scale: 0.94 }}
      className={`group relative flex h-12 w-[58px] flex-col items-center justify-center gap-1 rounded-[10px] transition-colors duration-300 sm:w-[64px] ${
        isBook
          ? "bg-espresso text-cream hover:bg-[#241C17]"
          : active
            ? "bg-cream text-espresso"
            : "text-espresso-soft hover:bg-cream/70 hover:text-espresso"
      }`}
    >
      <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
      <span className="text-[10px] leading-none tracking-[0.04em]">
        {item.label}
      </span>
      {active && !isBook ? (
        <motion.span
          layoutId="dock-active"
          className="absolute -bottom-1 h-1 w-1 rounded-full bg-accent"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      ) : null}
    </motion.a>
  );
}

export default function Dock() {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const [active, setActive] = useState<string>("portfolio");
  const fine = usePointerFine();

  useEffect(() => {
    const ids = ITEMS.filter((i) => !i.external).map((i) => i.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const magnify = fine && !reduce;

  return (
    <motion.nav
      aria-label="Nawigacja główna"
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => magnify && mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex w-full max-w-[520px] items-end justify-between gap-1 rounded-[14px] border border-cream/70 bg-cream/70 p-1.5 shadow-[0_24px_60px_-32px_rgba(75,58,49,0.6)] backdrop-blur-xl sm:w-auto sm:gap-1.5">
        {ITEMS.map((item) => (
          <DockButton
            key={item.id}
            item={item}
            active={active === item.id}
            mouseX={mouseX}
            enabled={magnify}
          />
        ))}
      </div>
    </motion.nav>
  );
}
