/// <reference path="../.astro/types.d.ts" />

import type { ThemeSwitcher } from './scripts/theme-switcher';
import type { FontName, FontSize, LayoutName, ThemeName } from './types/cv';

declare global {
  interface Window {
    /** Instancia activa del selector de tema. */
    themeSwitcher?: ThemeSwitcher;
    /** Cambia el layout y navega a su ruta. */
    changeLayout?: (layout: LayoutName) => void;
    /** Cambia el tema de color. */
    changeTheme?: (theme: ThemeName) => void;
    /** Cambia la tipografía. */
    changeFont?: (font: FontName) => void;
    /** Cambia el tamaño base de la fuente. */
    changeSize?: (size: FontSize) => void;
  }
}

export {};
