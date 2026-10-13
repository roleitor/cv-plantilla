#!/bin/bash

# Script para cambiar entre versiones del CV
# Uso: ./cambiar-version.sh [version]
# versiones: fullstack, arquitectura, angular_backend, institucion_publica

VERSION=$1

case $VERSION in
  fullstack)
    echo "Cambiando a versión Full Stack..."
    cp _data/cv_fullstack.yml _data/cv.yml
    echo "✓ CV cambiado a versión Full Stack"
    ;;
  arquitectura)
    echo "Cambiando a versión Arquitectura y Liderazgo..."
    cp _data/cv_arquitectura.yml _data/cv.yml
    echo "✓ CV cambiado a versión Arquitectura y Liderazgo"
    ;;
  angular_backend)
    echo "Cambiando a versión Angular y Backend..."
    cp _data/cv_angular_backend.yml _data/cv.yml
    echo "✓ CV cambiado a versión Angular y Backend"
    ;;
  institucion_publica)
    echo "Cambiando a versión Institución Pública..."
    cp _data/cv_institucionpublica.yml _data/cv.yml
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
