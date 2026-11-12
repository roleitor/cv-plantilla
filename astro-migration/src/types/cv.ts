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

// Temas disponibles
export type ThemeName =
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  | 'gray'
  | 'dark'
  | 'modern'
  | 'classic';

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  lightText: string;
  bg: string;
  sectionBg: string;
  borderColor: string;
  headerRadius: string;
  sectionRadius: string;
  printBg: string;
  printText: string;
  printBorder: string;
  sidebarBg: string;
  sidebarText: string;
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  blue: {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    text: '#1f2937',
    lightText: '#6b7280',
    bg: '#ffffff',
    sectionBg: '#f9fafb',
    borderColor: '#e5e7eb',
    headerRadius: '0.5rem',
    sectionRadius: '0.5rem',
    printBg: 'white',
    printText: 'black',
    printBorder: '#2563eb',
    sidebarBg: '#1f2937',
    sidebarText: '#f9fafb',
  },
  green: {
    primary: '#059669',
    secondary: '#047857',
    accent: '#10b981',
    text: '#1f2937',
    lightText: '#6b7280',
    bg: '#ffffff',
    sectionBg: '#f0fdf4',
    borderColor: '#bbf7d0',
    headerRadius: '0.5rem',
    sectionRadius: '0.5rem',
    printBg: 'white',
    printText: 'black',
    printBorder: '#059669',
    sidebarBg: '#1f2937',
    sidebarText: '#f9fafb',
  },
  red: {
    primary: '#dc2626',
    secondary: '#b91c1c',
    accent: '#ef4444',
    text: '#1f2937',
    lightText: '#6b7280',
    bg: '#ffffff',
    sectionBg: '#fef2f2',
    borderColor: '#fecaca',
    headerRadius: '0.5rem',
    sectionRadius: '0.5rem',
    printBg: 'white',
    printText: 'black',
    printBorder: '#dc2626',
    sidebarBg: '#1f2937',
    sidebarText: '#f9fafb',
  },
  purple: {
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#8b5cf6',
    text: '#1f2937',
    lightText: '#6b7280',
    bg: '#ffffff',
    sectionBg: '#faf5ff',
    borderColor: '#e9d5ff',
    headerRadius: '0.5rem',
    sectionRadius: '0.5rem',
    printBg: 'white',
    printText: 'black',
    printBorder: '#7c3aed',
    sidebarBg: '#1f2937',
    sidebarText: '#f9fafb',
  },
  gray: {
    primary: '#374151',
    secondary: '#1f2937',
    accent: '#4b5563',
    text: '#1f2937',
    lightText: '#6b7280',
    bg: '#ffffff',
    sectionBg: '#f3f4f6',
    borderColor: '#d1d5db',
    headerRadius: '0.5rem',
    sectionRadius: '0.5rem',
    printBg: 'white',
    printText: 'black',
    printBorder: '#374151',
    sidebarBg: '#1f2937',
    sidebarText: '#f9fafb',
  },
  dark: {
    primary: '#3b82f6',
    secondary: '#2563eb',
    accent: '#60a5fa',
    text: '#f9fafb',
    lightText: '#9ca3af',
    bg: '#111827',
    sectionBg: '#1f2937',
    borderColor: '#374151',
    headerRadius: '0.5rem',
    sectionRadius: '0.5rem',
    printBg: 'white',
    printText: 'black',
    printBorder: '#3b82f6',
    sidebarBg: '#1f2937',
    sidebarText: '#f9fafb',
  },
  modern: {
    primary: '#0891b2',
    secondary: '#0e7490',
    accent: '#06b6d4',
    text: '#1f2937',
    lightText: '#6b7280',
    bg: '#ffffff',
    sectionBg: '#ecfeff',
    borderColor: '#a5f3fc',
    headerRadius: '1rem',
    sectionRadius: '1rem',
    printBg: 'white',
    printText: 'black',
    printBorder: '#0891b2',
    sidebarBg: '#1f2937',
    sidebarText: '#f9fafb',
  },
  classic: {
    primary: '#1e3a8a',
    secondary: '#1e40af',
    accent: '#3b82f6',
    text: '#1f2937',
    lightText: '#6b7280',
    bg: '#ffffff',
    sectionBg: '#ffffff',
    borderColor: '#94a3b8',
    headerRadius: '0',
    sectionRadius: '0',
    printBg: 'white',
    printText: 'black',
    printBorder: '#1e3a8a',
    sidebarBg: '#1f2937',
    sidebarText: '#f9fafb',
  },
};

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