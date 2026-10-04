export type LegalSection = { titleEs: string; titleEn: string; bodyEs: string; bodyEn: string };
export const LEGAL_CONTENT: Record<'privacy' | 'terms', LegalSection[]> = {
  privacy: [
    {
      titleEs: 'Información que compartes',
      titleEn: 'Information you share',
      bodyEs:
        'Puedes navegar por este sitio sin crear una cuenta. Si nos contactas por correo o teléfono, la información que compartas se utiliza para atender tu consulta. Comparte únicamente los datos necesarios para que podamos ayudarte y evita incluir información sensible.',
      bodyEn:
        'You can browse this website without creating an account. If you contact us by email or phone, the information you share is used to respond to your inquiry. Share only the details needed to help you and avoid including sensitive information.',
    },
    {
      titleEs: 'Preferencias del sitio',
      titleEn: 'Website preferences',
      bodyEs:
        'Guardamos tu preferencia de idioma en el navegador para mostrar el sitio en español o inglés. Puedes eliminarla borrando los datos del sitio en tu navegador. Esta preferencia facilita la navegación y no requiere que te identifiques.',
      bodyEn:
        'We store your language preference in your browser to display the website in Spanish or English. You can remove it by clearing website data in your browser. This preference makes browsing easier and does not require you to identify yourself.',
    },
    {
      titleEs: 'Servicios externos',
      titleEn: 'External services',
      bodyEs:
        'Los videos y enlaces a redes sociales pueden abrir servicios externos. Estos servicios gestionan la información según sus propias políticas de privacidad y pueden utilizar cookies u otras tecnologías al interactuar con ellos. Revisa sus políticas antes de compartir datos.',
      bodyEn:
        'Videos and social links may open external services. These services handle information according to their own privacy policies and may use cookies or other technologies when you interact with them. Review their policies before sharing data.',
    },
    {
      titleEs: 'Consultas sobre tus datos',
      titleEn: 'Questions about your data',
      bodyEs:
        'Para consultar sobre la información que hayas compartido o solicitar su eliminación, escribe a [CONTACT EMAIL]. Indica qué información deseas consultar, corregir o eliminar para facilitar la atención de tu solicitud. Esta política puede actualizarse cuando cambie el funcionamiento del sitio.',
      bodyEn:
        'For questions about information you have shared or to request its deletion, email [CONTACT EMAIL]. Tell us which information you wish to review, correct or delete so we can address your request. This policy may be updated when the website changes.',
    },
  ],
  terms: [
    {
      titleEs: 'Sobre este sitio',
      titleEn: 'About this website',
      bodyEs:
        'Este sitio presenta ResQ, un proyecto académico de monitoreo, detección y respuesta para infraestructura. Su contenido tiene fines informativos y puede actualizarse. Las funciones y ejemplos mostrados describen la propuesta del proyecto; no constituyen una oferta de servicio ni garantizan resultados en una instalación real.',
      bodyEn:
        'This website presents ResQ, an academic project for infrastructure monitoring, detection and response. Its content is informational and may be updated. The features and examples shown describe the project proposal; they do not constitute a service offer or guarantee results in a real installation.',
    },
    {
      titleEs: 'Uso responsable',
      titleEn: 'Responsible use',
      bodyEs:
        'Utiliza el sitio de forma respetuosa y sin afectar su funcionamiento. Evita acceder a recursos restringidos o utilizar sus contenidos para actividades que perjudiquen a otras personas. Las demostraciones no sustituyen los servicios de emergencia ni los protocolos de seguridad de una edificación.',
      bodyEn:
        'Use the website respectfully and without disrupting its operation. Avoid accessing restricted resources or using its content for activities that harm others. Demonstrations do not replace emergency services or building safety procedures.',
    },
    {
      titleEs: 'Contenido y enlaces',
      titleEn: 'Content and links',
      bodyEs:
        'Los textos, imágenes y materiales se muestran para presentar el proyecto. Respeta los derechos de sus autores y solicita autorización cuando corresponda antes de reutilizarlos. Los enlaces externos están sujetos a las condiciones de cada servicio.',
      bodyEn:
        'Text, images and materials are displayed to present the project. Respect their authors’ rights. Request permission where appropriate before reusing these materials. External links are subject to each service’s terms.',
    },
    {
      titleEs: 'Cambios y contacto',
      titleEn: 'Changes and contact',
      bodyEs:
        'Podemos actualizar el contenido del sitio y estas condiciones para reflejar cambios en el proyecto. El acceso puede verse interrumpido temporalmente por mantenimiento o ajustes técnicos. Si tienes preguntas sobre ResQ o el uso de esta página, escribe a [CONTACT EMAIL].',
      bodyEn:
        'We may update website content and these terms to reflect changes to the project. Access may be temporarily interrupted by maintenance or technical adjustments. If you have questions about ResQ or using this page, email [CONTACT EMAIL].',
    },
  ],
};
