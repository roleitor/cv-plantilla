# Instrucciones para el CV con Harvard-Style Theme

## 🎯 Sistema de Múltiples Versiones del CV

Este proyecto tiene **3 versiones del CV** adaptadas a diferentes perfiles de trabajo:

### Versiones Disponibles

1. **CV Completo (Full Stack)** - `cv_fullstack.yml`
   - Versión completa con toda tu experiencia, habilidades y certificaciones
   - Ideal para mostrar tu perfil completo
   - Incluye toda la experiencia desde 2016
   - Todas las habilidades técnicas y cursos

2. **CV Arquitectura y Liderazgo** - `cv_arquitectura.yml`
   - Enfocado en arquitectura de software, Kubernetes, microservicios, DevOps y liderazgo técnico
   - Ideal para puestos de: Arquitecto de Software, Tech Lead, Engineering Manager
   - Enfatiza: Kubernetes, CI/CD, ELK Stack, Vault, Scrum Master
   - Experiencia más reciente y de alto nivel

3. **CV Angular y Backend** - `cv_angular_backend.yml`
   - Enfocado en desarrollo con Angular, Java, .NET Core, TypeScript y desarrollo full stack
   - Ideal para puestos de: Desarrollador Full Stack, Angular Developer, Backend Developer
   - Enfatiza: Angular 14+, Java, .NET Core, TypeScript, APIs
   - Certificaciones en Angular y TypeScript

## 🔄 Cómo Cambiar Entre Versiones

### Método 1: Usar el Script Automático (Recomendado)

```bash
./cambiar-version.sh [version]
```

**Ejemplos:**
```bash
./cambiar-version.sh fullstack          # Cambia a CV completo
./cambiar-version.sh arquitectura       # Cambia a Arquitectura y Liderazgo
./cambiar-version.sh angular_backend    # Cambia a Angular y Backend
```

El script copia automáticamente la versión seleccionada a `_data/cv.yml` y el servidor Jekyll se regenerará.

### Método 2: Cambio Manual

```bash
# Cambiar a versión completa
cp _data/cv_fullstack.yml _data/cv.yml

# Cambiar a arquitectura
cp _data/cv_arquitectura.yml _data/cv.yml

# Cambiar a angular/backend
cp _data/cv_angular_backend.yml _data/cv.yml
```

## 📦 Instalación y Prueba Local

### 1. Instalar Ruby y Bundler (si no los tienes)

En Arch Linux:
```bash
sudo pacman -S ruby bundler jekyll
```

En Ubuntu/Debian:
```bash
sudo apt install ruby bundler jekyll
```

En macOS:
```bash
brew install ruby
```

### 2. Configurar PATH para Bundler

```bash
export PATH="$HOME/.local/share/gem/ruby/3.4.0/bin:$PATH"
```

Para hacer esto permanente, agrega esta línea a tu `~/.bashrc` o `~/.zshrc`:
```bash
echo 'export PATH="$HOME/.local/share/gem/ruby/3.4.0/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### 3. Instalar dependencias
```bash
bundle install
```

### 4. Probar el sitio localmente
```bash
bundle exec jekyll serve
```

Luego abre tu navegador en: `http://localhost:4000`

## 📝 Estructura del Proyecto

- `_config.yml`: Configuración básica del sitio (información personal, redes sociales)
- `_data/cv.yml`: **ARCHIVO ACTIVO** - El CV que se muestra actualmente
- `_data/cv_fullstack.yml`: Versión completa del CV
- `_data/cv_arquitectura.yml`: Versión enfocada en arquitectura y liderazgo
- `_data/cv_angular_backend.yml`: Versión enfocada en Angular y backend
- `index.md`: Página principal (muestra el CV desde cv.yml)
- `cambiar-version.sh`: Script para cambiar entre versiones
- `images/`: Imágenes (profile.jpg, favicon, etc.)
- `_sass/`: Estilos personalizados

## 🔧 Cómo Actualizar tu CV

### Para actualizar TODAS las versiones:

1. Edita el archivo correspondiente a cada versión:
   - `_data/cv_fullstack.yml` para versión completa
   - `_data/cv_arquitectura.yml` para arquitectura
   - `_data/cv_angular_backend.yml` para Angular/backend

2. Luego aplica los cambios copiando a cv.yml:
   ```bash
   ./cambiar-version.sh [version]
   ```

### Campos por completar

He marcado con `[POR COMPLETAR]` los campos que necesitas agregar:

1. **Logros cuantificables** en cada experiencia (ej: "Reducí el tiempo de deployment en 40%", "Ahorramos $50k anuales en infraestructura")
2. **Enlaces a GitHub** de tus proyectos
3. **Testimonios específicos** de tus referencias
4. **Detalles adicionales** que consideres relevantes

## 🚀 Despliegue en GitHub Pages

El tema está configurado para funcionar directamente con GitHub Pages:

1. Haz commit de los cambios
2. Push a tu repositorio
3. Habilita GitHub Pages en la configuración del repositorio
4. El sitio se desplegará automáticamente en: `https://roleitor.github.io/cv-plantilla`

**IMPORTANTE:** Antes de hacer push, asegúrate de ejecutar:
```bash
./cambiar-version.sh [version_deseada]
```

GitHub Pages usará la versión que esté en `_data/cv.yml`.

## 📄 Exportar a PDF

El tema es print-friendly. Para exportar a PDF:

1. Abre tu CV en el navegador
2. Presiona `Ctrl+P` (o `Cmd+P` en Mac)
3. Selecciona "Guardar como PDF"
4. El diseño se adaptará automáticamente para impresión

## 💡 Tips de Uso

- **Para entrevistas de arquitectura:** Usa `./cambiar-version.sh arquitectura`
- **Para entrevistas de desarrollo:** Usa `./cambiar-version.sh angular_backend`
- **Para presentación general:** Usa `./cambiar-version.sh fullstack`
- **Para generar PDFs específicos:** Cambia la versión, exporta a PDF, y repite para cada versión

## 🐛 Solución de Problemas

### El servidor no se regenera después de cambiar versión
Presiona `Ctrl+C` para detener el servidor y ejecuta:
```bash
bundle exec jekyll serve
```

### Error "bundle: command not found"
Configura el PATH:
```bash
export PATH="$HOME/.local/share/gem/ruby/3.4.0/bin:$PATH"
```

### Error de permisos al instalar bundler
Ya está configurado para usar `vendor/bundle` local, no requiere sudo.

## 📚 Información Actualizada del CV

Se ha actualizado el CV con toda la información proporcionada:

- ✅ Experiencia completa desde 2016 (Aduana Nacional, SIN, ENTEL)
- ✅ Educación (Diplomados e Ingeniería de Sistemas)
- ✅ Todas las certificaciones y cursos (Código Facilito, SoloLearn, Udemy, IQuattro)
- ✅ Skills técnicas organizadas por categorías
- ✅ Referencias profesionales actualizadas
- ✅ Soft skills enfocadas en liderazgo y desarrollo

## 🎨 Personalización Visual

El tema Harvard-Style tiene un diseño profesional clásico. Si quieres personalizar colores o estilos:

1. Edita `_config.yml` para cambiar configuraciones básicas
2. Crea archivos en `_sass/` para estilos personalizados
3. El tema soporta modo oscuro (configurable en `_config.yml`)

## 📁 Archivo de Respaldo

Se creó `_config.yml.backup` con tu configuración original del tema anterior, por si necesitas recuperarlo.
