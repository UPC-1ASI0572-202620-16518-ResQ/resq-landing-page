export const RESQ_LINKS = {
  segment01: '',
  segment02: '',
  aboutProductVideo: '',
  aboutTeamVideo: '',
  contactEmail: 'contacto@resq.com',
  canonicalOrigin: '',
};
export const RESQ_LEGAL = {
  entity: 'ResQ — Proyecto académico',
  email: 'contacto@resq.com',
  jurisdiction: 'Perú',
  address: 'Lima, Perú',
  updated: '2026-10-04',
};
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
export const RESQ_MEDIA: Record<string, string> = {
  'hero-segment-01': 'media/hero-01.png',
  'hero-segment-02': 'media/hero-02.png',
};
export const RESQ_PRODUCT_VIDEO = { src: 'media/resq.mp4', poster: '', captions: '' };
export const RESQ_FOOTER = {
  phone: '+51 948 742 332',
  phoneHref: 'tel:+51948742332',
  location: 'Lima, Perú',
  socials: [
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/UPC-1ASI0572-202620-16518-ResQ',
      icon: 'M9 19c-5 1-5-3-7-3m14 6v-4c0-1-.4-2-1-2 4-.5 6-2 6-6 0-1-.4-3-1-4 .3-1 .2-2-.2-3-2 0-3 1-4 2a13 13 0 0 0-6 0C9 4 8 3 6 3c-.5 1-.5 2-.2 3C5 7 5 8 5 10c0 4 2 5 6 6-1 0-2 1-2 2v4',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/',
      icon: 'M5 9v11M5 5v.01M10 20V9m0 5c0-6 9-6 9 0v6',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      url: 'https://www.youtube.com/',
      icon: 'M21 12c0 6-1 7-9 7s-9-1-9-7 1-7 9-7 9 1 9 7ZM10 9l5 3-5 3V9Z',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/',
      icon: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM17 7h.01',
    },
  ],
};
