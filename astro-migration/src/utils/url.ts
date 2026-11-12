// ============================================================================
// Utilidades de URL - Astro Migration
// ============================================================================

/**
 * Prefijo de despliegue del sitio.
 * '/' en desarrollo, '/cv-plantilla/' en GitHub Pages.
 * Astro no garantiza la barra final, por eso se normaliza aquí.
 */
export const BASE_URL: string = (() => {
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base : `${base}/`;
})();

/**
 * Antepone el prefijo de despliegue a una ruta del sitio.
 * `withBase('images/profile.jpg')` → '/cv-plantilla/images/profile.jpg'
 */
export function withBase(path: string): string {
  return `${BASE_URL}${path.replace(/^\//, '')}`;
}
