// Empty URLs are intentional. Supply only verified ResQ destinations.
export const RESQ_LINKS = {
  segment01: '',
  segment02: '',
  aboutProductVideo: '',
  aboutTeamVideo: '',
  contactEmail: '',
  canonicalOrigin: '',
};
export const RESQ_LEGAL = {
  entity: '[LEGAL ENTITY]',
  email: '[CONTACT EMAIL]',
  jurisdiction: '[JURISDICTION]',
  address: '[ADDRESS]',
  updated: '[LAST UPDATED]',
};
// Official segments supplied by the project owner, from the project document.
export const RESQ_SEGMENTS = [
  {
    id: 'segment01',
    name: {
      es: 'Propietarios y administradores de edificaciones',
      en: 'Building owners and managers',
    },
    need: {
      es: 'Saber qué ocurre, dónde está el riesgo y qué requiere atención en tu edificación.',
      en: 'Know what is happening, where the risk is and what needs attention in your building.',
    },
    copy: {
      es: 'ResQ conecta el monitoreo con alertas e información contextual para facilitar la gestión de respuesta. La visibilidad del tipo y la ubicación del riesgo ayuda a decidir el siguiente paso.',
      en: 'ResQ connects monitoring with alerts and contextual information to support response management. Visibility into the type and location of risk helps inform the next step.',
    },
    benefits: [
      {
        es: 'Visibilidad del tipo y ubicación del riesgo',
        en: 'Visibility into the type and location of risk',
      },
      {
        es: 'Alertas e información para una respuesta oportuna',
        en: 'Alerts and information for a timely response',
      },
      {
        es: 'Registro de eventos como necesidad de gestión',
        en: 'Event history as a management need',
      },
    ],
    cta: { es: 'Explora ResQ para tu edificación', en: 'Explore ResQ for your building' },
    hero: { es: 'Cuando el riesgo aparece, ResQ responde', en: 'When risk emerges, ResQ responds' },
    heroAccent: { es: '', en: '' },
    heroCta: { es: 'Conoce cómo funciona', en: 'See how it works' },
    heroCopy: {
      es: 'ResQ conecta sensores, procesamiento Edge y actuadores para identificar riesgos, comprender su contexto y ejecutar respuestas de seguridad cuando corresponde.',
      en: 'ResQ connects sensors, Edge processing and actuators to identify risks, understand their context and execute safety responses when appropriate.',
    },
  },
  {
    id: 'segment02',
    name: {
      es: 'Empresas integradoras de automatización y gestión de edificios inteligentes',
      en: 'Automation and smart building management integrators',
    },
    need: {
      es: 'Conectar sensores, dispositivos y automatización con la infraestructura que ya existe.',
      en: 'Connect sensors, devices and automation with existing infrastructure.',
    },
    copy: {
      es: 'Explora el recorrido IoT de ResQ, desde las señales del entorno hasta las personas que necesitan actuar. Define los requisitos de interoperabilidad y configuración para tu proyecto de integración.',
      en: 'Explore the ResQ IoT journey, from environmental signals to the people who need to act. Define interoperability and configuration requirements for your integration project.',
    },
    benefits: [
      {
        es: 'Interoperabilidad como prioridad del proyecto',
        en: 'Interoperability as a project priority',
      },
      {
        es: 'Necesidades de configuración y escalabilidad',
        en: 'Configuration and scalability needs',
      },
      {
        es: 'Documentación y compatibilidad por validar para cada integración',
        en: 'Documentation and compatibility to validate for each integration',
      },
    ],
    cta: { es: 'Conoce ResQ para tu integración', en: 'Discover ResQ for your integration' },
    hero: {
      es: 'Añade seguridad inteligente a tus proyectos',
      en: 'Add intelligent safety to your projects',
    },
    heroAccent: { es: '', en: '' },
    heroCta: { es: 'Conviértete en aliado', en: 'Become a partner' },
    heroCopy: {
      es: 'Integra ResQ a tus soluciones para edificios inteligentes y complementa tu propuesta con capacidades de detección, monitoreo y respuesta ante riesgos.',
      en: 'Integrate ResQ into your smart building solutions and complement your offering with risk detection, monitoring and response capabilities.',
    },
  },
] as const;
export const RESQ_VIDEOS = {
  product: { url: RESQ_LINKS.aboutProductVideo, provider: 'youtube', duration: '' },
  team: { url: RESQ_LINKS.aboutTeamVideo, provider: 'youtube', duration: '' },
};
// All visual slots remain empty until official, approved assets are available.
export const RESQ_MEDIA: Record<string, string> = {
  'hero-segment-01': '/media/hero-01.png',
  'hero-segment-02': '/media/hero-02.png',
};
