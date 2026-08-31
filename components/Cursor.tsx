'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Miękki kursor — wyłącznie na desktopie ze wskaźnikiem precyzyjnym.
 * Powiększa się nad elementami oznaczonymi `data-cursor="hover"`.
 * Na dotyku i przy `prefers-reduced-motion` nie renderuje się wcale.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.35 });

  useEffect(() => {
    if (reduce) return;
    const media = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest?.('[data-cursor="hover"], a, button')));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.span
        className="block rounded-full"
        animate={{
          width: hovering ? 58 : 26,
          height: hovering ? 58 : 26,
          backgroundColor: hovering ? 'rgba(198,168,137,0.30)' : 'rgba(198,168,137,0.20)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        style={{ translateX: '-50%', translateY: '-50%', backdropFilter: 'blur(1px)' }}
      />
    </motion.div>
  );
}
