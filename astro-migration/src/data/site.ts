// ============================================================================
// Configuración del Sitio - Astro Migration
// ============================================================================

import type { SiteConfig } from '../types/cv';
import { withBase } from '../utils/url';

export const siteConfig: SiteConfig = {
  title: 'Rolando Moises Quispe Mendoza',
  lang: 'es',
  email: 'rolomen_20@hotmail.com',
  phone: '+591 63100619',
  address: 'La Paz - Bolivia',
  website: 'https://github.com/roleitor',
  department: 'Arquitecto de Software & Líder Técnico',
  affiliation: 'Sector Público • Bolivia',
  about_profile_image: withBase('images/profile.jpg'),
  linkedin: 'rolomen',
  github: 'roleitor',
  twitter: '',
  telegram: '',
  leetcode: '',
  description: 'CV Profesional - Rolando Moises Quispe Mendoza • Arquitecto de Software & Líder Técnico',
  url: 'https://roleitor.github.io/cv-plantilla',
  cv_version: 'cv.yml',
};