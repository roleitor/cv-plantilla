import { defineConfig } from 'astro/config';
import { resolve } from 'path';

// En dev el sitio se sirve desde la raíz (http://localhost:4321/)
// En GitHub Pages se publica en https://roleitor.github.io/cv-plantilla/
const SITE_URL = process.env.SITE_URL || 'https://roleitor.github.io/cv-plantilla';
const BASE_PATH = process.env.BASE_PATH ?? '/';

// Idioma por defecto del sitio
const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'es';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  adapter: undefined, // Static output for GitHub Pages
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [DEFAULT_LOCALE],
    // Con un único locale no se antepone prefijo a las rutas
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
      fallbackType: 'rewrite',
    },
  },
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  prefetch: false,
  vite: {
    css: {
      devSourcemap: true,
    },
    server: {
      watch: {
        // Ignorar los artefactos de build para no recargar el dev server
        ignored: ['**/astro-dist/**', '**/.astro-build-temp/**', '**/dist/**'],
      },
    },
    resolve: {
      alias: {
        '@': resolve('./src'),
        '@components': resolve('./src/components'),
        '@layouts': resolve('./src/layouts'),
        '@styles': resolve('./src/styles'),
        '@scripts': resolve('./src/scripts'),
        '@data': resolve('./src/data'),
        '@types': resolve('./src/types'),
      },
    },
  },
});
