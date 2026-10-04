export type LegalSection = { titleEs: string; titleEn: string; bodyEs: string; bodyEn: string };
export const LEGAL_CONTENT: Record<'privacy' | 'terms', LegalSection[]> = {
  privacy: [
    {
      titleEs: 'Introducción',
      titleEn: 'Introduction',
      bodyEs:
        'Este documento es un borrador pendiente de validación por [LEGAL ENTITY]. Deben confirmarse el responsable del tratamiento, el alcance del servicio y las obligaciones aplicables en [JURISDICTION].',
      bodyEn:
        'This document is a draft awaiting validation by [LEGAL ENTITY]. The data controller, service scope and applicable obligations in [JURISDICTION] must be confirmed.',
    },
    {
      titleEs: 'Información que recopilamos',
      titleEn: 'Information We Collect',
      bodyEs:
        '[POR CONFIRMAR: categorías de información efectivamente recopiladas, origen y finalidad de cada una]. No se afirma que ResQ recopile todos los datos descritos en este borrador.',
      bodyEn:
        '[TO CONFIRM: information categories actually collected, their source and purpose]. This draft does not assert that ResQ collects every category described here.',
    },
    {
      titleEs: 'Datos de dispositivos e IoT',
      titleEn: 'Device and IoT Data',
      bodyEs:
        '[POR CONFIRMAR: señales de sensores, identificadores de dispositivos, condiciones del entorno y registros de conectividad utilizados por la implementación real].',
      bodyEn:
        '[TO CONFIRM: sensor signals, device identifiers, environmental conditions and connectivity records used by the actual implementation].',
    },
    {
      titleEs: 'Datos de ubicación',
      titleEn: 'Location Data',
      bodyEs:
        '[POR CONFIRMAR: si se utiliza ubicación, su precisión, su origen, los permisos requeridos y la opción de desactivarla].',
      bodyEn:
        '[TO CONFIRM: whether location is used, its precision, source, required permissions and how to disable it].',
    },
    {
      titleEs: 'Datos de cuenta e identidad',
      titleEn: 'Account and Identity Data',
      bodyEs:
        '[POR CONFIRMAR: datos necesarios para crear cuentas, autenticar usuarios y gestionar permisos]. Las credenciales y los datos personales requieren medidas apropiadas de protección.',
      bodyEn:
        '[TO CONFIRM: data required to create accounts, authenticate users and manage permissions]. Credentials and personal data require appropriate protection measures.',
    },
    {
      titleEs: 'Cómo usamos la información',
      titleEn: 'How We Use Information',
      bodyEs:
        '[POR CONFIRMAR: finalidades y base aplicable para detección de riesgos, monitoreo, alertas, gestión de respuesta y acceso seguro].',
      bodyEn:
        '[TO CONFIRM: purposes and applicable basis for risk detection, monitoring, alerts, response management and secure access].',
    },
    {
      titleEs: 'Alertas e información relacionada con emergencias',
      titleEn: 'Alerts and Emergency-Related Information',
      bodyEs:
        '[POR CONFIRMAR: contenido de alertas, destinatarios autorizados, historial y acceso a información contextual]. Debe definirse qué información se comunica en cada situación.',
      bodyEn:
        '[TO CONFIRM: alert content, authorized recipients, history and access to contextual information]. The information communicated in each situation must be defined.',
    },
    {
      titleEs: 'Intercambio de datos',
      titleEn: 'Data Sharing',
      bodyEs:
        '[POR CONFIRMAR: destinatarios, proveedores y circunstancias de comunicación de datos]. No se identifica ninguna integración ni tercero como contratado.',
      bodyEn:
        '[TO CONFIRM: recipients, providers and circumstances for data disclosure]. No integration or third party is identified as contracted.',
    },
    {
      titleEs: 'Conservación de datos',
      titleEn: 'Data Retention',
      bodyEs:
        '[POR CONFIRMAR: plazos por categoría, criterios de conservación, eliminación y copias de respaldo].',
      bodyEn: '[TO CONFIRM: periods by category, retention criteria, deletion and backups].',
    },
    {
      titleEs: 'Seguridad de los datos',
      titleEn: 'Data Security',
      bodyEs:
        '[POR CONFIRMAR: controles implementados para proteger la información y procedimientos ante incidentes]. Este borrador no declara certificaciones ni garantiza seguridad absoluta.',
      bodyEn:
        '[TO CONFIRM: implemented information protection controls and incident procedures]. This draft does not claim certifications or guarantee absolute security.',
    },
    {
      titleEs: 'Cookies y tecnologías similares',
      titleEn: 'Cookies and Similar Technologies',
      bodyEs:
        'Esta landing guarda únicamente la preferencia ES/EN en localStorage con la clave resq-language. Los videos de terceros se cargan solo tras pulsar reproducir y configurar una URL oficial. [POR CONFIRMAR: tecnologías utilizadas por el resto de la plataforma].',
      bodyEn:
        'This landing stores the ES/EN preference in localStorage under resq-language. Third-party videos load only after clicking play and configuring an official URL. [TO CONFIRM: technologies used elsewhere in the platform].',
    },
    {
      titleEs: 'Derechos del usuario',
      titleEn: 'User Rights',
      bodyEs:
        '[POR CONFIRMAR: derechos aplicables, procedimiento de solicitud, verificación de identidad y plazos de atención según la jurisdicción]. Contacto pendiente: [CONTACT EMAIL].',
      bodyEn:
        '[TO CONFIRM: applicable rights, request procedure, identity verification and response periods under the jurisdiction]. Contact pending: [CONTACT EMAIL].',
    },
    {
      titleEs: 'Servicios de terceros',
      titleEn: 'Third-Party Services',
      bodyEs:
        '[POR CONFIRMAR: servicios externos realmente utilizados y sus políticas]. Los proveedores de video pueden aplicar sus propias condiciones cuando se active su contenido.',
      bodyEn:
        '[TO CONFIRM: external services actually used and their policies]. Video providers may apply their own terms when their content is activated.',
    },
    {
      titleEs: 'Transferencias internacionales',
      titleEn: 'International Data Transfers',
      bodyEs:
        '[POR CONFIRMAR: países de tratamiento, transferencias existentes y garantías aplicables].',
      bodyEn: '[TO CONFIRM: processing countries, existing transfers and applicable safeguards].',
    },
    {
      titleEs: 'Menores de edad',
      titleEn: 'Children',
      bodyEs:
        '[POR CONFIRMAR: restricciones de edad, tratamiento de datos de menores y mecanismos de consentimiento cuando correspondan].',
      bodyEn:
        '[TO CONFIRM: age restrictions, processing of children’s data and consent mechanisms where applicable].',
    },
    {
      titleEs: 'Cambios en esta política',
      titleEn: 'Changes to This Policy',
      bodyEs:
        '[POR CONFIRMAR: mecanismo de aviso y fecha de vigencia]. Última actualización: [LAST UPDATED].',
      bodyEn: '[TO CONFIRM: notice mechanism and effective date]. Last updated: [LAST UPDATED].',
    },
    {
      titleEs: 'Contacto',
      titleEn: 'Contact',
      bodyEs:
        'Responsable: [LEGAL ENTITY]. Correo: [CONTACT EMAIL]. Dirección: [ADDRESS]. Jurisdicción: [JURISDICTION].',
      bodyEn:
        'Controller: [LEGAL ENTITY]. Email: [CONTACT EMAIL]. Address: [ADDRESS]. Jurisdiction: [JURISDICTION].',
    },
  ],
  terms: [
    {
      titleEs: 'Introducción',
      titleEn: 'Introduction',
      bodyEs:
        'Borrador de condiciones para la relación entre [LEGAL ENTITY] y quienes utilicen ResQ. [POR CONFIRMAR: alcance, proceso de aceptación y fecha de vigencia].',
      bodyEn:
        'Draft conditions for the relationship between [LEGAL ENTITY] and ResQ users. [TO CONFIRM: scope, acceptance process and effective date].',
    },
    {
      titleEs: 'Definiciones',
      titleEn: 'Definitions',
      bodyEs:
        'ResQ se describe como una solución IoT de detección de riesgos y gestión de emergencias que conecta dispositivos, información, alertas y respuesta. [POR CONFIRMAR: definiciones contractuales y alcance de cada servicio].',
      bodyEn:
        'ResQ is described as an IoT solution for risk detection and emergency management connecting devices, information, alerts and response. [TO CONFIRM: contractual definitions and each service’s scope].',
    },
    {
      titleEs: 'Elegibilidad',
      titleEn: 'Eligibility',
      bodyEs:
        '[POR CONFIRMAR: edad mínima, capacidad para aceptar estas condiciones y requisitos de acceso].',
      bodyEn: '[TO CONFIRM: minimum age, capacity to accept these terms and access requirements].',
    },
    {
      titleEs: 'Uso de la plataforma',
      titleEn: 'Use of the Platform',
      bodyEs:
        '[POR CONFIRMAR: usos autorizados, alcance de las funciones y responsabilidades del usuario]. La descripción de la landing no constituye una garantía contractual.',
      bodyEn:
        '[TO CONFIRM: authorized uses, feature scope and user responsibilities]. The landing description does not constitute a contractual guarantee.',
    },
    {
      titleEs: 'Cuentas y acceso',
      titleEn: 'Accounts and Access',
      bodyEs:
        '[POR CONFIRMAR: registro, permisos, protección de credenciales y procedimiento ante acceso no autorizado].',
      bodyEn:
        '[TO CONFIRM: registration, permissions, credential protection and unauthorized-access procedure].',
    },
    {
      titleEs: 'Dispositivos IoT y conectividad',
      titleEn: 'IoT Devices and Connectivity',
      bodyEs:
        '[POR CONFIRMAR: requisitos de instalación, compatibilidad, mantenimiento, energía y conectividad]. Deben documentarse las limitaciones reales de cada dispositivo.',
      bodyEn:
        '[TO CONFIRM: installation, compatibility, maintenance, power and connectivity requirements]. Actual limitations of each device must be documented.',
    },
    {
      titleEs: 'Alertas y notificaciones',
      titleEn: 'Alerts and Notifications',
      bodyEs:
        '[POR CONFIRMAR: canales, configuración y condiciones de entrega]. No se promete que toda señal de riesgo sea detectada ni que toda alerta llegue de forma inmediata.',
      bodyEn:
        '[TO CONFIRM: channels, configuration and delivery conditions]. No promise is made that every risk signal is detected or every alert arrives immediately.',
    },
    {
      titleEs: 'Aviso sobre emergencias',
      titleEn: 'Emergency Disclaimer',
      bodyEs:
        'ResQ no debe presentarse como sustituto de los servicios públicos de emergencia. Ante una emergencia, contacta a los servicios oficiales correspondientes y sigue los protocolos aplicables. No dependas exclusivamente de ResQ para solicitar ayuda. [POR CONFIRMAR: alcance oficial del servicio de respuesta].',
      bodyEn:
        'ResQ must not be presented as a substitute for public emergency services. In an emergency, contact the appropriate official services and follow applicable protocols. Do not rely exclusively on ResQ to request help. [TO CONFIRM: official response service scope].',
    },
    {
      titleEs: 'Servicios de terceros',
      titleEn: 'Third-Party Services',
      bodyEs:
        '[POR CONFIRMAR: proveedores e integraciones realmente utilizados y condiciones aplicables]. No se atribuye a ResQ control sobre servicios externos.',
      bodyEn:
        '[TO CONFIRM: providers and integrations actually used and their applicable terms]. ResQ is not attributed control over external services.',
    },
    {
      titleEs: 'Propiedad intelectual',
      titleEn: 'Intellectual Property',
      bodyEs:
        '[POR CONFIRMAR: titularidad, licencias y permisos de uso de software, contenido, marca y dispositivos].',
      bodyEn:
        '[TO CONFIRM: ownership, licenses and permissions for software, content, brand and devices].',
    },
    {
      titleEs: 'Disponibilidad',
      titleEn: 'Availability',
      bodyEs:
        '[POR CONFIRMAR: alcance de disponibilidad, mantenimiento y soporte]. No se declara un nivel de servicio ni disponibilidad garantizada.',
      bodyEn:
        '[TO CONFIRM: availability scope, maintenance and support]. No service level or guaranteed availability is declared.',
    },
    {
      titleEs: 'Limitación de responsabilidad',
      titleEn: 'Limitation of Liability',
      bodyEs:
        '[POR CONFIRMAR Y VALIDAR: límites de responsabilidad permitidos por la legislación aplicable y excepciones obligatorias]. Este borrador no establece una exención general de responsabilidad.',
      bodyEn:
        '[TO CONFIRM AND VALIDATE: liability limits permitted by applicable law and mandatory exceptions]. This draft does not establish a blanket liability waiver.',
    },
    {
      titleEs: 'Usos prohibidos',
      titleEn: 'Prohibited Uses',
      bodyEs:
        '[POR CONFIRMAR: restricciones sobre acceso no autorizado, interferencia con dispositivos, uso ilícito y manipulación de alertas].',
      bodyEn:
        '[TO CONFIRM: restrictions on unauthorized access, device interference, unlawful use and alert manipulation].',
    },
    {
      titleEs: 'Modificaciones',
      titleEn: 'Modifications',
      bodyEs:
        '[POR CONFIRMAR: procedimientos para actualizar la plataforma o estas condiciones y comunicar cambios relevantes].',
      bodyEn:
        '[TO CONFIRM: procedures for updating the platform or these terms and communicating relevant changes].',
    },
    {
      titleEs: 'Terminación',
      titleEn: 'Termination',
      bodyEs:
        '[POR CONFIRMAR: suspensión, cierre de cuentas, efectos de terminación y tratamiento posterior de datos].',
      bodyEn:
        '[TO CONFIRM: suspension, account closure, termination effects and subsequent data handling].',
    },
    {
      titleEs: 'Ley aplicable',
      titleEn: 'Governing Law',
      bodyEs:
        '[POR CONFIRMAR: ley y mecanismos de resolución de controversias en [JURISDICTION]]. No se asigna una jurisdicción sin documentación oficial.',
      bodyEn:
        '[TO CONFIRM: law and dispute resolution mechanisms in [JURISDICTION]]. No jurisdiction is assigned without official documentation.',
    },
    {
      titleEs: 'Contacto',
      titleEn: 'Contact',
      bodyEs:
        'Entidad: [LEGAL ENTITY]. Correo: [CONTACT EMAIL]. Dirección: [ADDRESS]. Última actualización: [LAST UPDATED].',
      bodyEn:
        'Entity: [LEGAL ENTITY]. Email: [CONTACT EMAIL]. Address: [ADDRESS]. Last updated: [LAST UPDATED].',
    },
  ],
};
