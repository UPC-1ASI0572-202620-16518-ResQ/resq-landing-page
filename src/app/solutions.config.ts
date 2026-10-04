export interface InfrastructureSolution {
  id: string;
  number: string;
  category: string;
  selector: string;
  title: string;
  description: string;
  capabilities: string[];
  cta: string;
  complex: boolean;
}
export const INFRASTRUCTURE_SOLUTIONS: InfrastructureSolution[] = [
  {
    id: 'buildings',
    number: '01',
    category: 'EDIFICIOS Y CONDOMINIOS',
    selector: 'Edificios y condominios',
    title: 'Propietarios y administradores de edificaciones',
    description:
      'Centraliza el monitoreo de tu edificio y conoce rápidamente el tipo de riesgo, la zona afectada y las acciones ejecutadas durante una emergencia.',
    capabilities: [
      'Monitoreo del estado del edificio y sus zonas',
      'Detección y clasificación de situaciones de riesgo',
      'Alertas y señalización diferenciadas',
      'Identificación de la zona afectada',
      'Registro e historial de eventos',
      'Incorporación progresiva de sensores y dispositivos',
    ],
    cta: 'Solicitar implementación',
    complex: false,
  },
  {
    id: 'institutions',
    number: '02',
    category: 'EMPRESAS INTEGRADORAS',
    selector: 'Empresas integradoras',
    title: 'Empresas integradoras de automatización y gestión de edificios inteligentes',
    description:
      'Supervisa múltiples zonas e instalaciones desde una visión centralizada y facilita la coordinación de la respuesta ante situaciones de emergencia.',
    capabilities: [
      'Monitoreo centralizado de múltiples zonas',
      'Identificación del tipo y nivel de riesgo',
      'Localización del ambiente afectado',
      'Trazabilidad de eventos y respuestas',
      'Información para seguridad, operaciones y mantenimiento',
      'Integración progresiva con infraestructura existente',
    ],
    cta: 'Hablar con ResQ',
    complex: true,
  },
];
