// ============================================================================
// Merge Utility - Combina cvBase + overlay para generar CV final
// ============================================================================

import type { CVData, CVSection, CVEntry } from '../types/cv';
import { cvBase } from './cv-base';
import { OVERLAYS, type CVVersion } from './overlays';

/**
 * Merge profundo de dos arrays de secciones por title
 */
function mergeSections(
  baseSections: CVSection[],
  overlaySections: CVSection[]
): CVSection[] {
  const result = new Map<string, CVSection>();

  // Procesar base primero
  for (const baseSection of baseSections) {
    result.set(baseSection.title, { ...baseSection });
  }

  // Aplicar overlays
  for (const overlaySection of overlaySections) {
    const existing = result.get(overlaySection.title);
    if (existing) {
      // Merge entries por title
      result.set(overlaySection.title, {
        title: overlaySection.title,
        entries: mergeEntries(existing.entries, overlaySection.entries),
      });
    } else {
      // Nueva sección del overlay
      result.set(overlaySection.title, { ...overlaySection });
    }
  }

  // Mantener orden: base primero, luego overlay nuevas
  const ordered: CVSection[] = [];
  const seen = new Set<string>();

  for (const baseSection of baseSections) {
    ordered.push(result.get(baseSection.title)!);
    seen.add(baseSection.title);
  }

  for (const overlaySection of overlaySections) {
    if (!seen.has(overlaySection.title)) {
      ordered.push(result.get(overlaySection.title)!);
      seen.add(overlaySection.title);
    }
  }

  return ordered;
}

/**
 * Merge de entries por title (company, degree, etc.)
 */
function mergeEntries(baseEntries: CVEntry[], overlayEntries: CVEntry[]): CVEntry[] {
  const result = new Map<string, CVEntry>();

  // Base primero
  for (const baseEntry of baseEntries) {
    result.set(baseEntry.title, { ...baseEntry });
  }

  // Overlay entries
  for (const overlayEntry of overlayEntries) {
    const existing = result.get(overlayEntry.title);
    if (existing) {
      // Merge bullets (unión única)
      const baseBullets = existing.bullets ?? [];
      const overlayBullets = overlayEntry.bullets ?? [];
      const mergedBullets = [
        ...baseBullets,
        ...overlayBullets.filter(b => !baseBullets.includes(b)),
      ];

      result.set(overlayEntry.title, {
        ...existing,
        ...overlayEntry,
        bullets: mergedBullets,
      });
    } else {
      result.set(overlayEntry.title, { ...overlayEntry });
    }
  }

  // Mantener orden
  const ordered: CVEntry[] = [];
  const seen = new Set<string>();

  for (const baseEntry of baseEntries) {
    ordered.push(result.get(baseEntry.title)!);
    seen.add(baseEntry.title);
  }

  for (const overlayEntry of overlayEntries) {
    if (!seen.has(overlayEntry.title)) {
      ordered.push(result.get(overlayEntry.title)!);
      seen.add(overlayEntry.title);
    }
  }

  return ordered;
}

/**
 * Genera CV final combinando base + overlay de versión
 */
export function generateCV(version: CVVersion): CVData {
  const overlay = OVERLAYS[version];

  if (!overlay.sections || overlay.sections.length === 0) {
    // Sin overlay (fullstack) - devolver base tal cual
    return cvBase;
  }

  return {
    sections: mergeSections(cvBase.sections, overlay.sections),
  };
}

/**
 * Genera todas las versiones
 */
export function generateAllCVs(): Record<CVVersion, CVData> {
  const versions: CVVersion[] = ['fullstack', 'arquitectura', 'angular_backend', 'institucion_publica'];
  const result: Record<CVVersion, CVData> = {} as Record<CVVersion, CVData>;

  for (const version of versions) {
    result[version] = generateCV(version);
  }

  return result;
}