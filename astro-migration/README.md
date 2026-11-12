# CV Astro - Migración Moderna

Versión moderna del CV profesional usando **Astro 4.x** con TypeScript, arquitectura base + overlays, y 4 layouts interactivos.

## 🚀 Características

- **Astro 4.x** - Static site generation óptimo
- **TypeScript strict** - Tipado completo
- **Arquitectura Base + Overlays** - 85% menos duplicación
- **4 Layouts** - Vertical, Clásico, Dos Columnas, Timeline
- **8 Temas de color** - Azul, Verde, Rojo, Púrpura, Gris, Oscuro, Moderno, Clásico
- **5 Fuentes** - Inter, Roboto, Open Sans, Lato, Montserrat
- **6 Tamaños** - 14px a 22px
- **Persistencia localStorage** - Preferencias guardadas
- **Print/PDF optimizado** - Estilos de impresión profesionales
- **Responsive** - Mobile-first
- **Accesibilidad** - Skip links, focus-visible, ARIA

## 📁 Estructura

```
cv-astro/
├── src/
│   ├── components/        # Header, Section, Sidebar, SkillsGrid
│   ├── layouts/           # Layout base
│   ├── pages/             # 4 layouts como páginas
│   │   ├── index.astro              # Vertical (default)
│   │   ├── classic/index.astro      # Clásico
│   │   ├── two-column/index.astro   # Dos Columnas
│   │   └── timeline/index.astro     # Línea de Tiempo
│   ├── styles/
│   │   └── global.css      # CSS unificado con variables
│   ├── scripts/
│   │   └── theme-switcher.ts # Theme switcher TypeScript
│   ├── data/
│   │   ├── site.ts         # Configuración del sitio
│   │   ├── cv-base.ts      # Datos base (común)
│   │   ├── overlays/       # Overlays por versión
│   │   ├── merge.ts        # Utilidad de merge
│   │   └── version.ts      # Resuelve la versión a compilar
│   └── types/
│       └── cv.ts           # TypeScript types
├── public/
│   ├── images/             # profile.jpg, favicon.ico
│   ├── favicon.svg         # Favicon moderno
│   ├── apple-touch-icon.png
│   └── manifest.json       # PWA manifest
├── scripts/
│   └── build-all-versions.js # Build multi-version
├── astro.config.mjs
├── eslint.config.js        # ESLint 9 (flat config)
├── tsconfig.json
└── package.json
```

## 🛠️ Instalación

```bash
cd astro-migration
npm install
```

## 🏃 Desarrollo

```bash
# Servidor de desarrollo → http://localhost:4321/
npm run dev

# Verifica tipos
npm run check

# Lint
npm run lint
```

### Rutas disponibles

| Ruta            | Layout                                  |
|-----------------|-----------------------------------------|
| `/`             | Vertical (por defecto)                  |
| `/classic/`     | Clásico                                 |
| `/two-column/`  | Dos columnas                            |
| `/timeline/`    | Línea de tiempo                         |

### Variables de entorno

| Variable           | Por defecto                            | Uso                                            |
|--------------------|----------------------------------------|------------------------------------------------|
| `CV_VERSION`       | `fullstack`                            | Versión del CV a compilar                     |
| `PUBLIC_CV_VERSION`| —                                      | Alternativa a `CV_VERSION` desde el entorno    |
| `SITE_URL`         | `https://roleitor.github.io/cv-plantilla` | URL canónica del sitio                      |
| `BASE_PATH`        | `/` (dev) · `/cv-plantilla` (producción) | Prefijo de las rutas y assets                 |
| `DEFAULT_LOCALE`   | `es`                                   | Idioma por defecto del sitio                  |

Para probar otra versión en desarrollo:

```bash
CV_VERSION=arquitectura npm run dev
```

## 🔨 Build

```bash
# Build versión por defecto (fullstack)
npm run build

# Build TODAS las versiones (para GitHub Pages)
npm run build:all
```

Genera:
```
astro-dist/                     ← Default (fullstack)
astro-dist/versions.html        ← Índice con los enlaces a cada versión
astro-dist/fullstack/           ← Full Stack
astro-dist/arquitectura/        ← Arquitectura
astro-dist/angular_backend/     ← Angular & Backend
astro-dist/institucion_publica/ ← Institución Pública
```

> `build:all` compila cada versión por separado (porque Astro vacía `outDir` en
> cada build) y solo después copia los resultados a `astro-dist/`.

## 🎨 Personalización

### Temas (8)
- `blue` (default), `green`, `red`, `purple`, `gray`, `dark`, `modern`, `classic`

### Fuentes (5)
- `inter`, `roboto`, `opensans`, `lato`, `montserrat`

### Tamaños (6)
- `14`, `16`, `18`, `20`, `22` px

### Layouts (4)
- `vertical` (default), `classic`, `two-column`, `timeline`

## 📦 Versiones de CV (4)

| Versión | Enfoque | Archivo Overlay |
|---------|---------|-----------------|
| `fullstack` | Completa | `fullstack.ts` (vacío = base) |
| `arquitectura` | Arquitectura, K8s, DevOps, Liderazgo | `arquitectura.ts` |
| `angular_backend` | Angular, TypeScript, Java, .NET | `angular_backend.ts` |
| `institucion_publica` | Sector público, CENCAP, EGGP | `institucion_publica.ts` |

### Agregar nueva versión
1. Crear `src/data/overlays/nueva.ts`
2. Agregar a `src/data/overlays/index.ts`
3. ¡Listo! Funciona automáticamente

## 🔧 Configuración del Sitio

Editar `src/data/site.ts`:
```typescript
export const siteConfig: SiteConfig = {
  title: 'Tu Nombre',
  lang: 'es',                     // Idioma por defecto del documento
  email: 'tu@email.com',
  phone: '+591 XXXXXXXX',
  address: 'Tu Ciudad, País',
  department: 'Tu Cargo',
  affiliation: 'Tu Organización',
  linkedin: 'tu-linkedin',
  github: 'tu-github',
  // ...
};
```

El idioma se define en un único sitio:
- `src/data/site.ts` → `lang` (atributo `<html lang>` y `og:locale`)
- `astro.config.mjs` → `i18n.defaultLocale` (por defecto `es`)

## 📝 Datos del CV

Editar `src/data/cv-base.ts` para datos comunes a todas las versiones.
Editar overlays en `src/data/overlays/` para diferencias por versión.

## 🚀 Deploy GitHub Pages

El workflow `.github/workflows/ci.yml`:
1. Valida TypeScript + lint
2. Build todas las versiones
3. Deploy a `astro-dist/` en GitHub Pages

Configurar en repo: **Settings > Pages > Source: GitHub Actions**

## 🔄 Migración desde Jekyll

| Jekyll | Astro |
|--------|-------|
| `_data/cv_base.yml` | `src/data/cv-base.ts` |
| `_data/*_overlay.yml` | `src/data/overlays/*.ts` |
| `_layouts/*.html` | `src/pages/**/*.astro` |
| `_includes/*.html` | `src/components/*.astro` |
| `_assets/css/main.css` | `src/styles/global.css` |
| `_assets/js/theme-switcher.js` | `src/scripts/theme-switcher.ts` |
| `cambiar-version.sh` | `npm run build:all` |
| `merge_cv.rb` | `src/data/merge.ts` |

## 📄 Licencia

MIT - Basado en Harvard-Style CV Theme