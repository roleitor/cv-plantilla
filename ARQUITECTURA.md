# Nueva Arquitectura del CV - Documentación Técnica

## 📁 Estructura de Archivos

```
cv-plantilla/
├── _config.yml                    # Configuración del sitio + department/affiliation
├── _data/
│   ├── cv_base.yml                # 📦 DATOS BASE (común a TODAS las versiones)
│   ├── cv_fullstack_overlay.yml   # 🔧 Overlay versión Full Stack
│   ├── cv_arquitectura_overlay.yml # 🔧 Overlay versión Arquitectura
│   ├── cv_angular_backend_overlay.yml # 🔧 Overlay versión Angular/Backend
│   ├── cv_institucionpublica_overlay.yml # 🔧 Overlay versión Institución Pública
│   └── cv.yml                     # 📄 GENERADO (base + overlay activo)
├── _layouts/
│   ├── cv.html                    # Layout Vertical (default) - usa includes
│   ├── cv_classic.html            # Layout Clásico - usa includes
│   ├── cv_two_column.html         # Layout Dos Columnas - usa includes
│   └── cv_timeline.html           # Layout Timeline - usa includes
├── _includes/
│   ├── header.html                # Header compartido (foto, contacto, redes)
│   ├── footer.html                # Footer + theme-switcher.js loader
│   ├── section.html               # Renderizador de secciones genérico
│   ├── sidebar.html               # Sidebar (two-column layout)
│   └── skills_grid.html           # Grid de skills (timeline layout)
├── _assets/
│   ├── css/main.css               # 🎨 CSS UNIFICADO (todos los temas + layouts)
│   └── js/theme-switcher.js       # ⚙️ JS UNIFICADO (temas, fuentes, tamaños, layouts)
├── merge_cv.rb                    # 🔀 Script de merge (base + overlay → cv.yml)
├── cambiar-version.sh             # 🔄 Script wrapper (valida + ejecuta merge)
├── .github/workflows/ci.yml       # ✅ CI/CD GitHub Actions
├── .pre-commit-config.yaml        # 🔍 Pre-commit hooks
└── .markdownlint.json             # 📝 Config markdownlint
```

---

## 🔄 Flujo de Cambio de Versión

```bash
./cambiar-version.sh arquitectura
```

1. **Valida** `cv_base.yml` + `cv_arquitectura_overlay.yml`
2. **Ejecuta** `ruby merge_cv.rb arquitectura`
3. **Merge** inteligente por `title` de secciones y entries
4. **Genera** `_data/cv.yml` final
5. **Jekyll** regenera automáticamente

---

## 📦 Ventajas de la Nueva Arquitectura

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| **Duplicación YAML** | ~1300 líneas repetidas | ~300 líneas base + ~100/overlay |
| **Mantenimiento** | Editar 4 archivos | Editar 1 base + 1 overlay |
| **Consistencia** | Manual, propenso a errores | Automática por merge |
| **Validación** | Ninguna | YAML lint + Ruby parse |
| **CSS/JS** | 4x inline duplicado | 1 archivo cada uno |
| **Layouts** | 600+ líneas cada uno | ~50 líneas + includes |

---

## 🎨 Sistema de Temas (CSS Variables)

Todos los temas definidos en `_assets/css/main.css` via `[data-theme="..."]`:

- `blue` (default), `green`, `red`, `purple`, `gray`, `dark`, `modern`, `classic`

Controlado por `theme-switcher.js` con persistencia en `localStorage`.

---

## ⚙️ Theme Switcher JS (`_assets/js/theme-switcher.js`)

Funciones globales expuestas:
- `changeLayout(layout)` - Cambia entre layouts
- `changeTheme(theme)` - Cambia tema de color
- `changeFont(font)` - Cambia tipografía
- `changeSize(size)` - Cambia tamaño base

Persistencia: `localStorage` keys `cv_theme`, `cv_font`, `cv_size`, `cv_layout`

---

## 🔀 Merge Inteligente (`merge_cv.rb`)

Estrategia de merge por `title`:

1. **Secciones**: Merge por `title` (Perfil, Experiencia, Educación, etc.)
2. **Entries**: Merge por `title` (empresa, institución, certificación)
3. **Bullets**: Unión de arrays (unique)
4. **Orden**: Base primero, overlay nuevas al final
5. **Override**: Campos simples (sub, location, dates) se sobrescriben

---

## ✅ CI/CD Pipeline (`.github/workflows/ci.yml`)

**Job `validate`:**
- Setup Ruby 3.4 + bundler cache
- Valida `cv_base.yml` + todos los overlays
- Test merge de las 4 versiones
- Build Jekill completo
- HTML lint (opcional)

**Job `deploy`:**
- Solo en `main`/`master`
- Genera versión `fullstack` por defecto
- Deploy a GitHub Pages

---

## 🔍 Pre-commit Hooks (`.pre-commit-config.yaml`)

```bash
pip install pre-commit && pre-commit install
```

Validaciones automáticas en cada commit:
- `yamllint` en `_data/*.yml`
- `markdownlint` en `*.md`
- Trailing whitespace, EOF, merge conflicts
- Ruby syntax check en `*.rb`
- Test merge de versión fullstack

---

## 🚀 Comandos Útiles

```bash
# Cambiar versión (con validación + merge)
./cambiar-version.sh fullstack
./cambiar-version.sh arquitectura
./cambiar-version.sh angular_backend
./cambiar-version.sh institucion_publica

# Test merge manual
ruby merge_cv.rb arquitectura

# Validar YAML individual
ruby -ryaml -e "YAML.load_file('_data/cv_base.yml')"

# Build local
bundle exec jekyll serve

# Pre-commit manual
pre-commit run --all-files
```

---

## 📝 Agregar Nueva Versión

1. Crear `_data/cv_nueva_overlay.yml` con solo diferencias
2. Agregar entrada en `cambiar-version.sh` case statement
3. Agregar en `merge_cv.rb` OVERLAYS hash
4. ¡Listo! Funciona automáticamente

---

## 🐛 Debugging

```bash
# Ver cv.yml generado
cat _data/cv.yml

# Ver merge debug
ruby -e "
  require 'yaml'
  base = YAML.load_file('_data/cv_base.yml')
  overlay = YAML.load_file('_data/cv_arquitectura_overlay.yml')
  puts base.to_yaml
  puts '---'
  puts overlay.to_yaml
"
```