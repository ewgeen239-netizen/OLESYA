import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Sprawdza (po stronie serwera), czy plik istnieje w katalogu /public.
 *
 * Dzięki temu hero potrafi sam wykryć, że prawdziwy portret Alesi został
 * wgrany — i przełączyć się z opisanego, pustego miejsca na zdjęcie
 * bez żadnej zmiany w kodzie.
 */
export function publicFileExists(publicPath: string): boolean {
  const relative = publicPath.replace(/^\/+/, '');
  try {
    return existsSync(join(process.cwd(), 'public', relative));
  } catch {
    return false;
  }
}
