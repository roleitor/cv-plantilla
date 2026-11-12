import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://roleitor.github.io',
  base: '/cv-plantilla',
  output: 'static',
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
  },
});