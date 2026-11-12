/**
 * Theme Switcher - CV Principal
 * Funcionalidad compartida para todos los layouts
 * Maneja: temas de color, fuentes, tamaños, layout switching, impresión
 */

(function() {
  'use strict';

  // ==========================================================================
  // Configuración de Temas
  // ==========================================================================
  const THEMES = {
    blue: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      text: '#1f2937',
      lightText: '#6b7280',
      sectionBg: '#f9fafb',
      borderColor: '#e5e7eb',
      headerRadius: '0.5rem',
      sectionRadius: '0.5rem',
      printBg: 'white',
      printText: 'black',
      printBorder: '#2563eb'
    },
    green: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10b981',
      text: '#1f2937',
      lightText: '#6b7280',
      sectionBg: '#f0fdf4',
      borderColor: '#bbf7d0',
      headerRadius: '0.5rem',
      sectionRadius: '0.5rem',
      printBg: 'white',
      printText: 'black',
      printBorder: '#059669'
    },
    red: {
      primary: '#dc2626',
      secondary: '#b91c1c',
      accent: '#ef4444',
      text: '#1f2937',
      lightText: '#6b7280',
      sectionBg: '#fef2f2',
      borderColor: '#fecaca',
      headerRadius: '0.5rem',
      sectionRadius: '0.5rem',
      printBg: 'white',
      printText: 'black',
      printBorder: '#dc2626'
    },
    purple: {
      primary: '#7c3aed',
      secondary: '#6d28d9',
      accent: '#8b5cf6',
      text: '#1f2937',
      lightText: '#6b7280',
      sectionBg: '#faf5ff',
      borderColor: '#e9d5ff',
      headerRadius: '0.5rem',
      sectionRadius: '0.5rem',
      printBg: 'white',
      printText: 'black',
      printBorder: '#7c3aed'
    },
    gray: {
      primary: '#374151',
      secondary: '#1f2937',
      accent: '#4b5563',
      text: '#1f2937',
      lightText: '#6b7280',
      sectionBg: '#f3f4f6',
      borderColor: '#d1d5db',
      headerRadius: '0.5rem',
      sectionRadius: '0.5rem',
      printBg: 'white',
      printText: 'black',
      printBorder: '#374151'
    },
    dark: {
      primary: '#3b82f6',
      secondary: '#2563eb',
      accent: '#60a5fa',
      text: '#f9fafb',
      lightText: '#9ca3af',
      sectionBg: '#1f2937',
      borderColor: '#374151',
      headerRadius: '0.5rem',
      sectionRadius: '0.5rem',
      printBg: 'white',
      printText: 'black',
      printBorder: '#3b82f6'
    },
    modern: {
      primary: '#0891b2',
      secondary: '#0e7490',
      accent: '#06b6d4',
      text: '#1f2937',
      lightText: '#6b7280',
      sectionBg: '#ecfeff',
      borderColor: '#a5f3fc',
      headerRadius: '1rem',
      sectionRadius: '1rem',
      printBg: 'white',
      printText: 'black',
      printBorder: '#0891b2'
    },
    classic: {
      primary: '#1e3a8a',
      secondary: '#1e40af',
      accent: '#3b82f6',
      text: '#1f2937',
      lightText: '#6b7280',
      sectionBg: '#ffffff',
      borderColor: '#94a3b8',
      headerRadius: '0',
      sectionRadius: '0',
      printBg: 'white',
      printText: 'black',
      printBorder: '#1e3a8a'
    }
  };

  const FONTS = {
    inter: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    roboto: "'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    opensans: "'Open Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    lato: "'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    montserrat: "'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const LAYOUTS = {
    default: '/',
    classic: '/cv-classic.html',
    'two-column': '/cv-two-column.html',
    timeline: '/cv-timeline.html'
  };

  const LAYOUT_LABELS = {
    default: '📄 Vertical',
    classic: '📜 Clásico (Simple)',
    'two-column': '📊 Dos Columnas',
    timeline: '📅 Línea de Tiempo'
  };

  // ==========================================================================
  // Estado
  // ==========================================================================
  let currentTheme = 'blue';
  let currentFont = 'inter';
  let currentSize = '18';
  let currentLayout = 'default';

  // ==========================================================================
  // Utilidades DOM
  // ==========================================================================
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  function setCSSVars(vars) {
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }

  function getStored(key, defaultValue) {
    try {
      return localStorage.getItem(`cv_${key}`) || defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  function setStored(key, value) {
    try {
      localStorage.setItem(`cv_${key}`, value);
    } catch (e) {
      // localStorage no disponible (ej: modo privado)
    }
  }

  // ==========================================================================
  // Aplicar Tema
  // ==========================================================================
  function applyTheme(themeName) {
    const theme = THEMES[themeName] || THEMES.blue;
    currentTheme = themeName;

    // Aplicar variables CSS
    setCSSVars({
      'primary-color': theme.primary,
      'secondary-color': theme.secondary,
      'accent-color': theme.accent,
      'text-color': theme.text,
      'light-text': theme.lightText,
      'section-bg': theme.sectionBg,
      'border-color': theme.borderColor,
      'header-radius': theme.headerRadius,
      'section-radius': theme.sectionRadius,
      'print-bg': theme.printBg,
      'print-text': theme.printText,
      'print-border': theme.printBorder
    });

    // Actualizar atributo data-theme en documentElement para CSS
    document.documentElement.setAttribute('data-theme', themeName);

    // Actualizar select
    const themeSelect = $('#theme-select');
    if (themeSelect) themeSelect.value = themeName;

    setStored('theme', themeName);
  }

  // ==========================================================================
  // Aplicar Fuente
  // ==========================================================================
  function applyFont(fontName) {
    const font = FONTS[fontName] || FONTS.inter;
    currentFont = fontName;
    setCSSVars({ 'base-font-family': font });
    const fontSelect = $('#font-select');
    if (fontSelect) fontSelect.value = fontName;
    setStored('font', fontName);
  }

  // ==========================================================================
  // Aplicar Tamaño
  // ==========================================================================
  function applySize(size) {
    currentSize = size;
    setCSSVars({ 'base-font-size': size + 'px' });
    const sizeSelect = $('#size-select');
    if (sizeSelect) sizeSelect.value = size;
    setStored('size', size);
  }

  // ==========================================================================
  // Cambiar Layout
  // ==========================================================================
  function changeLayout(layout) {
    const url = LAYOUTS[layout];
    if (url) {
      currentLayout = layout;
      setStored('layout', layout);
      window.location.href = url;
    }
  }

  // ==========================================================================
  // Agregar Iconos a Títulos de Sección
  // ==========================================================================
  function addSectionIcons() {
    const icons = {
      'PERFIL PROFESIONAL': '👤',
      'EXPERIENCIA PROFESIONAL': '💼',
      'EDUCACIÓN': '🎓',
      'CERTIFICACIONES Y CURSOS': '📜',
      'COMPETENCIAS TÉCNICAS': '⚙️',
      'IDIOMAS': '🌍',
      'REFERENCIAS PROFESIONALES': '👥',
      'SOFT SKILLS': '🤝'
    };

    $$('.cv-section-title, .main-section h2, .timeline-section h2, .sidebar-section h3').forEach(title => {
      const text = title.textContent.trim().toUpperCase();
      for (const [key, icon] of Object.entries(icons)) {
        if (text.includes(key)) {
          if (!title.textContent.startsWith(icon)) {
            title.textContent = `${icon} ${title.textContent}`;
          }
          break;
        }
      }
    });
  }

  // ==========================================================================
  // Insertar Foto de Perfil (si no existe)
  // ==========================================================================
  function ensureProfilePhoto() {
    // Layout vertical/default
    const header = $('.cv-header');
    if (header && !header.querySelector('.cv-profile-photo')) {
      const photoHTML = `<img src="/images/profile.jpg" alt="Rolando Moises Quispe Mendoza" class="cv-profile-photo">`;
      header.insertAdjacentHTML('afterbegin', photoHTML);
    }

    // Layout classic
    const classicHeader = $('.layout-classic .cv-header');
    if (classicHeader && !classicHeader.querySelector('img')) {
      const photoHTML = `<img src="/images/profile.jpg" alt="Rolando Moises Quispe Mendoza" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary-color); margin-bottom: 1rem; display: block; margin-left: auto; margin-right: auto;">`;
      classicHeader.insertAdjacentHTML('afterbegin', photoHTML);
    }

    // Layout timeline
    const timelineHeader = $('.layout-timeline .header');
    if (timelineHeader && !timelineHeader.querySelector('.header-photo')) {
      const photoHTML = `<img src="/images/profile.jpg" alt="Rolando Moises Quispe Mendoza" class="header-photo">`;
      timelineHeader.insertAdjacentHTML('afterbegin', photoHTML);
    }

    // Layout two-column (sidebar)
    const sidebar = $('.layout-two-column .cv-sidebar');
    if (sidebar && !sidebar.querySelector('.sidebar-photo')) {
      const photoHTML = `<img src="/images/profile.jpg" alt="Rolando Moises Quispe Mendoza" class="sidebar-photo">`;
      sidebar.insertAdjacentHTML('afterbegin', photoHTML);
    }
  }

  // ==========================================================================
  // Crear Theme Selector HTML
  // ==========================================================================
  function createThemeSelectorHTML(layout = 'default') {
    const layoutOptions = Object.entries(LAYOUT_LABELS).map(([value, label]) =>
      `<option value="${value}" ${value === currentLayout ? 'selected' : ''}>${label}</option>`
    ).join('');

    const themeOptions = Object.keys(THEMES).map(key =>
      `<option value="${key}" ${key === currentTheme ? 'selected' : ''}>${key.charAt(0).toUpperCase() + key.slice(1)}</option>`
    ).join('');

    const fontOptions = Object.keys(FONTS).map(key =>
      `<option value="${key}" ${key === currentFont ? 'selected' : ''}>${key.charAt(0).toUpperCase() + key.slice(1)}</option>`
    ).join('');

    const sizeOptions = ['14', '16', '18', '20', '22'].map(size =>
      `<option value="${size}" ${size === currentSize ? 'selected' : ''}>${size}px</option>`
    ).join('');

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

  // ==========================================================================
  // Insertar Theme Selector en el Layout Actual
  // ==========================================================================
  function insertThemeSelector() {
    const layoutClass = document.body.classList.contains('layout-classic') ? 'classic' :
                       document.body.classList.contains('layout-two-column') ? 'two-column' :
                       document.body.classList.contains('layout-timeline') ? 'timeline' : 'default';

    // Layout vertical/default
    const header = $('.cv-header:not(.layout-classic .cv-header):not(.layout-timeline .header)');
    if (header && layoutClass === 'default') {
      const existing = header.querySelector('.theme-selector');
      if (!existing) {
        header.insertAdjacentHTML('beforeend', createThemeSelectorHTML('default'));
      }
    }

    // Layout classic
    const classicHeader = $('.layout-classic .cv-header');
    if (classicHeader && layoutClass === 'classic') {
      const existing = classicHeader.querySelector('.theme-selector');
      if (!existing) {
        classicHeader.insertAdjacentHTML('beforeend', createThemeSelectorHTML('classic'));
      }
    }

    // Layout timeline
    const timelineHeader = $('.layout-timeline .header');
    if (timelineHeader && layoutClass === 'timeline') {
      const existing = timelineHeader.querySelector('.theme-selector');
      if (!existing) {
        timelineHeader.insertAdjacentHTML('beforeend', createThemeSelectorHTML('timeline'));
      }
    }

    // Layout two-column (sidebar)
    const sidebar = $('.layout-two-column .cv-sidebar');
    if (sidebar && layoutClass === 'two-column') {
      const existing = sidebar.querySelector('.theme-selector');
      if (!existing) {
        sidebar.insertAdjacentHTML('afterbegin', createThemeSelectorHTML('two-column'));
      }
    }

    // Bind events después de insertar
    bindThemeSelectorEvents();
  }

  // ==========================================================================
  // Bind Events
  // ==========================================================================
  function bindThemeSelectorEvents() {
    // Layout select
    $('#layout-select')?.addEventListener('change', (e) => changeLayout(e.target.value));

    // Theme select
    $('#theme-select')?.addEventListener('change', (e) => applyTheme(e.target.value));

    // Font select
    $('#font-select')?.addEventListener('change', (e) => applyFont(e.target.value));

    // Size select
    $('#size-select')?.addEventListener('change', (e) => applySize(e.target.value));

    // Print button
    $('#print-btn')?.addEventListener('click', () => window.print());
  }

  // ==========================================================================
  // Inicialización
  // ==========================================================================
  function init() {
    // Cargar preferencias guardadas
    currentTheme = getStored('theme', 'blue');
    currentFont = getStored('font', 'inter');
    currentSize = getStored('size', '18');
    currentLayout = getStored('layout', 'default');

    // Detectar layout actual
    if (document.body.classList.contains('layout-classic')) currentLayout = 'classic';
    else if (document.body.classList.contains('layout-two-column')) currentLayout = 'two-column';
    else if (document.body.classList.contains('layout-timeline')) currentLayout = 'timeline';

    // Aplicar preferencias
    applyTheme(currentTheme);
    applyFont(currentFont);
    applySize(currentSize);

    // Setup DOM
    ensureProfilePhoto();
    addSectionIcons();
    insertThemeSelector();

    // Exponer funciones globalmente para compatibilidad
    window.changeLayout = changeLayout;
    window.changeTheme = applyTheme;
    window.changeFont = applyFont;
    window.changeSize = applySize;
  }

  // ==========================================================================
  // Auto-inicializar cuando el DOM esté listo
  // ==========================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();