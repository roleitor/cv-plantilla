// ============================================================================
// Overlay: Full Stack - Sin cambios (usa base completo)
// ============================================================================

import type { CVData } from '../../types/cv';

// Full Stack usa todo el base sin modificaciones
export const cvFullstackOverlay: Partial<CVData> = {
  // No se sobrescribe nada - usa base completo
};

// Helper para merge (se usa en build script)
export function applyOverlay(base: CVData, overlay: Partial<CVData>): CVData {
  return { ...base, ...overlay };
}