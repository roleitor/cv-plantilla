# 📖 Guía Práctica: Cómo Editar y Activar Versiones del CV

## 🎯 Resumen Rápido

1. **Edita** el archivo de la versión deseada (`_data/cv_*.yml`)
2. **Activa** la versión ejecutando el script
3. **Verifica** en el navegador

---

## 📝 Paso 1: Editar la Información

### Ejemplo: Agregar una nueva experiencia en el CV Completo

Abre el archivo:
```bash
nano _data/cv_fullstack.yml
```
O usa tu editor favorito (VS Code, etc.)

Busca la sección "EXPERIENCIA PROFESIONAL" y agrega:

```yaml
- title: "Nueva Empresa"
  sub: "Tu Nuevo Cargo"
  location: "Ciudad, Dirección"
  dates: "Enero 2024 – Actual"
  bullets:
    - "Logro o responsabilidad 1"
    - "Logro o responsabilidad 2"
    - "Logro cuantificable (ej: Reduje tiempo en 30%)"
```

### Ejemplo: Agregar un nuevo curso

Busca la sección "CERTIFICACIONES Y CURSOS" y agrega:

```yaml
- title: "Nombre del Nuevo Curso"
  sub: "Institución (ej: Código Facilito)"
  dates: "2024"
  bullets:
    - "Descripción del curso"
    - "Duración (ej: 10 horas)"
```

### Ejemplo: Agregar una nueva habilidad técnica

Busca la sección "COMPETENCIAS TÉCNICAS" y busca la categoría apropiada, o crea una nueva:

```yaml
- title: "Nueva Categoría"
  bullets:
    - "Habilidad 1"
    - "Habilidad 2"
    - "Habilidad 3"
```

---

## 🔄 Paso 2: Activar la Versión

Una vez que hayas editado el archivo, necesitas activarlo:

### Para el CV Completo:
```bash
./cambiar-version.sh fullstack
```

### Para el CV de Arquitectura:
```bash
./cambiar-version.sh arquitectura
```

### Para el CV de Angular y Backend:
```bash
./cambiar-version.sh angular_backend
```

**El script hará:**
1. Copiar el archivo que editaste a `_data/cv.yml`
2. El servidor Jekyll se regenerará automáticamente
3. Verás el cambio en tu navegador

---

## 👀 Paso 3: Verificar en el Navegador

1. Abre tu navegador en: `http://127.0.0.1:4000`
2. Presiona **F5** o **Ctrl+R** para recargar
3. Verás la versión del CV que activaste

---

## 🎨 Ejemplo Completo: Agregar un Nuevo Proyecto

Supongamos que quieres agregar un nuevo proyecto en el CV de Arquitectura:

### 1. Edita el archivo de arquitectura:
```bash
nano _data/cv_arquitectura.yml
```

### 2. Busca la sección de experiencia y agrega:
```yaml
- title: "Nueva Proyecto Empresarial"
  sub: "Arquitecto de Software"
  location: "La Paz, Bolivia"
  dates: "Enero 2024 – Actual"
  bullets:
    - "Diseño de arquitectura de microservicios con Kubernetes"
    - "Implementación de CI/CD con GitLab"
    - "Integración de ELK Stack para monitoreo"
    - "Reducción del tiempo de deployment en 40%"
```

### 3. Guarda el archivo (Ctrl+O, Enter, Ctrl+X en nano)

### 4. Activa la versión:
```bash
./cambiar-version.sh arquitectura
```

### 5. Verás en la terminal:
```
Cambiando a versión Arquitectura y Liderazgo...
✓ CV cambiado a versión Arquitectura y Liderazgo
```

### 6. Recarga el navegador y verás el nuevo proyecto

---

## 📋 Estructura de Campos Explicada

### Para una Experiencia Laboral:
```yaml
- title: "Nombre de la empresa"        # Obligatorio
  sub: "Tu cargo o puesto"             # Obligatorio
  location: "Ciudad, dirección"       # Opcional
  dates: "Mes Año – Mes Año"           # Obligatorio
  bullets:                             # Obligatorio (lista de logros)
    - "Logro 1"
    - "Logro 2"
    - "Logro 3"
```

### Para Educación:
```yaml
- title: "Título o nombre del estudio" # Obligatorio
  sub: "Institución"                   # Obligatorio
  location: "Ciudad"                   # Opcional
  dates: "Mes Año – Mes Año"           # Obligatorio
  bullets:                             # Opcional
    - "Descripción adicional"
```

### Para Cursos/Certificaciones:
```yaml
- title: "Nombre del curso"            # Obligatorio
  sub: "Institución"                   # Obligatorio
  dates: "Año o período"               # Obligatorio
  bullets:                             # Opcional
    - "Descripción del curso"
    - "Duración"
```

### Para Habilidades:
```yaml
- title: "Categoría de habilidad"     # Obligatorio
  bullets:                             # Obligatorio
    - "Habilidad 1"
    - "Habilidad 2"
```

---

## ⚠️ Reglas Importantes

1. **Indentación**: Usa 2 espacios para indentar (no tabs)
2. **Comillas**: Usa comillas dobles para textos con espacios
3. **Guiones**: Usa `-` para listas
4. **YAML es sensible a espacios**: Mantén la indentación correcta

---

## 🔧 Si Algo Sale Mal

### Error de sintaxis YAML:
- Verifica que la indentación sea correcta (2 espacios)
- Verifica que todas las comillas estén cerradas
- Verifica que no uses tabs, solo espacios

### El CV no se actualiza:
- Verifica que ejecutaste el script `./cambiar-version.sh`
- Recarga el navegador (F5)
- Si no funciona, detén el servidor (Ctrl+C) y reinicia:
  ```bash
  bundle exec jekyll serve
  ```

---

## 💡 Tips

- **Edita primero** el archivo de la versión que quieres usar
- **Activa después** con el script
- **Verifica** en el navegador
- **Para múltiples cambios**: Edita todos los archivos, luego activa cada versión según necesites

---

## 📞 Ejemplo Práctico Rápido

Quiero agregar que hablo inglés nivel C1 en el CV de Angular:

```bash
# 1. Editar el archivo
nano _data/cv_angular_backend.yml

# 2. Buscar "Idiomas" y cambiar:
- title: "Inglés"
  bullets:
    - "Avanzado (C1)"  # Cambiar de "Profesional / Técnico (B2)"

# 3. Guardar (Ctrl+O, Enter, Ctrl+X)

# 4. Activar
./cambiar-version.sh angular_backend

# 5. Recargar navegador
```

¡Listo! Tu CV de Angular ahora muestra inglés nivel C1.
