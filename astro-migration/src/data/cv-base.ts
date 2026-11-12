// ============================================================================
// CV Base Data - Datos maestros comunes a TODAS las versiones
// Fuente: _data/cv_base.yml (migración YAML → TypeScript)
// ============================================================================

import type { CVData, CVSection, CVEntry } from '../types/cv';

// Helper para crear entries con bullets
const entry = (data: Partial<CVEntry> & { title: string; bullets?: string[] }): CVEntry => ({
  title: data.title,
  sub: data.sub,
  location: data.location,
  dates: data.dates,
  nivel: data.nivel,
  horas: data.horas,
  bullets: data.bullets ?? [],
});

const section = (title: string, entries: CVEntry[]): CVSection => ({ title, entries });

// ============================================================================
// PERFIL PROFESIONAL BASE
// ============================================================================
const perfilProfesional = section('Perfil Profesional', [
  entry({
    title: 'Arquitecto de Software y Líder Técnico',
    bullets: [
      'Ingeniero de Sistemas con amplia experiencia en liderazgo técnico y gestión de equipos de desarrollo en el sector público',
      'Especializado en diseño de arquitecturas de microservicios, seguridad institucional, CI/CD y plataformas basadas en Kubernetes',
      'Liderazgo en la definición de estándares técnicos y promotor de iniciativas de innovación mediante Inteligencia Artificial',
      'Experiencia con modelos RAG y agentes de IA orientados a optimización de procesos y gestión del conocimiento institucional',
      'Me gusta innovar y crear sistemas con las mejores prácticas, en constante aprendizaje con las últimas tendencias tecnológicas',
    ],
  }),
]);

// ============================================================================
// EXPERIENCIA PROFESIONAL BASE (completa)
// ============================================================================
const experienciaProfesional = section('Experiencia Profesional', [
  entry({
    title: 'Aduana Nacional',
    sub: 'Supervisor de Desarrollo de Sistemas',
    location: 'Bolivia',
    dates: 'Junio 2023 – Actual',
    bullets: [
      'Liderazgo de equipos TI en proyectos de desarrollo de software institucional',
      'Definición de nueva arquitectura tecnológica basada en Kubernetes, Onion Architecture y enfoque Event-Driven',
      'Integración de plataformas transversales: Vault (gestión de secretos), ELK Stack (observabilidad) y MinIO (almacenamiento de objetos)',
      'Evaluación e incorporación de Inteligencia Artificial (RAG) para gestión documental y apoyo a procesos internos',
      'Gestión de gobernanza tecnológica y definición de estándares de desarrollo',
      '[LOGRO A COMPLETAR] Mejora de métricas específicas (ej: reducción de tiempo de deployment en XX%, ahorro de recursos en $XXk/año)',
    ],
  }),
  entry({
    title: 'Servicio de Impuestos Nacionales',
    sub: 'Profesional F - Scrum Master / Arquitecto de Software',
    location: 'Zona Sur, Los Pinos, Av. José Aguirre entre calle 25 y calle 5',
    dates: 'Marzo 2022 – Mayo 2023',
    bullets: [
      'Rol como Scrum Master y Arquitecto de Software liderando equipos de desarrollo',
      'Diseño e implementación de arquitectura de microservicios con Java y Onion Architecture',
      'Definición de estándares de seguridad institucional mediante Keycloak (OAuth2 / OpenID Connect)',
      'Implementación de pipelines CI/CD en GitLab con integración de SonarQube para control de calidad',
      'Integración del stack ELK para centralización de logs y monitoreo',
      'Definición de patrones de diseño y mejores prácticas de desarrollo',
      '[LOGRO A COMPLETAR] Implementación exitosa de XX microservicios, reducción de deuda técnica en XX%',
    ],
  }),
  entry({
    title: 'Servicio de Impuestos Nacionales',
    sub: 'Profesional J - Scrum Master / Arquitecto de Software',
    location: 'Zona Sur, Los Pinos, Av. José Aguirre entre calle 25 y calle 5',
    dates: 'Abril 2021 – Marzo 2022',
    bullets: [
      'Rol como Scrum Master y Arquitecto de Software',
      'Diseño de arquitectura .NET Core para Web API del SIAT en línea',
      'Implementación de arquitectura Onion con patrones CQRS y MediatR',
      'Integración de Vault para gestión de secretos y ELK Stack para logs en .NET Core',
      'Definición de estándares de desarrollo y creación de librerías reutilizables',
      '[LOGRO A COMPLETAR] Optimización de XX procesos del SIAT, mejora de performance en XX%',
    ],
  }),
  entry({
    title: 'Servicio de Impuestos Nacionales',
    sub: 'Consultor Profesional I',
    location: 'Zona Sur, Los Pinos, Av. José Aguirre entre calle 25 y calle 5',
    dates: 'Junio 2020 – Diciembre 2020',
    bullets: [
      'Desarrollo de sistemas de información full stack',
      'Desarrollo del sistema de facturación electrónica virtual',
      'Desarrollo de servicios back-end REST/SOAP',
      'Desarrollo de interfaces front-end con JSF y Angular',
      'Desarrollo de aplicaciones de escritorio con JavaFX',
      '[LOGRO A COMPLETAR] Contribución en XX módulos del sistema',
    ],
  }),
  entry({
    title: 'Servicio de Impuestos Nacionales',
    sub: 'Consultor Profesional J',
    location: 'Zona Sur, Los Pinos, Av. José Aguirre entre calle 25 y calle 5',
    dates: 'Febrero 2020 – Junio 2020',
    bullets: [
      'Desarrollar el sistema de facturación electrónica SIAT, programación full stack',
      'Aplicaciones de escritorio con JavaFX',
      'Servicios web SOAP/REST',
      'Desarrollo con JSF y Angular',
      '[LOGRO A COMPLETAR] Desarrollo de XX componentes del SIAT',
    ],
  }),
  entry({
    title: 'Servicio de Impuestos Nacionales',
    sub: 'Consultor Técnico I',
    location: 'Zona Sur, Los Pinos, Av. José Aguirre entre calle 25 y calle 5',
    dates: 'Marzo 2019 – Diciembre 2019',
    bullets: [
      'Analizar, desarrollar y realizar pruebas en los sistemas asignados',
      'Módulo Estados Financieros',
      'Módulo Facturación Electrónica',
      'Módulo Hoteles',
      'Módulo Agentes de Información',
      '[LOGRO A COMPLETAR] Testing y desarrollo de XX módulos',
    ],
  }),
  entry({
    title: 'ENTEL S.A.',
    sub: 'Consultor Técnico IRB',
    location: 'Oruro, Calle Bolívar entre Calle Pagador, Edificio ENTEL',
    dates: 'Agosto 2017 – Julio 2018',
    bullets: [
      'Realizar prospecciones técnicas de nuevas radio bases',
      'Supervisar la instalación y funcionamiento de radio bases',
      'Elaborar la base de datos de seguimiento del proyecto',
      '[LOGRO A COMPLETAR] Supervisión de XX instalaciones exitosas',
    ],
  }),
  entry({
    title: 'ENTEL S.A.',
    sub: 'Consultor Técnico TIC',
    location: 'Oruro, Calle Bolívar entre Calle Pagador, Edificio ENTEL',
    dates: 'Agosto 2016 – Febrero 2017',
    bullets: [
      'Supervisar la instalación de telecentros satelitales y radio bases',
      'Efectuar el soporte preventivo y correctivo de los telecentros satelitales',
      'Realizar la prospección técnica de radio bases',
      '[LOGRO A COMPLETAR] Cobertura de XX regiones con telecentros',
    ],
  }),
]);

// ============================================================================
// EDUCACIÓN BASE
// ============================================================================
const educacion = section('Educación', [
  entry({
    title: 'Diplomado en Educación Superior',
    sub: 'Universidad Mayor de San Andrés',
    location: 'Bolivia',
    dates: 'Febrero 2022 – Julio 2022',
    bullets: ['Formación en pedagogía y educación superior'],
  }),
  entry({
    title: 'Diplomado en Desarrollo de Aplicaciones con Software Libre',
    sub: 'Escuela de Gestión Pública Plurinacional (EGGP)',
    location: 'Bolivia',
    dates: 'Agosto 2019 – Diciembre 2019',
    bullets: ['Desarrollo con tecnologías de software libre'],
  }),
  entry({
    title: 'Ingeniería de Sistemas',
    sub: 'Facultad Nacional de Ingeniería',
    location: 'Universidad Técnica de Oruro',
    dates: 'Enero 2005 – Julio 2012',
    bullets: ['[OPCIONAL] Tesis: [Título de tesis si aplica]'],
  }),
  entry({
    title: 'Bachiller en Humanidades',
    sub: 'Colegio Venezuela C',
    location: '',
    dates: 'Febrero 2000 – Noviembre 2004',
    bullets: ['Educación secundaria'],
  }),
]);

// ============================================================================
// COMPETENCIAS TÉCNICAS BASE (completa)
// ============================================================================
const competenciasTecnicas = section('Competencias Técnicas', [
  entry({
    title: 'Lenguajes de Programación',
    bullets: [
      'Java (JDK 11-21)',
      'C# / .NET Core (5-7)',
      'Go',
      'Python',
      'JavaScript, TypeScript',
      'Kotlin (Curso Profesional)',
    ],
  }),
  entry({
    title: 'Frameworks y Tecnologías Backend',
    bullets: [
      'Spring Boot, Quarkus, Javalin, Spark',
      '.NET Core / .NET 6+',
      'Sql2o, Dapper',
      'Hibernate, Entity Framework',
      'Node.js (API development)',
    ],
  }),
  entry({
    title: 'Frameworks Frontend',
    bullets: [
      'Angular 14+',
      'TypeScript',
      'JSF (JavaServer Faces)',
      'Razor Pages (.NET)',
      'JavaFX (aplicaciones de escritorio)',
      'HTML5, CSS3, JavaScript',
      'StreamLit',
      'Flutter',
    ],
  }),
  entry({
    title: 'Bases de Datos',
    bullets: ['PostgreSQL', 'MongoDB', 'Oracle'],
  }),
  entry({
    title: 'APIs y Servicios Web',
    bullets: [
      'REST APIs',
      'SOAP Services',
      'NestJS (framework Node.js)',
      'APIDOC (documentación de APIs)',
    ],
  }),
  entry({
    title: 'Testing y Calidad',
    bullets: [
      'SonarQube (calidad de código)',
      'JMeter (testing de rendimiento)',
      'Testing de aplicaciones web',
    ],
  }),
  entry({
    title: 'DevOps y Herramientas',
    bullets: [
      'GitLab CI/CD',
      'Git, GitLab',
      'Docker',
      'Vault (gestión de secretos)',
      'ELK Stack (logs y monitoreo)',
    ],
  }),
  entry({
    title: 'Seguridad',
    bullets: [
      'Keycloak (OAuth2 / OpenID Connect)',
      'Autenticación y autorización',
    ],
  }),
  entry({
    title: 'Inteligencia Artificial',
    bullets: [
      'Orquestador de Agentes y Herder',
      'Agentes CLI: Claudecode, Opencode, Grok, Debin, Cline, Gemini CLI, Amp',
      'WorkFlow con Agentes con CrewAI y LangChain',
      'Agentes personales: OpenClaw y Hermes',
      'Modelos LLM: Gemini, Qwen, Grok, GPT, Mistral, DeepSeek, Mimo, Aider',
      'Plataformas: OpenRouter, llama.cpp',
    ],
  }),
]);

// ============================================================================
// CERTIFICACIONES Y CURSOS BASE (TODAS, ordenadas por fecha DESC)
// ============================================================================
const certificaciones = section('Certificaciones y Cursos', [
  entry({
    title: 'Curso de Git, Gitlab, Gitlab CI/CD',
    sub: 'IQuattro',
    horas: '30',
    dates: '4 al 15 de noviembre de 2024',
    bullets: ['Curso de 30 horas'],
  }),
  entry({
    title: 'Curso de Docker y Kubernetes',
    sub: 'IQuattro',
    horas: '25',
    dates: '21 al 31 de octubre de 2024',
    bullets: ['Curso de 25 horas'],
  }),
  entry({
    title: 'Taller de Pruebas de Software Manuales y Automatizadas con Postman, Playwright y K6',
    sub: 'IQuattro',
    horas: '30',
    dates: '7 al 18 de octubre de 2024',
    bullets: ['Taller de 30 horas'],
  }),
  entry({
    title: 'Curso de Junit, Jmeter, Selenium',
    sub: 'IQuattro',
    horas: '30',
    dates: '7 al 18 de octubre de 2024',
    bullets: ['Curso de 30 horas'],
  }),
  entry({
    title: 'Curso de ISTQB Certified Tester',
    sub: 'IQuattro',
    horas: '20',
    dates: '23 de septiembre al 3 de octubre de 2024',
    bullets: ['Curso de 20 horas'],
  }),
  entry({
    title: 'Curso de Desarrollo de Aplicaciones Móviles sobre Software Libre',
    sub: 'IQuattro',
    horas: '25',
    dates: '9 al 19 de septiembre de 2024',
    bullets: ['Curso de 25 horas'],
  }),
  entry({
    title: 'Curso de Spring Boot Avanzado',
    sub: 'IQuattro',
    horas: '24',
    dates: '28 de agosto al 6 de septiembre de 2024',
    bullets: ['Curso de 24 horas'],
  }),
  entry({
    title: 'Curso de Angular Avanzado',
    sub: 'IQuattro',
    horas: '20',
    dates: '19 al 27 de agosto de 2024',
    bullets: ['Curso de 20 horas'],
  }),
  entry({
    title: 'Curso de NestJS',
    sub: 'IQuattro',
    horas: '20',
    dates: '7 al 15 de agosto de 2024',
    bullets: ['Curso de 20 horas'],
  }),
  entry({
    title: 'Curso de Arquitectura',
    sub: 'IQuattro',
    horas: '15',
    dates: '29 de julio al 2 de agosto de 2024',
    bullets: ['Curso de 15 horas'],
  }),
  entry({
    title: 'Responsabilidad por la Función Pública',
    sub: 'CENCAP',
    horas: '10',
    dates: '10 al 18 de abril de 2023',
    bullets: ['Curso de 10 horas'],
  }),
  entry({
    title: 'Políticas Públicas',
    sub: 'CENCAP',
    horas: '10',
    dates: '6 al 14 de febrero de 2023',
    bullets: ['Curso de 10 horas'],
  }),
  entry({
    title: 'Ley N° 1178',
    sub: 'CENCAP',
    horas: '10',
    dates: '27 de febrero al 7 de marzo de 2023',
    bullets: ['Curso de 10 horas'],
  }),
  entry({
    title: 'Prevención de la Violencia',
    sub: 'EGGP',
    horas: '50',
    dates: '9 al 22 de agosto de 2021',
    bullets: ['Curso de 50 horas'],
  }),
  entry({
    title: 'Java Avanzado',
    sub: 'IQuattro',
    horas: '30',
    dates: '28 de noviembre al 8 de diciembre de 2022',
    bullets: ['Curso de 30 horas', 'Java avanzado y patrones de diseño'],
  }),
  entry({
    title: 'Programación en Java 11 Avanzado',
    sub: 'IQuattro',
    horas: '20',
    dates: '1 al 11 de noviembre de 2022',
    bullets: ['Curso de 20 horas'],
  }),
  entry({
    title: 'Profesional Angular',
    sub: 'Código Facilito',
    dates: 'Abril 2023',
    bullets: ['Curso profesional de 5 horas', 'Desarrollo de aplicaciones con Angular'],
  }),
  entry({
    title: 'Profesional TypeScript',
    sub: 'Código Facilito',
    dates: 'Abril 2023',
    bullets: ['Curso profesional de 3 horas', 'TypeScript avanzado para desarrollo web'],
  }),
  entry({
    title: 'Go Programming',
    sub: 'SoloLearn',
    dates: 'Enero 2023',
    bullets: ['Curso de 5 horas', 'Desarrollo con lenguaje Go'],
  }),
  entry({
    title: 'C# Programming',
    sub: 'SoloLearn',
    dates: 'Enero 2023',
    bullets: ['Curso de 5 horas', 'Desarrollo con C# y .NET'],
  }),
  entry({
    title: 'Curso Profesional de Kotlin',
    sub: 'Código Facilito',
    dates: 'Mayo 2022',
    bullets: ['Curso profesional de 2 horas', 'Desarrollo con Kotlin'],
  }),
  entry({
    title: 'HTML',
    sub: 'SoloLearn',
    dates: 'Julio 2020',
    bullets: ['Curso de 4 horas', 'HTML5 y desarrollo web'],
  }),
  entry({
    title: 'Angular + NestJS',
    sub: 'SoloLearn',
    dates: 'Febrero 2021',
    bullets: ['Curso de 3 horas', 'Full stack con Angular y NestJS'],
  }),
  entry({
    title: 'JavaScript',
    sub: 'SoloLearn',
    dates: 'Febrero 2021',
    bullets: ['Curso de 5 horas', 'JavaScript moderno'],
  }),
  entry({
    title: 'Java',
    sub: 'SoloLearn',
    dates: 'Febrero 2021',
    bullets: ['Curso de 5 horas', 'Fundamentos de Java'],
  }),
  entry({
    title: 'Aprendiendo a hacer API con Node.js',
    sub: 'Udemy',
    dates: 'Octubre 2020',
    bullets: ['Curso de 5 horas', 'Desarrollo de APIs REST con Node.js'],
  }),
  entry({
    title: 'Introducción a Java desde Cero',
    sub: 'Udemy',
    dates: 'Marzo 2020',
    bullets: ['Curso de 2.5 horas', 'Fundamentos de programación con Java'],
  }),
  entry({
    title: 'Curso JavaFX - Aplicaciones de Escritorio Modernas',
    sub: 'Udemy',
    dates: 'Marzo 2020',
    bullets: ['Curso de 1.5 horas', 'Desarrollo de aplicaciones de escritorio con JavaFX'],
  }),
  entry({
    title: 'JMeter - Step by Step for Beginners',
    sub: 'Udemy',
    dates: 'Marzo 2020',
    bullets: ['Curso de 8 horas', 'Testing de rendimiento con JMeter'],
  }),
]);

// ============================================================================
// IDIOMAS BASE
// ============================================================================
const idiomas = section('Idiomas', [
  entry({
    title: 'Español',
    bullets: ['Nativo'],
  }),
  entry({
    title: 'Inglés',
    bullets: [
      'Profesional / Técnico (B2)',
      'Lectura de documentación técnica',
      'Comunicación en entornos de trabajo',
    ],
  }),
]);

// ============================================================================
// SOFT SKILLS BASE
// ============================================================================
const softSkills = section('Soft Skills', [
  entry({
    title: 'Liderazgo',
    bullets: [
      'Liderazgo técnico y de equipos',
      'Scrum Master',
      'Toma de decisiones estratégicas',
      'Resolución de conflictos',
      'Motivación de equipos',
    ],
  }),
  entry({
    title: 'Comunicación',
    bullets: [
      'Comunicación técnica efectiva',
      'Presentación a stakeholders',
      'Documentación clara',
      'Negociación',
    ],
  }),
  entry({
    title: 'Aprendizaje Continuo',
    bullets: [
      'Constante actualización tecnológica',
      'Auto-didacta',
      'Innovación y mejora continua',
    ],
  }),
]);

// ============================================================================
// REFERENCIAS PROFESIONALES BASE
// ============================================================================
const referencias = section('Referencias Profesionales', [
  entry({
    title: 'Luis Landaeta',
    sub: 'Servicio de Impuestos Nacionales',
    dates: '75271537',
    bullets: ['Contacto disponible para referencias'],
  }),
  entry({
    title: 'Cristina Gutierrez',
    sub: 'Servicio de Impuestos Nacionales',
    dates: '71918110',
    bullets: ['Contacto disponible para referencias'],
  }),
  entry({
    title: 'Ignacio Mendoza',
    sub: 'ENTEL S.A.',
    dates: '72550080',
    bullets: ['Contacto disponible para referencias'],
  }),
  entry({
    title: 'Carlos Monrroy',
    sub: 'Aduana Nacional',
    dates: '71232055',
    bullets: ['Contacto disponible para referencias'],
  }),
  entry({
    title: 'Ramiro Mercado',
    sub: 'Aduana Nacional',
    dates: '72045373',
    bullets: ['Contacto disponible para referencias'],
  }),
  entry({
    title: 'Fernando Yañez',
    sub: 'Servicio de Impuestos Nacionales',
    dates: '72590163',
    bullets: ['Contacto disponible para referencias'],
  }),
]);

// ============================================================================
// EXPORT: CV BASE COMPLETO
// ============================================================================
export const cvBase: CVData = {
  sections: [
    perfilProfesional,
    experienciaProfesional,
    educacion,
    competenciasTecnicas,
    certificaciones,
    idiomas,
    softSkills,
    referencias,
  ],
};