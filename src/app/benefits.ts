import { LanguageService } from './language';
import { Component, inject } from '@angular/core';
@Component({
  selector: 'resq-benefits',
  templateUrl: './benefits.html',
  styleUrl: './benefits.scss',
})
export class BenefitsSection {
  language = inject(LanguageService);
  tr(value: string) {
    return this.language.text(value);
  }

  benefits = [
    {
      title: 'Protección para las personas',
      text: 'Contribuye a crear entornos más seguros mediante la detección y atención oportuna de condiciones de riesgo.',
      icon: 'M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20v-3a6 6 0 0 1 12 0v3m2-16a3 3 0 0 1 0 6m2 4a5 5 0 0 1 2 4v2',
    },
    {
      title: 'Monitoreo integral',
      text: 'Centraliza la información de la infraestructura para supervisar zonas, dispositivos y condiciones en tiempo real.',
      icon: 'M5 21V3h14v18M2 21h20M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2',
    },
    {
      title: 'Respuesta automatizada',
      text: 'Permite ejecutar acciones de respuesta a partir de las condiciones detectadas en la infraestructura.',
      icon: 'M12 8v4l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
    },
    {
      title: 'Trazabilidad y mejora continua',
      text: 'Registra eventos y respuestas para analizar lo ocurrido y fortalecer continuamente la gestión de la seguridad.',
      icon: 'M4 3v18h17M8 16v-5m5 5V7m5 9v-7',
    },
  ];
}
