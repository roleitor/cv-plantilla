// ============================================================================
// Overlays Index - Exporta todos los overlays disponibles
// ============================================================================

import type { CVData, CVVersion } from '../../types/cv';
import { cvFullstackOverlay } from './fullstack';
import { cvArquitecturaOverlay } from './arquitectura';
import { cvAngularBackendOverlay } from './angular_backend';
import { cvInstitucionPublicaOverlay } from './institucion_publica';

// Re-export para que los overlays y las páginas usen un único tipo canónico
export type { CVVersion };

export const OVERLAYS: Record<CVVersion, Partial<CVData>> = {
  fullstack: cvFullstackOverlay,
  arquitectura: cvArquitecturaOverlay,
  angular_backend: cvAngularBackendOverlay,
  institucion_publica: cvInstitucionPublicaOverlay,
};

export const VERSION_LABELS: Record<CVVersion, string> = {
  fullstack: '🎯 Full Stack',
  arquitectura: '🏗️ Arquitectura',
  angular_backend: '💻 Angular & Backend',
  institucion_publica: '🏛️ Institución Pública',
};

export const VERSION_DESCRIPTIONS: Record<CVVersion, string> = {
  fullstack: 'Versión completa con toda la experiencia y habilidades',
  arquitectura: 'Enfocado en arquitectura, Kubernetes, DevOps y liderazgo',
  angular_backend: 'Enfocado en Angular, Java, .NET y desarrollo full stack',
  institucion_publica: 'Enfocado para sector público (SIN, Aduana, CENCAP, EGGP)',
};