#!/usr/bin/env ruby
# frozen_string_literal: true

# merge_cv.rb - Combina cv_base.yml + overlay para generar cv.yml final
# Uso: ruby merge_cv.rb [version]
# Versiones: fullstack, arquitectura, angular_backend, institucion_publica

require 'yaml'
require 'fileutils'

VERSION = ARGV[0]
OVERLAYS = {
  'fullstack' => 'cv_fullstack_overlay.yml',
  'arquitectura' => 'cv_arquitectura_overlay.yml',
  'angular_backend' => 'cv_angular_backend_overlay.yml',
  'institucion_publica' => 'cv_institucionpublica_overlay.yml'
}.freeze

def deep_merge(base, overlay)
  result = base.dup
  overlay.each do |key, value|
    if result[key].is_a?(Array) && value.is_a?(Array)
      # Para arrays de sections: merge por title
      result[key] = merge_sections(result[key], value)
    elsif result[key].is_a?(Hash) && value.is_a?(Hash)
      result[key] = deep_merge(result[key], value)
    else
      result[key] = value
    end
  end
  result
end

def merge_sections(base_sections, overlay_sections)
  # Crear hash por title para merge fácil
  base_by_title = {}
  base_sections.each { |s| base_by_title[s['title']] = s }

  overlay_sections.each do |overlay_section|
    title = overlay_section['title']
    if base_by_title[title]
      # Merge entries por title si es posible, sino reemplazar
      base_section = base_by_title[title]
      if base_section['entries'].is_a?(Array) && overlay_section['entries'].is_a?(Array)
        base_section['entries'] = merge_entries(base_section['entries'], overlay_section['entries'])
      else
        base_by_title[title] = overlay_section
      end
    else
      base_by_title[title] = overlay_section
    end
  end

  # Mantener orden: base primero, luego overlay nuevas al final
  ordered = []
  seen = Set.new
  base_sections.each do |s|
    ordered << base_by_title[s['title']]
    seen.add(s['title'])
  end
  overlay_sections.each do |s|
    ordered << base_by_title[s['title']] unless seen.include?(s['title'])
  end
  ordered
end

def merge_entries(base_entries, overlay_entries)
  # Para entries: merge por title (company/degree/etc)
  base_by_title = {}
  base_entries.each { |e| base_by_title[e['title']] = e }

  overlay_entries.each do |overlay_entry|
    title = overlay_entry['title']
    if base_by_title[title]
      # Merge bullets (agregar únicos)
      base_entry = base_by_title[title]
      if base_entry['bullets'].is_a?(Array) && overlay_entry['bullets'].is_a?(Array)
        # Combinar bullets únicos
        combined = base_entry['bullets'] + overlay_entry['bullets'].reject { |b| base_entry['bullets'].include?(b) }
        base_entry['bullets'] = combined
      end
      # Sobrescribir otros campos
      overlay_entry.each { |k, v| base_entry[k] = v unless k == 'bullets' }
    else
      base_by_title[title] = overlay_entry
    end
  end

  # Mantener orden original de base, agregar nuevos al final
  ordered = []
  seen = Set.new
  base_entries.each do |e|
    ordered << base_by_title[e['title']]
    seen.add(e['title'])
  end
  overlay_entries.each do |e|
    ordered << base_by_title[e['title']] unless seen.include?(e['title'])
  end
  ordered
end

def main
  unless VERSION && OVERLAYS[VERSION]
    puts "Uso: ruby merge_cv.rb [version]"
    puts "Versiones: #{OVERLAYS.keys.join(', ')}"
    exit 1
  end

  base_path = '_data/cv_base.yml'
  overlay_path = "_data/#{OVERLAYS[VERSION]}"
  output_path = '_data/cv.yml'

  unless File.exist?(base_path)
    puts "❌ Error: No existe #{base_path}"
    exit 1
  end

  unless File.exist?(overlay_path)
    puts "❌ Error: No existe #{overlay_path}"
    exit 1
  end

  puts "🔄 Generando #{output_path} desde base + #{OVERLAYS[VERSION]}..."

  base = YAML.load_file(base_path)
  overlay = YAML.load_file(overlay_path)

  merged = deep_merge(base, overlay)

  File.write(output_path, merged.to_yaml(line_width: -1))

  puts "✅ CV generado exitosamente: #{output_path}"
  puts "   Versión: #{VERSION}"
  puts "   Secciones: #{merged['sections'].size}"
end

main