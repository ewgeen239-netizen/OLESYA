export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Miękka krzywa "ease-out expo" — używana konsekwentnie w całej stronie. */
export const EASE = [0.22, 1, 0.36, 1] as const;
