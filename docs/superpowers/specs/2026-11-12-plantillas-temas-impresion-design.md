# Diseño: Plantillas, Temas e Impresión — CV Astro

**Fecha:** 2026-11-12
**Estado:** Aprobado por el usuario (decisiones marcadas con ✅)
**Alcance:** `astro-migration/` (el sitio Astro). El sitio Jekyll de la raíz no se toca.

---

## 1. Intención

El proyecto hoy compila y funciona, pero en tres aspectos se queda corto:

1. **Los temas de color están duplicados** entre `src/types/cv.ts` (objeto `THEMES`) y
   `src/styles/global.css` (bloques `[data-theme="..."]`). Añadir un tema obliga a editar
   dos archivos y es fácil que se desincronicen.
2. **No hay verdaderas plantillas de diseño.** El `/classic/` actual es el layout vertical
   con la cabecera centrada; no existe el CV formal tipo Harvard/LaTeX que el usuario espera.
3. **La impresión está rota**: el PDF sale en **25 páginas** para un CV que debería tener 2-3.

Objetivo: 8 plantillas de diseño realmente distintas, 10 temas de color, e impresión formal
en A4 de ~3 páginas con tipografía y tamaño de letra correctos.

---

## 2. Diagnóstico de la impresión (25 páginas → ~3)

Causas medidas sobre el build actual (`/` vertical, A4):

| Causa | Efecto | Corrección |
|---|---|---|
| `body { font-size: 12pt }` no afecta a los tamaños en `rem` | `html` sigue a 18px → todo se imprime al tamaño de pantalla | Fijar `--base-font-size` en `html` dentro de `@media print` con `!important` (el JS lo pone inline; `!important` de stylesheet gana a inline normal) |
| `.cv-section { page-break-inside: avoid }` | Cada sección entera salta a página nueva → huecos enormes | Quitarlo; aplicar `break-inside: avoid` solo a `.cv-entry` |
| `.cv-section { padding: 2rem }` | 36px de aire por sección | Padding de impresión propio por plantilla |
| `body { line-height: 1.8 }` | Interlineado de pantalla, no de documento | 1.45 en impresión |
| Sin `@page` | Márgenes por defecto del navegador | `@page { size: A4; margin: 14mm }` |
| `.layout-two-column .cv-container { display: block }` en print | El grid se destruye y el sidebar se apila | Mantener el grid en impresión (32% / 68%) |
| `animation: fadeInUp` activa | Repintado innecesario al imprimir | Desactivar animaciones en impresión |
| Sin `orphans`/`widows` | Títulos huérfanos al pie de página | `orphans: 3; widows: 3` y `break-after: avoid` en títulos |

### Medición del contenido (base `fullstack`)

| Sección | Caracteres |
|---|---|
| PERFIL PROFESIONAL | 678 |
| EXPERIENCIA PROFESIONAL | 4.032 |
| EDUCACIÓN | 598 |
| COMPETENCIAS TÉCNICAS | 1.216 |
| CERTIFICACIONES Y CURSOS | 2.938 |
| IDIOMAS | 125 |
| SOFT SKILLS | 346 |
| REFERENCIAS PROFESIONALES | 549 |
| **Total** | **10.482** |

Capacidad de una A4 útil (márgenes 14mm), una columna: ~5.460 caracteres a 10.5pt,
~7.560 a 9pt. ⇒ ~1,9 páginas de texto puro a 10.5pt (≈3 páginas reales contando cabeceras,
títulos de sección y espaciado) y ~1,4 a 9pt.

---

## 3. Arquitectura — Enfoque A: CSS por plantilla ✅

```
astro-migration/src/
├── styles/
│   ├── global.css                  # tokens + reset + base + sistema de impresión
│   └── templates/
│       ├── vertical.css             # /
│       ├── classic.css              # /classic/   (diseño formal Harvard)
│       ├── two-column.css           # /two-column/
│       ├── timeline.css             # /timeline/
│       ├── ats.css                  # /ats/
│       ├── ejecutivo.css            # /ejecutivo/
│       ├── minimal.css              # /minimal/
│       └── compacto.css             # /compacto/
├── layouts/
│   └── BaseLayout.astro            # <html>, head, fuentes, script cliente
├── components/
│   ├── Header.astro                # cabecera actual (gradiente + foto)
│   ├── FormalHeader.astro          # NUEVO: cabecera formal centrada + reglas
│   ├── Section.astro               # entradas con variantes
│   ├── Sidebar.astro               # lateral (variante normal / ejecutiva)
│   ├── SkillsGrid.astro
│   └── Toolbar.astro               # NUEVO: barra de personalización flotante
└── pages/
    ├── index.astro                 # vertical
    ├── classic/index.astro         # formal Harvard
    ├── two-column/index.astro
    ├── timeline/index.astro
    ├── ats/index.astro             # NUEVO
    ├── ejecutivo/index.astro       # NUEVO
    ├── minimal/index.astro         # NUEVO
    └── compacto/index.astro        # NUEVO
```

Cada página importa **solo** su CSS de plantilla; Vite incluye únicamente lo que esa
página necesita. `global.css` conserva lo compartido: variables, reset, tipografía base,
utilidades y el sistema de impresión común.

**Consecuencia práctica:** añadir una plantilla = 1 archivo `.css` + 1 `.astro`. Añadir un
tema = 1 bloque `[data-theme]` en `global.css`.

---

## 4. Temas — CSS como única fuente de verdad

### Antes (duplicado)

```ts
// types/cv.ts
export const THEMES: Record<ThemeName, ThemeConfig> = {
  blue: { primary: '#2563eb', secondary: '#1e40af', /* ...14 campos... */ },
  // ...8 temas...
};

// global.css  ← los mismos valores, otra vez
[data-theme="blue"] { --primary-color: #2563eb; /* ... */ }
```

### Después (sin duplicación)

`types/cv.ts` conserva **solo los nombres tipados**; los valores viven en CSS:

```ts
export type ThemeName =
  | 'blue' | 'green' | 'red' | 'purple' | 'gray' | 'dark' | 'modern' | 'classic'
  | 'navy' | 'monochrome';

export const THEME_NAMES: ThemeName[] = [ /* 10 */ ];
```

```css
/* global.css — única fuente de verdad */
[data-theme="navy"] {
  --primary-color: #1e3a5f;
  --secondary-color: #152a45;
  /* ... */
}
```

El JS **deja de escribir variables de color**: solo hace
`root.setAttribute('data-theme', name)` y aplica fuente y tamaño (que sí son preferencias
del usuario, no del tema). Esto elimina `CSS_VAR_MAP`, `ThemeConfig` y la mitad de
`theme-switcher.ts`.

Cada bloque `[data-theme]` define también `--sidebar-bg` / `--sidebar-text`, para que el
tema `monochrome` pueda tener la barra lateral clara y no azul oscuro.

### Temas nuevos

| Tema | Paleta | Notas |
|---|---|---|
| `navy` | azul marino formal `#1e3a5f` | Sobrio, el más típico de CV corporativo |
| `monochrome` | negro / gris | Para imprimir en B/N o fotocopiar; sidebar claro |

Los 8 actuales se conservan intactos.

---

## 5. Las 8 plantillas

| Ruta | Nombre | Diseño | Foto | Color | Secciones | Objetivo impreso |
|---|---|---|---|---|---|---|
| `/` | Vertical | Cabecera con degradado + tarjetas | Sí | Sí | 8 | ~3 pág. |
| `/classic/` | **Clásico formal** | Nombre centrado, filetes finos, sin sombras | Sí (pequeña) | Sí | 8 | ~3 pág. |
| `/two-column/` | Dos columnas | Sidebar oscuro + contenido | Sí | Sí | 8 | ~3-4 pág. |
| `/timeline/` | Línea de tiempo | Eje vertical con nodos | Sí | Sí | 8 | ~3 pág. |
| `/ats/` | ATS | Una columna, plano, sin iconos | No | Mínimo | **5** | ~3 pág. |
| `/ejecutivo/` | Ejecutivo | Sidebar claro, titulares serif | Sí | Sí | 8 | ~3-4 pág. |
| `/minimal/` | Minimal | Sin bloque de cabecera | No | Sí | 8 | ~2-3 pág. |
| `/compacto/` | Compacto | Denso, 9pt, secciones a dos columnas | No | Sí | 8 | **~2 pág.** |

### 5.1 Secciones por plantilla ✅

Todas las plantillas muestran las 8 secciones **salvo `/ats/`**, que se queda solo con lo
imprescindible para un filtro automático:

> **Experiencia Profesional · Educación · Competencias Técnicas · Certificaciones y
> Cursos · Idiomas**

ATS descarta *Perfil Profesional*, *Soft Skills* y *Referencias Profesionales*: son texto
que los parsers de ATS no aprovechan y que References con teléfonos solo añaden ruido.

### 5.2 `/classic/` — el diseño formal (petición explícita)

```
        ROLANDO MOISES QUISPE MENDOZA
     Arquitecto de Software & Líder Técnico
─────────────────────────────────────────────
  La Paz, Bolivia · +591 63100619 · ro...@hotmail.com
  linkedin.com/in/rolomen · github.com/roleitor
─────────────────────────────────────────────

EXPERIENCIA PROFESIONAL                    ─── (regla fina, no caja)

  Aduana Nacional                    Junio 2023 – Actual
  Supervisor de Desarrollo de Sistemas
    • Liderazgo de equipos TI en proyectos de...
    • Diseño de arquitecturas de microservicios...
```

Reglas: una sola columna, sin cajas ni sombras, títulos de sección en versalitas con filete
inferior, fechas alineadas a la derecha en la misma línea que la organización, viñetas con
`•` plano, interlineado 1.45, cuerpo 10.5pt en impresión.

### 5.3 `/compacto/` — dos columnas por sección ✅

CSS `columns: 2` con el contenido fluyendo (no un grid con asignación manual por
sección): el CV se reparte en dos columnas de la misma página, con `break-inside: avoid` en
las entradas para que ninguna se parta.

Contenido **completo** (las 8 secciones, sin curar) a 9pt ⇒ ~2 páginas. No se descarta
información; la densidad es lo que permite que quepa en un formato utilizable.

### 5.4 Iconos como CSS, no como texto en el DOM

Los emoji (`📧📍📞🌐💼🐙` en la cabecera, `👤💼🎓📜⚙️🌍👥🤝` en los títulos de sección) hoy
están en el markup y, además, `ThemeSwitcher.addSectionIcons()` los inyecta en tiempo de
ejecución. Un ATS lee el texto del DOM, así que **ocultarlos con `display:none` no sirve**.

Solución: todos los iconos pasan a ser `::before` de CSS, con el contenido en el atributo
`content`. El DOM queda limpio de emoji (ATS-friendly) y el aspecto en pantalla no cambia.
`addSectionIcons()` se elimina del cliente.

El template `/ats/` no define ningún icono.

### 5.5 Barra de personalización ✅

`Toolbar.astro` es un componente propio que renderiza el selector de tema/fuente/tamaño y
el botón PDF. Se coloca:

- **Dentro de la cabecera** en `vertical`, `classic`, `two-column`, `timeline`, `ejecutivo`
  (donde ya vive hoy).
- **Como barra flotante** discreta (fija, esquina inferior) en `ats`, `minimal` y `compacto`,
  que no tienen bloque de cabecera.

En impresión siempre `display: none`.

---

## 6. Responsive

Breakpoints: 1024 / 768 / 480. Se mantienen y se amplían con reglas por plantilla:

| Ancho | Comportamiento |
|---|---|
| > 1024 | Layout completo |
| ≤ 1024 | Dos columnas → sidebar 30%, tipografía levemente menor |
| ≤ 768 | Sidebar pasa arriba como bloque completo; cabeceras a columna; toolbar apilada |
| ≤ 480 | Tipografía y espaciados mínimos; foto 88px; toolbar plegable |

Añadidos: tipografía fluida con `clamp()` en los títulos, `box-sizing: border-box` global,
`overflow-wrap: break-word` en los textos largos (evita desbordes con URLs), y área táctil
mínima de 40px en los `<select>`.

---

## 7. Tipografía — decisiones propias (no preguntadas)

- **Cuerpo**: siempre la fuente que elija el usuario (`--base-font-family`), porque es una
  preferencia explícita suya y el selector de fuente existe para eso.
- **Títulos**: `--heading-font-family` (Merriweather, serif) en `classic`, `ejecutivo` y
  `minimal`, para el carácter formal.
- **ATS**: 100% sans, la fuente del usuario, sin serifas ni iconos.
- **Impresión**: `--base-font-size` forzado a 10.5pt (`compacto`: 9pt) mediante
  `!important`, que es lo que realmente escala todos los tamaños en `rem`.

---

## 8. Corrección colateral: cambio de plantilla dentro de una versión

`LAYOUT_ROUTES` son absolutas (`/classic/`). Al cambiar de plantilla desde
`/cv-plantilla/arquitectura/` se caía a `/cv-plantilla/classic/`, que es la build
`fullstack` — se perdía la versión del CV. Con 8 plantillas y 4 versiones el bug se ve
mucho más.

Corrección: `BaseLayout` expone `data-cv-version` en `<html>`; el `theme-switcher` calcula
la ruta como `{base}{version-no-default}/{layout}/`, de modo que la versión se conserva al
cambiar de plantilla.

---

## 9. Fuera de alcance

- El sitio **Jekyll** de la raíz y sus workflows.
- Los pipelines de CI duplicados (Jekyll vs Astro).
- El contenido del CV: no se modifica ningún dato ni overlay.
- `astro-test/` y `test-astro/`: se ignoran en `.gitignore`, no se borran.

---

## 10. Verificación

| Comprobación | Criterio |
|---|---|
| `npm run check` | 0 errores, 0 warnings |
| `npm run lint` | 0 errores |
| `npm run build` | 8 páginas generadas |
| PDF de las 8 plantillas | `/`, `/classic/`, `/timeline/`, `/minimal/` ≤ 4 pág.; `/compacto/` ≤ 2 pág.; `/two-column/` y `/ejecutivo/` con sidebar **en la misma página** que el contenido, sin partirse en 2 |
| Responsive | Capturas a 1280 / 768 / 390 px sin desbordes ni scroll horizontal |
| Temas | Los 10 cambian el color; `/classic/` con `monochrome` sale en B/N |
| Sin duplicación | `grep` confirma que los colores no aparecen en `types/cv.ts` |
| ATS | `grep` confirma 0 emojis en el DOM de `/ats/` |
| Versiones | Cambiar de plantilla dentro de `/arquitectura/` conserva la versión |

Script de verificación: `npm run print:pdfs` (Chrome headless, sin dependencias nuevas),
genera los PDF de las 8 plantillas en `astro-migration/print/` para inspección.
