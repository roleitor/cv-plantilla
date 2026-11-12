import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'astro-dist/**', 'node_modules/**', '.astro/**', 'public/**'],
  },

  // Archivos .ts / .js / .mjs del proyecto
  {
    files: ['**/*.{ts,js,mjs}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      // TypeScript ya comprueba los identificadores y las variables sin usar
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'off',
    },
  },

  // Archivos .astro (base + recommended del plugin de Astro)
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // El interior de <style> es CSS, no JavaScript
      'no-undef': 'off',
    },
  },
];
