"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { usePointerFine } from "@/hooks/usePointerFine";

/**
 * Miękki kursor — tylko desktop (pointer: fine) i tylko gdy użytkownik
 * nie prosił o ograniczenie animacji. Na dotyku komponent nic nie renderuje.
 */
export default function SoftCursor() {
  const fine = usePointerFine();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;
  const [hot, setHot] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHot(
        Boolean(
          el?.closest("a, button, [data-magnetic], [role='tab'], input, textarea"),
        ),
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden lg:block"
    >
      <motion.div
        animate={{ scale: hot ? 2.1 : 1, opacity: hot ? 0.5 : 0.32 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 26,
          height: 26,
          background:
            "radial-gradient(circle, rgba(198,168,137,0.85) 0%, rgba(198,168,137,0) 70%)",
        }}
      />
    </motion.div>
  );
}
