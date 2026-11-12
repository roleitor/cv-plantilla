#!/bin/bash

# Script para cambiar entre versiones del CV
# Uso: ./cambiar-version.sh [version]
# versiones: fullstack, arquitectura, angular_backend, institucion_publica

VERSION=$1

# Función para validar YAML
validate_yaml() {
    local file=$1
    if command -v yamllint &> /dev/null; then
        echo "🔍 Validando sintaxis YAML con yamllint..."
        if ! yamllint -d "{extends: relaxed, rules: {line-length: disable}}" "$file" 2>/dev/null; then
            echo "⚠️  Advertencia: yamllint encontró problemas (no bloqueante)"
        fi
    elif command -v bundle &> /dev/null; then
        echo "🔍 Validando sintaxis YAML con bundle exec ruby..."
        if ! bundle exec ruby -ryaml -e "YAML.load_file('$file')" 2>/dev/null; then
            echo "❌ Error: YAML inválido en $file"
            return 1
        fi
        echo "✓ YAML válido"
    elif command -v ruby &> /dev/null; then
        echo "🔍 Validando sintaxis YAML con Ruby..."
        if ! ruby -ryaml -e "YAML.load_file('$file')" 2>/dev/null; then
            echo "❌ Error: YAML inválido en $file"
            return 1
        fi
        echo "✓ YAML válido"
    else
        echo "⚠️  No hay validador YAML disponible (instala yamllint o ruby/bundle)"
    fi
    return 0
}

# Función para generar CV usando merge_cv.rb
generate_cv() {
    local version=$1
    echo "🔄 Generando CV versión $version..."
    
    # Validar base y overlay
    validate_yaml "_data/cv_base.yml" || return 1
    validate_yaml "_data/cv_${version}_overlay.yml" || return 1
    
    # Ejecutar merge
    if command -v bundle &> /dev/null; then
        bundle exec ruby merge_cv.rb "$version"
    elif command -v ruby &> /dev/null; then
        ruby merge_cv.rb "$version"
    else
        echo "❌ Error: Ruby no disponible para ejecutar merge_cv.rb"
        return 1
    fi
}

case $VERSION in
  fullstack)
    echo "Cambiando a versión Full Stack..."
    generate_cv "fullstack"
    echo "✓ CV cambiado a versión Full Stack"
    ;;
  arquitectura)
    echo "Cambiando a versión Arquitectura y Liderazgo..."
    generate_cv "arquitectura"
    echo "✓ CV cambiado a versión Arquitectura y Liderazgo"
    ;;
  angular_backend)
    echo "Cambiando a versión Angular y Backend..."
    generate_cv "angular_backend"
    echo "✓ CV cambiado a versión Angular y Backend"
    ;;
  institucion_publica)
    echo "Cambiando a versión Institución Pública..."
    generate_cv "institucion_publica"
    echo "✓ CV cambiado a versión Institución Pública"
    ;;
  *)
    echo "Uso: $0 [version]"
    echo "Versiones disponibles:"
    echo "  fullstack           - CV completo (todas las habilidades y experiencia)"
    echo "  arquitectura        - Enfocado en arquitectura, Kubernetes, DevOps y liderazgo"
    echo "  angular_backend     - Enfocado en Angular, Java, .NET y desarrollo"
    echo "  institucion_publica - Enfocado para instituciones públicas (SIN, Aduana, etc.)"
    exit 1
    ;;
esac

echo ""
echo "El servidor Jekyll se regenerará automáticamente."
echo "Si no se regenera, presiona Ctrl+C y ejecuta: bundle exec jekyll serve"