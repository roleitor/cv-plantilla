// ============================================================================
// Theme Switcher - Astro Migration (TypeScript)
// Maneja: temas de color, fuentes, tamaños, layout switching, persistencia
// ============================================================================

import type { ThemeName, FontName, FontSize, LayoutName, UserPreferences } from '../types/cv';
import {
  THEME_NAMES,
  FONTS,
  LAYOUT_LABELS,
  LAYOUT_ROUTES,
  FONT_SIZES,
  DEFAULT_PREFERENCES,
} from '../types/cv';
import { withBase } from '../utils/url';

// Re-export types for convenience
export type { ThemeName, FontName, FontSize, LayoutName, UserPreferences };

const STORAGE_KEYS = {
  theme: 'cv_theme',
  font: 'cv_font',
  size: 'cv_size',
  layout: 'cv_layout',
} as const;

// ============================================================================
// ThemeSwitcher Class
// ============================================================================
export class ThemeSwitcher {
  private preferences: UserPreferences;
  private listeners: Set<(prefs: UserPreferences) => void> = new Set();

  constructor() {
    this.preferences = this.loadPreferences();
    this.applyPreferences();
    this.initSelectors();
  }

  // --------------------------------------------------------------------------
  // Cargar/Guardar preferencias
  // --------------------------------------------------------------------------
  private readStorage(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private loadPreferences(): UserPreferences {
    try {
      return {
        theme: (this.readStorage(STORAGE_KEYS.theme) as ThemeName) || DEFAULT_PREFERENCES.theme,
        font: (this.readStorage(STORAGE_KEYS.font) as FontName) || DEFAULT_PREFERENCES.font,
        size: (this.readStorage(STORAGE_KEYS.size) as FontSize) || DEFAULT_PREFERENCES.size,
        layout: (this.readStorage(STORAGE_KEYS.layout) as LayoutName) || DEFAULT_PREFERENCES.layout,
      };
    } catch {
      return { ...DEFAULT_PREFERENCES };
    }
  }

  private savePreferences(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.theme, this.preferences.theme);
      localStorage.setItem(STORAGE_KEYS.font, this.preferences.font);
      localStorage.setItem(STORAGE_KEYS.size, this.preferences.size);
      localStorage.setItem(STORAGE_KEYS.layout, this.preferences.layout);
    } catch {
      // localStorage no disponible (modo privado)
    }
  }

  // --------------------------------------------------------------------------
  // Aplicar preferencias al DOM
  // --------------------------------------------------------------------------
  private applyPreferences(): void {
    const root = document.documentElement;

    // El color vive solo en el CSS: se cambia el atributo y el bloque
    // [data-theme="..."] aplica las custom properties.
    root.setAttribute('data-theme', this.preferences.theme);

    // Aplicar fuente
    root.style.setProperty('--base-font-family', FONTS[this.preferences.font] || FONTS.inter);

    // Aplicar tamaño
    root.style.setProperty('--base-font-size', this.preferences.size + 'px');

    // Actualizar selects si existen
    this.updateSelectors();
  }

  // --------------------------------------------------------------------------
  // Inicializar event listeners en selects
  // --------------------------------------------------------------------------
  private initSelectors(): void {
    // Usar event delegation para selects dinámicos
    document.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      if (!target) return;

      if (target.id === 'theme-select') {
        this.setTheme(target.value as ThemeName);
      } else if (target.id === 'font-select') {
        this.setFont(target.value as FontName);
      } else if (target.id === 'size-select') {
        this.setSize(target.value as FontSize);
      } else if (target.id === 'layout-select') {
        this.setLayout(target.value as LayoutName);
      }
    });

    // Botón de impresión
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id === 'print-btn' || target.closest('#print-btn')) {
        window.print();
      }
    });
  }

  private updateSelectors(): void {
    const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
    const fontSelect = document.getElementById('font-select') as HTMLSelectElement;
    const sizeSelect = document.getElementById('size-select') as HTMLSelectElement;
    const layoutSelect = document.getElementById('layout-select') as HTMLSelectElement;

    if (themeSelect) themeSelect.value = this.preferences.theme;
    if (fontSelect) fontSelect.value = this.preferences.font;
    if (sizeSelect) sizeSelect.value = this.preferences.size;

    // El layout solo se sobrescribe si el usuario lo eligió explícitamente.
    // Si no hay preferencia guardada se respeta el layout de la página actual,
    // que el servidor ya dejó marcado como "selected".
    const storedLayout = this.readStorage(STORAGE_KEYS.layout) as LayoutName | null;
    if (layoutSelect && storedLayout && LAYOUT_ROUTES[storedLayout]) {
      layoutSelect.value = storedLayout;
    }
  }

  // --------------------------------------------------------------------------
  // Setters públicos
  // --------------------------------------------------------------------------
  setTheme(theme: ThemeName): void {
    if (THEME_NAMES.includes(theme)) {
      this.preferences.theme = theme;
      this.savePreferences();
      this.applyPreferences();
      this.notifyListeners();
    }
  }

  setFont(font: FontName): void {
    if (FONTS[font]) {
      this.preferences.font = font;
      this.savePreferences();
      this.applyPreferences();
      this.notifyListeners();
    }
  }

  setSize(size: FontSize): void {
    if (FONT_SIZES.includes(size)) {
      this.preferences.size = size;
      this.savePreferences();
      this.applyPreferences();
      this.notifyListeners();
    }
  }

  setLayout(layout: LayoutName): void {
    if (LAYOUT_ROUTES[layout]) {
      this.preferences.layout = layout;
      this.savePreferences();
      this.notifyListeners();
      // Navegar al layout (incluye el prefijo de despliegue)
      window.location.href = withBase(LAYOUT_ROUTES[layout]);
    }
  }

  // --------------------------------------------------------------------------
  // Getters
  // --------------------------------------------------------------------------
  getPreferences(): UserPreferences {
    return { ...this.preferences };
  }

  /**
   * Nombre del tema activo. La paleta vive en el CSS.
   */
  getTheme(): ThemeName {
    return this.preferences.theme;
  }

  // --------------------------------------------------------------------------
  // Observer pattern para componentes que necesiten reaccionar
  // --------------------------------------------------------------------------
  subscribe(listener: (prefs: UserPreferences) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getPreferences()));
  }

  // --------------------------------------------------------------------------
  // Generar HTML del theme selector
  // --------------------------------------------------------------------------
  static generateThemeSelectorHTML(currentLayout: LayoutName = 'vertical', prefs?: Partial<UserPreferences>): string {
    const p = { ...DEFAULT_PREFERENCES, ...prefs };
    // `currentLayout` define el layout activo de la página que renderiza el selector
    const activeLayout = prefs?.layout ?? currentLayout;

    const layoutOptions = Object.entries(LAYOUT_LABELS)
      .map(([value, label]) => `<option value="${value}" ${value === activeLayout ? 'selected' : ''}>${label}</option>`)
      .join('');

    const themeOptions = THEME_NAMES
      .map(key => `<option value="${key}" ${key === p.theme ? 'selected' : ''}>${key.charAt(0).toUpperCase() + key.slice(1)}</option>`)
      .join('');

    const fontOptions = Object.keys(FONTS)
      .map(key => `<option value="${key}" ${key === p.font ? 'selected' : ''}>${key.charAt(0).toUpperCase() + key.slice(1)}</option>`)
      .join('');

    const sizeOptions = FONT_SIZES
      .map(size => `<option value="${size}" ${size === p.size ? 'selected' : ''}>${size}px</option>`)
      .join('');

    return `
      <div class="theme-selector" role="group" aria-label="Personalización del CV">
        <label for="layout-select" class="theme-label">🎨 Layout:</label>
        <select id="layout-select" aria-label="Seleccionar layout">${layoutOptions}</select>

        <label for="theme-select" class="theme-label">🎨 Tema:</label>
        <select id="theme-select" aria-label="Seleccionar tema de color">${themeOptions}</select>

        <label for="font-select" class="theme-label">🔤 Fuente:</label>
        <select id="font-select" aria-label="Seleccionar fuente">${fontOptions}</select>

        <label for="size-select" class="theme-label">📏 Tamaño:</label>
        <select id="size-select" aria-label="Seleccionar tamaño de fuente">${sizeOptions}</select>

        <button type="button" id="print-btn" class="print-btn" aria-label="Imprimir/Guardar como PDF">🖨️ PDF</button>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // Agregar iconos a títulos de sección
  // --------------------------------------------------------------------------
  static addSectionIcons(): void {
    const icons: Record<string, string> = {
      'PERFIL PROFESIONAL': '👤',
      'EXPERIENCIA PROFESIONAL': '💼',
      'EDUCACIÓN': '🎓',
      'CERTIFICACIONES Y CURSOS': '📜',
      'COMPETENCIAS TÉCNICAS': '⚙️',
      'IDIOMAS': '🌍',
      'REFERENCIAS PROFESIONALES': '👥',
      'SOFT SKILLS': '🤝',
    };

    document.querySelectorAll('.cv-section-title, .main-section h2, .timeline-section h2, .sidebar-section h3').forEach(title => {
      const text = title.textContent?.trim().toUpperCase() || '';
      for (const [key, icon] of Object.entries(icons)) {
        if (text.includes(key)) {
          if (!title.textContent?.startsWith(icon)) {
            title.textContent = `${icon} ${title.textContent}`;
          }
          break;
        }
      }
    });
  }
}

// ============================================================================
// Auto-inicialización
// ============================================================================
let themeSwitcherInstance: ThemeSwitcher | null = null;

export function initThemeSwitcher(): ThemeSwitcher {
  if (!themeSwitcherInstance) {
    themeSwitcherInstance = new ThemeSwitcher();
    // Exponer globalmente para compatibilidad
    window.themeSwitcher = themeSwitcherInstance;
    window.changeLayout = (layout: LayoutName) => themeSwitcherInstance?.setLayout(layout);
    window.changeTheme = (theme: ThemeName) => themeSwitcherInstance?.setTheme(theme);
    window.changeFont = (font: FontName) => themeSwitcherInstance?.setFont(font);
    window.changeSize = (size: FontSize) => themeSwitcherInstance?.setSize(size);
  }
  return themeSwitcherInstance;
}

// Inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initThemeSwitcher();
      ThemeSwitcher.addSectionIcons();
    });
  } else {
    initThemeSwitcher();
    ThemeSwitcher.addSectionIcons();
  }
}

export default ThemeSwitcher;