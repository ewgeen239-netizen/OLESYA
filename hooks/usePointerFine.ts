"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(pointer: fine)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** true tylko dla precyzyjnego wskaźnika (mysz/trackpad); na SSR i dotyku false. */
export function usePointerFine() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
