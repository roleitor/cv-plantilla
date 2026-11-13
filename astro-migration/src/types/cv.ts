// ============================================================================
// TypeScript Types para CV - Astro Migration
// ============================================================================

export interface CVEntry {
  title: string;
  sub?: string;
  location?: string;
  dates?: string;
  nivel?: string;
  horas?: string;
  bullets?: string[];
}

export interface CVSection {
  title: string;
  entries: CVEntry[];
}

export interface CVData {
  sections: CVSection[];
}

export interface SiteConfig {
  title: string;
  /** Idioma por defecto del documento ( BCP 47 ), p. ej. 'es' */
  lang: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  department: string;
  affiliation: string;
  about_profile_image: string;
  linkedin: string;
  github: string;
  twitter?: string;
  telegram?: string;
  leetcode?: string;
  description: string;
  url: string;
  cv_version: string;
}

// Temas disponibles.
// La paleta de cada tema vive ÚNICAMENTE en `src/styles/global.css`
// (bloques `[data-theme="..."]`). Aquí solo se declaran los nombres, para
// poder tiparlos y generar el selector sin duplicar los colores.
export type ThemeName =
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  | 'gray'
  | 'dark'
  | 'modern'
  | 'classic'
  | 'navy'
  | 'monochrome';

export const THEME_NAMES: ThemeName[] = [
  'blue',
  'green',
  'red',
  'purple',
  'gray',
  'dark',
  'modern',
  'classic',
  'navy',
  'monochrome',
];

// Fuentes disponibles
export type FontName = 'inter' | 'roboto' | 'opensans' | 'lato' | 'montserrat';

export const FONTS: Record<FontName, string> = {
  inter: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  roboto: "'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  opensans: "'Open Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  lato: "'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  montserrat: "'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

// Layouts disponibles
export type LayoutName = 'vertical' | 'classic' | 'two-column' | 'timeline';

export const LAYOUT_LABELS: Record<LayoutName, string> = {
  vertical: '📄 Vertical',
  classic: '📜 Clásico (Simple)',
  'two-column': '📊 Dos Columnas',
  timeline: '📅 Línea de Tiempo',
};

export const LAYOUT_ROUTES: Record<LayoutName, string> = {
  vertical: '/',
  classic: '/classic/',
  'two-column': '/two-column/',
  timeline: '/timeline/',
};

// Tamaños de fuente disponibles
export type FontSize = '14' | '16' | '18' | '20' | '22';

export const FONT_SIZES: FontSize[] = ['14', '16', '18', '20', '22'];

// Configuración de usuario guardada
export interface UserPreferences {
  theme: ThemeName;
  font: FontName;
  size: FontSize;
  layout: LayoutName;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'blue',
  font: 'inter',
  size: '18',
  layout: 'vertical',
};

// Versiones de CV disponibles
export type CVVersion =
  | 'fullstack'
  | 'arquitectura'
  | 'angular_backend'
  | 'institucion_publica';

export const CV_VERSIONS: Record<CVVersion, { label: string; description: string }> = {
  fullstack: {
    label: '🎯 Full Stack',
    description: 'Versión completa con toda la experiencia y habilidades',
  },
  arquitectura: {
    label: '🏗️ Arquitectura',
    description: 'Enfocado en arquitectura, Kubernetes, DevOps y liderazgo',
  },
  angular_backend: {
    label: '💻 Angular & Backend',
    description: 'Enfocado en Angular, Java, .NET y desarrollo full stack',
  },
  institucion_publica: {
    label: '🏛️ Institución Pública',
    description: 'Enfocado para sector público (SIN, Aduana, CENCAP, EGGP)',
  },
};