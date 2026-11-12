# Plantillas, Temas e Impresión — Plan de Implementación

> **Para agentes ejecutores:** SUB-SKILL REQUERIDA: usar `superpowers:subagent-driven-development`
> (recomendado) o `superpowers:executing-plans` para implementar este plan tarea por tarea.
> Los pasos usan casillas (`- [ ]`) para el seguimiento.

**Objetivo:** 8 plantillas de CV con diseño propio, 10 temas de color sin duplicación y una impresión formal en A4 de ~3 páginas (hoy son 25).

**Arquitectura:** `global.css` queda con tokens, base y el sistema de impresión; cada plantilla tiene su CSS en `src/styles/templates/` y su página importa solo el suyo. Los temas pasan a tener el CSS como única fuente de verdad: `types/cv.ts` conserva solo los nombres tipados y el JS se limita a poner `data-theme` en `<html>`.

**Stack:** Astro 4.16, TypeScript 5.6, CSS custom properties, Vite. Sin dependencias nuevas.

**Spec:** `docs/superpowers/specs/2026-11-12-plantillas-temas-impresion-design.md`

---

## Restricciones globales

- Node ≥ 20. `cd astro-migration` para todos los comandos npm.
- Astro **4.16**: `i18n.routing` es un **objeto**, no el literal `'prefix-other-locales'` (Astro 5).
- `import.meta.env.BASE_URL` **no** trae barra final. Usar siempre `withBase()` de `src/utils/url.ts`.
- Los tamaños en `rem` escalan con `--base-font-size`, NO con `body { font-size }`.
- Un `!important` en una hoja de estilos gana a un estilo inline normal → es la forma de forzar el tamaño de impresión frente al que inyecta el JS.
- El emoji **no** puede vivir en el DOM (rompe los parsers ATS). Todos los iconos van en `::before` de CSS.
- `npm run check`, `npm run lint` y `npm run build` deben quedar en 0 errores antes de cada commit.
- Nada de emoji en el texto del CV; los iconos son decorativos.
- Idioma por defecto: español (`src/data/site.ts` → `lang: 'es'`, `astro.config.mjs` → `i18n.defaultLocale`).

## Foco de revisión

- **Cambio de plantilla dentro de una versión del CV**: `/arquitectura/` → `/classic/` debe seguir en `/arquitectura/`, no caer a la build `fullstack` de la raíz.
- **`/ats/` no puede contener ni un emoji en el DOM**, ni siquiera los títulos de sección que el cliente inyectaba en runtime.
- **Impresión a 2 columnas**: el grid debe sobrevivir al `display: block` que el CSS de impresión aplicaba; si no, el sidebar se apila y el CV se parte en dos.
- **Secciones que se parten entre páginas**: una sección puede partirse; una *entrada* no (`break-inside: avoid` en la entrada, nunca en la sección).
- **Selector de tema en `/minimal/` y `/compacto/`**: sin bloque de cabecera, la barra debe seguir siendo accesible (fija, plegable) y nunca imprimirse.

---

## Mapa de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `astro-migration/src/styles/global.css` | Reescribir | Tokens `:root`, 10 bloques `[data-theme]`, reset, base, utilidades, iconos `::before`, sistema de impresión común |
| `astro-migration/src/styles/templates/vertical.css` | Crear | Layout vertical (hojo de `global.css`) |
| `astro-migration/src/styles/templates/classic.css` | Crear | Layout formal Harvard (hojo de `global.css`) |
| `astro-migration/src/styles/templates/two-column.css` | Crear | Layout dos columnas (hojo de `global.css`) |
| `astro-migration/src/styles/templates/timeline.css` | Crear | Layout línea de tiempo (hojo de `global.css`) |
| `astro-migration/src/styles/templates/ats.css` | Crear | Layout ATS |
| `astro-migration/src/styles/templates/ejecutivo.css` | Crear | Layout ejecutivo |
| `astro-migration/src/styles/templates/minimal.css` | Crear | Layout minimal |
| `astro-migration/src/styles/templates/compacto.css` | Crear | Layout compacto |
| `astro-migration/src/types/templates.ts` | Crear | `TemplateName`, `TemplateMeta`, `TEMPLATE_REGISTRY` (única fuente de las rutas y etiquetas) |
| `astro-migration/src/data/sections.ts` | Crear | `filterSections(sections, template)` |
| `astro-migration/src/components/Toolbar.astro` | Crear | Barra de personalización (tema/fuente/tamaño/PDF) |
| `astro-migration/src/components/FormalHeader.astro` | Crear | Cabecera formal centrada con filetes |
| `astro-migration/src/components/Header.astro` | Modificar | Quitar emojis del markup y la barra embebida |
| `astro-migration/src/components/Sidebar.astro` | Modificar | Quitar emojis del markup; prop `variant` |
| `astro-migration/src/components/Section.astro` | Modificar | Prop `variant` ampliada; quitar emoji del markup |
| `astro-migration/src/scripts/theme-switcher.ts` | Modificar | Solo `data-theme` + fuente + tamaño; sin paletas; sin `addSectionIcons` |
| `astro-migration/src/types/cv.ts` | Modificar | `ThemeName` (10), `THEME_NAMES`, quitar `THEMES`/`ThemeConfig`/`LAYOUT_LABELS`/`LAYOUT_ROUTES` |
| `astro-migration/src/layouts/BaseLayout.astro` | Modificar | `data-cv-version`, `data-template`, SEO |
| `astro-migration/src/pages/index.astro` | Modificar | Importar `vertical.css` |
| `astro-migration/src/pages/classic/index.astro` | Reescribir | `FormalHeader` + `classic.css` |
| `astro-migration/src/pages/two-column/index.astro` | Modificar | Importar `two-column.css` |
| `astro-migration/src/pages/timeline/index.astro` | Modificar | Importar `timeline.css` |
| `astro-migration/src/pages/ats/index.astro` | Crear | Layout ATS |
| `astro-migration/src/pages/ejecutivo/index.astro` | Crear | Layout ejecutivo |
| `astro-migration/src/pages/minimal/index.astro` | Crear | Layout minimal |
| `astro-migration/src/pages/compacto/index.astro` | Crear | Layout compacto |
| `astro-migration/scripts/verify-templates.mjs` | Crear | Harness de verificación (tests) |
| `astro-migration/scripts/print-pdfs.mjs` | Crear | Genera los PDF de las 8 plantillas |
| `astro-migration/package.json` | Modificar | Scripts `verify` y `print:pdfs` |
| `astro-migration/README.md` | Modificar | 8 plantillas, 10 temas, impresión |

---

### Task 1: Harness de verificación

Es la base: todas las tareas siguientes se validan con él.

**Files:**
- Create: `astro-migration/scripts/verify-templates.mjs`
- Modify: `astro-migration/package.json` (scripts)

**Interfaces:**
- Consumes: `astro-migration/dist/` (salida de `npm run build`), `node:child_process`, `node:fs`.
- Produces: `verifyTemplates(options?)` → `Promise<Report>` exportado desde el script; y el script es ejecutable con `node scripts/verify-templates.mjs` (sale con código 1 si algún check falla).

- [ ] **Step 1: Escribir el runner de aserciones fallando**

Crear `astro-migration/scripts/verify-templates.mjs` con:

```js
export const TEMPLATES = ['vertical', 'classic', 'two-column', 'timeline', 'ats', 'ejecutivo', 'minimal', 'compacto'];
export const ROUTES = { vertical: '', classic: 'classic/', 'two-column': 'two-column/', timeline: 'timeline/', ats: 'ats/', ejecutivo: 'ejecutivo/', minimal: 'minimal/', compacto: 'compacto/' };
```

`assert(cond, mensaje)` que acumula fallos en un array `failures` en vez de lanzar, para reportar todo de una vez. `checkPageCount(html, max)` no: el conteo de páginas es del PDF, va aparte.

- [ ] **Step 2: Implementar los checks**

Funciones exportadas, todas devuelven `{ ok, mensaje }`:

- `checkRoute(distDir, route)` → el HTML existe en `dist/<route>/index.html` (o `dist/index.html` si route es `''`).
- `checkNoEmoji(html)` → ninguna coincidencia de `/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u` en el HTML.
- `checkContains(html, needle)` → el HTML contiene la cadena.
- `checkPageCount(pdfPath, max)` → cuenta páginas leyendo `/Type /Page` en el PDF (excluir `/Pages`) y compara con `max`.

- [ ] **Step 3: Implementar la generación de PDF**

`renderPdf(url, outPath)`: invocar `google-chrome` (o `chromium`/`chromium-browser`) con `--headless --disable-gpu --no-sandbox --no-pdf-header-footer --print-to-pdf=<outPath> <url>`. Detectar el binario con `existsSync` sobre una lista de rutas; si no existe, `renderPdf` devuelve `{ ok: false, mensaje: 'Chrome no encontrado' }` y los checks de páginas se saltan con un aviso, **no** con un fallo.

Servir `dist/` en `http://127.0.0.1:<puerto>` con `http.createServer` de Node (sin dependencias) antes de renderizar.

- [ ] **Step 4: El runner principal**

Ejecuta, en orden: los 8 checks de ruta, `checkNoEmoji` sobre `/ats/`, y para cada plantilla un `checkPageCount` con estos máximos: `vertical` 4, `classic` 4, `two-column` 4, `timeline` 4, `ats` 4, `ejecutivo` 4, `minimal` 4, `compacto` 2.

Imprime un resumen `✓`/`✗` por check y sale con código 1 si hay fallos.

- [ ] **Step 5: Registrar el script**

En `astro-migration/package.json`:
```json
"verify": "npm run build && node scripts/verify-templates.mjs"
```

- [ ] **Step 6: Ejecutar y confirmar que falla (todavía no hay `ats/`)**

Run: `cd astro-migration && npm run verify`
Expected: FALLA — las rutas `ats/`, `ejecutivo/`, `minimal/`, `compacto/` no existen todavía, y `/ats/` no se puede comprobar.

- [ ] **Step 7: Commit**

```bash
git add astro-migration/scripts/verify-templates.mjs astro-migration/package.json
git commit -m "test: add template verification harness"
```

---

### Task 2: Temas — CSS como única fuente de verdad

**Files:**
- Modify: `astro-migration/src/styles/global.css` (bloques `:root` y `[data-theme]`)
- Modify: `astro-migration/src/types/cv.ts`
- Modify: `astro-migration/src/scripts/theme-switcher.ts`

**Interfaces:**
- Produces: `ThemeName` (unión de 10 literales), `THEME_NAMES: ThemeName[]` en `src/types/cv.ts`.
- Produces: `ThemeSwitcher.generateThemeSelectorHTML(currentLayout, prefs)` sigue con la misma firma; ahora las `<option>` de tema salen de `THEME_NAMES`.

- [ ] **Step 1: Ampliar `ThemeName` y crear `THEME_NAMES`**

En `src/types/cv.ts`: añadir `'navy'` y `'monochrome'` a la unión `ThemeName`. Añadir:

```ts
export const THEME_NAMES: ThemeName[] = ['blue', 'green', 'red', 'purple', 'gray', 'dark', 'modern', 'classic', 'navy', 'monochrome'];
```

- [ ] **Step 2: Eliminar la duplicación en `types/cv.ts`**

Borrar la interfaz `ThemeConfig` y la constante `THEMES`. Comprobar con `grep -n "THEMES\b" src/types/cv.ts` que no queda ninguna referencia.

- [ ] **Step 3: Reescribir los tokens en `global.css`**

`:root` mantiene sus 20 variables actuales tal cual (valores existentes, verbatim). Cada bloque `[data-theme="x"]` pasa a definir las **16** variables de paleta:

`--primary-color`, `--secondary-color`, `--accent-color`, `--text-color`, `--light-text`, `--bg-color`, `--section-bg`, `--border-color`, `--header-radius`, `--section-radius`, `--print-bg`, `--print-text`, `--print-border`, `--sidebar-bg`, `--sidebar-text`.

Para los 8 temas existentes: copiar los valores actuales **verbatim** desde los bloques `[data-theme]` actuales de `global.css`, y para `--sidebar-bg` / `--sidebar-text` usar `#1f2937` / `#f9fafb` (el valor de `:root`), salvo `dark` que usa `#1f2937` / `#f9fafb` igual.

Para `navy` (nuevo), usar exactamente:

```css
[data-theme="navy"] {
  --primary-color: #1e3a5f;
  --secondary-color: #152a45;
  --accent-color: #3f6ea5;
  --text-color: #1f2937;
  --light-text: #6b7280;
  --bg-color: #ffffff;
  --section-bg: #f6f8fa;
  --border-color: #d5dde5;
  --header-radius: 0.25rem;
  --section-radius: 0.25rem;
  --print-bg: white;
  --print-text: black;
  --print-border: #1e3a5f;
  --sidebar-bg: #1e3a5f;
  --sidebar-text: #ffffff;
}
```

Para `monochrome` (nuevo), usar exactamente:

```css
[data-theme="monochrome"] {
  --primary-color: #111111;
  --secondary-color: #333333;
  --accent-color: #555555;
  --text-color: #111111;
  --light-text: #666666;
  --bg-color: #ffffff;
  --section-bg: #f5f5f5;
  --border-color: #d0d0d0;
  --header-radius: 0;
  --section-radius: 0;
  --print-bg: white;
  --print-text: black;
  --print-border: #111111;
  --sidebar-bg: #f5f5f5;
  --sidebar-text: #111111;
}
```

- [ ] **Step 4: Simplificar `theme-switcher.ts`**

Borrar `CSS_VAR_MAP`, `THEMES_CONFIG` (ya no existe) y el import de `THEMES`. En `applyPreferences()`, sustituir el bucle que escribe variables de color por una sola línea:

```ts
root.setAttribute('data-theme', this.preferences.theme);
```

Mantener la escritura de `--base-font-family` y `--base-font-size`. `getThemeConfig()` debe dejar de devolver la paleta: cambiarlo a `getTheme(): ThemeName` que devuelve `this.preferences.theme`.

En `generateThemeSelectorHTML`, las opciones de tema se generan desde `THEME_NAMES` (importado de `@/types/cv`).

- [ ] **Step 5: Verificar que no queda duplicación**

Run: `grep -nE "#[0-9a-fA-F]{3,6}" astro-migration/src/types/cv.ts`
Expected: sin salida (0 coincidencias).

Run: `cd astro-migration && npm run check && npm run lint && npm run build`
Expected: 0 errores; el build genera 4 páginas (todavía no hay las nuevas).

- [ ] **Step 6: Comprobar en el navegador que el tema cambia**

Run: `cd astro-migration && npm run dev` y luego abrir `http://127.0.0.1:4321/`, cambiar el selector de tema a `navy` y a `monochrome`.
Expected: el color de la cabecera cambia a azul marino (#1e3a5f) y a gris/negro respectivamente.

- [ ] **Step 7: Commit**

```bash
git add astro-migration/src/types/cv.ts astro-migration/src/scripts/theme-switcher.ts astro-migration/src/styles/global.css
git commit -m "refactor: make CSS the single source of truth for themes"
```

---

### Task 3: Sistema de impresión global

**Files:**
- Modify: `astro-migration/src/styles/global.css`

**Interfaces:**
- Consumes: las variables de la Task 2.
- Produces: reglas `@media print` comunes a todas las plantillas.

- [ ] **Step 1: Escribir el bloque `@page`**

Al principio de la sección de impresión:

```css
@page {
  size: A4;
  margin: 14mm;
}
```

- [ ] **Step 2: Reescribir las reglas base de impresión**

Sustituir el bloque `@media print` actual por uno que:

- fije `html { font-size: 10.5pt !important; --base-font-size: 10.5pt !important; }` — esto es lo que escala de verdad todos los tamaños en `rem`;
- fije `body { line-height: 1.45 !important; color: #000 !important; background: #fff !important; padding: 0 !important; margin: 0 !important; }`;
- desactive animaciones y transiciones: `*, *::before, *::after { animation: none !important; transition: none !important; }`;
- aplique `h1, h2, h3 { break-after: avoid; page-break-after: avoid; }` y `p, li { orphans: 3; widows: 3; }`;
- aplique `break-inside: avoid; page-break-inside: avoid;` a `.cv-entry`, `.entry` y `.timeline-item` (las entradas), y **NO** a `.cv-section` — quitar explícitamente el `page-break-inside: avoid` que hoy tienen las secciones;
- ponga `break-inside: auto; page-break-inside: auto;` en `.cv-section`;
- oculte `.theme-selector`, `.print-btn` y `.cv-socials`, y muestre `.cv-socials-print`;
- elimine el `display: block !important` de `.layout-two-column .cv-container` que hoy destruye el grid en impresión.

- [ ] **Step 3: Verificar el descenso de páginas**

Run: `cd astro-migration && npm run build && node scripts/verify-templates.mjs`
Expected: el PDF de `vertical` pasa de 25 páginas a **≤ 4**.

Si sigue por encima de 4, el siguiente ajuste es `html { font-size: 10pt !important; --base-font-size: 10pt !important; }` en el bloque de impresión. No bajar de 10pt.

- [ ] **Step 4: Commit**

```bash
git add astro-migration/src/styles/global.css
git commit -m "fix: correct print typography and pagination (25 pages -> ~3)"
```

---

### Task 4: Extraer las 4 plantillas existentes a `src/styles/templates/`

**Files:**
- Create: `astro-migration/src/styles/templates/vertical.css`, `two-column.css`, `timeline.css`, `classic.css`
- Modify: `astro-migration/src/styles/global.css`, las 4 páginas existentes

**Interfaces:**
- Produce: `src/types/templates.ts` con

```ts
export type TemplateName = 'vertical' | 'classic' | 'two-column' | 'timeline' | 'ats' | 'ejecutivo' | 'minimal' | 'compacto';
export interface TemplateMeta { label: string; route: string; }
export const TEMPLATE_REGISTRY: Record<TemplateName, TemplateMeta>;
```

con las rutas: `vertical` → `/`, `classic` → `/classic/`, `two-column` → `/two-column/`, `timeline` → `/timeline/`, `ats` → `/ats/`, `ejecutivo` → `/ejecutivo/`, `minimal` → `/minimal/`, `compacto` → `/compacto/`.

**Este registro es la única fuente de verdad de rutas y etiquetas.** `LAYOUT_LABELS` y `LAYOUT_ROUTES` de `src/types/cv.ts` se eliminan y se sustituyen por `TEMPLATE_REGISTRY`; `theme-switcher.ts` pasa a leer de ahí. `src/types/cv.ts` reexporta `TemplateName`/`TemplateMeta`/`TEMPLATE_REGISTRY` y redefine `LayoutName` como alias de `TemplateName` para no romper las props existentes.

- [ ] **Step 1: Crear `src/types/templates.ts`**

Como se indica arriba, con las 8 entradas y las etiquetas:
`vertical` "📄 Vertical", `classic` "📜 Clásico", `two-column` "📊 Dos Columnas", `timeline` "📅 Línea de Tiempo", `ats` "🤖 ATS", `ejecutivo` "💼 Ejecutivo", `minimal` "◻️ Minimal", `compacto` "📐 Compacto".

Luego, en `src/types/cv.ts`: borrar `LAYOUT_LABELS` y `LAYOUT_ROUTES`, cambiar `export type LayoutName = ...` por `export type LayoutName = TemplateName;`, y añadir `export type { TemplateName, TemplateMeta }; export { TEMPLATE_REGISTRY };` importando desde `./templates`.

- [ ] **Step 2: Actualizar `theme-switcher.ts` para usar `TEMPLATE_REGISTRY`**

Las `<option>` del selector de layout salen de `Object.entries(TEMPLATE_REGISTRY)`; la navegación usa `TEMPLATE_REGISTRY[layout].route`. Eliminar los imports de `LAYOUT_LABELS` y `LAYOUT_ROUTES`.

- [ ] **Step 3: Mover los estilos por plantilla fuera de `global.css`**

Mover a `src/styles/templates/vertical.css` todo lo que hoy está en `global.css` bajo `.layout-classic`, `.cv-header`, `.cv-profile-photo`, `.cv-header-content`, `.cv-name`, `.cv-contact`, `.cv-affiliation`, `.cv-socials`, `.cv-social-icon`, `.cv-socials-print`, `.cv-section`, `.cv-section-title`, `.cv-section-rule`, `.cv-entry*`, `.theme-selector`, `.print-btn`.

Mover a `two-column.css` todo lo `.layout-two-column *`. A `timeline.css` todo lo `.layout-timeline *`.

`classic.css` se crea en la Task 5 (el `/classic/` se rediseña).

`global.css` conserva: `@import` de Google Fonts, `:root`, los `[data-theme]`, `html`/`body`, el reset y los estilos base compartidos.

- [ ] **Step 4: Vincular el CSS en cada página**

Añadir el import en el frontmatter de cada página:
- `src/pages/index.astro` → `import '../styles/templates/vertical.css';`
- `src/pages/two-column/index.astro` → `import '../../styles/templates/two-column.css';`
- `src/pages/timeline/index.astro` → `import '../../styles/templates/timeline.css';`

- [ ] **Step 5: Verificar que el render no cambió**

Run: `cd astro-migration && npm run build && node scripts/verify-templates.mjs`
Expected: las 4 plantillas existentes se siguen generando y el PDF de `vertical` sigue en ≤ 4 páginas.

- [ ] **Step 6: Commit**

```bash
git add astro-migration/src/styles astro-migration/src/pages astro-migration/src/types
git commit -m "refactor: split per-template styles into src/styles/templates"
```

---

### Task 5: `/classic/` — diseño formal Harvard

**Files:**
- Create: `astro-migration/src/styles/templates/classic.css`
- Create: `astro-migration/src/components/FormalHeader.astro`
- Modify: `astro-migration/src/pages/classic/index.astro`

**Interfaces:**
- Consumes: `TEMPLATE_REGISTRY`, `generateCV`, `siteConfig`, `Section.astro`.
- Produces: `FormalHeader` con props `{ site: SiteConfig; version: CVVersion }`.

- [ ] **Step 1: Crear `FormalHeader.astro`**

Estructura exacta, sin emojis en el markup y con la foto **pequeña** a la derecha del nombre:

```
<header class="cv-formal-header">
  <img src={site.about_profile_image} alt={site.title} class="cv-formal-photo" />
  <h1 class="cv-formal-name">{site.title}</h1>
  <p class="cv-formal-role">{site.department}</p>
  <div class="cv-formal-rule"></div>
  <div class="cv-formal-contact">
    <span>{site.address}</span>
    <span>{site.phone}</span>
    <a href="mailto:{site.email}">{site.email}</a>
    <a href="https://linkedin.com/in/{site.linkedin}">linkedin.com/in/{site.linkedin}</a>
    <a href="https://github.com/{site.github}">github.com/{site.github}</a>
  </div>
  <div class="cv-formal-rule"></div>
</header>
```

Los `<span>` de contacto se separan con `·` vía CSS (`.cv-formal-contact > * + *::before { content: "·"; }`).
La foto va en `float: right` con 64px y un borde circular; en impresión baja a 56px.

- [ ] **Step 2: Crear `classic.css`**

Reglas:

- `.layout-classic` fuerza una sola columna: `max-width: 19cm; margin: 0 auto;`
- `.cv-formal-header { text-align: center; margin-bottom: 1.5rem; }`
- `.cv-formal-photo { float: right; width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color); margin-left: 1rem; }`
- `.cv-formal-name { font-family: var(--heading-font-family); font-size: 1.8rem; letter-spacing: 0.04em; text-transform: uppercase; }`
- `.cv-formal-role { font-size: 1rem; color: var(--light-text); }`
- `.cv-formal-rule { border-top: 1px solid var(--border-color); margin: 0.6rem 0; }`
- `.cv-formal-contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 0 0.4rem; font-size: 0.85rem; }`
- `.cv-section` **sin caja**: `background: none; border: 0; box-shadow: none; padding: 0 0 1.2rem;`
- `.cv-section-title { font-family: var(--heading-font-family); font-size: 1.05rem; text-transform: uppercase; letter-spacing: 0.12em; border-bottom: 1px solid var(--primary-color); padding-bottom: 0.3rem; }`
- `.cv-section-rule { display: none; }`
- `.cv-entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }`
- `.cv-entry-dates { white-space: nowrap; font-size: 0.85rem; color: var(--light-text); }`
- `.cv-entry-bullets li::before { content: "•"; }` (viñeta plana, sin icono)

En impresión: `.cv-formal-name { font-size: 15pt; }`, `.cv-section-title { font-size: 10pt; }`, `.cv-section { break-inside: auto; }`, `.cv-entry { break-inside: avoid; }`.

- [ ] **Step 3: Reescribir `src/pages/classic/index.astro`**

Usar `BaseLayout` con `layoutClass="layout-classic"`, renderizar `<FormalHeader site={siteConfig} version={version} />` y luego `cvData.sections.map(section => <Section section={section} variant="classic" />)`. Importar `../../styles/templates/classic.css`.

- [ ] **Step 4: Verificar**

Run: `cd astro-migration && npm run build && node scripts/verify-templates.mjs`
Expected: `classic` se genera y su PDF tiene ≤ 4 páginas; `checkContains(html, 'cv-formal-name')` en verde.

- [ ] **Step 5: Commit**

```bash
git add astro-migration/src/styles/templates/classic.css astro-migration/src/components/FormalHeader.astro astro-migration/src/pages/classic/index.astro
git commit -m "feat: add formal Harvard-style classic template"
```

---

### Task 6: Iconos como CSS y `/ats/`

Estas dos cosas van juntas porque el ATS es el que obliga a sacar los emoji del DOM.

**Files:**
- Modify: `astro-migration/src/components/Header.astro`, `Sidebar.astro`, `Section.astro`
- Modify: `astro-migration/src/scripts/theme-switcher.ts`
- Modify: `astro-migration/src/styles/global.css`
- Create: `astro-migration/src/styles/templates/ats.css`
- Create: `astro-migration/src/pages/ats/index.astro`
- Create: `astro-migration/src/data/sections.ts`

**Interfaces:**
- Produces: `filterSections(sections: CVSection[], template: TemplateName): CVSection[]` en `src/data/sections.ts`. Para `template === 'ats'` devuelve **solo** las secciones cuyo `title` esté en `['Experiencia Profesional', 'Educación', 'Competencias Técnicas', 'Certificaciones y Cursos', 'Idiomas']`; para cualquier otro template devuelve `sections` sin modificar.

- [ ] **Step 1: Crear `src/data/sections.ts`**

Implementar `filterSections` según la interfaz de arriba. Importar `CVSection` de `@/types/cv` y `TemplateName` de `@/types/templates`.

- [ ] **Step 2: Quitar los emoji del markup**

En `Header.astro`: sustituir `📧 {site.email}`, `📍 {site.address}`, `☎ {site.phone}`, `🌐 {site.website}` por texto sin emoji. Añadir en su lugar clases para que el CSS pinte el icono: `<div class="cv-contact cv-contact-email">`, `cv-contact-address`, `cv-contact-phone`, `cv-contact-website`.

En `Sidebar.astro`: igual para `📧`, `☎`, `💼 LinkedIn`, `🐙 GitHub` → clases `cv-contact-email`, `cv-contact-phone`, `cv-contact-linkedin`, `cv-contact-github`.

En `Section.astro`: sin cambios de markup (el título ya no lleva emoji).

- [ ] **Step 3: Pintar los iconos con `::before` en CSS**

En `global.css`, añadir los iconos como pseudo-elementos, de modo que **no exista el carácter en el DOM**:

```css
.cv-contact-email::before   { content: "\1F4E7"; margin-right: .35rem; }
.cv-contact-address::before { content: "\1F4CD"; margin-right: .35rem; }
.cv-contact-phone::before   { content: "\1F4DE"; margin-right: .35rem; }
.cv-contact-website::before { content: "\1F310"; margin-right: .35rem; }
.cv-contact-linkedin::before{ content: "\1F4BC"; margin-right: .35rem; }
.cv-contact-github::before  { content: "\1F419"; margin-right: .35rem; }
```

Y los títulos de sección, por atributo:

```css
.cv-section[data-section-title="PERFIL PROFESIONAL"]::before { content: "\1F464"; margin-right: .4rem; }
.cv-section[data-section-title="EXPERIENCIA PROFESIONAL"]::before { content: "\1F4BC"; margin-right: .4rem; }
.cv-section[data-section-title="EDUCACIÓN"]::before { content: "\1F393"; margin-right: .4rem; }
.cv-section[data-section-title="COMPETENCIAS TÉCNICAS"]::before { content: "⚙"; margin-right: .4rem; }
.cv-section[data-section-title="CERTIFICACIONES Y CURSOS"]::before { content: "\1F4DC"; margin-right: .4rem; }
.cv-section[data-section-title="IDIOMAS"]::before { content: "\1F30D"; margin-right: .4rem; }
.cv-section[data-section-title="SOFT SKILLS"]::before { content: "\1F91D"; margin-right: .4rem; }
.cv-section[data-section-title="REFERENCIAS PROFESIONALES"]::before { content: "\1F465"; margin-right: .4rem; }
```

- [ ] **Step 4: Eliminar `addSectionIcons()`**

En `theme-switcher.ts`: borrar el método estático `addSectionIcons` y sus dos llamadas (la del listener `DOMContentLoaded` y la del bloque `else`). Borrar el diccionario `icons` que contiene.

- [ ] **Step 5: Crear `ats.css`**

- Una columna: `max-width: 19cm; margin: 0 auto;`
- Sin iconos: `.layout-ats .cv-section-title::before { content: none; }` y `.layout-ats .cv-contact::before { content: none; }`
- `.layout-ats .cv-section { background: none; border: 0; box-shadow: none; padding: 0 0 1rem; }`
- `.layout-ats .cv-section-title { font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid var(--text-color); }`
- `.layout-ats .cv-entry-header { display: flex; justify-content: space-between; gap: 1rem; }`
- `.layout-ats .cv-entry-bullets li::before { content: "•"; }`
- `.layout-ats .cv-contact { display: inline; }` (contacto en línea, separado por `·`)
- Sin foto, sin sombra, sin degradado.
- En impresión: todo en negro (`#000`), sin barras de color.

- [ ] **Step 6: Crear `src/pages/ats/index.astro`**

Cabecera propia en una sola línea, sin bloque de color:

```astro
<header class="cv-ats-header">
  <h1>{siteConfig.title}</h1>
  <p>{siteConfig.department}</p>
  <div class="cv-ats-contact">
    <span>{siteConfig.address}</span> · <span>{siteConfig.phone}</span> ·
    <a href="mailto:{siteConfig.email}">{siteConfig.email}</a> ·
    <a href="https://linkedin.com/in/{siteConfig.linkedin}">linkedin.com/in/{siteConfig.linkedin}</a>
  </div>
</header>
```

Debajo, `filterSections(cvData.sections, 'ats').map(...)` con `Section`. Importar `../../styles/templates/ats.css`.

- [ ] **Step 7: Verificar que no hay emoji en el DOM**

Run: `cd astro-migration && npm run build && node -e "const h=require('fs').readFileSync('dist/ats/index.html','utf8'); const m=h.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu); console.log(m?('EMOJIS: '+m.join(' ')):'OK: 0 emojis');"`
Expected: `OK: 0 emojis`.

Si aparecen, es que quedó un emoji en el markup → localizarlo con `grep -nP "[\x{1F300}-\x{1FAFF}]" src/` y sacarlo.

- [ ] **Step 8: Verificar el harness**

Run: `cd astro-migration && node scripts/verify-templates.mjs`
Expected: la ruta `ats/` existe; su PDF tiene ≤ 4 páginas.

- [ ] **Step 9: Commit**

```bash
git add astro-migration/src
git commit -m "feat: move icons to CSS pseudo-elements and add ATS template"
```

---

### Task 7: `/ejecutivo/`

**Files:**
- Create: `astro-migration/src/styles/templates/ejecutivo.css`
- Create: `astro-migration/src/pages/ejecutivo/index.astro`
- Modify: `astro-migration/src/components/Sidebar.astro`

**Interfaces:**
- Consumes: `Sidebar.astro` (con prop `variant?: 'default' | 'executive'`), `Section.astro`.
- Produces: `Sidebar` acepta `variant="executive"`.

- [ ] **Step 1: Añadir la prop `variant` a `Sidebar.astro`**

```ts
interface Props {
  site: SiteConfig;
  cvData: CVData;
  variant?: 'default' | 'executive';
}
const { site, cvData, variant = 'default' } = Astro.props;
```

Y añadir `class:list={['cv-sidebar', `cv-sidebar--${variant}`]}` al `<aside>`.

- [ ] **Step 2: Crear `ejecutivo.css`**

- Grid de 2 columnas: `grid-template-columns: 32% 1fr; gap: 1.2rem;`
- La barra lateral usa **tono claro**, no el oscuro: `.layout-ejecutivo .cv-sidebar { background: var(--section-bg); color: var(--text-color); border: 1px solid var(--border-color); }`
- `.layout-ejecutivo .cv-sidebar--executive .sidebar-name { font-family: var(--heading-font-family); font-size: 1.35rem; }`
- `.layout-ejecutivo .sidebar-section h3 { font-family: var(--heading-font-family); text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.85rem; border-bottom: 1px solid var(--border-color); }`
- `.layout-ejecutivo .main-header { background: var(--section-bg); border-bottom: 2px solid var(--primary-color); }`
- `.layout-ejecutivo .main-header h1 { font-family: var(--heading-font-family); font-size: 1.9rem; }`
- En impresión: `grid-template-columns: 32% 1fr;` **se mantiene** (no `display: block`), `gap: 6mm;`, `.cv-main { page-break-before: auto; }` y quitar el `page-break-after: always` del sidebar.

- [ ] **Step 3: Crear `src/pages/ejecutivo/index.astro`**

Reutiliza `Sidebar` con `variant="executive"` + `cvData`, y el bloque `main` con las entradas (mismo patrón que `two-column/index.astro`). Importar `../../styles/templates/ejecutivo.css`.

- [ ] **Step 4: Verificar**

Run: `cd astro-migration && npm run build && node scripts/verify-templates.mjs`
Expected: `ejecutivo` existe y su PDF tiene ≤ 4 páginas **con la barra lateral en la misma página** que el contenido (comprobar visualmente que no hay una página solo con el sidebar).

- [ ] **Step 5: Commit**

```bash
git add astro-migration/src
git commit -m "feat: add executive template with light sidebar"
```

---

### Task 8: `/minimal/`

**Files:**
- Create: `astro-migration/src/styles/templates/minimal.css`
- Create: `astro-migration/src/pages/minimal/index.astro`

**Interfaces:**
- Consumes: `Section.astro`, `Toolbar.astro` (Task 9).

- [ ] **Step 1: Crear `minimal.css`**

- Sin bloque de cabecera ni foto: el nombre va directo en el flujo.
- `.layout-minimal { max-width: 18cm; margin: 0 auto; }`
- `.cv-minimal-header { margin-bottom: 1.8rem; }`
- `.cv-minimal-name { font-family: var(--heading-font-family); font-size: 2rem; font-weight: 400; letter-spacing: 0.02em; }`
- `.cv-minimal-role { font-size: 0.95rem; color: var(--light-text); margin-bottom: 0.5rem; }`
- `.cv-minimal-contact { font-size: 0.85rem; color: var(--light-text); display: flex; flex-wrap: wrap; gap: 0 0.5rem; }`
- `.layout-minimal .cv-section { background: none; border: 0; box-shadow: none; padding: 0 0 1.4rem; }`
- `.layout-minimal .cv-section-title { font-family: var(--heading-font-family); font-size: 0.95rem; font-weight: 400; text-transform: uppercase; letter-spacing: 0.16em; border-bottom: 1px solid var(--border-color); }`
- Mucho aire: `.layout-minimal .cv-entry { margin-bottom: 1.1rem; }`
- Los iconos `::before` de la sección **se desactivan**: `.layout-minimal .cv-section-title::before { content: none; }`

- [ ] **Step 2: Crear `src/pages/minimal/index.astro`**

Cabecera mínima con nombre, cargo y una línea de contacto; luego las 8 secciones con `Section`. Importar `../../styles/templates/minimal.css`.

- [ ] **Step 3: Verificar**

Run: `cd astro-migration && npm run build && node scripts/verify-templates.mjs`
Expected: `minimal` existe y su PDF tiene ≤ 4 páginas.

- [ ] **Step 4: Commit**

```bash
git add astro-migration/src
git commit -m "feat: add minimal template without header block"
```

---

### Task 9: `/compacto/`

**Files:**
- Create: `astro-migration/src/styles/templates/compacto.css`
- Create: `astro-migration/src/pages/compacto/index.astro`

**Interfaces:**
- Consumes: `Section.astro`.

- [ ] **Step 1: Crear `compacto.css`**

- Densidad: `@media print { html { font-size: 9pt !important; --base-font-size: 9pt !important; } @page { margin: 8mm; } }`
- En pantalla, cuerpo de 10px para aproximar la densidad: `.layout-compacto { --base-font-size: 10px; font-size: 10px; }` (el `html` sigue a 18px, así que hay que fijar el tamaño en el contenedor).
- Dos columnas por sección con **CSS multi-column** (no grid con asignación manual): `.layout-compacto .cv-compacto-body { column-count: 2; column-gap: 1.2rem; column-fill: balance; }`
- Las entradas no se parten: `.layout-compacto .cv-entry { break-inside: avoid; page-break-inside: avoid; }`
- `.layout-compacto .cv-section { break-inside: auto; page-break-inside: auto; background: none; border: 0; box-shadow: none; padding: 0 0 0.8rem; }`
- `.layout-compacto .cv-section-title { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid var(--border-color); break-after: avoid; }`
- `.layout-compacto .cv-entry-header { display: flex; justify-content: space-between; gap: 0.6rem; }`
- `.layout-compacto .cv-entry-dates { font-size: 0.72rem; white-space: nowrap; }`
- `.layout-compacto .cv-entry-bullets li { font-size: 0.75rem; }`
- En impresión, `column-count: 2` se mantiene.

- [ ] **Step 2: Crear `src/pages/compacto/index.astro`**

Cabecera de una línea (nombre + contacto) y luego las 8 secciones dentro de `<div class="cv-compacto-body">`. Importar `../../styles/templates/compacto.css`.

- [ ] **Step 3: Verificar el objetivo de 2 páginas**

Run: `cd astro-migration && npm run build && node scripts/verify-templates.mjs`
Expected: el PDF de `compacto` tiene **≤ 2 páginas**.

Si sale a 3, el siguiente ajuste es `column-count: 2` sobre `.cv-compacto-body` aplicándolo también a pantalla, y bajar `--base-font-size` de impresión a `8.5pt`. No bajar de 8.5pt ni recortar contenido (el usuario decidió mantener todo el contenido).

- [ ] **Step 4: Commit**

```bash
git add astro-migration/src
git commit -m "feat: add compact two-column one-pager template"
```

---

### Task 10: `Toolbar.astro` — barra de personalización extraída

**Files:**
- Create: `astro-migration/src/components/Toolbar.astro`
- Modify: `astro-migration/src/components/Header.astro`, `Sidebar.astro`
- Modify: `astro-migration/src/pages/index.astro`, `classic/index.astro`, `two-column/index.astro`, `timeline/index.astro`, `ats/index.astro`, `ejecutivo/index.astro`, `minimal/index.astro`, `compacto/index.astro`
- Modify: `astro-migration/src/styles/global.css`

**Interfaces:**
- Produces: `Toolbar` con props `{ layout: LayoutName; prefs?: Partial<UserPreferences>; floating?: boolean }`.
- Consumes: `ThemeSwitcher.generateThemeSelectorHTML(layout, prefs)`.

- [ ] **Step 1: Crear `Toolbar.astro`**

```astro
---
import { ThemeSwitcher } from '../scripts/theme-switcher';
import type { LayoutName, UserPreferences } from '../types/cv';

interface Props {
  layout: LayoutName;
  prefs?: Partial<UserPreferences>;
  floating?: boolean;
}
const { layout, prefs, floating = false } = Astro.props;
---

<div class:list={['cv-toolbar', floating && 'cv-toolbar--floating']}>
  <div set:html={ThemeSwitcher.generateThemeSelectorHTML(layout, prefs)} />
</div>
```

- [ ] **Step 2: Sacar la barra de `Header.astro` y `Sidebar.astro`**

En `Header.astro`, eliminar el `<div set:html={ThemeSwitcher.generateThemeSelectorHTML(layout, prefs)} />` y el import de `ThemeSwitcher`. Igual en `Sidebar.astro`.

- [ ] **Step 3: Colocar la barra según la plantilla**

- `vertical`, `classic`, `timeline`: dentro de `<Header>` / `<FormalHeader>` → `<Toolbar layout="..." />`.
- `two-column`, `ejecutivo`: dentro de `<Sidebar>` → `<Toolbar layout="..." />`.
- `ats`, `minimal`, `compacto`: como barra flotante → `<Toolbar layout="..." floating />` colocado **después** del `<main>`, no dentro.

- [ ] **Step 4: Estilos de la barra**

En `global.css`: `.cv-toolbar { ... }` con los estilos que hoy tiene `.theme-selector` (moverlos ahí desde la sección de plantillas). Y `.cv-toolbar--floating { position: fixed; bottom: 1rem; right: 1rem; z-index: 50; background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 0.5rem; padding: 0.5rem; box-shadow: 0 4px 12px rgba(0,0,0,.15); }`

En impresión: `.cv-toolbar, .cv-toolbar--floating { display: none !important; }`

- [ ] **Step 5: Verificar**

Run: `cd astro-migration && npm run build && node scripts/verify-templates.mjs`
Expected: las 8 plantillas se generan; ninguna PDF muestra la barra.

Comprobar además en el navegador que `/minimal/` y `/compacto/` muestran la barra flotante y que al cambiar el layout navega bien.

- [ ] **Step 6: Commit**

```bash
git add astro-migration/src
git commit -m "refactor: extract personalization toolbar into its own component"
```

---

### Task 11: Responsive

**Files:**
- Modify: `astro-migration/src/styles/global.css` y los 8 `src/styles/templates/*.css`

**Interfaces:**
- Consumes: las clases de plantilla ya creadas.

- [ ] **Step 1: Reglas globales de responsive en `global.css`**

- `*, *::before, *::after { box-sizing: border-box; }`
- `body { overflow-wrap: break-word; }` (evita desbordes con URLs largas)
- Títulos fluidos: `.cv-section-title { font-size: clamp(1rem, 0.85rem + 0.6vw, 1.35rem); }` y `.cv-name { font-size: clamp(1.6rem, 1.2rem + 1.8vw, 3rem); }`
- `.theme-selector select { min-height: 40px; }` (área táctil mínima)

- [ ] **Step 2: Breakpoints por plantilla**

En ≤ 1024px: `.layout-two-column .cv-container, .layout-ejecutivo .cv-container { grid-template-columns: 30% 1fr; gap: 0.8rem; }`

En ≤ 768px: sidebar arriba y a ancho completo:
```css
.layout-two-column .cv-container,
.layout-ejecutivo .cv-container { grid-template-columns: 1fr; }
.layout-two-column .cv-sidebar,
.layout-ejecutivo .cv-sidebar { position: static; }
```
Cabeceras a columna: `.cv-header { flex-direction: column; text-align: center; }`, foto a 120px.

En ≤ 480px: foto a 88px, `.cv-section { padding: 0.8rem; }`, toolbar flotante a ancho completo: `.cv-toolbar--floating { left: 0.5rem; right: 0.5rem; }`, y la barra plegable con `.cv-toolbar--floating .theme-selector { flex-direction: column; }`.

En ≤ 768px el layout compacto pasa a **una** columna: `.layout-compacto .cv-compacto-body { column-count: 1; }`

- [ ] **Step 3: Verificar sin desbordes**

Run: `cd astro-migration && npm run build && node scripts/verify-templates.mjs`
Expected: verde.

Comprobar a 390px de ancho con Chrome headless que `document.documentElement.scrollWidth <= 390` en las 8 plantillas:

```bash
for t in "" classic/ two-column/ timeline/ ats/ ejecutivo/ minimal/ compacto/; do
  google-chrome --headless --disable-gpu --no-sandbox --window-size=390,900 \
    --virtual-time-budget=4000 --dump-dom "http://127.0.0.1:PORT/$t" > /dev/null
done
```

- [ ] **Step 4: Commit**

```bash
git add astro-migration/src/styles
git commit -m "feat: responsive rules across all templates"
```

---

### Task 12: Conservar la versión al cambiar de plantilla

**Files:**
- Modify: `astro-migration/src/layouts/BaseLayout.astro`
- Modify: `astro-migration/src/scripts/theme-switcher.ts`

**Interfaces:**
- Produces: `<html data-cv-version="<version>">` en `BaseLayout`.
- `BaseLayout` acepta una prop nueva `version?: CVVersion`.

- [ ] **Step 1: Exponer la versión y la plantilla en `<html>`**

En `BaseLayout.astro` añadir la prop `version?: CVVersion` y en el `<html>`:

```astro
<html lang={lang} class={layoutClass} data-cv-version={version} data-template={template}>
```

`template` se deduce de `layoutClass` (`layout-classic` → `classic`). Si `version` no viene, usar `'fullstack'`.

- [ ] **Step 2: Pasar la versión desde cada página**

Cada página pasa `version={version}` a `BaseLayout`. La variable `version` ya existe en el frontmatter de las 4 páginas actuales (viene de `resolveCVVersion()`); replicarlo en las 4 nuevas.

- [ ] **Step 3: Calcular la ruta de navegación en el cliente**

En `theme-switcher.ts`, `setLayout()`:

```ts
const version = document.documentElement.dataset.cvVersion ?? 'fullstack';
const prefix = version && version !== 'fullstack' ? `${version}/` : '';
window.location.href = withBase(`${prefix}${TEMPLATE_REGISTRY[layout].route.replace(/^\//, '')}`);
```

`TEMPLATE_REGISTRY` se importa de `@/types/templates`.

- [ ] **Step 4: Verificar**

Con el sitio servido en modo multi-versión (`npm run build:all` y sirviendo `astro-dist/`), abrir `/arquitectura/` → cambiar el layout a "Clásico" → la URL debe quedar en `/arquitectura/classic/`, no en `/classic/`.

- [ ] **Step 5: Commit**

```bash
git add astro-migration/src
git commit -m "fix: preserve CV version when switching templates"
```

---

### Task 13: `print:pdfs`, README y verificación final

**Files:**
- Create: `astro-migration/scripts/print-pdfs.mjs`
- Modify: `astro-migration/package.json`, `astro-migration/README.md`

**Interfaces:**
- Produces: `npm run print:pdfs` → deja un PDF por plantilla en `astro-migration/print/`.

- [ ] **Step 1: Crear `print-pdfs.mjs`**

Reutiliza el renderizador de `verify-templates.mjs`: servir `dist/` y renderizar los 8 PDF en `print/<plantilla>.pdf`. Si no encuentra Chrome, avisa y sale con código 0 (no es un error).

- [ ] **Step 2: Registrar los scripts**

```json
"verify": "npm run build && node scripts/verify-templates.mjs",
"print:pdfs": "npm run build && node scripts/print-pdfs.mjs"
```

- [ ] **Step 3: Actualizar el README**

Documentar: las 8 plantillas con su ruta y descripción, los 10 temas, las variables de entorno (`CV_VERSION`, `PUBLIC_CV_VERSION`, `SITE_URL`, `BASE_PATH`, `DEFAULT_LOCALE`), los comandos `dev`/`check`/`lint`/`build`/`build:all`/`verify`/`print:pdfs`, y una nota de que el CV impreso usa A4 con 10.5pt y que `/compacto/` baja a 9pt.

- [ ] **Step 4: Verificación final completa**

```bash
cd astro-migration
npm run check      # 0 errores, 0 warnings
npm run lint       # 0 errores
npm run build      # 8 páginas
npm run verify     # todas las rutas OK, PDFs dentro de los límites
npm run build:all  # 5 builds, 4 versiones con contenido distinto
```

- [ ] **Step 5: Commit**

```bash
git add astro-migration
git commit -m "docs: document templates, themes and print workflow"
```
