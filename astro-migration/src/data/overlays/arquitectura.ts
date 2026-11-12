// ============================================================================
// Overlay: Arquitectura y Liderazgo
// Enfatiza: arquitectura, Kubernetes, cloud, DevOps, liderazgo
// ============================================================================

import type { CVData, CVSection, CVEntry } from '../../types/cv';

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

export const cvArquitecturaOverlay: Partial<CVData> = {
  sections: [
    // Perfil: sobrescribir con enfoque arquitectura
    section('Perfil Profesional', [
      entry({
        title: 'Arquitecto de Software y Líder Técnico',
        bullets: [
          'Ingeniero de Sistemas con sólida experiencia en arquitectura de software y liderazgo técnico en el sector público',
          'Especializado en diseño de arquitecturas de microservicios, Kubernetes, Onion Architecture y patrones Event-Driven',
          'Liderazgo en definición de estándares técnicos, gobernanza tecnológica y modernización de infraestructura',
          'Experiencia en implementación de plataformas CI/CD, observabilidad (ELK Stack) y gestión de secretos (Vault)',
          'Promotor de innovación mediante Inteligencia Artificial, modelos RAG y agentes de IA',
          'Me gusta innovar y crear sistemas con las mejores prácticas, en constante aprendizaje con las últimas tendencias tecnológicas',
        ],
      }),
    ]),

    // Experiencia: sobrescribir con enfoque arquitectura (solo roles relevantes)
    section('Experiencia Profesional', [
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
    ]),

    // Skills: reorganizar con enfoque arquitectura
    section('Competencias Técnicas', [
      entry({
        title: 'Arquitectura de Software',
        bullets: [
          'Microservicios y arquitecturas distribuidas',
          'Onion Architecture / Clean Architecture',
          'Event-Driven Architecture',
          'Domain-Driven Design (DDD)',
          'CQRS y Event Sourcing',
          'API Design (REST / SOAP)',
        ],
      }),
      entry({
        title: 'Cloud & DevOps',
        bullets: [
          'Docker y Kubernetes (K8s)',
          'GitLab CI/CD pipelines',
          'Azure Cloud Services',
          'HashiCorp Vault (gestión de secretos)',
          'ArgoCD (GitOps)',
          'Infrastructure as Code',
        ],
      }),
      entry({
        title: 'Observabilidad y Monitoreo',
        bullets: [
          'ELK Stack (Elasticsearch, Logstash, Kibana)',
          'Centralización de logs',
          'Métricas y tracing distribuido',
          'Alerting y monitoring',
          'SonarQube (calidad de código)',
          'JMeter (testing de rendimiento)',
        ],
      }),
      entry({
        title: 'Seguridad e Identidad',
        bullets: [
          'Keycloak (OAuth2 / OpenID Connect)',
          'Autenticación y autorización',
          'Seguridad institucional',
          'Gestión de secretos con Vault',
          'OWASP security best practices',
        ],
      }),
      entry({
        title: 'Backend Development',
        bullets: [
          'Java (JDK 11-21), Spring Boot, Quarkus',
          '.NET Core / .NET 6+',
          'Go (Golang)',
          'PostgreSQL, MongoDB, Oracle',
          'Entity Framework, Dapper, Hibernate',
        ],
      }),
      entry({
        title: 'Liderazgo y Gestión',
        bullets: [
          'Liderazgo técnico de equipos TI',
          'Gestión de proyectos y equipos Scrum',
          'Scrum Master',
          'Definición de estándares técnicos',
          'Gobernanza tecnológica',
          'Mentoría y capacitación de equipos',
        ],
      }),
    ]),

    // Certificaciones: solo las relevantes para arquitectura
    section('Certificaciones y Cursos', [
      entry({
        title: 'Java Avanzado',
        sub: 'IQuattro',
        dates: 'Noviembre 2022 – Diciembre 2022',
        bullets: ['Curso de 30 horas', 'Java avanzado y patrones de diseño'],
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
    ]),

    // Soft Skills: enfocar en liderazgo
    section('Soft Skills', [
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
    ]),

    // Referencias: filtrar solo las relevantes para arquitectura
    section('Referencias Profesionales', [
      entry({
        title: 'Carlos Monrroy',
        sub: 'Aduana Nacional',
        dates: '71232055',
        bullets: ['Contacto disponible para referencias'],
      }),
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
    ]),
  ],
};