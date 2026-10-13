# CV Profesional - Rolando Moises Quispe Mendoza

**Líder Técnico – Arquitecto de Software e Innovación en IA**

Este repositorio contiene mi CV profesional utilizando el tema [Harvard-Style Jekyll CV Theme](https://github.com/smirnoffmg/harvard-style-cv-theme) para GitHub Pages con estilos personalizados.

## 🎯 Sistema de Múltiples Versiones del CV

Este proyecto tiene **4 versiones del CV** adaptadas a diferentes perfiles de trabajo:

### Versiones Disponibles

1. **🎯 CV Completo (Full Stack)** - `cv_fullstack.yml`
   - Versión completa con toda tu experiencia, habilidades y certificaciones
   - Ideal para mostrar tu perfil completo

2. **🏗️ CV Arquitectura y Liderazgo** - `cv_arquitectura.yml`
   - Enfocado en arquitectura de software, Kubernetes, microservicios, DevOps y liderazgo técnico
   - Ideal para puestos de: Arquitecto de Software, Tech Lead, Engineering Manager

3. **💻 CV Angular y Backend** - `cv_angular_backend.yml`
   - Enfocado en desarrollo con Angular, Java, .NET Core, TypeScript y desarrollo full stack
   - Ideal para puestos de: Desarrollador Full Stack, Angular Developer, Backend Developer

4. **🏛️ CV Institución Pública** - `cv_institucionpublica.yml`
   - Enfocado para instituciones públicas (SIN, Aduana, etc.)
   - Incluye cursos de formación pública (CENCAP, EGGP)
   - Ideal para presentaciones en el sector público

## 🔄 Cómo Cambiar Entre Versiones

### Usar el Script Automático (Recomendado)

```bash
./cambiar-version.sh [version]
```

**Ejemplos:**
```bash
./cambiar-version.sh fullstack           # CV completo
./cambiar-version.sh arquitectura        # Arquitectura y Liderazgo
./cambiar-version.sh angular_backend     # Angular y Backend
./cambiar-version.sh institucion_publica # Institución Pública
```

## 🚀 Vista Previa

El CV está desplegado en: [https://roleitor.github.io/cv-plantilla](https://roleitor.github.io/cv-plantilla)

## 📝 Estructura del Proyecto

- **`_data/cv.yml`**: Archivo ACTIVO - El CV que se muestra actualmente
- **`_data/cv_fullstack.yml`**: Versión completa del CV
- **`_data/cv_arquitectura.yml`**: Versión enfocada en arquitectura y liderazgo
- **`_data/cv_angular_backend.yml`**: Versión enfocada en Angular y backend
- **`_data/cv_institucionpublica.yml`**: Versión para instituciones públicas
- **`_config.yml`**: Configuración del sitio (información personal, redes sociales)
- **`cambiar-version.sh`**: Script para cambiar entre versiones
- **`index.md`**: Página principal (muestra el CV desde cv.yml)
- **`_sass/custom_styles.scss`**: Estilos personalizados para mejorar visualmente el CV

## 🛠️ Tecnologías

- Jekyll (Ruby)
- Harvard-Style CV Theme (con personalización CSS)
- GitHub Pages

## 📦 Instalación Local

```bash
# Configurar PATH para Bundler
export PATH="$HOME/.local/share/gem/ruby/3.4.0/bin:$PATH"

# Instalar dependencias
bundle install

# Servir localmente
bundle exec jekyll serve
```

Luego abre `http://localhost:4000` en tu navegador.

## 📄 Secciones del CV (Ordenadas)

1. Perfil Profesional
2. Experiencia Profesional
3. Educación
4. Certificaciones y Cursos (ordenadas por fecha)
5. Competencias Técnicas (organizadas por categorías)
6. Idiomas
7. Referencias Profesionales

## 🎨 Mejoras Visuales

El CV incluye:
- Diseño profesional con gradiente azul en el encabezado
- Tarjetas con sombras sutiles para mejor legibilidad
- Colores coordinados para mejor contraste
- Diseño responsive para móviles
- Optimizado para impresión en PDF

## 🔄 Actualización

Para actualizar el CV, edita los archivos correspondientes a cada versión:
- `_data/cv_fullstack.yml` para versión completa
- `_data/cv_arquitectura.yml` para arquitectura
- `_data/cv_angular_backend.yml` para Angular/backend
- `_data/cv_institucionpublica.yml` para instituciones públicas

Luego aplica los cambios ejecutando `./cambiar-version.sh [version]`.

Las instrucciones detalladas están en `INSTRUCCIONES.md` y `GUIA-EDICION.md`.

## 📧 Contacto

- 📧 rolomen_20@hotmail.com
- 📞 +591 63100619
- 📍 Bolivia
- 💼 [LinkedIn](https://linkedin.com/in/rolomen)
- 🐙 [GitHub](https://github.com/roleitor)
