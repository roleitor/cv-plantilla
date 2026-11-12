// ============================================================================
// Version Resolver - Astro Migration
// Determina qué versión del CV se renderiza en build/dev.
// La variable de entorno CV_VERSION la define `npm run build:all`.
// ============================================================================

import type { CVVersion } from '../types/cv';

export const CV_VERSION_KEYS: CVVersion[] = [
  'fullstack',
  'arquitectura',
  'angular_backend',
  'institucion_publica',
];

export const DEFAULT_CV_VERSION: CVVersion = 'fullstack';

/**
 * Resuelve la versión del CV a renderizar.
 * - `CV_VERSION` (process.env) tiene prioridad: la usa el build multi-versión.
 * - `PUBLIC_CV_VERSION` permite sobreescribirla desde el entorno de Vite.
 * - Si no hay ninguna o no es válida, se usa `fullstack`.
 */
export function resolveCVVersion(): CVVersion {
  const candidates = [
    process.env.CV_VERSION,
    import.meta.env.PUBLIC_CV_VERSION,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (value && (CV_VERSION_KEYS as string[]).includes(value)) {
      return value as CVVersion;
    }
  }

  return DEFAULT_CV_VERSION;
}
